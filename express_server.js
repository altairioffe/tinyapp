const express = require('express');
const app = express();
app.set("view engine", "ejs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");
app.use(cookieParser())

const PORT = 8080;
const log = console.log;

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random() * 6))]);
  }
  return random.join('');
};

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

const doesEmailExist = function(email) {
  let result;
  for (let key in users) {
    if (users[key].email === email) {
      return result = true;
    }
  }
  return result || false;
};

const findIdFromEmail = function(email, password) {
  let foundId;
  for (let key in users) {
    if (users[key].email === email && users[key].password === password) {
      return foundId = key;
    }
  }
  return foundId || false;
};

const urlsForUserId = function(userId) {
  let userLinks = {};
  for (let link in urlDataBase) {
    if (urlDataBase[link].userId === userId) {
      userLinks[link] = urlDataBase[link].longURL;
    }
  }
  return userLinks;
};
console.log(urlsForUserId('user1Id'))


app.get("/registration", (req, res) => {
  let userId = req.cookies.userId;

  let templateVars = { urls: urlDataBase, user: users.userId };
  res.render('registration', templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDataBase);
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let id = findIdFromEmail(email, password);

  if (id) {
    res.cookie("userId", id);
    res.redirect("/urls");
  } else {
    res.status(400);
    res.redirect("/registration");
  }
});

app.post("/logout", (req, res) => {
  res.clearCookie('userId');
  res.redirect("/registration");
});

app.get("/urls/new", (req, res) => {
  let userId = req.cookies.userId;

  if (!userId) {
    res.redirect("/registration")
  } else {
    let templateVars = { user: users[userId] };
    res.render("urls_new", templateVars);
  }
});

app.get("/urls", (req, res) => {
  log(req.cookies.userId);
  let userId = req.cookies.userId;
  let userLinks = urlsForUserId(userId)
  log(users.userId);
  let templateVars = { urls: userLinks, user: users[userId] };
  res.render("urls_index", templateVars);
});

app.post("/register", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;

  if (!(email || password) || doesEmailExist(email)) {
    res.status(400);
    res.redirect("/registration");
  } else {

    const userId = generateRandomString();
    users[userId] = {
      userId,
      email,
      password
    };
    res.cookie('userId', userId);
    let templateVars = { urls: urlDataBase, user: users[userId] };
    log(users[userId].email);
    res.redirect("/urls");
  };
});

app.get("/urls/:shortURL", (req, res) => {

  let userId = req.cookies.userId;
  let userLinks = urlsForUserId(userId)
  let shortURL = req.params.shortURL;
  let longURL = urlDataBase[shortURL].longURL;
  let templateVars = { shortURL: shortURL, longURL: longURL, user: users[userId] };
  res.render("urls_show", templateVars);
});
/////

app.post("/urls/:shortURL/update", (req, res) => {
  let userId = req.cookies.userId;
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;
  let userLinks = urlsForUserId(userId)

  log(newURL)
  urlDataBase[shortURL] = { 'longURL': newURL, 'userId': userId };  
  log(userLinks)
  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDataBase[shortURL];
  res.redirect("/urls");
});

app.post("/urls", (req, res) => {

  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  let userId = req.cookies.userId;
  const email = req.body.email;
  const password = req.body.password;
  log(email, password);

  const redirect = `/urls/${shortURL}`;
  urlDataBase[shortURL] = { 'longURL': longURL, 'userId': userId };
  res.redirect("/urls");
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDataBase[shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});