var db = require("../models");

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    db.Users.findAll({}).then(allUsers => res.json(allUsers));
  });

  // Create a new user
  app.post("/api/newuser", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var gender = req.body.gender;
    var age = req.body.age;
    var location = req.body.location;

    db.Users.create({
      username: username,
      password: password,
      name: name,
      gender: gender,
      age: age,
      location: location
    }).then(newUser => res.json(newUser));
  });

  // Delete a user by id
  app.delete("/api/deleteuser/:id", function(req, res) {
    var userID = req.params.id;
    db.Users.destroy({ where: { id: userID } }).then(deletedUser =>
      res.json(deletedUser)
    );
  });
};
