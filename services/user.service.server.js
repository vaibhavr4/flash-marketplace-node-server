module.exports = function (app) {
  app.get('/api/users', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/user', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
    app.post('/api/register', register);
    app.put('/api/user', updateUser);
    app.delete('/api/user/:userId', deleteUserById);

  var userModel = require('../models/user/user.model.server');
    var adModel = require('../models/ad/ad.model.server');

    function register(req, res) {
        var credentials = req.body;
        userModel
            .findUserByCredentials(credentials)
            .then(function(user) {
                req.session['currentUser'] = user;
                res.json(user);
            })
    }

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        req.session['currentUser'] = user;
       if(user==null)
           res.status(500).send({ user: "Invalid User" });
        else
          console.log("FROM SERVER:"+user.username);
          res.send(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function deleteUserById(req,res)
  {
      var id = req.params['userId'];
        adModel.deleteAdForUser(id);
        userModel.deleteUserById(id)
            .then(function(users)
            {
                res.json(users);
            })
  }

  function profile(req, res) {
      if(typeof req.session.currentUser === 'undefined')
      {
          res.send(null);
      }

      else {
          var userId = req.session.currentUser._id;

          userModel.findUserById(userId)
              .then(function (user) {
                  res.send(user);
              })
      }
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

    function updateUser(req, res) {
        var user = req.body;
        return userModel.updateUser(user)
            .then(function () {
                req.session['currentUser'] = user;
                res.json(user);
            });
    }
}
