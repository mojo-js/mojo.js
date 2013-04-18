// Generated by CoffeeScript 1.6.2
(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  define(["dojo-bootstrap/lib/views/base", "../core/templates", "bindable"], function(View, templates, bindable) {
    /*
    */

    var PersonView, _ref, _ref1;

    PersonView = (function(_super) {
      __extends(PersonView, _super);

      function PersonView() {
        _ref = PersonView.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      PersonView.prototype.template = templates.helloWorld.person;

      PersonView.prototype.events = {
        "click .remove": "_remove"
      };

      PersonView.prototype.init = function() {
        return PersonView.__super__.init.call(this);
      };

      PersonView.prototype._remove = function() {
        return this.emit("removePerson", this.get("_id"));
      };

      return PersonView;

    })(View);
    /*
    */

    return (function(_super) {
      __extends(_Class, _super);

      function _Class() {
        _ref1 = _Class.__super__.constructor.apply(this, arguments);
        return _ref1;
      }

      _Class.prototype.template = templates.helloWorld.index;

      _Class.prototype.events = {
        "keyup #enter-name": function(event) {
          console.log($(event.target).val());
          if (event.keyCode !== 13) {
            return;
          }
          this._addPerson($(event.target).val());
          return $(event.target).val("");
        },
        "removePerson": "_removePerson"
      };

      _Class.prototype.list = {
        "#people": {
          source: "people",
          itemViewClass: PersonView,
          itemTagName: "div"
        }
      };

      _Class.prototype.init = function() {
        _Class.__super__.init.call(this);
        return this.people = this.funkyStuff = new bindable.Collection();
      };

      _Class.prototype._addPerson = function(name) {
        return this.people.push({
          _id: name,
          name: name
        });
      };

      _Class.prototype._removePerson = function(event, _id) {
        var i;

        i = this.people.indexOf({
          _id: _id
        });
        return this.people.splice(i, 1);
      };

      return _Class;

    })(View);
  });

}).call(this);