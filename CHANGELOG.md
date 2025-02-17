# 1.5.0 (2025-02-17)

- feat: verify issuer according to rfc9207 (#c561f4e)
- fix: formatting with prettier (#ec5218e)
- chore: bump dev dependencies (#4e9a49f)

# 1.4.5 (2024-11-06)

- fix: linter issues (#e13a1db)
- test: upgrade jsdom (#dfb4ebf)
- test: remove jsrsasign test dependency (#25c8632)
- docs: tested with zitadel (#a8ac084)
- chore: ci with node@20, 22 (#e13df53)
- chore: bump dependencies, test with node@22 (#33a9e0e)
- chore: update eslint@9 (#d6649b7)
- chore: debugging and formatting config (#01e5e6b)
- chore: bump some dependencies (#21c7761)

# 1.4.4 (2023-11-22)

- chore: bump devDependencies (#66cc0c6)

# 1.4.3 (2023-07-24)

- fix: do not clear tokens before logout (#e0afec3)
- chore: bump dep dependencies (#a57e50b)

# 1.4.2 (2023-07-01)

- fix: make prompt optional (#c72d8c5)
- chore: bump dependencies (#6adbace)
- chore: github actions @v3 (#cad2133)

# 1.4.1 (2023-06-15)

- fix: logout if access token has expired (#36df1eb)

# 1.4.0 (2023-04-13)

- feat: new option scopeInTokenRequest (#af38d30)
- chore: move mocharc into package.json (#60ea19a)
- chore(example): fix middleware mode (#9e9d609)
- chore: bump dev dependencies (#eebc718)

# 1.3.0 (2023-01-29)

- feat: client.getParsedToken() method (#3a27127)
- chore: bump dependencies (#1399f0a)
- chore: fix actions (#86c68d4)

# 1.2.1 (2022-10-22)

- chore: bump dev dependencies (#569ad1f)
- chore: revert eslint (#ebfa23f)
- chore: bump dependencies (#2a00002)
- refactor: event-emitter replace Map with Set (#221f532)
- test(example): auto start dev servers (#1e03c74)
- chore: run with coverage report (#0af5051)
- chore: enable github actions (#5989fca)

# 1.2.0 (2021-12-26)

- test: authentik server (#c4d546b)
- chore: editorconfig (#22efc9a)
- test: example app (#f39a19e)
- feat: support multiple clients (#5ed38ea)
- fix: initialize client (#cc232a8)
- fix: no clear on url creation (#f93f0a8)
- feat: make SessionStorage the default (#9d76296)
- feat: types (#d919724)
- docs: chrome disabling web security (#28300d9)

# 1.1.0 (2021-05-08)

- chore: npmignore (#cea78b4)
- feat: memory storage (#767a2ab)
- test: fix shim (#82931a7)
- test: different docker setups (#8de2f4c)
- feat: token_endpoint_auth_methods_supported (#7345257)
- fix: linter issues (#dd2297c)
- chore: bump dependencies (#ad873cf)
- docs: improved usage (#4689a85)
- fix: timeout on check silent login iframe (#e576426)
- docs: compatibility with fusionauth ory/hydra (#b1a25a7)
- test: oicdConfig (#d3ee505)
- docs: improve documentation (#055f0f0)
- chore: prepublish script (#84ac5b1)

# 1.0.0 (2020-11-12)

- fix: default silent login opts (#b85f3d6)
- chore: homepage & repo (#270dc36)
- feat: add prompt opts to silent login (#1134d9b)
- feat: getTokens exports token claims (#14a6c13)
- docs: successful test with oidc-provider (#20511ca)
- chore: exclude configs from package (#bf45879)
- chore: linter issues (#d419b3f)
- fix: client tests (#c38116f)
- fix: simplify supported callback params (#a937d54)
- fix: implict or hybrid flow may only need access token to successfully authenticate (#fd216e5)
- refactor: allow mocking of iframe (#544023f)
- fix: silently disable session check (#d9de711)
- fix: logout if access token is expired and no refresh token is present (#ced660f)
- fix: silently disable session management (#cef7ac0)
- fix: start scheduling status iframe (#212b22b)
- refactor: rename to accessToken (#f22c613)
- chore: gitignore (#3f42719)
- chore: add NOTICE file (#b453827)
- test: fix displaying form data (#9657dd1)
- docs: typo (#0a324bb)
- chore: linter issues (#d313d47)
- docs: update bundle size (#57f57a4)
- test: example app (#1376cb3)
- fix: session management (#20c486e)
- feat: functional :tada: (#d72180e)
- wip: client (#e1f2adf)
- wip: tokens and endpoints (#3960144)
- wip: utility functions (#dc7d803)
- initial (#3a8e27a)


