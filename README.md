Node Express Web Server for Static Website with Okta Authentication
===================================================================

Simple way to serve static webpages with Okta authentication via Node.js.

Usage
-----
Install the node dependencies:

    `npm install`
    
You need to gather the following information from the Okta Administration/Developer Console:

  * "Client ID" and " "Client Secret" - These are found in the details of the OpenID Connect (OIDC) application.  
    Also ensure that the "Login redirect URIs" has an entry for your application (i.e. "http://localhost:8080/authorization-code/callback").

  * "Issuer" - This URL is found in the details of the authorization server.
  
Copy the `config-sample.json` to `config.json` and fill the information from above in.  The final config file should look similar to this:

```
{
  "webServer": {
    "port": 8080,
    "oidc": {
      "clientId": "YUig2H6VtmWYsL4vORRU",
      "clientSecret": "jjos47KqSSfspTfyJXt3JAFLiTbfpC0xiXFkzWja",
      "issuer": "https://dev-123456.oktapreview.com/oauth2/ausa3ri7x5mJTlp5oth7",
      "redirectUri": "http://localhost:8080/authorization-code/callback",
      "scope": "openid profile email"
    }
  }
}
```

Place the static web content (html, jpg, css, js, etc. files) into the "static" directory.

Finally start the server via:

    `npm start`
    
References
----------
- Express Sample Applications for Okta: https://github.com/okta/samples-nodejs-express-4 
- Okta OIDC middleware for Express: https://github.com/okta/okta-oidc-js/tree/master/packages/oidc-middleware