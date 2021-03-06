import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import History from "./components/History/History";
import NewRelease from "./components/Home/NewRelease";
import NavBar from "./components/Navbar/Navbar";
import Activities from "./components/Activities/Activities";
import Playlist from "./components/CreatePlaylist/Playlist";
import Playlists from "./components/Playlists/Playlists";
import User from "./components/User/User";

const Routers = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Activities}></Route>
        <Route path="/history" component={History}></Route>
        <Route path="/featured" component={NewRelease}></Route>
        <Route path="/playlist" component={Playlist}></Route>
        <Route path="/playlists" component={Playlists}></Route>
        <Route path="/user" component={User}></Route>
      </Switch>
    </Router>
  );
};

export default Routers;
