var expect = require("expect.js"),
mojo       = require("../..");


describe("core/inherit#", function () {

  var app = new mojo.Application();
  app.registerViewClass("basic", mojo.View);

  /**
   */

  it("can inherit a property from a parent", function () {
    var p = app.createView("basic", { message: "hello!" }),
    c     = app.createView("basic");

    p.setChild("child", c);
    expect(c.message).to.be(undefined);
    expect(c.get("message")).to.be("hello!"); // trigget
    expect(c.message).to.be("hello!");
  });

  /** 
   */

  it("remains bound to the parent property", function () {
    var p = app.createView("basic", { message: "hello!" }),
    c     = app.createView("basic");

    p.setChild("child", c);
    expect(c.get("message")).to.be("hello!");
    p.set("message", "blah!");
    expect(c.get("message")).to.be("blah!");
  });

  /**
   */

  it("can break inheritance by setting a property", function () {
    var p = app.createView("basic", { message: "hello!" }),
    c     = app.createView("basic");

    p.setChild("child", c);
    expect(c.get("message")).to.be("hello!");
    c.set("message", "nah!");
    p.set("message", "blah!");
    expect(c.get("message")).to.be("nah!");
  });

  /**
   */

  it("can inherit an object", function () {
    var p = app.createView("basic", { city: { zip: 99999 } }),
    c     = app.createView("basic");
    p.setChild("child", c);
    expect(c.get("city.zip")).to.be(99999);
  })

  /**
   */

  it("inherits a property by calling set", function () {
    var p = app.createView("basic", { city: { zip: 99999 } }),
    c     = app.createView("basic");
    p.setChild("child", c);
    c.set("city.name", "San Francisco");
    expect(c.get("city.zip")).to.be(99999);
    expect(c.get("city.name")).to.be("San Francisco");
    expect(p.get("city.name")).to.be("San Francisco");
  });

  /**
   */

  it("doesn't inherit on set() if no dot", function (next) {

    var p = app.createView("basic", { message: "hello!" }),
    c     = app.createView("basic");
    p.setChild("child", c);

    // _inherit() on set() - this gets triggered
    c.bind("message").once().to(function (v) {
      expect(v).to.be("ha!");
      next();
    });

    c.set("message", "ha!");
  })

  /**
   */

  it("doesn't inherit a propertly if defined", function () {
    var p = app.createView("basic", { message: "hello!" }),
    c     = app.createView("basic");

    c._define("message");

    p.setChild("child", c);

    expect(c.get("message")).to.be(undefined);
  });

  /**
   */

  it("can change inheritance if the parent changes", function () {
    var p = app.createView("basic", { message: "hello!" }),
    p2    = app.createView("basic", { message: "yellow!" }),
    c     = app.createView("basic");

    p.setChild("child", c);
    expect(c.get("message")).to.be("hello!");

    p2.setChild("child", c);

    // should be automatic
    expect(c.message).to.be("yellow!");
    p.set("message", "ahh!");
    expect(c.message).to.be("yellow!");
    expect(c.get("message")).to.be("yellow!");


    c.set("message", "blahh");
    p2.set("message", "nahh!");
    expect(c.message).to.be("blahh");

  });

}); 