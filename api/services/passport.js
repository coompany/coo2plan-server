/**
 * Created by acidghost on 17/05/14.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    BearerStrategy = require('passport-http-bearer').Strategy,
    bcrypt = require('bcrypt');

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findOne({ id:id }, function (err, user) {
    done(err, user);
  });
});

/**
 * LocalStrategy
 *
 * This strategy is used to authenticate users based on a username and password.
 * Anytime a request is made to authorize an application, we must ensure that
 * a user is logged in before asking them to approve the request.
 */
passport.use(
  new LocalStrategy(
    function(email, password, done) {
      process.nextTick(function() {
        User.findOne({ email: email }).exec(function(err, user) {
          if(err) {
            sails.log.error(err);
            return done(err);
          }

          if(user == null || user == 'undefined') {
            return done(null, false, { message: 'Unknown user: '+email });
          }

          bcrypt.compare(password, user.password, function(err, match) {
            if(err) {
              sails.log.error(err);
              return done(err);
            }
            if(!match) {
              return done(null, false, { message: 'Invalid password' });
            }
            return done(null, user);
          });
        });
      });
    }
  )
);

/**
 * BearerStrategy
 *
 * This strategy is used to authenticate users based on an access token (aka a
 * bearer token).  The user must have previously authorized a client
 * application, which is issued an access token to make requests on behalf of
 * the authorizing user.
 */
passport.use(
  new BearerStrategy(
    function(accessToken, done) {
      Token.findOne({ token: accessToken }).exec(function(err, token) {
        if (err) { return done(err); }
        if (!token) { return done(null, false); }
        User.findOne({ id: token.userID  }).exec(
          function (err, user) {
            if(err) { return done(err); }
            return done(null, user);
          });
      });
    }
  )
);
