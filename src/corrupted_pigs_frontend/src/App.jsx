import { useState } from 'react';
import { corrupted_pigs_backend } from 'declarations/corrupted_pigs_backend';
import Game from "./components/Game";
import CreateGame from './components/CreateGame';
import JoinGame from './components/JoinGame';

function App() {
  const [roomId, setRoomId] = useState(null);
  const [player1Cards, setPlayer1Cards] = useState([1, 10, 3]); // Sample cards for player 1
  const [player2Cards, setPlayer2Cards] = useState([4, 5, 6]); // Sample cards for player 2



  return (
    <div>
      {!roomId ? (
        <div>
          <h1>Corrupted Pigs</h1>
          <CreateGame />
          <JoinGame />
        </div>
      ) : (
        <Game player1Cards={player1Cards} player2Cards={player2Cards} />
      )}
    </div>
  );
};

export default App;