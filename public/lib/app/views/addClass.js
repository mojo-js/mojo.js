// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/base", "../../core/views/input/select", "../../core/views/input/text", "../core/templates", "../core/modelLocator", "../../core/i18n/translate"], function(View, SelectInputView, TextInputView, templates, modelLocator, t) {
    var AddClassView, NameClassInputView, SelectClassesView;
    SelectClassesView = (function(_super) {

      __extends(SelectClassesView, _super);

      function SelectClassesView() {
        return SelectClassesView.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      SelectClassesView.prototype.selectLabel = "Select year";

      /*
      */


      SelectClassesView.prototype.itemLabel = "name";

      /*
      */


      SelectClassesView.prototype.modelLocator = modelLocator;

      /*
      */


      SelectClassesView.prototype.name = "grade";

      /*
      */


      SelectClassesView.prototype.source = "modelLocator.grades";

      return SelectClassesView;

    })(SelectInputView);
    NameClassInputView = (function(_super) {

      __extends(NameClassInputView, _super);

      function NameClassInputView() {
        return NameClassInputView.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      NameClassInputView.prototype.name = "class_name";

      /*
      */


      NameClassInputView.prototype.attributes = {
        placeholder: "Name your class"
      };

      return NameClassInputView;

    })(TextInputView);
    return AddClassView = (function(_super) {

      __extends(AddClassView, _super);

      function AddClassView() {
        return AddClassView.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      AddClassView.prototype.classyears = [
        {
          value: 2005
        }
      ];

      /*
      */


      AddClassView.prototype.title = t("Add Class");

      /*
      */


      AddClassView.prototype.template = templates.addClass;

      /*
      */


      AddClassView.prototype.children = {
        "#select-class-year-container": SelectClassesView,
        "#add-name-container": NameClassInputView
      };

      /*
      */


      AddClassView.prototype.init = function() {
        return AddClassView.__super__.init.call(this);
      };

      return AddClassView;

    })(View);
  });

}).call(this);
