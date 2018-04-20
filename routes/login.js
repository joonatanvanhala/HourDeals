const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const router = express.Router();
var db = require('../db/db.js');

router.get('/', function(req, res){
  res.render('login');
});
module.exports = router;
