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

  app.get("/users/", function(req, res) {
    db.project2.findAll({
      attributes: ['username', 'name']
    }).then(function(project2) {
      res.render("users", {
        username: username,
        name: name
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    db.Users.findOne({
      attributes: ['username', 'location', 'name']
    }).then(function(Users) {
      res.render("users", {
        username: username
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
