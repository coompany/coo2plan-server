/**
 * Created by acidghost on 17/05/14.
 */

var passport = require('passport')
  , oauth2orize = require('oauth2orize')
  , hat = require('hat')
  , login = require('connect-ensure-login');

module.exports.express = {
  customMiddleware: function(app) {

    app.use(passport.initialize());
    app.use(passport.session());

    /* oauth2 server definition */
    var server = oauth2orize.createServer();

    server.serializeClient(function(client, done) {
      return done(null, client.clientID);
    });

    server.deserializeClient(function(id, done) {
      ClientApp.findOne({ clientID: id }).exec(function(err, client) {
        if(err) {
          sails.log.error(err);
          return done(err);
        }
        return done(null, client);
      });
    });

    // Grant implicit authorization.  The callback takes the `client` requesting
    // authorization, the authenticated `user` granting access, and
    // their response, which contains approved scope, duration, etc. as parsed by
    // the application.  The application issues a token, which is bound to these
    // values.
    server.grant(
      oauth2orize.grant.token(
        function(client, user, ares, done) {
          Token.findOne({ clientID: client.clientID, userID: user.id }).exec(function(err, token) {
            if(err) {
              sails.log.error(err);
              return done(err);
            }
            if(!token) {
              token = hat();
              Token.create({ token: token, userID: user.id, clientID: client.clientID }).exec(function(err, newToken) {
                if(err) {
                  sails.log.error(err);
                  return done(err);
                }
                sails.log.info('Access token issued to', user.email, newToken.token, client.name);
                return done(null, newToken.token);
              });
            } else {
              sails.log.info('Returning existing access token', user.email, token.token, client.name);
              return done(null, token.token);
            }
          });
        }
      )
    );

    app.get('/oauth2/authorize',
      login.ensureLoggedIn(),
      server.authorize(function(clientID, redirectURI, done) {
        ClientApp.findOneByClientID(clientID).exec(function(err, client) {
          if(err) {
            sails.log.warn(err);
            return done(err);
          }

          if(client == null || client == 'undefined') {
            return done(null, false);
          }

          if(client.redirectURI != redirectURI) {
            return done(null, false);
          }

          return done(null, client, client.redirectURI);
        });
      }),
      function(req, res) {
        res.render('oauth2/dialog', {
          transactionID: req.oauth2.transactionID,
          user: req.user,
          client: req.oauth2.client
        });
      }
    );

    app.post('/oauth2/authorize/decision',
      login.ensureLoggedIn(),
      server.decision()
    );

  }
}