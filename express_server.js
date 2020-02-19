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
}

const urlDataBase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

//const userName = {}

app.get("/", (req, res) => {
  res.send('GREETINGS');
});

app.get("/urls.json", (req, res) => {
  res.json(urlDataBase)

})

app.post("/login", (req, res) => {
  const username = req.body.username
  log(username)
  res.cookie('username', username)
  //userName.username = username;
  //log(cookie)
  res.redirect("/urls")
})

app.post("/logout", (req, res) => {
  res.clearCookie('username');
  res.redirect("/urls");
})


app.get("/hello", (req, res) => {
  res.send("<html><body> Greetings, <b>cyber</b>traveller</body></html>\n")
})

app.get("/urls/new", (req, res) => {
  let templateVars = { username: req.cookies.username };
  res.render("urls_new", templateVars);
});


app.get("/urls", (req, res) => {
  let templateVars = { urls: urlDataBase, username: req.cookies.username };
  //log(templateVars)
  res.render("urls_index", templateVars);
});


app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  let templateVars = { shortURL: shortURL, longURL: urlDataBase[shortURL], username: req.cookies.username };
  res.render("urls_show", templateVars);
});

app.post("/urls/:shortURL/update", (req, res) => {
  const shortURL = req.params.shortURL;
  const newURL = req.body.newURL;
  log(newURL)
  urlDataBase[shortURL] = newURL;
  log(urlDataBase);
  res.redirect("/urls");
});

app.post("/urls/:shortURL/delete", (req, res) => {
  const shortURL = req.params.shortURL
  delete urlDataBase[shortURL];
  res.redirect("/urls")
})

app.post("/urls", (req, res) => {

  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  const redirect = `/urls/${shortURL}`
  urlDataBase[shortURL] = longURL;
  res.redirect(redirect)
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  const longURL = urlDataBase[shortURL];
  res.redirect(longURL);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});