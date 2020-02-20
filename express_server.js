const express = require('express');
const app = express();
app.set("view engine", "ejs");

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

const cookieSession = require("cookie-session");
app.use(cookieSession({name: 'session', keys: ['ghfjhgf'] }));

const bcrypt = require("bcrypt");

app.use((req, res, next) => {
  const userId = req.session.userId;
  console.log('user id: ', req.session)
  const user = users[userId];
  const userLinks = urlsForUserId(userId);
  
  req.user = user;
  res.locals.user = user;
  res.locals.urls = userLinks;

  next();
});

const PORT = 8080;
const log = console.log;

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

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random() * 19))]);
  }
  return random.join('');
};

const doesEmailExist = function(email) {
  let foundEmail;
  for (let key in users) {
    if (users[key].email === email) {
      return foundEmail = true;
    }
  }
  return foundEmail || false;
};

const findIdFromEmail = function(email, password) {
  let foundId;
  for (let key in users) {
    if (users[key].email === email && bcrypt.compare(password, users[key].hashedPassword)) {
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

const createUser = function(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const hashedPassword = bcrypt.hashSync(password, 10);

  if (!email || !password || doesEmailExist(email)) {
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
    console.log('create', req.session.userId)
    log(users[userId]);
    res.redirect("/urls");
  };
}

app.get("/registration", (req, res) => {
  res.render('registration');
});

app.get("/urls.json", (req, res) => {
  res.json(urlDataBase);
});

app.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  let userId = findIdFromEmail(email, password);

  if (userId) {
    req.session.userId = userId;
    res.redirect("/urls");
  } else {
    res.status(400);
    res.redirect("/registration");
  }
});

/////
app.post("/logout", (req, res) => {
  req.session = null;
  res.redirect("/registration");
});



app.get("/urls/new", (req, res) => {
  let userId = req.session.userId;
  if (!userId) {
    res.redirect("/registration")
  } else {
    res.render("urls_new");
  }
});

app.get("/urls", (req, res) => {
  console.log('urls log: ', req.session.user_id)

  res.render("urls_index");
});

app.post("/register", (req, res) => {
  return createUser(req, res);
});

app.get("/urls/:shortURL", (req, res) => {

  let userId = req.session.userId;
  let shortURL = req.params.shortURL;
  let longURL = urlDataBase[shortURL].longURL;
  let templateVars = { shortURL: shortURL, longURL: longURL, user: users[userId] };
  res.render("urls_show", templateVars);
});
///////

app.post("/urls/:shortURL/update", (req, res) => {
  let userId = req.session.userId;
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;

  urlDataBase[shortURL] = { 'longURL': newURL, 'userId': userId };
  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL;
  delete urlDataBase[shortURL];
  res.redirect("/urls");
});

//CREATE NEW SHORT URL
app.post("/urls", (req, res) => {

  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  let userId = req.session.userId;
  //const redirect = `/urls/${shortURL}`;
  urlDataBase[shortURL] = { 'longURL': longURL, 'userId': userId };
  res.redirect("/urls");
});

//REDIRECT from short to targrt URL
app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDataBase[shortURL].longURL;
  res.redirect(longURL);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});