var db = require("../models");
var bodyParser = require("body-parser");
var cors = require("cors");
var bcrypt = require("bcrypt");


module.exports = function (app) {

  // Get all users
  app.get("/api/users", function (req, res) {
    db.Users.findAll({}).then(allUsers => res.json(allUsers));
  });

  // REGISTER
  app.post("/api/register", function (req, res) {

    var createUser = {
      username: req.body.username,
      password: req.body.password,
      name: req.body.name,
      gender: req.body.gender,
      age: req.body.age,
      location: req.body.location
    }

    db.Users.findOne({
      where: {
        username: createUser.username
      }
    }).then(newUser => {
      if (!newUser) {
        var hash = bcrypt.hashSync(createUser.password, 10)
        createUser.password = hash
        db.Users.create(createUser).then(newUser => {
          res.send(newUser.dataValues)
        })
      } else {
        res.json({ error: 'Username already exists.' })
      }
    }
    )
      .catch(err => {
        res.send('error: ' + err)
      })
  });

  // LOGIN
  app.post("/api/login", function (req, res) {
    db.Users.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send(user.dataValues)
      } else {
        res.send("User does not exist.")
      }
    }).catch(err => {
      res.send('error: ' + err)
    })
  })

  // UPDATE USER PASSWORD
  app.post("/api/updatepassword", function (req, res) {

    var currentPassword = req.body.currentpassword
    var newpassword = req.body.newpassword;
    var hash = bcrypt.hashSync(newpassword, 10);
    newpassword = hash;
    var username = req.body.username;

    db.Users.findOne({ where: { username: req.body.username } }).then(currentUser => {
      if (bcrypt.compareSync(currentPassword, currentUser.password)) {
        db.Users.update({ password: newpassword }, { where: { username: currentUser.username } }).then()
      }
    })
  });

  // UPDATE USER LOCATION
  app.post("/api/updatelocation", function (req, res) {
    // grab new user location
    var newLocation = req.body.newlocation;
    // delete current user location


    // 
  })

  // Delete a user by id
  app.delete("/api/deleteuser/:id", function (req, res) {
    var userID = req.params.id;
    db.Users.destroy({ where: { id: userID } }).then(deletedUser =>
      res.json(deletedUser)
    );
  });
};
