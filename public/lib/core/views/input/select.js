// Generated by CoffeeScript 1.4.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["../list", "../base", "../../templates/factory", "dref"], function(ListView, View, templates, dref) {
    var SelectInputView;
    return SelectInputView = (function(_super) {

      __extends(SelectInputView, _super);

      function SelectInputView() {
        this._transformSelectItem = __bind(this._transformSelectItem, this);

        this._onAttached = __bind(this._onAttached, this);
        return SelectInputView.__super__.constructor.apply(this, arguments);
      }

      /*
      */


      SelectInputView.prototype.template = templates.fromSource("<select></select>");

      /*
      */


      SelectInputView.prototype.childrenElement = "select";

      /*
      */


      SelectInputView.prototype.childTemplate = templates.fromSource("<option value='{{value}}'>{{label}}</option>", {
        engine: "handlebars"
      });

      /*
      */


      SelectInputView.prototype.selectLabel = "Select";

      /*
      */


      SelectInputView.prototype.itemLabel = "label";

      /*
      */


      SelectInputView.prototype.childViewClass = View;

      /*
      */


      SelectInputView.prototype.init = function() {
        SelectInputView.__super__.init.call(this);
        return this.children.addItemAt(new View({
          label: this.get("selectLabel")
        }, 0));
      };

      /*
      */


      SelectInputView.prototype._onAttached = function() {
        return SelectInputView.__super__._onAttached.call(this);
      };

      /*
      */


      SelectInputView.prototype._transformSelectItem = function(item, index) {
        console.log(item);
        return {
          value: index,
          label: dref.get(item, this.get("itemLabel"))
        };
      };

      /*
      */


      SelectInputView.prototype._createSource = function() {
        var source;
        source = SelectInputView.__super__._createSource.call(this);
        source.transform(this._transformSelectItem);
        return source;
      };

      return SelectInputView;

    })(ListView);
  });

}).call(this);
