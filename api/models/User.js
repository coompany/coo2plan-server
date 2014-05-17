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
    firstName: {
      type: 'string',
      required: true
    },
    lastName: {
      type: 'string',
      required: true
    },
    gender: {
      type: 'string',
      required: true,
      enum: ['M', 'F']
    },
    dateOfBirth: {
      type: 'date',
      required: true
    },
    placeOfBirth: {
      type: 'string',
      required: true
    },
    provinceOfBirth: {
      type: 'string',
      required: true
    },
    place: {
      type: 'string',
      required: true
    },
    province: {
      type: 'string',
      required: true
    },
    fiscalCode: {
      type: 'string',
      required: true,
      minLength: 16,
      maxLength: 16
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

