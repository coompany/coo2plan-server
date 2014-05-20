/**
* Designer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

var _ = require('lodash'),
    Person = require('./Person');

module.exports = _.merge(_.cloneDeep(Person), {

  attributes: {
    organizations: {
      collection: 'organization',
      via: 'collaborators',
      dominant: true
    },
    manages: {
      collection: 'publicadmin',
      via: 'manager'
    }
  }

});
