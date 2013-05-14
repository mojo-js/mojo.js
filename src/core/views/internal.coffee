define ["jquery",
"bindable",
"./collection",
"../utils/idGenerator",
"dref",
"../models/locator",
"pilot-block",
"./states"], ($, bindable, ViewCollection, generateId, dref,  
  modelLocator, pilot, ViewStates) ->

  
      
  class InternalView extends bindable.Object

    ###
    ###

    constructor: (data = {}) ->

      # ID's are necessary for collections
      @_id = dref.get(data, "_id") or dref.get(data.item or {}, "_id") or generateId()

      data.view         = @
      data.modelLocator = modelLocator

      super data


      # items to load with the view
      # TODO - viewCollections.create() - should be a recycled item
      @decorators = new ViewCollection()

      # create a default element block
      @section = pilot.createSection()

      # initialize the options
      @init()
      @_listen()

    ###
    ###

    load    : (next) -> @decorators.load next
    render  : (next) -> @decorators.render next
    display : (next) -> @decorators.display next
    remove  : (next) -> @decorators.remove next

    ###
    ###

    init: () -> # OVERRIDE ME

    ###
     If the key doesn't exist, then inherit it from the parent
    ###

    get: (key) -> super(key) ? @_parent?.get(key)

    ###
    ###

    _listen: () ->
      @decorators.on 

        # emitted before load
        load: @_onLoad

        # emitted after all the children have been loaded
        loaded: @_onLoaded

        # emitted before render
        render: @_onRender

        # emitted after all children have been attached - before transitions & events
        rendered: @_onRendered

        # emitted before display
        display: @_onDisplay,

        # emitted after this view has been attached to an element - after transitions & events
        displayed: @_onDisplayed,

        # emitted before remove
        remove: @_onRemove,

        # emitted after this view has been completely removed
        removed: @_onRemoved

    ###
     returns a search for a particular element
    ###

    $: (search) -> 
      el = $(@section.elements)

      if arguments.length
        return el.find search

      return el

    ###
     attaches to an element to the DOM
    ###

    attach: (element, callback) ->
      @_domElement = element[0] or element

      @decorators.once "display", () =>
        @section.replaceChildren @_domElement

      @display callback

    ###
    ###

    linkChild: () ->
      for child in arguments
        child._parent = @
      @

    ###
    ###

    emit: () ->
      super arguments...

      arguments[0] = arguments[0].toLowerCase()

      # also send it to the element
      el = @$()
      el.trigger.apply el, arguments


    ###
    ###

    dispose: () =>
      el = @$()
      el.unbind "*"
      @section.dispose()
      super()

    ###
    ###

    _onLoad      : () => @currentState = ViewStates.LOADING
    _onLoaded    : () =>
      return if @_parent?.currentState is ViewStates.LOADING
      @section.updateChildren()

    ###
    ###

    _onRender    : () => @currentState = ViewStates.RENDERING
    _onRendered  : () =>

    ###
    ###

    _onDisplay   : () => @currentState = ViewStates.DISPLAYING
    _onDisplayed : () => 

    ###
    ###
    
    _onRemove    : () => @currentState = ViewStates.REMOVING
    _onRemoved   : () =>
      return if @_parent?.currentState is ViewStates.REMOVING
      @dispose()


