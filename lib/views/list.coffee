bindable  = require "bindable"
type      = require "type-component"
factories = require "factories"
hoist     = require "hoist"
dref      = require "dref"

class ListView extends require("./base/decorable")  
  
  ###
  ###

  _init: () ->
    super()
    @_views = new bindable.Collection()
    @_initOptions()
    @_initModelMapper()
    @_initSourceBindings()

  ###
  ###

  _initOptions: () ->
    @_filter           = @get("filter")
    @_sort             = @get("sort")
    @_modelViewFactory = @get("modelViewFactory") # TODO
    @_modelViewClass   = @get("modelViewClass")
    @_map              = @get("map")

    if @_modelViewFactory
      @_modelViewFactory = factories.factory(@_modelViewFactory)

  ###
  ###

  _initModelMapper: () ->
    modelViewFactory = @_modelViewFactory ? factories.class(@_modelViewClass)

    hoister = @_mapModel = hoist()

    if @_map
      hoister.map (model) => @_map model, @

    hoister.
    map((model) =>
      ops       = {}
      ops.model = model
      ops._id   = model?.get?("_id") ? model?._id
      ops
    ).map((options) =>
      view = modelViewFactory.create options

      # set the view incase the factory is manual - in which 
      # case the _id might never exist in the view. We won't be able to
      # find a reference to it!
      view.set "_id", options._id

      @_hookModelView view
      view
    )

  ###
  ###

  _initSourceBindings: () ->
    @_views.bind("length").to(@, "length").now()
    @_views.bind({ remove: @_removeModelView }).now()
    @bind("source").to(@_onSourceOptionChange).now()

  ###
  ###

  _onSourceOptionChange: (source) ->
    if type(source) is "string"

  ###
  ###

  _onSourceChange: (@_source) =>

    @_views.source []
    @_deferredSections = []
    @_sourceBinding?.dispose()

    return unless _source

    @_sourceBinding = binding = _source.bind()

    # filter provided?
    if @_filter
      @_sourceBinding.filter (model) =>
        @_watchModelChanges model
        @_filter model, @


    binding.map(@_mapModel).to(@_views).now()
    @_watchViewChanges()

  ###
  ###

  _watchModelChanges: (model) ->

    removeListener = () -> 
      model.removeListener "change", _onSourceChange

    model.on "change", onChange = () => @_refilter [model]

  ###
  ###

  _refilter: (models) ->
    for model in models

      useModel      = !!@_filter(model, @)
      modelIndex    = @_views.indexOf({ _id: model.get("_id") })
      containsModel = !!~modelIndex

      continue if useModel is containsModel

      if useModel
        @_views.push @_mapModel model
      else

        # note ~ @remove is overwritten, so we need to 
        # fetch the object, and remove it manually
        @_views.splice(modelIndex, 1)

  ###
  ###

  _hookModelView: (modelView) ->

    @view.linkChild modelView
    modelView.render()

    if @_rendered
      @_deferInsert modelView.section.toFragment()
    else
      @section.append model.section.toFragment()

  ###
  ###

  _deferInsert: (section) ->  
    @_deferredSections.push(section)
    clearTimeout @_deferInsertTimeout
    @_deferInsertTimeout = setTimeout @_insertDeferredSections, 0

  ###
  ###

  _insertDeferredSections: () =>
    @section.append @_deferredSections...
    @_deferredSections = []

  ###
  ###

  _removeModelView: (modelView) =>
    return unless modelView
    modelView.remove()




module.exports = ListView