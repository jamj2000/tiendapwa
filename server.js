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
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const FacebookStrategy = require('passport-facebook').Strategy;
// const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy;
// const PinterestStrategy = require('passport-pinterest').Strategy;
// const GithubStrategy = require('passport-github').Strategy;
const login = require('connect-ensure-login');


const app = express();

// Para redirigir trafico no local HTTP a HTTPS
app.use((req, res, next) => {
    if (req.header('x-forwarded-proto') !== 'https' && process.env.PORT)
        res.redirect('https://' + req.headers.host + req.url)
    else
        next();
});

const config = require('./config');
const apiRoutes = require('./apiRoutes');
const authRoutes = require('./authRoutes');

// // --- CONEXIÓN A BASE DATOS
mongoose.connect(config.db_uri, { useNewUrlParser: true })
    .then(db => console.log('Conexión correcta a la BD'))
    .catch(err => console.log('Error en la conexión a la BD'));


app.use(cors());                // Permitimos CORS para todos los origenes 
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


app.use(express.static(path.join(__dirname, 'public'))); // Archivos estáticos
app.use(express.json());                        // Content-type: application/json
app.use(express.urlencoded({ extended: true }));  // Content-type: application/x-www-form-urlencoded


app.use(session({
    store: new SQLiteStore,
    secret: 'your secret',
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true } // , maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
}));

app.use(morgan('dev'));
app.use(passport.initialize()); // Used to initialize passport
app.use(passport.session());    // Used to persist login sessions


// Rutas
app.use('/api', apiRoutes);     // Rutas de API
app.use('/auth', authRoutes);   // Rutas de Autenticación

require('./passport.js');

// Middleware to check if the user is authenticated
function isUserAuthenticated(req, res, next) {
    if (req.user) {
        next();
    } else {
        // res.render('login.ejs');
        res.send();
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

app.get('/logout', (req, res) => {
    res.render('logout', { user: req.user });
});

app.get('*', function (req, res) {
    // res.send('what???', 404);
    res.status(404).send('what???<br><a href="/">Inicio</a>');
});




// app.get('/status', login.ensureLoggedIn('/auth/login'), statusMonitor.pageRoute);

// 404: No encontrado. Debe ser la última ruta
// app.get( (req,res) => res.status(404).sendFile('404.png'));



if (!process.env.NODE_ENV) {
    // Para crear un certificado digital en la CLI:
    //  openssl req -nodes -new -x509 -keyout server.key -out server.cert
    https.createServer({
        key: fs.readFileSync('server.key'),
        cert: fs.readFileSync('server.cert')
    }, app).listen(config.port, () => {
        console.log(`¡Servidor iniciado en ${config.port}!`)
    })
}
else {
    app.listen(config.port, () => console.log(`¡Servidor iniciado en ${config.port}`));
}

