/**
* Business.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash'),
    baseBusiness = require('../services/baseBusiness');

module.exports = _.merge(_.cloneDeep(baseBusiness), {

  attributes: {
    vat: {
      type: 'string',
      required: true
    }
  }

});

