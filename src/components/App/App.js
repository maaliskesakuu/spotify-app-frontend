import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from '../../config';
import hash from '../../hash';
import './App.css';
import Routers from '../../Routers';

import 'bootstrap/dist/css/bootstrap.min.css';

import Button from 'react-bootstrap/Button';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    // Set token
    let _token = hash.access_token;

    if (_token) {
      // Set token
      this.setState({
        token: _token,
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header>
          {!this.state.token && (
            // this is the call to the Spotify Account Service
            <div className="container">
              <Button style={{ textAlign: 'center', color: 'white' }}>
                <a
                  href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                    '%20'
                  )}&response_type=token&show_dialog=true`}
                  style={{ color: 'white' }}
                >
                  Login to Spotify
                </a>
              </Button>
            </div>
          )}

          {this.state.token && (
            //When you have a token show this
            <Routers />
          )}
        </header>
      </div>
    );
  }
}

export default App;
