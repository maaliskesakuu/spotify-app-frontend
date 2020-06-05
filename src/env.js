export default function() {
    let token = window.location.hash.substr(1);
    if (token) {
        const o = Object.fromEntries(new URLSearchParams(token));
        return o.access_token;
    } else {
        // If there is no token, redirect to Spotify authorization
        redirectToSpotifyAuthentication();
    }
}

function redirectToSpotifyAuthentication() {
    const authEndpoint = 'https://accounts.spotify.com/authorize';
    const clientId = 'b8d6631d6c4f4b2fb624122c6c84fa52';
    const redirectUri = `${window.location.protocol}//${window.location.host}/`;
    let query = `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dialog=true`;
    window.location = `${authEndpoint}?${query}`;

}
//const clientId = "b8d6631d6c4f4b2fb624122c6c84fa52"; // Have to replace it with your clientId
//const redirectUri = "http://localhost:3000/"; // Have to add this to your accepted Spotify redirect URIs on the Spotify API.
//let accessToken;

