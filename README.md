# tinyapp

## Summary

TinyApp, is a full-stack a web app that shortens URL links into something more shareable (like bit.ly).


## Dependencies

- Node.js
- Express
- EJS
- bcrypt
- body-parser
- cookie-session

## Getting Started

- Install all dependencies (using the `npm install` command).
- Run the development web server using the `node express_server.js` command.

## Contents

* [express_server.js](/helpers.js): 
  * Main server-side code & routing using Node and Express
  * Secure user authentication & encryption using bcrypt
* [helpers.js](/helpers.js): 
  * Helper functions required by express_server.js
  * Mainly for user identification and authentication
* [views](/views): 
  * Folder containing EJS Templates and Partials
  * Dynamically renders client-side using HTML, CSS, and Javascript, according to routing in express_server.js
* [test](/test): 
  * Folder containing Mocha & Chai testing suite

  ## Main Features

* User accounts: 
  * Registration & login forms
  * User-specific database containing saved links
  * Saved links can only be modified or deleted by the creator's account, but short links, once created, may be shared with and used by anyone
  * Encrypted session with password hashing
  * Random-generated user ID for added security
  * Logout button in header

* URL Shortnener: 
  * Takes input URL from user and auto-generates a short link which takes users to the same destination.
  * Account holders are able to Create, Update / Edit, or Delete any of their links. Others can use the short link.
    
