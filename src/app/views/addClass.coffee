define ["../../core/views/base", 
"../../core/views/input/select", 
"../core/templates", 
"../core/modelLocator", 
"../../core/i18n/translate"], (View, SelectInputView, templates, modelLocator, t) ->
        

    
  class SelectClassesView extends SelectInputView

    ###
    ###

    selectLabel: "Select year"



    ###
    ###

    itemLabel: "name"


    ###
    ###

    modelLocator: modelLocator


    ###
    ###

    source: "modelLocator.clazz.types"



  class AddClassView extends View

    ###
    ###

    classyears: [{
      value: 2005
    }]


    ###
    ###

    title: t("Add Class")

    ###
    ###


    template: templates.addClass


    ###
    ###

    children: {
      "#select-class-year-container": SelectClassesView
    },


    ###
    ###

    init: () ->
      super()


  


