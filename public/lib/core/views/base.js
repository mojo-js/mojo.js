// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["jquery", "events", "../bindings/bindable", "outcome", "underscore", "./decor/facade", "asyngleton", "../collections/concrete", "../utils/async", "structr"], function($, events, Bindable, outcome, _, ViewDecorator, asyngleton, Collection, async, structr) {
    var BaseView;
    return BaseView = (function(_super) {

      __extends(BaseView, _super);

      /*
      */


      function BaseView(options) {
        if (options == null) {
          options = {};
        }
        this.rerender = __bind(this.rerender, this);

        BaseView.__super__.constructor.call(this, options);
        this.decorator = new ViewDecorator(this);
        this.loadables = new Collection([this.decorator]);
        this._o = outcome.e(this);
        this.init();
        this.set("initialized", true);
      }

      /*
      */


      BaseView.prototype.init = function() {
        if (this._initialized) {
          throw new Error("already initialized");
        }
        this._initialized = true;
        this.on("attached", this._onAttached);
        this.on("removed", this._onRemoved);
        this.on("change", this._onChanged);
        return this.once("loaded", this._onLoaded);
      };

      /*
           returns a search for a particular element
      */


      BaseView.prototype.$ = function(search) {
        var _ref;
        return (_ref = this.element) != null ? _ref.find(search) : void 0;
      };

      /*
           attaches to an element
      */


      BaseView.prototype.attach = function(selectorOrElement, callback) {
        var _this = this;
        if (callback == null) {
          callback = (function() {});
        }
        this.element = typeof selectorOrElement === "string" ? $(selectorOrElement) : selectorOrElement;
        this.selector = selectorOrElement;
        return this.load(function() {
          return _this.decorator.attach(_this._o.e(callback).s(function() {
            callback();
            return _this.emit("attached");
          }));
        });
      };

      /*
           re-renders an element
      */


      BaseView.prototype.rerender = function(callback) {
        if (callback == null) {
          callback = function() {};
        }
        callback = this._fixCallback(callback);
        if (!this.selector) {
          return callback();
        }
        return this.attach(this.selector, callback);
      };

      /*
      */


      BaseView.prototype.remove = function(callback) {
        var _this = this;
        if (callback == null) {
          callback = (function() {});
        }
        callback = this._fixCallback(callback);
        if (!this.element) {
          return callback();
        }
        return this.decorator.remove(this._o.e(callback).s(function() {
          _this.element.unbind("*");
          _this.element.html("");
          callback();
          return _this.emit("removed");
        }));
      };

      /*
      */


      BaseView.prototype.load = asyngleton(function(callback) {
        var _this = this;
        return async.eachSeries(this.loadables.source(), (function(loadable, next) {
          return loadable.load(next);
        }), this._o.e(callback).s(function() {
          callback();
          return _this.emit("loaded");
        }));
      });

      /*
           Fixes the callback incase it's not a function
      */


      BaseView.prototype._fixCallback = function(callback) {
        if (typeof callback !== "function") {
          callback = (function() {});
        }
        return callback;
      };

      /*
      */


      BaseView.prototype._onAttached = function() {};

      BaseView.prototype._onRemoved = function() {};

      BaseView.prototype._onChanged = function() {};

      BaseView.prototype._onLoaded = function() {};

      structr(BaseView);

      return BaseView;

    })(Bindable);
  });

}).call(this);
