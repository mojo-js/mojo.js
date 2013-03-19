// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["./base", "outcome", "../../utils/async", "../../collections/concrete", "../../factories/class", "../../templates/factory"], function(BaseViewDecorator, outcome, async, Collection, ClassFactory, templates) {
    var ListChildrenDecorator;
    ListChildrenDecorator = (function(_super) {

      __extends(ListChildrenDecorator, _super);

      function ListChildrenDecorator() {
        this._onChildrenUpdated = __bind(this._onChildrenUpdated, this);
        return ListChildrenDecorator.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      ListChildrenDecorator.prototype.load = function(callback) {
        var children,
          _this = this;
        this._children = children = this.view.get("children");
        this._intermediate = new Collection();
        if (this.view.get("childViewClass")) {
          this._intermediate.itemFactory(new ClassFactory(this.view.get("childViewClass")));
          this._intermediate.glue(this._children);
        }
        if (this.view.get("source")) {
          this.view.get("source").glue(this._intermediate);
        }
        return async.eachSeries(this._children.source(), (function(child, next) {
          return _this._loadChild(child, next);
        }), outcome.e(callback).s(function() {
          _this._children.on("updated", _this._onChildrenUpdated);
          return callback.apply(_this, arguments);
        }));
      };

      /*
      */


      ListChildrenDecorator.prototype.attach = function(callback) {
        var _this = this;
        return async.eachSeries(this._children.source(), (function(child, next) {
          return _this._addChild(child, next);
        }), callback);
      };

      /*
      */


      ListChildrenDecorator.prototype.remove = function(callback) {
        return async.eachSeries(this._children.source(), (function(child, next) {
          return child.remove(next);
        }), callback);
      };

      /*
      */


      ListChildrenDecorator.prototype._onChildrenUpdated = function(event) {
        var item;
        if (event.type !== "add") {
          return;
        }
        item = event.item;
        return this._addChild(item);
      };

      /*
      */


      ListChildrenDecorator.prototype._addChild = function(child, next) {
        var _this = this;
        if (next == null) {
          next = (function() {});
        }
        if (this._loading) {
          return;
        }
        return this._loadChild(child, function() {
          child.attach(_this._childrenElement().append(child.get("parentTplContent")).children().last());
          return next();
        });
      };

      /*
      */


      ListChildrenDecorator.prototype._loadChild = function(child, callback) {
        var template,
          _this = this;
        if (child.has("parentTplContent")) {
          return callback();
        }
        if (this.view.get("childTemplate")) {
          template = this.view.get("childTemplate");
        } else if (this.view.get("childElement")) {
          template = templates.fromSource("<" + (this.view.get("childElement")) + " />");
        }
        return template.render(child.get(), outcome.e(callback).s(function(content) {
          child.set("parentTplContent", content);
          return child.load(callback);
        }));
      };

      /*
      */


      ListChildrenDecorator.prototype._childrenElement = function() {
        if (!this.view.has("childrenElement")) {
          return this.view.element;
        }
        return this.view.element.find(this.view.get("childrenElement"));
      };

      return ListChildrenDecorator;

    })(BaseViewDecorator);
    ListChildrenDecorator.test = function(view) {
      return view.has("children") && view.get("children")._events;
    };
    return ListChildrenDecorator;
  });

}).call(this);