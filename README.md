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

  ## Main Features

* User accounts: 
  * Registration & login forms
  * User-specific database containing saved links. Database can only be accessed or modified by account holder, but shortened URLs can be shared with anyone
  * Encrypted session with password hashing
  * Random-generated user ID for added security
  * Logout buttpm in header

* URL Shortnener: 
  * Takes input URL from user and auto-generates a short link which takes users to the same destination.
  * Account holders are able to Create, Update / Edit, or Delete any of their links. Others can use the short link.
    
