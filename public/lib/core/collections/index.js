// Generated by CoffeeScript 1.4.0
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["bindable", "dref"], function(bindable, dref) {
    var Collection;
    return Collection = (function(_super) {

      __extends(Collection, _super);

      /*
      */


      function Collection(source) {
        if (source == null) {
          source = [];
        }
        this.transform().map(function(item) {
          if (dref.get(item, "_id") === void 0) {
            console.error(item.get("_id"));
            throw new Error("item must have an ID");
          }
          return item;
        });
        Collection.__super__.constructor.call(this, source);
        this.indexer(function(source, item) {
          var i, _i, _id, _ref;
          _id = dref.get(item, "_id");
          for (i = _i = 0, _ref = source.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
            if (dref.get(source[i], "_id") === _id) {
              return i;
            }
          }
          return -1;
        });
      }

      return Collection;

    })(bindable.Collection);
  });

}).call(this);