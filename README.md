# oidc-connector

- [OIDC][] adapter/ client for modern browsers.
- Configuration uses `./well-known/oidc-configuration` provided by OIDC servers.
- Extensive test-set
- Easy configuration

Features

- minified ~20kB in size
- no external dependencies
- Supports standard, hybrid and implicit authentication flow.
- Native Promise based
- Session management
- silent login
- Compatible with [keycloak][] servers
- Tokens are refreshed automatically; No need to take care on expiry timestamps.
- Support for custom adapters (default is browser, package comes bundled with
  cordova and cordova-native adapter)

## Usage

```js
import Client from 'oidc-connector'

const client = new Client({
  url: 'http://localhost:8080/auth',
  clientId: 'my-app'
})

// subscribe to events
client.on('token', ({token, tokenParsed}) => {
  // do sth. with the tokens
})
client.on('logout', () => {
  // option `forceLogout` is set to true by default; No need to react here
})
client.on('error', (err) => {
  // get notified on errors
})
client.on('action', ({status}) => {
  // subscribe to actions
})

// always initialize on page load!!!
await client.init().catch(err => {
  // react here on initialization errors; error is also emitted as event
})

// trigger explicit login from
await client.login().catch(err => {
  // react here on login errors; error is also emitted as event
})
```

for later using the token in communications (e.g. RESTful)

```js
const { token } = await client.getTokens()
const res = await fetch('http://example.org', {
  headers: {
    Authorization: `Bearer ${token}`,
    Accept: 'application/json'
  }
})
const body = await res.json()
if (res.status === 200) {
  // handle response
} else {
  // handle error response
}
```

## Contributing

## License

## References

[keycloak]: https://keycloak.org
