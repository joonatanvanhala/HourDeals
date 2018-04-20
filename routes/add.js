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

  const Name = req.body.Name;
  const Description = req.body.Description;
  const Quantity = req.body.Quantity;
  const Discount = req.body.Discount;
  const OriginalPrice = req.body.OriginalPrice;
  const CategoryID = req.body.CategoryID;

  req.checkBody('Name', 'Offer title is required').notEmpty();
  req.checkBody('Description', 'Description is required').notEmpty();
  req.checkBody('Quantity', 'Quantity is required').notEmpty();
  req.checkBody('Discount', 'Discount is required').notEmpty();
  req.checkBody('OriginalPrice', 'Original price is required').notEmpty();
  req.checkBody('CategoryID', 'Category is required').notEmpty();

  let errors = req.validationErrors();
  if(errors)
  {
    res.render('./add_offer', {
      errors:errors
    });
  }
  else
  {
    let tarjous = {OfferName: req.body.Name, Description: req.body.Description, Quantity: req.body.Quantity, Discount: req.body.Discount/100, OriginalPrice: req.body.OriginalPrice, CategoryID: req.body.CategoryID};
    let sql = "INSERT INTO offers SET ?";
    let query = db.query(sql, tarjous, (err, result)=>{
      if(err) {
        throw err;
      }
    });
  }
  res.redirect('/add');
});
module.exports = router;
