// Generated by CoffeeScript 1.4.0
(function() {

  define(["dref"], function(dref) {
    var CollectionGlue;
    return CollectionGlue = (function() {
      /*
      */

      function CollectionGlue(from, to, context) {
        var tof;
        this.from = from;
        this.to = to;
        this.context = context;
        tof = typeof this.from;
        if (this.from instanceof Array) {
          this._glueArray();
        } else if (from.source) {
          this._glueCollection();
        } else if (tof === "string") {
          this._glueBindable();
        }
      }

      /*
      */


      CollectionGlue.prototype._glueArray = function() {
        return this.to.source(this.from);
      };

      /*
      */


      CollectionGlue.prototype._glueCollection = function() {
        var _this = this;
        this._listeners = this.from.on({
          "add": function(event) {
            return _this.to.addItemAt(event.item, event.index);
          },
          "remove": function(event) {
            return _this.to.removeItemById(dref.get(event.item, "_id"));
          },
          "reset": function(event) {
            var item, _i, _j, _len, _len1, _ref, _ref1, _results;
            _ref = event.oldSource;
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
              item = _ref[_i];
              _this.to.removeItemById(dref.get(item, "_id"));
            }
            _ref1 = event.source;
            _results = [];
            for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
              item = _ref1[_j];
              _results.push(_this.to.addItem(item));
            }
            return _results;
          }
        });
        return this.to.addItems(this.from.source());
      };

      /*
      */


      CollectionGlue.prototype._glueBindable = function() {
        var _this = this;
        return this.context.bind(this.from, function(source) {
          if (_this._prevGlue) {
            _this._prevGlue.dispose();
          }
          return _this.to.source(source);
        });
      };

      /*
      */


      CollectionGlue.prototype.bothWays = function() {
        throw new Error("collection.glue().bothWays() is not implemented yet");
      };

      /*
      */


      CollectionGlue.prototype.dispose = function() {
        if (!this._listeners) {
          return;
        }
        return this._listeners.dispose();
      };

      return CollectionGlue;

    })();
  });

}).call(this);
