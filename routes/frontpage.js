const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
const passport = require('passport');
const bcrypt = require('bcryptjs');
const expressValidator = require('express-validator');
const session = require('express-session');
const path = require('path');
const flash = require('connect-flash');

var db = require('../db/db.js');

// Home Route
router.get('/', function(req, res){
      res.render('frontpage', {
        title: 'Hourdeals frontpage'
      });
});
router.post('/frontpage/register', function(req, res){
  const companyname = req.body.companyname;
  const city = req.body.city;
  const address = req.body.address;
  const postcode = req.body.postcode;
  const password = req.body.password;
  const password2 = req.body.password2;

  req.checkBody('companyname', 'Company name is required').notEmpty();
  req.checkBody('city', 'City is required').notEmpty();
  req.checkBody('address', 'Address is required').notEmpty();
  req.checkBody('postcode', 'Postal code is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);
  let errors = req.validationErrors();

  if(errors){
    res.render('frontpage', {
      errors:errors
    });
  }
  else{
    bcrypt.genSalt(10, function(err, salt){
      let user = {CompanyName: companyname, City: city, Address: address, PostCode: postcode, CompanyPassword: password};
      let sql = "INSERT INTO businessusers SET ?";
      bcrypt.hash(user.password, salt, function(err, hash){
        if(err){
          console.log(err);
        }
        let query = db.query(sql, user, (err, result)=>{
          if(err) throw err;
        else {
            req.flash('success','Register succeeded, please log in')
            res.redirect('/');
          }
        });
      });
    });
  }
  });

  // Login Process
  router.post('/frontpage/login', function(req, res, next){
    passport.authenticate('local', {
      successRedirect:'/businessusers',
      failureRedirect:'/',
      failureFlash: true
    })(req, res, next);
  });
  // logout
  router.get('/frontpage/businessusers/logout', function(req, res){
    req.logout();
    console.log('Logged out');
    req.flash('success', 'You are logged out');
    res.redirect('/');
  });

module.exports = router;
