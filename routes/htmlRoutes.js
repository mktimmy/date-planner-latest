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
    var categoriename = req.params.categoriename;
  });

  app.get("/users/", function (req, res) {
    db.Users.findAll().then(function(allUsers) {
      // res.json(allUsers);
      res.render("users");
    });
  });

  // Load example page and pass in an example by id
  app.get("/users/:id", function(req, res) {
    var userID = req.params.id;
    db.Users.findOne({where: {id: userID }}).then(function(Users) {
      // res.json(Users);
      res.render("users");
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};