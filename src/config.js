//endpoint of the Spotify Accounts service
export const authEndpoint = 'https://accounts.spotify.com/authorize';

// our app's client id
export const clientId = 'cc0b23ed0ef842bdba9556fd9aad1863';

// the address to which the Spotify Accounts service redirects
export const redirectUri = 'http://localhost:3000/callback';

// user must authorize access to the data defined in the scopes
export const scopes = [
  'user-top-read',
  'user-read-currently-playing',
  'user-read-playback-state',
];
