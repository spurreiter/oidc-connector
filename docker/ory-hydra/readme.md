
export aep="--endpoint http://127.0.0.1:4445/"
hydra clients list $aep
hydra clients create $aep --id my-client --secret secret -g client_credentials

export tep="--endpoint http://127.0.0.1:4444/"
token=$(hydra token client $tep --client-id my-client --client-secret secret)
echo $token
hydra token introspect $aep $token

hydra clients create $aep \
--id auth-code-client \
--secret secret \
--grant-types authorization_code,refresh_token \
--response-types code,id_token \
--scope openid,offline \
--callbacks http://127.0.0.1:5555/callback

hydra token user \
$tep \
--client-id auth-code-client \
--client-secret secret \
--port 5555 \
--scope openid,offline

hydra clients delete $aep my-app
hydra clients create $aep \
--id my-app \
--grant-types authorization_code,refresh_token \
--response-types code,id_token \
--scope openid,offline \
--token-endpoint-auth-method none \
--allowed-cors-origins http://localhost:8000 \
--post-logout-callbacks http://localhost:8000/ \
--callbacks http://localhost:8000/,http://localhost:8000/silent-login-check.html
