var passport = require('passport');
var userOAuth = require('./models/UserOAuth')

// id,secret Auth Google 
const GOOGLE_CLIENT_ID  = "930741750777-mifbeaovgnacdg4tcifjpbffanbf397j.apps.googleusercontent.com" ;
const GOOGLE_CLIENT_SECRET = "FitY9SPkCSlmpsQATbTUjtqZ";
// id,secret Auth Facebook
const FACEBOOK_APP_ID = "1147864679042927";
const FACEBOOK_APP_SECRET="d764e9cdac5cdd1d5759dfd5b6b6b127";

var GoogleStrategy = require('passport-google-oauth20').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
    done(null, user);
});


passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    try{
      userOAuth.findOne({ oAuthId: profile.id },function(err,user){
        if(err){
          return done(err);
        }

        if(!user){
          user = new userOAuth({
            oAuthId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            provider: 'google',
          })

          user.save(function(err, user){
            if(err){
              return console.log(err);
            }
            return done(err, user);
          })
        }else{
          return done(null, user);
        }
      })
    }catch(error){
      console.log(error);
    }
  }
));


passport.use(new FacebookStrategy({
  clientID: FACEBOOK_APP_ID,
  clientSecret: FACEBOOK_APP_SECRET,
  callbackURL: "http://localhost:3000/api/facebook/callback"
},
function(accessToken, refreshToken, profile, done) {
  try{
    userOAuth.findOne({ oAuthId: profile.id },function(err,user){
      if(err){
        return done(err);
      }
      if(!user){

        user = new userOAuth({
          oAuthId: profile.id,
          name: profile.displayName,
          email: profile.email,
          provider: profile.provider,
        })

        user.save(function(err, user){
          if(err){
            return console.log(err);
          }
          return done(err, user);
        })
      }else{
        return done(null, user);
      }
    })
  }catch(error){
    console.log(error);
  }
}
));