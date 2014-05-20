/**
 * Created by acidghost on 18/05/14.
 */

module.exports = {

  attributes: {
    userCredentials: {
      model: 'user',
      required: true
    },

    toJSON: function() {
      var tmp = this.toObject();
      tmp.email = tmp.userCredentials.email;
      delete tmp.userCredentials;
      return tmp;
    }
  }

};

