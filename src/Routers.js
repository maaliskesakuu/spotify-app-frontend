import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Playlist from './components/CreatePlaylist/Playlist';
import History from './components/History/History';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';

const Routers = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/history" exact component={History}></Route>
        <Route path="/playlist" exact component={Playlist}></Route>
      </Switch>
    </Router>
  );
};

export default Routers;
