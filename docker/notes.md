# notes

## [keycloak](https://keycloak.org)

- no token revocation

## [Azure AD](https://portal.azure.com)

With MS Graph API

settings for platform SPA:

- url: https://login.microsoftonline.com/{tenant-id}/v2.0
- scope: `openid https://graph.microsoft.com/.default `
- responseMode: fragment
- responseType: code
- flow: standard
- pkceMethod: S256

## [Auth0](https://auth0.com)

- no logout but token revocation

## [okta](https://okta.com)

-

## [fusionauth](https://fusionauth.io)

- only responseMode=query
- CORS needs to be configured under Settings> System> CORS http://localhost:8000

## [wso2](https://wso2.github.io/)

- no .well-known/openid-configuration
- CORS needs configuration via web.xml https://docs.wso2.com/display/IS570/Invoking+an+Endpoint+from+a+Different+Domain
- set `oidcConfig`: 
  ```json
  {
    "authorization_endpoint": "https://localhost:9443/oauth2/authorize",
    "token_endpoint": "https://localhost:9443/oauth2/token"
  }
  ```
- Endpoint returns 404, maybe problem is web.xml

## openam

- CORS needs to be configured via /usr/local/tomcat/webapps/openam/WEB-INF/web.xml

**Quick Setup**

1. `cd docker/openam`
1. `docker-compose up`
1. http://localhost:8080/openam/
1. Create Default Configuration
1. login as "amAdmin"
1. Top-Level Domain > Configure OAuth Provider > Configure OpenID Connect > Create
1. Main > Subjects ; Tab(Agents) > OAuth2/OIDC > Create new agent
    - Client Type: Public
    - Redirect Urls: http://localhost:8000/
    - Scopes: openid
    - Post Logout Redirect Urls: http://localhost:8000/
1. http://localhost:8080/openam/oauth2/.well-known/openid-configuration

## authentik 

**Quick Setup**

1. navigate to http://localhost:9000/if/flow/initial-setup/
   set admin account and password
1. Button(Admin Interface)
1. create user   
    - Directory > Users > Button(Create)
    - Button(Impersonate)
    - Icon(Gear) > Change Password
    - Button(Stop impersonation)
1. create provider
    - Applications > Providers > Button(Create)
    - Name: my-app
    - Auth-Flow: implicit consent
    - Client Type: Public
    - Client Id: my-app
    - Redirect URIs: http://localhost:8000/
1. create Application
    - Applications > Applications > Button(Create)
    - Name: my, Slug: my, Provider: my-app, Policy engine mode: ANY, 
    - Launch Url: http://localhost:8000

1. configure oidc-connector: 
    - url: http://localhost:9000/application/o/my/
    - pkceMethod: S256 is supported

# appendix

For some quick testing on some servers disable CORS in chrome

```bash
#linux
chromium-browser --disable-web-security --user-data-dir=/tmp/chrome
#macos
open -n -a /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --args --user-data-dir="/tmp/chrome_dev_sess_1" --disable-web-security
```
