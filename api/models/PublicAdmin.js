/**
* PublicAdmin.js
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
    district: {
      type: 'string',
      required: true
    },
    manager: {
      model: 'designer',
      required: true
    },
    projects: {
      collection: 'project',
      via: 'owner'
    }
  }

};

