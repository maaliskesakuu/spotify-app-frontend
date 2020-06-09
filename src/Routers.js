import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import History from './components/History/History';
import Home from './components/Home/Home';
import NavBar from './components/Navbar/Navbar';
import Activities from './components/Activities/Activities';
import User from './components/User/User';

const Routers = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/" exact component={Activities}></Route>
        <Route path="/history" exact component={History}></Route>
        <Route path="/activities" component={Home}></Route>
        <Route path="/user" component={User}></Route>
      </Switch>
    </Router>
  );
};

export default Routers;
