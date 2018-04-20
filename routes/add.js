const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const router = express.Router();

var db = require('../db/db.js');


//lisää tarjous-sivu
router.get('/', function(req, res){
      res.render('add_offer', {
        title: 'Add offer'
      });
});
//lisää tarjous tietokantaan
router.post('/', function(req, res){
  let tarjous = {OfferName: req.body.Name, Description: req.body.Description, Quantity: req.body.Quantity, Discount: req.body.Discount/100, OriginalPrice: req.body.OriginalPrice, CategoryID: req.body.CategoryID};
  let sql = "INSERT INTO offers SET ?";
  let query = db.query(sql, tarjous, (err, result)=>{
    if(err) throw err;
  });
  res.redirect('/add');
});
module.exports = router;
