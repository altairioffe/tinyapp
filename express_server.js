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
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.getindezone.com"
};

const users = {
  "user1Id": {
    userId: "user1Id",
    email: "sample@email.com",
    password: "sneaky"
  },
  "user2Id": {
    userId: "use21Id",
    email: "sample2@email.com",
    password: "sneaky"
  }
};

const findIdFromEmail = function(email, password) {
  let foundEmail;
  for (let key in users) {
    if (users[key].email === email && users[key].password === password) {
      return foundEmail = key;
    }
  }
  return foundEmail || false;
};

//console.log(findIdFromEmail('sample@email.com', 'sneaky'))

app.get("/registration", (req, res) => {
  let userId = req.cookies.userId

  let templateVars = { urls: urlDataBase, user: users.userId };
 // log(email)
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
    res.redirect("/registration")
   // log(email, password);
  }});

app.post("/logout", (req, res) => {
  res.clearCookie('userId');
  res.redirect("/registration");
});

app.get("/hello", (req, res) => {
  res.send("<html><body> Greetings, <b>cyber</b>traveller</body></html>\n");
});

app.get("/urls/new", (req, res) => {
  let userId = req.cookies.userId
  let templateVars = { user: users[userId] };
  //log(email)

  res.render("urls_new", templateVars);
});


app.get("/urls", (req, res) => {
  log(req.cookies.userId)
  let userId = req.cookies.userId
  log(users.userId)
  //log(users[id])
  //let email;
  // users.id.email ? email = users[id].email : email = '';
  // log(email)
  let templateVars = { urls: urlDataBase, user: users[userId] };
  //log(users[userId].email)
  res.render("urls_index", templateVars);
});

app.post("/register", (req, res) => {

  const email = req.body.email;
  const password = req.body.password;
  if (!(email || password)) {
    res.status(400);
    res.redirect("/registration")
  }

  const userId = generateRandomString();
  users[userId] = {
    userId,
    email,
    password
  };
  res.cookie('userId', userId);
  let templateVars = { urls: urlDataBase, user: users[userId] };
  log(users[userId].email)
  res.redirect("/urls");
});


app.get("/urls/:shortURL", (req, res) => {
  let userId = req.cookies.userId
  const shortURL = req.params.shortURL;
  let templateVars = { shortURL: shortURL, longURL: urlDataBase[shortURL], user: users[userId] };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/update", (req, res) => {
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;
  urlDataBase[shortURL] = newURL;
  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL
  delete urlDataBase[shortURL];
  res.redirect("/urls");
});

app.post("/urls", (req, res) => {

  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  const email = req.body.email;
  const password = req.body.password
  log(email, password);

  const redirect = `/urls/${shortURL}`;
  urlDataBase[shortURL] = longURL;
  res.redirect(redirect);
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL;
  const longURL = urlDataBase[shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});