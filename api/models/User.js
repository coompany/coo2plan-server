/**
* User.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var bcrypt = require('bcrypt');

module.exports = {

  attributes: {
    email: {
      type: 'string',
      required: true,
      unique: true,
      email: true
    },
    password: {
      type: 'string',
      required: true
    },

    toJSON: function() {
      var tmp = this.toObject();
      delete tmp.password;
      return tmp;
    }
  },

  beforeCreate: function (values, next) {
    // Encrypt password
    bcrypt.hash(values.password, 10, function(err, hash) {
      if(err) return next(err);
      values.password = hash;
      next();
    });
  }

};

