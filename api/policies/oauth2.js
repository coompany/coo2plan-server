/**
 * Created by acidghost on 18/05/14.
 */

var passport = require('passport');

module.exports = function(req,res,next) {
  passport.authenticate('bearer', { session: false }, function(err, user) {
      if(err) {
        sails.log.error(err);
        res.json({ error: err }, 400);
        return;
      }
      if(user == false) {
        sails.log.info('Access token not found.');
        res.send(401);
        return;
      }
      if(!user) {
        sails.log.info('User not found for given access token');
        res.send(401);
        return;
      }
      delete req.query.access_token;
      req.user = user;
      return next();
    }
  )(req, res);
};