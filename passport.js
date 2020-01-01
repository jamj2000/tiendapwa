require ('dotenv').config();
const config = require('./config.js');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const PinterestStrategy = require('passport-pinterest').Strategy;
const GithubStrategy = require('passport-github').Strategy;


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// GOOGLE
// https://console.developers.google.com/
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENTID_GOOGLE,
    clientSecret:  process.env.CLIENTSECRET_GOOGLE,
    callbackURL: `https://tiendapwa.herokuapp.com/auth/google/callback`
},
    (accessToken, refreshToken, profile, done) =>  done(null, profile)
));


// FACEBOOK
// https://developers.facebook.com/
passport.use(new FacebookStrategy({
    clientID: process.env.CLIENTID_FACEBOOK,
    clientSecret: process.env.CLIENTSECRET_FACEBOOK,
    callbackURL: `https://tiendapwa.herokuapp.com/auth/facebook/callback`
},
    (accessToken, refreshToken, profile, done) => done(null, profile)
));


// LINKEDIN
// https://www.linkedin.com/developers/
passport.use(new LinkedinStrategy({
    clientID: process.env.CLIENTID_LINKEDIN,
    clientSecret: process.env.CLIENTSECRET_LINKEDIN,
    callbackURL: `https://${config.url}/auth/linkedin/callback`,
    scope: ['r_emailaddress', 'r_liteprofile'],
    state: true
},
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            done(null, profile); // passes the profile data to serializeUser
        });
    }
));

// PINTEREST
passport.use(new PinterestStrategy({
    clientID: process.env.CLIENTID_PINTEREST,
    clientSecret: process.env.CLIENTSECRET_PINTEREST,
    callbackURL: `https://${config.url}/auth/pinterest/callback`,
    scope: ['read_public', 'read_relationships'],
    state: true
},
    (accessToken, refreshToken, profile, done) => {
        process.nextTick(function () {
            done(null, profile); // passes the profile data to serializeUser
        });
    }
));

// GITHUB INTERNET
// https://github.com/settings/applications/new
passport.use(new GithubStrategy({
    clientID: process.env.CLIENTID_GITHUB,
    clientSecret: process.env.CLIENTSECRET_GITHUB,
    callbackURL: `https://${config.url}/auth/github/callback`
},
    (accessToken, refreshToken, profile, done) =>  done(null, profile)
));

