/**
* Person.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash'),
    baseUser = require('../services/baseUser');

module.exports = _.merge(_.cloneDeep(baseUser), {

  attributes: {
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
    birthDate: {
      type: 'date',
      required: true
    },
    birthPlace: {
      type: 'string',
      required: true
    },
    birthDistrict: {
      type: 'string',
      required: true
    },
    place: {
      type: 'string',
      required: true
    },
    district: {
      type: 'string',
      required: true
    },
    fiscalCode: {
      type: 'string',
      required: true,
      minLength: 16,
      maxLength: 16
    }
  }

});

