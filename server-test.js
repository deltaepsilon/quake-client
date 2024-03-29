var request = require('supertest'),
  server = require('./server.js');


module.exports = {
  testLoggedOut: function(test) {
    request(server).get('/').end(function(err, res ) {
      console.log(res.headers);
      test.strictEqual('false', res.headers['x-quiver-authenticated'], 'Should not be authenticated.');
      test.done();
    });
  }
}