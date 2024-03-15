import React, { useState } from 'react'
import Card from './Card';

const Game = ({player1Cards, player2Cards}) => {
    const [selectedCard1, setSelectedCard1] = useState(null);
    const [selectedCard2, setSelectedCard2] = useState(null);
    const [winner, setWinner] = useState(null);
  
    const handleCardSelection = (card, player) => {
      if (player === 1 && !selectedCard1) {
        setSelectedCard1(card);
      } else if (player === 2 && !selectedCard2) {
        setSelectedCard2(card);
        determineWinner(card);
      }
    };
  
    const determineWinner = (card2) => {
      if (selectedCard1 > card2) {
        setWinner(1);
      } else if (selectedCard1 < card2) {
        setWinner(2);
      } else {
        setWinner('tie');
      }
    };
  
    const resetGame = () => {
      setSelectedCard1(null);
      setSelectedCard2(null);
      setWinner(null);
    };
  
    return (
      <div>
        <h2>Game Board</h2>
        <div>
          <h3>Player 1</h3>
          {player1Cards.map((card, index) => (
            <Card key={index} value={card} onClick={() => handleCardSelection(card, 1)} />
          ))}
        </div>
        <div>
          <h3>Player 2</h3>
          {player2Cards.map((card, index) => (
            <Card key={index} value={card} onClick={() => handleCardSelection(card, 2)} />
          ))}
        </div>
        {winner && (
          <div>
            {winner === 'tie' ? (
              <p>It's a tie!</p>
            ) : (
              <p>Player {winner} wins!</p>
            )}
            <button onClick={resetGame}>Play Again</button>
          </div>
        )}
      </div>
    );
}

export default Game