// src/components/GameBoard.tsx

import React from 'react';
import Player from './Player';


interface GameBoardProps {
  road: Array<Array<number>>;
  playerPosition: { x: number; y: number };
}

const GameBoard: React.FC<GameBoardProps> = ({ road, playerPosition }) => {
  const renderRoad = () => {
    return road.map((row, rowIndex) => (
      <div key={rowIndex} style={{ display: 'flex' }}>
        {row.map((cell, colIndex) => (
          <div
            key={`${rowIndex}-${colIndex}`}
            style={{
              width: '50px',
              height: '50px',
              border: '1px solid black',
              backgroundColor: cell === 1 ? 'black' : 'white',
            }}
          />
        ))}
      </div>
    ));
  };

  return (
    <div style={{ border: '2px solid black', position: 'relative' }}>
      {renderRoad()}
      <Player x={playerPosition.x} y={playerPosition.y} />
    </div>
  );
};

export default GameBoard;
