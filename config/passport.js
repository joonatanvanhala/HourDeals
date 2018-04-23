const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/db.js');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let sql = 'SELECT * FROM businessusers WHERE CompanyName = ?';
    let query = db.query(sql,[username], (err, user)=>{
      if(err) throw err;
      if(!user){
        console.log("no user found");
        return done(null, false, {message: 'No user found'});
      }
      console.log(user[0]);
      // Match Password
      if(password == user[0].CompanyPassword)
      {
          console.log(password);
          console.log(user[0].CompanyPassword);
          console.log('match');
          return done(null, user[0].CompanyName);
        }
        else
        {
          return done(null, false, {message: 'Wrong password'});
        }
        });
      }));

  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    let sql2 = 'SELECT * FROM businessusers WHERE CompanyName = ?';
    db.query(sql2, user[0].CompanyName, function(err, user){
      done(err, user);
    });
  });
};
