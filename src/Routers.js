import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import App from './components/App/App';
// import Playlist from './components/CreatePlaylist/Playlist';
import History from './components/History/History';
import Home from './components/Home/Home';
import NavBar from './components/Navbar/Navbar';
import Activities from './components/Activities/Activities';

const Routers = () => {
  return (
    <Router>
      <NavBar />
      {/* <App /> */}
      <Switch>
        <Route path="/" exact component={Home}></Route>
        <Route path="/history" exact component={History}></Route>
        <Route path="/activities" component={Activities}></Route>
        {/* <Route path="/playlist" exact component={Playlist}></Route> */}
      </Switch>
    </Router>
  );
};

export default Routers;
