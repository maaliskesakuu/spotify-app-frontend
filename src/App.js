import React from "react";
import "./App.css";
import Activities from './components/Activity/Activities';
//import History from './components/History';
//import NavBar from './components/NavBar';
//import Routers from './Routers';
//import Playlist from "./components/Playlist/Playlist";
import SearchBar from "./components/SearchBar/SearchBar";
//import SearchResults from "./components/SearchResults/SearchResults";
import Spotify from "./Util/Spotify";
//import { logDOM } from "@testing-library/react";
import logo from './Media/logoMusic.png';
 
class App extends React.Component {
  constructor(props) {
    super(props);
 
    this.state = {
     
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
 
     this.search = this.search.bind(this);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.removeTrackSearch = this.removeTrackSearch.bind(this);
    this.doThese = this.doThese.bind(this);
  } 
 
  search(term) {
    Spotify.search(term).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }
 
  addTrack(track) {
    let tracks = this.state.playlistTracks;
    if (tracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
 
    tracks.push(track);
    this.setState({ playlistTracks: tracks });
  }
 
  removeTrack(track) {
    let tracks = this.state.playlistTracks;
    let trackSearch = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    trackSearch.unshift(track);
    this.setState({ playlistTracks: tracks });
  }
 
  removeTrackSearch(track) {
    let tracks = this.state.searchResults;
    tracks = tracks.filter(currentTrack => currentTrack.id !== track.id);
    this.setState({ searchResults: tracks });
  }
 
  doThese(track) {
    this.addTrack(track);
    this.removeTrackSearch(track);
  }
 
  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }
 
  savePlaylist() {
    const trackUris = this.state.playlistTracks.map(track => track.uri);
    Spotify.savePlaylist(this.state.playlistName, trackUris).then(() => {
      this.setState({
        playlistName: "New Playlist",
        playlistTracks: []
      });
    });
  }
 
  render() {
    return (
      <div>
        <h1>
          <a href="http://localhost:3000/"><img src={logo} alt='logo pic'/></a>
        
        </h1>
        <div className="App">
          
          <SearchBar onSearch={this.search} />
          <Activities/>
          <div className="App-playlist">
            
             {/*<Playlist
              playlistTracks={this.state.playlistTracks}
              onNameChange={this.updatePlaylistName}
              onRemove={this.removeTrack}
              onSave={this.savePlaylist}
             />*/}
      
          </div>
        </div>
      </div>
    );
  }
}
 
export default App;
 