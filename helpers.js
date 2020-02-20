const bcrypt = require("bcrypt");

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random() * 19))]);
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

const findIdFromEmail = function(email, password, users) {
  let foundId;
  for (let key in users) {
    if (users[key].email === email && bcrypt.compare(password, users[key].hashedPassword)) {
      return foundId = key;
    }
  }
  return foundId || false;
};

// const findUrlsForUserId = function(userId) {
//   let userLinks = {};
//   for (let link in urlDataBase) {
//     if (urlDataBase[link].userId === userId) {
//       userLinks[link] = urlDataBase[link].longURL;
//     }
//   }
//   return userLinks;
// };

// const createUser = function(req, res) {
//   const email = req.body.email;
//   const password = req.body.password;
//   const hashedPassword = bcrypt.hashSync(password, 10);

//   if (!email || !password || doesEmailExist(email)) {
//     res.status(400);
//     res.redirect("/registration");
//   } else {

//     const userId = generateRandomString();
//     users[userId] = {
//       userId,
//       email,
//       hashedPassword,
//     };
//     req.session.userId = userId;
//     res.redirect("/urls");
//   };
// };

module.exports = {
  generateRandomString,
  doesEmailExist,
  findIdFromEmail,
  // findUrlsForUserId,
  // createUser,
};