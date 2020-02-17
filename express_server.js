const express = require('express');
const app = express();
const PORT = 8080;
const log = console.log;

const urlDataBases = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

app.get("/", (req, res) => {
  res.send('GREETINGS');
});

app.listen(PORT, () => {
  log(`Example app listening on port ${PORT}`);
});