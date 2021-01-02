var express = require('express');
var router = express.Router();
const mysql = require('mysql2');
var models = require('../models');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
  
router.get('/signup', function(req, res, next) {
  res.render('signup');
});
  
router.post('/signup', function(req, res, next) {
  models.employees.
  findOrCreate({
      where: {
        UserName: req.body.UserName
      },
      defaults: {
        FirstName: req.body.FirstName,
        LastName: req.body.LastName,
        Email: req.body.Email,
        Password: req.body.Password
      }
    })
    .spread(function(result, created) {
      if (created) {
        res.redirect('login');  //<---Change this line to redirect to the login screen
      } else {
        res.send('This employee already exists');
      }
    });
});

router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function(req, res, next) {
  models.users
    .findOne({
      where: {
        Username: req.body.username,
        Password: req.body.password
      }
    })
    .then(user => {
      if (user) {
        res.send('Login succeeded!');
      } else {
        res.send('Invalid login!');
      }
    });
});
  
router.get('/profile/:id', function (req, res, next) {
  models.employees
    .findByPk(parseInt(req.params.id))
    .then(employees => {
      if (employees) {
        res.render('profile', {
          FirstName: user.FirstName,
          LastName: user.LastName,
          Email: user.Email,
          UserName: user.UserName
        });
      } else {
        res.send('Employee not found');
      }
    });
});

router.post('/login', function(req, res, next) {
  models.employees
    .findOne({
      where: {
        UserName: req.body.UserName,
        Password: req.body.Password
      }
    })
    .then(employees => {
      if (employees) {
        res.redirect('profile/' + employee.UserId); //<---Change this line to redirect to the profile
      } else {
        res.send('Invalid login!');
      }
    });
});

module.exports = router;

