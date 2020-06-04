import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import App from "./components/App/App";
import CreatePlaylist from "./components/CreatePlaylist/Playlist";
import Home from "./components/Home/Home";
import History from "./components/History/History";
//import Navbar from "./components/Navbar/Navbar";

const Routers = () => {
  return (
    <Router>
      {/* <Navbar /> */}
      <App />
      <Switch>
        <Route path="/home" exact component={Home}></Route>
        <Route path="/history" component={History}></Route>
        <Route path="/playlist" component={CreatePlaylist}></Route>
      </Switch>
    </Router>
  );
};

export default Routers;
