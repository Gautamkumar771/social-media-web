const passport = require('passport');
const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;// extract from header

const User = require('../models/user');

let opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'codeial'
}



passport.use(new JWTStrategy(opts, function(jwtPayLoad, done){
User.findByid(jwtPayLoad._id, function(err, user){
    if(err){console.log('Error in finding uder from JWT'); return;}

    if(user){
        return done(null, user);
    }else{
        return done(null, false);
    }

})
}))

module.exports = passport;