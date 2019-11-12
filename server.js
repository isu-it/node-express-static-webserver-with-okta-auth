const config = require('./config.json');
const express = require('express');
const session = require('express-session');
const { ExpressOIDC } = require('@okta/oidc-middleware');

const oidc = new ExpressOIDC({
issuer: config.webServer.oidc.issuer,
client_id: config.webServer.oidc.clientId,
client_secret: config.webServer.oidc.clientSecret,
appBaseUrl: config.webServer.oidc.appBaseUrl,
scope: config.webServer.oidc.scope
});

const app = express();

// Session needed for authentication
app.use(session({
  secret:  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
  resave: true,
  saveUninitialized: false
}));

// Adds /login for Okta authentication
app.use(oidc.router);

// Check if authenticated
app.use(function (req, res, next) {
  if (req.isAuthenticated()) {
    // already authenticated, keep going
    next()
  } else {
    // get authentication from Okta
    res.redirect('/login');  
  }
})

// Serve static content to authenticated users
app.use(express.static('static'));

// Note that app.uses are processed in sequence and we need 
// to return something otherwise the request gets stuck.
app.use(function (req, res, next) {
  res.status(404).send("<center>Invalid URL <br /> [cute kitty pic] <br /> good luck next time</center>")
})

// Start http server
oidc.on('ready', () => {
    app.listen(config.webServer.port, () => console.log(`App started on port ${config.webServer.port}`));
});

// An error occurred while setting up OIDC
oidc.on('error', err => {
    throw err;
});