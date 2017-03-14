const express = require('express');
const session = require('express-session');
const passport = require('passport');
const morgan = require('morgan');

const config = require('./config');
const auth = require('./auth');
const controllers = require('./controllers');

app = express();

app.set('views', 'templates');
app.set('view engine', 'pug');

app.use(morgan('combined'));

app.use(session({secret: config.cookieSecret}));
app.use(passport.initialize());
app.use(passport.session());


app.get('/', controllers.root);

app.get('/connexion/', auth.connect);
app.get('/connexion/retour', auth.oauthCallback);
app.get('/deconnexion/', auth.disconnect);

app.get('/users/', controllers.getAllUsers);
app.get('/users/:id', controllers.getUser);

// do not change the port number for this test version,
// or the auth server won't accept to redirect the users
// to your app
app.listen(8000);
