const express = require('express');
const app = express();
app.set("view engine", "ejs");
const PORT = 8080;
const log = console.log;

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

app.get ("/urls", (req, res) => {
  let templateVars = {urls: urlDataBase};
  res.render("urls_index", templateVars);
});

app.get("/urls/:shortURL", (req, res) => {

  let templateVars = {shortURL: req.params.shortURL, longURL: urlDataBase.shortURL};
  res.render("urls_show", templateVars);
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});