export const wellKnownOidcKeycloak = {
  issuer: 'http://localhost:8080/auth/realms/my',
  authorization_endpoint:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/auth',
  token_endpoint:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/token',
  introspection_endpoint:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/token/introspect',
  userinfo_endpoint:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/userinfo',
  end_session_endpoint:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/logout',
  jwks_uri:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/certs',
  check_session_iframe:
    'http://localhost:8080/auth/realms/my/protocol/openid-connect/login-status-iframe.html',
  grant_types_supported: [
    'authorization_code',
    'implicit',
    'refresh_token',
    'password',
    'client_credentials'
  ],
  response_types_supported: [
    'code',
    'none',
    'id_token',
    'token',
    'id_token token',
    'code id_token',
    'code token',
    'code id_token token'
  ],
  subject_types_supported: ['public', 'pairwise'],
  id_token_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512'
  ],
  id_token_encryption_alg_values_supported: ['RSA-OAEP', 'RSA1_5'],
  id_token_encryption_enc_values_supported: [
    'A256GCM',
    'A192GCM',
    'A128GCM',
    'A128CBC-HS256',
    'A192CBC-HS384',
    'A256CBC-HS512'
  ],
  userinfo_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
    'none'
  ],
  request_object_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512',
    'none'
  ],
  response_modes_supported: ['query', 'fragment', 'form_post'],
  registration_endpoint:
    'http://localhost:8080/auth/realms/my/clients-registrations/openid-connect',
  token_endpoint_auth_methods_supported: [
    'private_key_jwt',
    'client_secret_basic',
    'client_secret_post',
    'tls_client_auth',
    'client_secret_jwt'
  ],
  token_endpoint_auth_signing_alg_values_supported: [
    'PS384',
    'ES384',
    'RS384',
    'HS256',
    'HS512',
    'ES256',
    'RS256',
    'HS384',
    'ES512',
    'PS256',
    'PS512',
    'RS512'
  ],
  claims_supported: [
    'aud',
    'sub',
    'iss',
    'auth_time',
    'name',
    'given_name',
    'family_name',
    'preferred_username',
    'email',
    'acr'
  ],
  claim_types_supported: ['normal'],
  claims_parameter_supported: false,
  scopes_supported: [
    'openid',
    'address',
    'email',
    'microprofile-jwt',
    'offline_access',
    'phone',
    'profile',
    'roles',
    'web-origins'
  ],
  request_parameter_supported: true,
  request_uri_parameter_supported: true,
  code_challenge_methods_supported: ['plain', 'S256'],
  tls_client_certificate_bound_access_tokens: true,
  authorization_response_iss_parameter_supported: true
}
