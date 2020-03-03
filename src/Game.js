import React, { useState, useEffect, useCallback } from 'react';
import { initialState, getRandomCoordinates, directions } from './Utils';
import Snake from './Snake';
import Food from './Food';

const Game = ({ gameSize, snakeColor, foodColor, showResult }) => {
  const [snakeDots, setSnakeDots] = useState(initialState.snakeDots);
  const [food, setFood] = useState(initialState.food);
  const [speed, setSpeed] = useState(initialState.speed);
  const [direction, setDirection] = useState(initialState.direction);

  useEffect(() => {
    const interval = setInterval(moveSnake, speed)
    document.addEventListener('keydown', onKeyDown);
    return () => {
      clearInterval(interval);
      document.removeEventListener('keydown', onKeyDown);
    }
  });

  const reset = useCallback(() => {
    setSnakeDots(initialState.snakeDots);
    setFood(initialState.food);
    setSpeed(initialState.speed);
    setDirection(initialState.direction);
  }, [])

  const onGameOver = useCallback(() => {
    alert(`Game Over! Snake length is ${snakeDots.length}`);
    reset();
    return;
  }, [snakeDots.length, reset])

  const onKeyDown = useCallback((e) => {
    e = e || window.event;
    setDirection(directions[e.keyCode])
  },[]);

  const moveSnake = useCallback(() => {
    const dots = [...snakeDots];
    let head = dots[dots.length - 1];

    switch (direction) {
      case 'RIGHT':
        head = [head[0] + 2, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 2, head[1]];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 2];
        break;
      case 'UP':
        head = [head[0], head[1] - 2];
        break;
      default:
        break;
    }
    dots.push(head);
    dots.shift();
    setSnakeDots(dots);
  }, [direction, snakeDots])

  const outOfBorders = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
      onGameOver();
    }
  }, [onGameOver, snakeDots])

  const grow = useCallback(() => {
    const newSnake = [...snakeDots];
    newSnake.unshift([]);
    setSnakeDots(newSnake);
  }, [snakeDots])

  const increaseSpeed = useCallback(() => {
    if (speed > 10) {
      setSpeed(speed - 10);
    }
  }, [speed])

  const eat = useCallback(() => {
    const head = snakeDots[snakeDots.length - 1];
    if (head[0] === food[0] && head[1] === food[1]) {
      setFood(getRandomCoordinates())
      grow();
      increaseSpeed();
    }
  }, [grow, food, increaseSpeed, snakeDots])

  const collapse = useCallback(() => {
    const snake = [...snakeDots];
    const head = snake[snake.length - 1];
    snake.pop();
    snake.forEach(dot => head[0] === dot[0] && head[1] === dot[1] && onGameOver());
  }, [onGameOver, snakeDots])

  useEffect(() => {
    outOfBorders();
    collapse();
    eat();
  }, [outOfBorders, collapse, eat, snakeDots]);

  return (
    <div className="gameArea" style={gameSize}>
      <Snake snakeDots={snakeDots} snakeColor={snakeColor} />
      <Food food={food} foodColor={foodColor} />
      {showResult &&
        <div className='result'>
          {`Snake length is ${snakeDots.length}`}
        </div>}
    </div>
  );
}

export default React.memo(Game);