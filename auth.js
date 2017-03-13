const passport = require('passport');
const OAuth2Strategy = require('passport-oauth2');
const request = require('request');

const config = require('./config');
const {Users} = require('./models');

// user serialization and deserialization
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(userID, done) {
  Users.find(userID, done);
});

// create the strategy
const jlmStrategy = new OAuth2Strategy({
    authorizationURL: config.authorizationURL,
    tokenURL: config.tokenURL,
    clientID: config.clientID,
    clientSecret: config.clientSecret,
    callbackURL: config.redirectURL,
    scope: config.scopes.join(config.scopeSeparator)
  },
  function (accessToken, refreshToken, profile, done) {
    Users.updateOrCreate(profile, function (err, user) {
      if (err) {
        return done(err);
      }

      return done(null, user);
    });
  }
);

jlmStrategy.userProfile = function (accessToken, done) {
  request({
    url: config.profileURL,
    json: true,
    auth: {bearer: accessToken}
  }, function (err, res, body) {
    if (err) {
      return done(err);
    }
    if (res.statusCode === 404) {
      return done(new Error('not found'));
    }
    if (res.statusCode !== 200) {
      return done(new Error('unknown error'));
    }

    const profile = {
      id: body.id,
      email: body.email,
      firstName: body.first_name,
      lastName: body.last_name,
      location: body.location
    };

    return done(null, profile);
  });
};

passport.use('jlm-auth', jlmStrategy);

exports.connect = passport.authenticate('jlm-auth');

exports.oauthCallback = [
  passport.authenticate('jlm-auth', { failureRedirect: '/'}),
  function(req, res) {
    res.redirect('/');
  }
];

exports.disconnect = function(req, res) {
  req.logout();
  res.redirect('/');
};
