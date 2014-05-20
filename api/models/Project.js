/**
* Project.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    municipality: {
      type: 'string',
      required: true
    },
    district: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'publicadmin',
      required: true
    },
    organizations: {
      collection: 'organization',
      via: 'projects',
      dominant: true
    }
  }

};

