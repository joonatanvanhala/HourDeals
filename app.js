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
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));
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
// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

app.get('*', function(req, res, next){
  res.locals.user = req.user || null;
  next();
});

//Bring in routes
let frontpage = require('./routes/frontpage');
let businessusers = require('./routes/businessusers');
app.use('/', frontpage);
app.use('/businessusers', businessusers);

//start server
app.listen(3000, function(req, res){
  console.log('Server started on port 3000');
});
