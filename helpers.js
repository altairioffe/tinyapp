const bcrypt = require("bcrypt");

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random() * 18))]);
  }
  return random.join('');
};

const doesEmailExist = function(email, users) {
  let foundEmail;
  for (let key in users) {
    if (users[key].email === email) {
      return foundEmail = true;
    }
  }
  return foundEmail || false;
};

// Returns user ID if and only if their email exists in database
const findIdFromEmail = function(email, password, users) {
  let foundId;
  for (let key in users) {

    if (users[key].email === email) {
      foundId = key;
    }
  }
  return foundId || false;
};


const authenticatePassword = function(validatedId, password, users) {

  bcrypt.compare(password, users[validatedId].hashedPassword)
    .then((result) => {
      if (result) console.log('helper: ', result);
    })
    .catch((err) => console.log('authentication failed: ', err));
};


const findUrlsForUserId = function(userId, urlDataBase) {

  let userLinks = {};

  for (let link in urlDataBase) {
    if (urlDataBase[link].userId === userId) {
      userLinks[link] = urlDataBase[link].longURL;
    }
  }
  return userLinks;
};

const validateUserLink = function(userId, shortlink, urlDataBase) {

  const userLinks = findUrlsForUserId(userId, urlDataBase);

  let usersMatch = false;

  for (let key in userLinks) {
    if (key === shortlink) {
      return usersMatch = true;
    }
  }
};

module.exports = {
  generateRandomString,
  doesEmailExist,
  findIdFromEmail,
  authenticatePassword,
  validateUserLink,
  findUrlsForUserId
};