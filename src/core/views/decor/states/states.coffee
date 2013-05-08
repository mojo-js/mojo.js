define ["./state", "bindable", "stepc", "pilot-block"], (State, bindable, stepc, pilot) ->
    
  class extends bindable.Object

    ###
    ###

    constructor: (@decorator, @options) ->
      super()

      @_id = @name = @options._name
      @section = @options.section

      @view  = decorator.view

      # the view states
      @source = new bindable.Collection()
      @source.enforceId false
      @source.reset (@options.views or @options).map (stateOptions) => new State @, stateOptions

      # initial index
      @set "index", @options.index or 0

      @selector = @options.selector

      # rotate back to zero if at the end
      @rotate = @options.rotate or false

    ###
    ###

    load: (callback) ->
      @once "loadedState", callback
      @bind "index", @_setIndex

    ###
    ###

    render: (callback) ->
      @once "renderedState", callback
      @bind "currentView", @_renderView
      callback()


    ###
    ###

    display: (callback) ->
      @once "displayedState", callback
      @bind "currentView", @_displayView
      callback()

    ###
    ###

    remove: (callback) ->
      return callback() if not @has "currentView"
      @get("currentView").remove callback


    ###
    ###

    select: (stateOrIndex) ->
      if typeof stateOrIndex is "number"
        @set "index", stateOrIndex
      else
        i = @source.indexOf stateOrIndex
        if ~i
          @select i


    ###
    ###

    next: () =>
      newIndex = @get("index") + 1

      if newIndex >= @source.length()
        if @rotate
          newIndex = 0
        else
          newIndex = @source.length() - 1
          @emit "ended"

      @set "index", newIndex


    ###
    ###

    prev: () =>
      newIndex = @get("index") - 1

      if newIndex < 0
        if @rotate
          newIndex = @source.length() - 1
        else
          newIndex = 0

      @set "index", newIndex

    ###
    ###

    _setIndex: (index) =>
      return if not @source.length()


      @currentState?.set "selected", false

      self           = @
      state          = @currentState = @source.at index or 0
      newStateView   = state.createView()
      @view.linkChild newStateView

      @currentState.set "selected", true

      oldView = self._currentView
      

      stepc.async(

        (() ->
          return @() if not oldView
          oldView.remove @
        ),

        # first load the new state in
        (() ->
          newStateView.load @
        ),

        # finally, add the new state
        (() ->


          # set the nw start
          self._currentView = newStateView
          self.view.section.append newStateView.section

          pilot.update self.view.section.start.parentNode

          self.set "currentView", newStateView
          self.emit "loadedState"

        )
      )

    ###
    ###

    emit: () ->
      super arguments...
      arguments[0] = @name + "." + arguments[0]
      @view.emit arguments...

    ###
    ###

    _renderView: (view) =>
      view.render () => 
        @emit "renderedState"


    ###
    ###

    _displayView: (view) =>
      view.display () => 
        @emit "displayedState"

    ###
    ###

    _element: () ->
      if @selector then @view.$(@selector) else @view.el










