var db = require("../models");
var bodyParser = require("body-parser");
var cors = require("cors");
var bcrypt = require("bcrypt");
var request = require("request");


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
    }):
  });

  // UPDATE USER LOCATION
  app.post("/api/updatelocation", function (req, res) {

  })
  // DISCOUNT API CALL
  app.get("/api/discountcall/:location/", (req, res) => {
    var location = req.params.location
    var options = {
      method: 'GET',
      url: 'https://api.discountapi.com/v2/deals',
      qs: { aumtHLbj: '' },
      headers:
      {
        'Postman-Token': 'b69a018b-d5d1-45c7-b64c-015bce77f964',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json',
        'location': location
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body)
    })
  })


  // EVENTBRITE API CALL
  app.get("/api/eventbritecall/:location", (req, res) => {
    var location = req.params.location;

    var options = {
      method: 'GET',
      url: 'https://www.eventbriteapi.com/v3/events/search',
      qs: { token: 'JWFTSNNP5W6H4IMYUNR2', 'location.address': `${location}` },
      headers:
      {
        'Postman-Token': '0714d847-7fc2-4f0c-aafb-77e5238cfd1e',
        'cache-control': 'no-cache',
        'Content-Type': 'application/json'
      }
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      res.send(body)
  })

  // Delete a user by id
  app.delete("/api/deleteuser/:id", function (req, res) {
    var userID = req.params.id;
    db.Users.destroy({ where: { id: userID } }).then(deletedUser =>
      res.json(deletedUser)
    );
  });
};
