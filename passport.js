const config = require('./config.js');

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const PinterestStrategy = require('passport-pinterest').Strategy;
const GithubStrategy = require('passport-github').Strategy;


passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// FACEBOOK
// https://developers.facebook.com/
passport.use(new FacebookStrategy({
    clientID: '468818343833029',
    clientSecret: 'cf1f07cbe85af8a9c83aa01021715c56',
    callbackURL: `https://${config.url}/auth/facebook/callback`
},
    (accessToken, refreshToken, profile, done) => done(null, profile)
));

// GOOGLE
// https://console.developers.google.com/
passport.use(new GoogleStrategy({
    clientID: '1087953600624-hbgsir1rrv7i9pim5q8ogdar94sni6o5.apps.googleusercontent.com',
    clientSecret: 'hf68TsjIBhiPCmKuTK4gbNv1',
    callbackURL: `https://${config.url}/auth/google/callback`
},
    (accessToken, refreshToken, profile, done) => {
        done(null, profile); // passes the profile data to serializeUser
    }
));

// LINKEDIN
// https://www.linkedin.com/developers/
passport.use(new LinkedinStrategy({
    clientID: '86f1ethpsdabjd',
    clientSecret: 'bQccU9xmSaOY0YxK',
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
    clientID: '5074457384024320231',
    clientSecret: '3bec65dddc6760f239398826af7e87419012692671f719683e5849f5229f5e96',
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
// Diferentes clientID y clientSecret para localhost e internet
// Estos clientID y clientSecret son para internet
passport.use(new GithubStrategy({
    clientID: 'f5c3c21945a408bff554',
    clientSecret: '6508766f38c30ab6cbd249367f68f9c696cc3ad4',
    callbackURL: `https://${config.url}/auth/github/callback`
},
    (accessToken, refreshToken, profile, done) =>  done(null, profile)
));

// GITHUB LOCAL
// passport.use(new GithubStrategy({
//     clientID: '84a2eaae5fe0620eb756',
//     clientSecret: 'b15662f132ccd2590b59cb186a690c6076b51488',
//     callbackURL: `https://${config.url}/auth/github/callback`
// },
//     (accessToken, refreshToken, profile, done) =>  done(null, profile)
// ));