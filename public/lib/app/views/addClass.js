// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/base", "../../core/views/input/select", "../../core/views/input/text", "../../core/views/input/form", "mannequin", "bindable", "../core/templates", "../../core/i18n/translate"], function(View, SelectInputView, TextInputView, FormView, mannequin, bindable, templates, t) {
    var AddClassView, Classroom, NameClassInputView, SelectClassesView, schema, _ref, _ref1, _ref2;

    schema = new mannequin.Schema({
      grade: {
        $type: "number",
        $required: true
      },
      class_name: {
        $type: "string",
        $required: true
      }
    });
    Classroom = mannequin.dictionary().register("classroom", schema).getClass();
    SelectClassesView = (function(_super) {
      __extends(SelectClassesView, _super);

      function SelectClassesView() {
        _ref = SelectClassesView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      /*
      */


      SelectClassesView.prototype.selectLabel = "Select year";

      /*
      */


      SelectClassesView.prototype.itemLabel = "name";

      /*
      */


      SelectClassesView.prototype.name = "grade";

      /*
      */


      SelectClassesView.prototype.source = bindable.Object.from("modelLocator.grades");

      return SelectClassesView;

    })(SelectInputView);
    NameClassInputView = (function(_super) {
      __extends(NameClassInputView, _super);

      function NameClassInputView() {
        _ref1 = NameClassInputView.__super__.constructor.apply(this, arguments);
        return _ref1;
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
        _ref2 = AddClassView.__super__.constructor.apply(this, arguments);
        return _ref2;
      }

      /*
      */


      AddClassView.prototype.modelClass = Classroom;

      /*
      */


      AddClassView.prototype.title = t("Add Class");

      /*
      */


      AddClassView.prototype.template = templates.addClass;

      /*
      */


      AddClassView.prototype.events = {
        "next": function() {
          return this.submit();
        }
      };

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

    })(FormView);
  });

}).call(this);
