const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mysql = require('mysql');

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'hourdeals'
});

//connect
db.connect(function(err){
  if(err){
    throw err;
  }
  else {
    console.log('mysql connected');
  }
});
module.exports = db;
