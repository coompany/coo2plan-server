/**
* ClientApp.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var hat = require('hat');

module.exports = {

  attributes: {

    clientID: {
      type: 'string',
      primaryKey: true,
      unique: true
    },
    name: {
      type: 'string',
      required: true
    },
    redirectURI: {
      type: 'string',
      required: true
    }

  },

  beforeValidate: function(values, next) {
    values.clientID = values.clientID || hat();
    next();
  }

};

