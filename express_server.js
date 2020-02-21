const helpers = require('./helpers.js');
const { generateRandomString, doesEmailExist, findIdFromEmail, findUrlsForUserId, validateUserLink } = helpers;

const PORT = 8080;
const log = console.log;

//MIDDLEWARE:
const express = require('express');
const app = express();
app.set("view engine", "ejs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cookieSession = require("cookie-session");
app.use(cookieSession({ name: 'session', keys: ['ghfjhgf'] }));

const bcrypt = require("bcrypt");

app.use((req, res, next) => {
  const userId = req.session.userId;
  const user = users[userId];
  const userLinks = findUrlsForUserId(userId, urlDataBase);

  req.user = user;
  res.locals.user = user;
  res.locals.urls = userLinks;
  next();
});

// DATABASES:
const urlDataBase = {
  "b2xVn2": { longURL: "http://www.lighthouselabs.ca", userId: 'user1Id' },
  "9sm5xK": { longURL: "http://www.getindezone.com", userId: 'user1Id' }
};

const users = {
  "user1Id": {
    userId: "user1Id",
    email: "sample@email.com",
    password: "sneaky"
  },
  "user2Id": {
    userId: "user21Id",
    email: "sample2@email.com",
    password: "sneaky"
  }
};

//HELPER FUNCTIONS:
// const findUrlsForUserId = function(userId, urlDataBase) {

//   let userLinks = {};

//   for (let link in urlDataBase) {
//     if (urlDataBase[link].userId === userId) {
//       userLinks[link] = urlDataBase[link].longURL;
//     }
//   }
//   return userLinks;
// };
// /////[EXPORT]
// const validateUserLink = function(userId, shortlink, urlDataBase) {

//   const userLinks = findUrlsForUserId(userId, urlDataBase);

//   let usersMatch = false;

//   for (let key in userLinks) {
//     if (key === shortlink) {
//       return usersMatch = true;
//     }
//   }
// };

const createUser = function(req, res) {

  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!email || !password || doesEmailExist(email, users)) {

    res.status(400);
    res.redirect("/registration");

  } else {

    const userId = generateRandomString();

    users[userId] = {
      userId,
      email,
      hashedPassword,
    };
    req.session.userId = userId;

    res.redirect("/urls");
  }
};

//ROUTING:

app.get("/registration", (req, res) => {

  res.render('registration');
});

app.get("/urls.json", (req, res) => {

  res.json(urlDataBase);
});

app.post("/login", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  let userId = findIdFromEmail(email, password, users);

  if (userId) {

    if (bcrypt.compareSync(password, users[userId].hashedPassword)) {

      req.session.userId = userId;
      res.redirect("/urls");
    }
    else {
      res.status(400).send('YOU ENTERED THE WRONG EMAIL OR PASSWORD... <a href="/registration">try again</a>');
    }

  } else {

    res.status(400).send('YOU ENTERED THE WRONG EMAIL OR PASSWORD... <a href="/registration">try again</a>');
  }

  log('from post route: ', userId);

});

app.post("/logout", (req, res) => {

  req.session = null;
  res.redirect("/registration");
});

app.get("/urls/new", (req, res) => {

  let userId = req.user;

  if (!userId) {
    res.status(400).send('YOU MUST BE <a href="/registration">LOGGED IN</a> TO DO THAT');
  } else {
    res.render("urls_new");
  }
});

app.get("/urls", (req, res) => {

  let userId = req.session.userId;

  if (!userId) {
    res.status(400).send('YOU MUST <a href="/registration">LOG IN</a> TO VIEW YOUR LITTLE LINKS');
  } else {

    log(urlDataBase)
    res.render("urls_index");
  }
});

app.post("/register", (req, res) => {
  return createUser(req, res);
});

app.get("/urls/:shortURL", (req, res) => {

  let userId = req.session.userId;
  let shortURL = req.params.shortURL;

  if (!validateUserLink(userId, shortURL, urlDataBase)) {
    res.send('THIS LINK IS NOT IN YOUR ACCOUNT. <a href="/registration">LOG IN</a> or GO BACK TO WHERE YOU CAME FROM');
  };

  let longURL = urlDataBase[shortURL];
  let templateVars = { shortURL: shortURL, longURL: longURL, user: users[userId] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/update", (req, res) => {

  let userId = req.session.userId;
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;

  if (!validateUserLink(userId, shortURL, urlDataBase)) {

    res.status(400).send('THATS NOT YOUR LINK');

  } else {

    urlDataBase[shortURL] = { 'longURL': newURL, 'userId': userId };
    res.redirect("/urls");
  }
});

app.post("/urls/:shortURL/delete", (req, res) => {

  let userId = req.session.userId;
  const shortURL = req.params.shortURL;

  if (!validateUserLink(userId, shortURL, urlDataBase)) {
    res.send('THATS NOT YOUR LINK');

  } else {

    delete urlDataBase[shortURL];
    res.redirect("/urls");
  };
});







app.post("/urls", (req, res) => {

  let userId = req.session.userId;

  if (!userId) {

    res.status(400).send('YOU MUST <a href="/registration">LOG IN</a> TO VIEW YOUR LITTLE LINKS');

  } else {

    const longURL = req.body.longURL;
    const shortURL = generateRandomString();


    urlDataBase[shortURL] = { 'longURL': longURL, 'userId': userId };

   // log(urlDataBase)

    res.redirect("/urls");
  }
});





app.get("/u/:shortURL", (req, res) => {

  const shortURL = req.params.shortURL;
  //log(urlDataBase[shortURL])

  if (urlDataBase[shortURL] === undefined) {
    res.status(400).send("THAT'S NOT EVEN A VALID LINK! <a href='/registration'>LOG IN</a> TO CREATE ONE THAT ACTUALLY WORKS!");

  } else {

    const longURL = urlDataBase[shortURL].longURL;
    res.redirect(longURL);
  }
});

app.get("/", (req, res) => {

  let userId = req.session.userId;
  if (!userId) {
    res.redirect("/registration");
  } else {
    res.redirect("/urls");
  }
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});

module.exports = { users };