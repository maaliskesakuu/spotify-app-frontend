import React, { Component } from 'react';
import './History.css';
import hash from '../../hash';
import { compareAsc, format } from 'date-fns';

class History extends Component {
  constructor() {
    super();
    this.state = {
      searchResults: [],
      token: null,
      musicHistory: [],
      audio: new Audio(''),
    };

    this.playMusic = this.playMusic.bind(this);
    this.pauseMusic = this.pauseMusic.bind(this);
    this.getRecentlyPlayed = this.getRecentlyPlayed.bind(this);
  }

  componentDidMount() {
    let _token = hash.access_token;

    if (_token) {
      this.setState({
        token: _token,
      });
      this.getRecentlyPlayed(_token);
    }
  }

  // fetching data of recently played songs
  getRecentlyPlayed = token => {
    fetch('https://api.spotify.com/v1/me/player/recently-played', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => res.json())
      .then(data => data.items)
      .then(data =>
        this.setState({
          musicHistory: data,
        })
      )
      .catch(error => {
        console.log(error);
      });
  };

  //play music onmouseEnter
  playMusic = preview => {
    console.log(preview);
    console.log('Play music');
    if (preview) {
      this.setState({ audio: new Audio(preview) }, () => {
        this.state.audio.play();
      });
    } else {
      console.log('no preview');
    }
  };

  //pause music when mouseOut
  pauseMusic = () => {
    console.log('Paused');
    this.state.audio.pause();
    this.setState({ audio: new Audio('') });
  };

  render() {
    const { musicHistory } = this.state;
    //displaying the date and time
    const dates = [
      new Date(1995, 6, 2),
      new Date(1987, 1, 11),
      new Date(1989, 6, 10),
    ];
    dates.sort(compareAsc);

    //table displays information
    const TableItem = (item, index) => (
      <tr key={item.played_at}>
        <td>{index + 1}</td>
        <td
          onMouseEnter={() => this.playMusic(item.track.preview_url)}
          className="play"
          onMouseOut={this.pauseMusic}
        >
          {item.track.name}
        </td>
        <td>{item.track.artists[0].name}</td>
        <td>{format(new Date(item.played_at), 'yyyy-MM-dd | hh:mm:ss')}</td>
      </tr>
    );

    //clear music history
    const clearHistoryHandler = () => {
      this.setState({ musicHistory: [] });
    };

    const RecentlyPlayed = () => (
      <div className="recently-played">
        <h2 className="head"> Listening History</h2>
        <button onClick={clearHistoryHandler}>Clear History</button>
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Track title</th>
              <th>Artist</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>{musicHistory.map((e, index) => TableItem(e, index))}</tbody>
        </table>
      </div>
    );

    return (
      <div>
        <div>
          {console.log(this.state.musicHistory)}
          {musicHistory.length !== 0 ? <RecentlyPlayed /> : null}
        </div>
      </div>
    );
  }
}

export default History;
