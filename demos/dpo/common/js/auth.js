const auth0 = new window.Auth0Client({
  domain: 'blindnet.eu.auth0.com',
  client_id: '1C0uhFCpzvJAkFi4uqoq2oAWSgQicqHc',
  audience: 'https://blindnet-connector-demo-staging.azurewebsites.net',
  redirect_uri: `${window.location.origin}/demos/dpo/privacy-portal`,
  authorizationParams: {
    redirect_uri: `${window.location.origin}/demos/dpo/privacy-portal`,
  },
  allowSignUp: false,
  passwordlessMethod: `link`,
});

function login() {
  auth0.loginWithRedirect();
}

function logout() {
  auth0.logout({
    returnTo: `${window.location.origin}/demos/dpo`,
  });
}

async function renderLoggedInState() {
  try {
    // Get auth0 token and claims
    const accessToken = await auth0.getTokenSilently();
    const claims = await auth0.getIdTokenClaims();

    // Include auth0 token in blindnet token request header
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    // Exchange auth0 token for blindnet token from backend
    const blindnetToken = await fetch(
      'https://blindnet-connector-demo-staging.azurewebsites.net/auth/token',
      {
        method: 'GET',
        headers,
      }
    )
      .then(response => response.json())
      .then(result => result.token);

    document.getElementById('not-logged-in').setAttribute('hidden', 'true');
    document.getElementById('logged-in').removeAttribute('hidden');
    document.getElementById('ipt-user-profile').innerHTML = claims.name;
    document.getElementById('token').value = blindnetToken;

    // Push blindnet token to the privacy portal component
    document
      .getElementById('privacy-portal')
      .setAttribute('api-token', blindnetToken);
  } catch {
    document.getElementById('not-logged-in').removeAttribute('hidden');
    document.getElementById('logged-in').setAttribute('hidden', 'true');
    document.getElementById('ipt-user-profile').innerHTML = '';
    document.getElementById('token').value = null;
    document.getElementById('privacy-portal').setAttribute('api-token', null);
  }
}

function getBlindnetToken() {
  return document.getElementById('token').value;
}

window.onload = async () => {
  renderLoggedInState();
};
