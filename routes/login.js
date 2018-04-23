const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
var db = require('../db/db.js');
var passport = require('passport');

router.get('/', function(req, res){
  res.render('login');
});
// Login Process
router.post('/', function(req, res, next){
  passport.authenticate('local', {
    successRedirect:'/',
    failureRedirect:'/login',
    failureFlash: true
  })(req, res, next);
});

// logout
router.get('/logout', function(req, res){
  req.logout();
  req.flash('success', 'You are logged out');
  res.redirect('/login');
});
module.exports = router;
