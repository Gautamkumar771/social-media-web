// const passport = require('passport');
// const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
// const crypto = require('crypto');
// const User = require('../models/user');


// // tell passport to use a new strategy for google login 
// passport.use(new googleStrategy({
//     clientID: "364265677252-5cdv5pqo8dtn941d1enu4dg7avtpmh90.apps.googleusercontent.com",
// clientSecret: "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",
// callbackURL: "http://localhost:8000/users/auth/google/callback"
// }))

// function (accessToken, refreshToken, profile, done){
//     //find userr
//     User.findOne({email: profile.emails[0].value}).exec(function(err, user){
//         if(err){console.log('error in google strategy-passport', err); return;}
        
//         console.log(profile);

//         if(user){
//             // if found , set this user as req.user
//             return done (null, user);
//         }else{
//             // if not found,  create the user and set itas req.user
//             User.create({
//                 name: profile.displayName,
//                 email: profile.emails[0].value,
//                 password: crypto.randomBytes(20).toString('hex')
//             }, function(err, user){
//                 if(err){console.log('error in creating user google strategy-passport', err); return;}
//             return done(null, user);
//             })
//         }
//     })
// }

const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user'); // Replace with your user model import

passport.use(new googleStrategy({
    clientID: "364265677252-5cdv5pqo8dtn941d1enu4dg7avtpmh90.apps.googleusercontent.com", // Replace with your Google OAuth client ID
    clientSecret: "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", // Replace with your Google OAuth client secret
    callbackURL: "http://localhost:8000/users/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ email: profile.emails[0].value }, (err, user) => {
        if (err) {
            console.log('Error in Google strategy-passport', err);
            return done(err);
        }
        
        if (user) {
            return done(null, user);
        } else {
            User.create({
                name: profile.displayName,
                email: profile.emails[0].value,
                password: crypto.randomBytes(20).toString('hex')
}, (err, newUser) => {
                if (err) {
                    console.log('Error in creating user Google strategy-passport', err);
                    return done(err);
                }
                return done(null, newUser);
            });
        }
    });
}));

module.exports = passport;
