const { assert } = require('chai');
//const users = require('../express_server')
const { findIdFromEmail } = require('../helpers.js');

const testUsers = {
  "userRandomID": {
    id: "userRandomID", 
    email: "user@example.com", 
    password: "purple-monkey-dinosaur"
  },
  "user2RandomID": {
    id: "user2RandomID", 
    email: "user2@example.com", 
    password: "dishwasher-funk"
  }
};

describe('findIdFromEmail', function() {
 
  it('should return a user id with valid email and password', function() {
    const user = findIdFromEmail("user@example.com", "purple-monkey-dinosaur", testUsers)
    const expectedOutput = "userRandomID";

    assert.equal(user, expectedOutput)
  });

  it('should return false with a non-existent email', function() {
    const user = findIdFromEmail("NOTREGISTERED@example.com", "purple-monkey-dinosaur", testUsers)
    const expectedOutput = false;

    assert.equal(user, expectedOutput)
  });

});