import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
//import App from "./App";
//import CreatePlaylist from "./components/CreatePlaylist/Playlist";
import Home from "./components/Home";
import History from "./components/History";
import Playlist from './components/Playlist/Playlist';
//import Navbar from "./components/Navbar/Navbar";


const Routers = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      
      <Switch>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/history" component={History}></Route>
        <Route path="/Playlist" component={Playlist}>
        
        </Route>
      </Switch>
    </Router>
  );
};

export default Routers;