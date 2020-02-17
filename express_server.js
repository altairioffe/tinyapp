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

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});