//endpoint of the Spotify Accounts service
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// our app's client id
export const clientId = 'b8d6631d6c4f4b2fb624122c6c84fa52';

// the address to which the Spotify Accounts service redirects
export const redirectUri = 'http://localhost:3000/';

// user must authorize access to the data defined in the scopes
export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
];