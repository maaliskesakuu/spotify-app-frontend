import React, { Component } from 'react';
import { authEndpoint, clientId, redirectUri, scopes } from '../../config';
import hash from '../../hash';
import './App.css';
import Routers from '../../Routers';
import Footer from '../Footer/Footer';
import Video from '../Video/snow.mp4';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../FontawesomeIcons/icons';

import 'bootstrap/dist/css/bootstrap.min.css';

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
      <>
        <div className="background">
          <header>
            {!this.state.token && (
              // this is the call to the Spotify Account Service
              <div id="container">
                <video autoPlay loop muted>
                  <source src={Video} type="Video/mp4" />
                </video>
                <h1>Welcome</h1>
                <img
                  src="logoMusic.png"
                  alt="logo"
                  style={{ width: '120px' }}
                />
                <h2>We made your music life much easier.</h2>
                <div className="icon_wrap">
                  <FontAwesomeIcon icon="search" className="ico" />
                  <h3>Search</h3>
                  <p>music based on your activity</p>
                  <br />
                  <FontAwesomeIcon icon="mouse-pointer" className="ico" />
                  <h3>Hover</h3>
                  <p>to get a glimpse of your tracks</p>
                  <br />
                  <FontAwesomeIcon icon="plus" className="ico" />
                  <h3>Create</h3>
                  <p>your own library</p>
                </div>

                <button
                  id="btn"
                  style={{
                    border: 'none',
                    backgroundColor: 'rgb(231, 130, 0)',
                    borderRadius: '20px',
                    marginBottom: '5rem',
                  }}
                >
                  <a
                    className="login"
                    href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                      '%20'
                    )}&response_type=token&show_dialog=true`}
                    style={{ color: "black" }}
                  >
                    Get started!
                  </a>
                </button>
              </div>
            )}
          </header>
        </div>
        <main style={{minHeight:"100vh"}}>{this.state.token && <Routers />}</main>
        <footer>
        {this.state.token && <Footer />}
        </footer>
      </>
    );
  }
}

export default App;
