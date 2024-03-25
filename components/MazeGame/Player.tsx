// src/components/Player.tsx

import React from 'react';

interface PlayerProps {
  x: number;
  y: number;
}

const Player: React.FC<PlayerProps> = ({ x, y }) => {
  return (
    <div
      style={{
        position: 'absolute',
        top: y * 50 + y / 3.5, // Adjust according to your grid size
        left: x * 50, // Adjust according to your grid size
        width: '50px', // Adjust according to your grid size
        height: '50px', // Adjust according to your grid size
        backgroundColor: 'red',
        borderRadius: '50%',
      }}
    />
  );
};

export default Player;
