const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const session = require('express-session');
const expressValidator = require('express-validator');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const passport = require('passport');
const bcrypt = require('bcryptjs');

//create connection to mysql
var db = require('./db/db.js');
//init app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//express session Middleware
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});
// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

// Home Route
app.get('/', function(req, res){
      res.render('frontpage', {
        title: 'Hourdeals frontpage'
      });
});
//kaikki tajoukset
app.get('/offers', (req, res) => {
  let sql = "SELECT * FROM offers";
    db.query(sql, (err, results) => {
        if(err) throw err;
        else {
          res.render('offers',{
            offer: results
          });
        }
    });
});
//klikattu tarjous
app.get('/offers/:OfferID', function(req, res){
  let sql = `SELECT * FROM offers WHERE OfferID =${req.params.OfferID}`;
  db.query(sql, function(err, offer){
      if(err) console.log(err);
      res.render('offer',{
      offer: offer
    });
  });
});
//lisää tarjous-sivu
app.get('/add', function(req, res){
      res.render('add_offer', {
        title: 'Add offer'
      });
});
//lisää tarjous tietokantaan
app.post('/add', function(req, res){
  let tarjous = {OfferName: req.body.Name, Description: req.body.Description, Quantity: req.body.Quantity, Discount: req.body.Discount/100, OriginalPrice: req.body.OriginalPrice, CategoryID: req.body.CategoryID, CompanyID: req.body.CompanyID };
  let sql = "INSERT INTO offers SET ?";
  let query = db.query(sql, tarjous, (err, result)=>{
    if(err) throw err;
  });
  res.redirect('/add');
});

//rekisteröidy-sivu
app.get('/register', function(req, res){
  res.render('register');
});
app.post('/register', function(req, res){
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
//Login page
app.get('/Login', function(req, res){
  res.render('login');
});
//start server
app.listen(3000, function(req, res){
  console.log('Server started on port 3000');
});
