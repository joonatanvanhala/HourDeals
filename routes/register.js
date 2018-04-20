const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const expressValidator = require('express-validator');
const router = express.Router();
const flash = require('connect-flash');
const passport = require('passport');
const bcrypt = require('bcryptjs');

var db = require('../db/db.js');

//rekisteröidy-sivu
router.get('/', function(req, res){
  res.render('register');
});
router.post('/', function(req, res){
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
    res.render('register', {
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
            res.redirect('/login');
          }
        });
      });
    });
  }
  });
module.exports = router;
