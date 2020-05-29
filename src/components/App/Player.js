import React from 'react';

//this whole component can be removed. Is just example code.

const Player = props => {
  const backgroundStyles = {
    backgroundImage: `url(${props.item.album.images[0].url})`,
  };

  return (
    <div>
      <div>
        <div>
          <img src={props.item.album.images[0].url} alt="album cover" />
        </div>
        <div>
          <div>{props.item.name}</div>
          <div>{props.item.artists[0].name}</div>
          <div>{props.is_playing ? 'Playing' : 'Paused'}</div>
        </div>
        <div style={backgroundStyles} />
      </div>
    </div>
  );
};

export default Player;
