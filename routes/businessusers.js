const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
const path = require('path');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
var db = require('../db/db.js');

//kaikki tajoukset
router.get('/',ensureAuthenticated ,(req, res) => {
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
router.get('/:OfferID',ensureAuthenticated , function(req, res){
  let sql = `SELECT * FROM offers WHERE OfferID =${req.params.OfferID}`;
  db.query(sql, function(err, offer){
      if(err) console.log(err);
      res.render('offer',{
      offer: offer
    });
  });
});

//lisää tarjous tietokantaan
router.post('/add', function(req, res){

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
  res.redirect('/offers');
});

//muokkaa tarjousta
var ID;
router.get('/edit/:OfferID', ensureAuthenticated, function(req, res){
  ID = req.params.OfferID;
  let sql = `SELECT * FROM offers WHERE OfferID =${req.params.OfferID}`;
  db.query(sql, function(err, offer){
      if(err) console.log(err);
      res.render('edit_offer',{
      title: 'Edit offer',
      offer: offer
    });
  });
});
router.post('/edit/:OfferID', function(req, res){
  let newOfferName = req.body.Name;
  let newQuantity = req.body.Quantity;
  let newDiscount = req.body.Discount;
  let newOriginalPrice = req.body.OriginalPrice;
  let newCategoryID = req.body.CategoryID;
  let newDescription = req.body.Description;

  let offerid = ID;
  let sql = `UPDATE offers SET OfferName = '${newOfferName}' , Quantity ='${newQuantity}' , Discount = '${newDiscount}', OriginalPrice ='${newOriginalPrice}' , CategoryID='${newCategoryID}', Description= '${newDescription}' WHERE OfferID ='${offerid}'`;
  db.query(sql, function(err, offer){
      if(err) throw err;
    });
    req.flash('success','Offer edited');
    res.redirect('/offers');
  });


//delete offer
router.post('/delete/:OfferID', function(req, res)
{
  let sql = `DELETE FROM offers WHERE OfferID = ${req.params.OfferID}`;
  db.query(sql,function(err, result){
    if(err) throw err;
    console.log(result);
  });
  res.redirect('/offers');
});

// Access Control
function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/');
  }
}
module.exports = router;
