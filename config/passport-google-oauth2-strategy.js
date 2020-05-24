const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;

const crypto = require('crypto');
const User = require('../models/user');

//tell passport to use a new strategy for google login

passport.use(new googleStrategy({
  
  clientID: "159667026561-tcn7or0ltcj753naed6e7tlo1qa0607e.apps.googleusercontent.com",
  clientSecret: "-vZxwnjSm3Q_BeZhQqbhGb-t",
  callbackURL : "http://localhost:8000/users/auth/google/callback"
},
function(accessToken,refreshToken, profile,done)
{
  
  //find a user
   User.findOne({email: profile.emails[0].value}).exec(function(err,user){

     if(err)
     {
       console.log('error in google strategy passport',err);
       return;
     }
     console.log(accessToken, refreshToken);
     console.log(profile);

     //if user found set this user as req.user 
     if(user)
     {
       return done(null,user);  
     
     }else{  //if not found,create the user & set it as a req.user (means sign-in that user)

        User.create({
          
          name: profile.displayName,
          email: profile.emails[0].value,
          password: crypto.randomBytes(20).toString('hex')
        },function(err,user){
          
           if(err)
           {
             console.log('error in creating user google strategy passport',err);
             return;  
           }

           else{
               return done(null,user);
           }
        })
       }
    })  
  }
)); 

module.exports = passport;