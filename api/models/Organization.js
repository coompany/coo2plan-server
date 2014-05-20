/**
* Organization.js
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
    vat: {
      type: 'string',
      required: true
    },
    owner: {
      model: 'designer',
      required: true
    },
    collaborators: {
      collection: 'designer',
      via: 'organizations'
    },
    projects: {
      collection: 'project',
      via: 'organizations'
    }
  }

};

