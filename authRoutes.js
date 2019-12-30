const express = require('express');
const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const config = require('./config.js');

const router = express.Router();



router.get('/login', (req, res) => {
    res.render('login.ejs');
});

router.get('/facebook',
    passport.authenticate('facebook'));

router.get('/facebook/callback',
    passport.authenticate('facebook', {
        successRedirect: '/',
        failureRedirect: '/auth/facebook'
    }));


router.get('/google',
    passport.authenticate('google', {
        scope: ['profile'] // Used to specify the required data
    }));

router.get('/google/callback',
    passport.authenticate('google', {
        successRedirect: '/',
        failureRedirect: '/auth/google'
    }));


router.get('/github',
    passport.authenticate('github'));

router.get('/github/callback',
    passport.authenticate('github', {
        successRedirect: '/',
        failureRedirect: '/auth/github'
    }));


router.get('/linkedin',
    passport.authenticate('linkedin'));

router.get('/linkedin/callback',
    passport.authenticate('linkedin', {
        successRedirect: '/',
        failureRedirect: '/auth/linkedin'
    }));


router.get('/pinterest',
    passport.authenticate('pinterest'));

router.get('/pinterest/callback',
    passport.authenticate('pinterest', {
        successRedirect: '/',
        failureRedirect: '/auth/pinterest'
    }));

router.get('/auth/tumblr',
    passport.authenticate('tumblr'));

router.get('/auth/tumblr/callback',
    passport.authenticate('tumblr', {
        successRedirect: '/',
        failureRedirect: '/auth/tumbr'
    }));

// router.get('/instagram',
//     passport.authenticate('instagram'));

// router.get('/instagram/callback',
//     passport.authenticate('instagram', {
//         successRedirect: '/',
//         failureRedirect: '/auth/instagram'
//     }));


// Logout route
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});


router.get( (req,res) => res.status(404).send('Página no encontrada'));
module.exports = router;