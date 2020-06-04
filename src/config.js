// export default function () {
//   let token = window.location.hash.substr(1);
//   if (token) {
//     const o = Object.fromEntries(new URLSearchParams(token));
//     return o.access_token;
//   } else {
//     redirectToSpotifyAuthentication();
//   }
// }

// function redirectToSpotifyAuthentication() {
//   const authEndpoint = "https://accounts.spotify.com/authorize";
//   const clientId = "986549d096a742d0916ebc342f19d4b4";
//   const redirectUri = `${window.location.protocol}//${window.location.host}/`;
//   let query = `client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&show_dial/`;
//   window.location = `${authEndpoint}?${query}`;
// }

//endpoint of the Spotify Accounts service
export const authEndpoint = "https://accounts.spotify.com/authorize";

// our app's client id
export const clientId = "";
// the address to which the Spotify Accounts service redirects
export const redirectUri = "http://localhost:3000/home";

// user must authorize access to the data defined in the scopes
export const scopes = [
  "user-top-read",
  "user-read-currently-playing",
  "user-read-playback-state",
];
