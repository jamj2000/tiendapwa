const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const config = require('./config.js');

const router = express.Router();

router.get('/google',
    passport.authenticate('google', {
        scope: ['profile'] // Used to specify the required data
    }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google'
    }));



router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/google',
    passport.authenticate('google'));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google'
    }));

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/auth/facebook'
    }));


router.get('/linkedin',
    passport.authenticate('linkedin'));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/perfil',
        failureRedirect: '/auth/linkedin'
    }));


router.get('/pinterest',
    passport.authenticate('pinterest'));

router.get('/pinterest/callback',
    passport.authenticate('pinterest', {
        successRedirect: '/perfil',
        failureRedirect: '/auth/pinterest'
    }));

router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/perfil',
        failureRedirect: '/auth/github'
    }));

    
    
// Logout route
router.get('/logout', (req, res) => {
    req.session.destroy(function() {
        res.clearCookie('connect.sid', { path: '/' }); 
        res.send('OK', 200); // tell the client everything went well
    });
    // req.logout();
    // res.redirect('/');
});


// router.get((req, res) => res.status(404).send('Página no encontrada'));
module.exports = router;