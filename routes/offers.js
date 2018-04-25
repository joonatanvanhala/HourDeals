const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();

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
    res.redirect('/login');
  }
}
module.exports = router;
