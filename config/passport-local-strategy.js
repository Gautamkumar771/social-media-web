const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const User = require('../models/user');


// //authentication using passport
// passport.use(new LocalStrategy({
//     usernameField: 'email',
//     passReqToCallback: true
// },
// function(req, email, password, done){
//     //find a user and establish the identity
//     User.findOne({email: email}, function(err, user){
//         if(err){
//             req.flash('error', err);
//             return done(err);
//         }

//         if(!user || user.password != password){
//             req.flash('error','invalid Username/password');
//         }
//         return done(null, user);
//     });
// }
// ));


passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          // Find a user and establish the identity
          const user = await User.findOne({ email: email });
  
          if (!user || user.password !== password) {
            req.flash('error', 'Invalid Username/password');
            return done(null, false); // Authentication failed
          }
  
          return done(null, user); // Authentication succeeded
        } catch (err) {
          req.flash('error', err.message);
          return done(err);
        }
      }
    )
  );


//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    done(null, user.id);
});


passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      if (!user) {
        console.log('User not found');
        return done(null, false);
      }
  
      return done(null, user);
    } catch (err) {
      console.log('Error in finding user --> passport', err);
      return done(err);
    }
  });


//deserialzing the user from the key in the cookies
// passport.deserializeUser(function(id, done){
//     User.findById(id, function(err, user){
// if(err){
//     console.log('Error in finding user --> passport');
//             return done(err);
// }

// return done(null, user);
//     });
// });


//check if the user is authenticated
passport.checkAuthentication = function(req, res, next){
    //if the user is signed in, then pass on the request to the next functional(controller action)
if(req.isAuthenticated()){
    return  next();
}

// if the user is not signed in 
return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
        //req.user contain the curerent  signed in user from the session cookies and we send this to the local
        res.locals.user = req.user;
    }

   return next();
}

module.exports = passport;
