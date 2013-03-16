define ["comerr", "./base", "underscore", "jquery-transit", "jquery", "async"], (comerr, BaseViewDecorator, _, transit, $, async) ->
  
  class TransitionDecorator extends BaseViewDecorator


    ###
    ###

    setup: (callback) -> 
      @_transitionAll "enter", callback
    

    ###
    ###


    teardown: (callback)  -> 
      @_transitionAll "exit", callback


    ###
    ###

    _transitionAll: (type, callback) ->
      async.forEach @_filterTransitions(type), ((transition, next) =>
        @_transition @_element(transition), transition[type], next
      ), callback


    ###
    ###

    _transition: (element, transition, callback) ->

      # if the element doesn't exist, then return an error
      return callback(new comerr.NotFound("element does not exist")) if not element.length

      if transition.from
        element.css transition.from

      element.transit transition.to or transition, callback


    ###
    ###

    _transitions: () ->
      transition = @view.get("transition")
      if transition.enter or transition.exit
        return [transition]


      transitions = []

      for selector of transition
        trans = transition[selector]
        trans.selector = selector
        transitions.push trans


      transitions

    ###
    ###

    _filterTransitions: (type) ->
      return @_transitions().filter (trans) -> !!trans[type]


    ###
    ###

    _element: (transition) -> 
      selector = transition.selector or transition.element
      return if selector then @view.element.find(selector) else @view.element





  TransitionDecorator.test = (view) ->
    return view.has("transition")

  TransitionDecorator