import React from 'react';
import Game from './Game';

const App = () => {
  return (
    <Game
      gameSize={{
        width: '600px',
        height: '600px'
      }}
      snakeColor={'#000'}
      foodColor={'#DC143C'}
      showResult={true}
    />
  );
}

export default App;