var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Users.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  app.get("/browse/categories/:categoriename", function (req, res) {
    var categoriename = req.params.categoriename

  });

  app.get("/user/", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(
      users
    ) {
      res.render("example", {
        username: username
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/user/", function(req, res) {
    db.users.findOne({ where: { id: req.params.id } }).then(function(
      users
    ) {
      res.render("example", {
        username: username
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
