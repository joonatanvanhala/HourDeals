const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const mongoose = require('mongoose');

//create connection to mysql
var db = require('./db/db.js');
//init app
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//bodyParser
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
  res.redirect('/');
});

//start server
app.listen(3000, function(req, res){
  console.log('Server started on port 3000');
});
