const bcrypt = require("bcrypt");

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random() * 18))]);
  }
  return random.join('');
};
console.log(generateRandomString())

const doesEmailExist = function(email, users) {
  let foundEmail;
  for (let key in users) {
    if (users[key].email === email) {
      return foundEmail = true;
    }
  }
  return foundEmail || false;
};

const findIdFromEmail = function(email, password, users) {
  let foundId;
  for (let key in users) {
    if (users[key].email === email && bcrypt.compare(password, users[key].hashedPassword)) {
      return foundId = key;
    }
  }
  return foundId || false;
};


module.exports = {
  generateRandomString,
  doesEmailExist,
  findIdFromEmail

};