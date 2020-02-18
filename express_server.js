const express = require('express');
const app = express();
app.set("view engine", "ejs");
const PORT = 8080;
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
const log = console.log;

const generateRandomString = function() {
  let random = [];
  let characters = ['a', 'b', 'c', 7, 8, 9];
  for (let i = 0; i < 6; i++) {
    random.push(characters[(Math.floor(Math.random()*6))]);
  }
 return random.join('');
}

const urlDataBase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send('GREETINGS');
});

app.get("/urls.json", (req, res) => {
  res.json(urlDataBase)
  
})

app.get("/hello", (req, res) => {
  res.send("<html><body> Greetings, <b>cyber</b>traveller</body></html>\n")
})

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});


app.get ("/urls", (req, res) => {
  let templateVars = {urls: urlDataBase};
  res.render("urls_index", templateVars);
});


app.get("/urls/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  let templateVars = {shortURL: shortURL, longURL: urlDataBase[shortURL]};
  log(1, templateVars)
  res.render("urls_show", templateVars);
});

app.post("/urls", (req, res) => {
  const longURL = req.body.longURL;
  const shortURL = generateRandomString();
  const redirect = `/urls/${shortURL}`
  urlDataBase[shortURL] = longURL;
  log(urlDataBase)
  res.redirect(redirect)
});

app.get("/u/:shortURL", (req, res) => {
  const shortURL = req.params.shortURL
  const longURL = urlDataBase[shortURL];
  log(urlDataBase);
  res.redirect(longURL);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});