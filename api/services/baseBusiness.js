/**
 * Created by acidghost on 20/05/14.
 */

var _ = require('lodash'),
  baseUser = require('../services/baseUser');

module.exports = _.merge(_.cloneDeep(baseUser), {

  attributes: {
    name: {
      type: 'string',
      required: true
    },
    refFirstName: {
      type: 'string',
      required: true
    },
    refLastName: {
      type: 'string',
      required: true
    },
    officeAddress: {
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
    }
  }

});
