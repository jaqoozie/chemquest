// src/MazeGame.tsx

import React, { useEffect, useState } from 'react';
import GameBoard from '@/components/MazeGame/GameBoard';
import PulseIndicator, { PulseIndicatorProps } from './PulseIndicator';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

interface AlreadyMadeMove {
  x: number;
  y: number;
}

const MazeGame: React.FC = () => {
  const maxPresses = 5;
  const bpmTreshold = 6000;
  const road = [
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0],
    [0, 0, 0, 1, 1, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 1, 0, 0, 0, 0],
  ];
  const [playerPosition, setPlayerPosition] = useState({
    x: 3,
    y: road.length - 1,
  });
  const [presses, setPresses] = useState(0);
  const [moving, setIsMoving] = useState(false);
  const [alreadyMadeMoves, setAlreadyMadeMoves] = useState<AlreadyMadeMove[]>(
    [],
  );
  const [pulseIndicatorProps, setPulseIndicatorProps] =
    useState<PulseIndicatorProps>({ color: 'danger', text: 'PRESS HARDER!!' });
  const [bpm, setBpm] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [gameOverText, setGameOverText] = useState('YOU MANAGED TO ESCAPE!!');

  const isMoveAllowed = (x: number, y: number) => {
    if (y > road?.length) return false;
    if (x > road[y]?.length) return false;
    if (road[y] && road[y][x] === 1) {
      if (alreadyMadeMoves.find((move) => move.x == x && move.y == y)) {
        return false;
      }

      return true;
    }
    return false;
  };

  const updatePulseIndicator = () => {
    let color = 'danger';
    let text = 'PRESS HARDER!!! THE COPS ARE COMING!!!';

    if (bpm > bpmTreshold / 1000) {
      if (bpm > (bpmTreshold / 1000) * 2) {
        color = 'success';
        text = 'AMAZING LETS GOOO!!!';
      } else {
        color = 'warning';
        text = 'MORE STEAM NEEDED!!!';
      }
    }

    setPulseIndicatorProps({ color, text });
  };

  useEffect(() => {
    setInterval(() => {
      setBpm(0);
      updatePulseIndicator();
    }, bpmTreshold);
  }, [bpmTreshold]);

  const movePlayer = () => {
    setBpm(bpm + 1);
    if (moving) return;

    setIsMoving(true);
    if (presses !== maxPresses) {
      setPresses(presses + 1);
    } else {
      setPresses(0);
      let newX = playerPosition.x;
      let newY = playerPosition.y;

      if (isMoveAllowed(newX + 2, newY)) {
        newX++;
      } else if (isMoveAllowed(newX - 2, newY)) {
        newX--;
      } else if (isMoveAllowed(newX, newY - 1)) {
        newY--;
      } else if (isMoveAllowed(newX + 1, newY)) {
        newX++;
      } else if (isMoveAllowed(newX - 1, newY)) {
        newX--;
      }
      setPlayerPosition({ x: newX, y: newY });
      setAlreadyMadeMoves([...alreadyMadeMoves, { x: newX, y: newY }]);
      if (newY === 0) {
        setGameOver(true);
      }
    }
    setIsMoving(false);
  };

  const renderTime = ({ remainingTime }: { remainingTime: number }) => {
    if (remainingTime === 0) {
      setGameOverText('YOU GOT CAUGHT! SURRENDER YOUR ANUS!');
      setGameOver(true);
      return <div className="timer">GAME OVER</div>;
    }
    return (
      <div className="timer">
        <div className="value">{remainingTime}s</div>
      </div>
    );
  };
  useEffect(() => {
    updatePulseIndicator();
  }, [presses]);

  return (
    <div
      onKeyDown={movePlayer}
      onTouchStart={movePlayer}
      tabIndex={0}
      style={{ outline: 'none' }}
    >
      {!gameOver && (
        <PulseIndicator
          color={pulseIndicatorProps.color}
          text={pulseIndicatorProps.text}
        ></PulseIndicator>
      )}
      {!gameOver && (
        <div className="mazeGameCountDownTimer">
          <CountdownCircleTimer
            isPlaying
            duration={30}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 1 })}
            size={75}
          >
            {renderTime}
          </CountdownCircleTimer>
        </div>
      )}
      {gameOver && <h1>{gameOverText}</h1>}
      <GameBoard road={road} playerPosition={playerPosition} />
    </div>
  );
};

export default MazeGame;
