const LocalStrategy = require('passport-local').Strategy;
const db = require('../db/db.js');
const bcrypt = require('bcryptjs');

module.exports = function(passport){
  var cname = '';
  // Local Strategy
  passport.use(new LocalStrategy(function(username, password, done){
    // Match Username
    let sql = 'SELECT * FROM businessusers WHERE UserName = ?';
     db.query(sql,[username], (err, user)=>{
      if(err) throw err;
      if(!user.length){
        return done(null, false, {message: 'No user found'});
      }
      // Match Password
      if(password == user[0].CompanyPassword)
      {
          cname = user[0].UserName;
          return done(null, user[0]);
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
    let sql2 = 'SELECT * FROM businessusers WHERE UserName = ?';
    db.query(sql2, cname, function(err, user){
      done(err, user);
    });
  });
};
