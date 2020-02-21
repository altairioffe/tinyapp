# tinyapp

## Summary

This repository is for TinyApp, a web app that shortens URL links into something more shareable.

Made by [Altair Ioffe](https://github.com/altairioffe) as a project for [Lighthouse Labs](https://www.lighthouselabs.ca/)

## Contents

* [express_server.js](/helpers.js): 
  * Main server-side code & routing using Node and Express
  * Secure user authentication, encryption on cookies and user sessions using bcrypt
* [helpers.js](/helpers.js): 
  * Helper functions required by express_server.js
  * Mainly used for user identification and authentication
* [views](/views): 
  * Folder containing EJS Templates and Partials
  * Dynamically renders client-side using HTML, CSS, and Javascript, according to routing in express_server.js
* [test](/test): 
  * Folder containing Mocha & Chai testing suite