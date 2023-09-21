const express = require('express');
const router = express.Router();

const usersConrtoller = require('../controllers/user_controller');
const passport = require('passport');

router.get('/profile/:id',passport.checkAuthentication, usersConrtoller.profile);
router.post('/update/:id',passport.checkAuthentication, usersConrtoller.update);


router.get('/sign-up', usersConrtoller.signUp);

router.get('/sign-in', usersConrtoller.signIn);


router.post('/create', usersConrtoller.create);

//use pasport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local', 
    {failureRedirect: '/users/sign-in'},
) , usersConrtoller.createSession );


router.get('/sign-out', usersConrtoller.destroySession);

// app.post('sign-outout', function(req, res, next){
//     req.logout(function(err) {
//       if (err) { return next(err); }
//       res.redirect('/');
//     });
//   });


router.get('/auth/google', passport.authenticate('google', {scope: ['profile','email']}));
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/users/sign-in'}), usersConrtoller.createSession);



module.exports = router;