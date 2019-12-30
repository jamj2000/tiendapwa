// Depedencias incorporadas en nodejs
const fs = require('fs')
const path = require('path');
const https = require('https');

// Dependencias a instalar 
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);
const mongoose = require('mongoose');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
const PinterestStrategy = require('passport-pinterest').Strategy;
const GithubStrategy = require('passport-github').Strategy;
const login = require('connect-ensure-login');


const app = express();

const config = require('./config');
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');

// // --- CONEXIÓN A BASE DATOS
mongoose.connect(config.db_uri, { useNewUrlParser: true })
  .then(db => console.log('Conexión correcta a la BD'))
  .catch(err => console.log('Error en la conexión a la BD'));

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname , 'public'))); // Archivos estáticos
// app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.json());                        // Content-type: application/json
app.use(express.urlencoded({ extended: true }));  // Content-type: application/x-www-form-urlencoded



app.use(cors());                // Permitimos CORS para todos los origenes 

app.use(session({
    store: new SQLiteStore,
    secret: 'your secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 7 * 24 * 60 * 60 * 1000 } // 1 week
}));

app.use(morgan('dev'));
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session());    // Used to persist login sessions


// Rutas
app.use('/api', apiRoutes);     // Rutas de API
app.use('/auth', authRoutes);   // Rutas de Autenticación


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

// GITHUB
// https://github.com/settings/applications/new
// Diferentes clientID y clientSecret para localhost e internet
// Estos clientID y clientSecret son para internet
passport.use(new GithubStrategy({
    clientID: 'f5c3c21945a408bff554',
    clientSecret: '6508766f38c30ab6cbd249367f68f9c696cc3ad4',
    callbackURL: `https://${config.url}/auth/github/callback`
},
    (accessToken, refreshToken, profile, done) => {
        done(null, profile); // passes the profile data to serializeUser
    }
));


// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.send('¡Debes iniciar sesión! <br><a href="/">Iniciar sesión</a>');
    }
}


// app.get('/', login.ensureLoggedIn('/auth/login'),
//     function (req, res) {
//         res.render('index.ejs', { user: req.user });
//     });


// // Secret route
app.get('/secret', isUserAuthenticated, (req, res) => {
    res.send('Estás viendo el contenido de la aplicación<br><br><a href="/">Volver a página de inicio</a>');
});

app.get('/perfil', isUserAuthenticated, (req, res) => {
    res.render('perfil', { user: req.user });
});


// app.get('/status', login.ensureLoggedIn('/auth/login'), statusMonitor.pageRoute);

// 404: No encontrado. Debe ser la última ruta
// app.get( (req,res) => res.status(404).sendFile('404.png'));


// Para redirigir trafico HTTP a HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https')
        res.redirect(`https://${req.header('host')}${req.url}`);
    else
        next();
});


if (!process.env.NODE_ENV) {
    // Para crear un certificado digital en la CLI:
    //  openssl req -nodes -new -x509 -keyout server.key -out server.cert
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(config.port, () => {
        console.log(`¡Servidor iniciado en ${config.port}! Ir a https://localhost:${config.port}/`)
    })
}
else {
    app.listen(config.port, () => {
        console.log('¡Servidor iniciado!');
    });
}

