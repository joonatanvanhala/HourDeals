const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
var db = require('../db/db.js');
//kaikki tajoukset
router.get('/', (req, res) => {
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
router.get('/:OfferID', function(req, res){
  let sql = `SELECT * FROM offers WHERE OfferID =${req.params.OfferID}`;
  db.query(sql, function(err, offer){
      if(err) console.log(err);
      res.render('offer',{
      offer: offer
    });
  });
});
module.exports = router;
