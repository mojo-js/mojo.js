// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./base", "outcome"], function(BaseViewDecorator, outcome) {
    var TemplateViewDecorator;
    TemplateViewDecorator = (function(_super) {

      __extends(TemplateViewDecorator, _super);

      function TemplateViewDecorator() {
        return TemplateViewDecorator.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      TemplateViewDecorator.prototype.load = function(callback) {
        var _this = this;
        return this.view.get("template").render(this.templateData(), outcome.e(callback).s(function(content) {
          _this.view.set("html", content);
          return callback();
        }));
      };

      /*
      */


      TemplateViewDecorator.prototype.attach = function(callback) {
        this.view.element.html(this.view.get("html"));
        return callback();
      };

      /*
      */


      TemplateViewDecorator.prototype.templateData = function() {
        return this.view.get();
      };

      return TemplateViewDecorator;

    })(BaseViewDecorator);
    TemplateViewDecorator.test = function(view) {
      return view.has("template");
    };
    return TemplateViewDecorator;
  });

}).call(this);