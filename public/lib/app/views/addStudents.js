// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../../core/views/base", "../core/templates", "../../core/i18n/translate"], function(View, templates, t) {
    var AddStudents, _ref;

    return AddStudents = (function(_super) {
      __extends(AddStudents, _super);

      function AddStudents() {
        _ref = AddStudents.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      /*
      */


      AddStudents.prototype.title = t("Add Students");

      /*
      */


      AddStudents.prototype.template = templates.addStudents;

      return AddStudents;

    })(View);
  });

}).call(this);