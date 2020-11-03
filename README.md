# Harmony
![Harmony music image](./public/Harmony-Spotify-App-image.png?raw=true)


This is a school project that was bootstrapped with [Create React App]

This application uses Spotify Web API to discover user's most listened tracks and artists from Spotify. User can listen to previews of different music based on a particular category or what mood they are in, user can also create playlists from their favorite tracks and artists to Spotify app.

Try it out [Harmony Demo](https://harmony-fbddf.web.app/)

## Spotify
Application uses following parts of Spotify Web API

* Authorization
* Get user's Tracks based on category 
* Get Top Tracks for Artist
* Get Recently played/History tracks for user
* Creating playlist
* Adding tracks to playlist
* Get a list of user's playlists
* User profile information

### How to Use Spotify API
Go to [Spotify Dashboard](https://developer.spotify.com/dashboard/), log in and create a new App.

Add localhost:3000/ as Redirect URI in your Spotify App Settings.


* Register an application with Spotify
* Grab the Client Id that will be added to env.js.
* Authenticate a user and get authorization to access user data
* Retrieve the data from a Web API endpoint

## Borrowed Ideas/Credits
* From React Spotify Player by [Joe Karlsson](https://github.com/JoeKarlsson/react-spotify-player)
* Musicophile by [Simplilearn](https://www.simplilearn.com/react-tutorial-article)
* Replayify App by [Pasi Lampinen](https://github.com/palampinen/replayify)
* Pusher article by [Ayooluwa Isaiah](https://pusher.com/tutorials/spotify-history-react-node#set-up-the-server)

## Technologies Used
* React Bootstrap
* Favicon
* Fontawesome
