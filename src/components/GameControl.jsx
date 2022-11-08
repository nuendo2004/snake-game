import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { changeDir } from "../store/gameSlice";
import {
  spawn,
  moveUp,
  moveDown,
  moveLeft,
  moveRight,
  grow,
} from "../store/snakeSlice";

const GameControl = () => {
  const dispatch = useDispatch();
  const row = useSelector((state) => state.viewPort.height);
  const col = useSelector((state) => state.viewPort.width);
  const startPoint = { y: Math.ceil(row / 2), x: Math.ceil(col / 2) };
  const snakeHead = useSelector((state) => state.snake);
  const [isRunning, setRunning] = useState(false);
  const snakeDir = useSelector((state) => state.gameState.snakeDirection);

  const setDirection = (e) => {
    if (
      e === "ArrowUp" ||
      e === "ArrowDown" ||
      e === "ArrowLeft" ||
      e === "ArrowRight"
    )
      dispatch(changeDir(e));
  };

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      e.preventDefault();
      console.log(e.key);
      setDirection(e.key);
      if (e.key === "x") dispatch(grow(snakeDir));
    });
  });

  const ran = Math.floor(Math.random() * 5);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        switch (snakeDir) {
          case "ArrowUp":
            dispatch(moveUp());
            break;
          case "ArrowDown":
            dispatch(moveDown());
            break;
          case "ArrowLeft":
            dispatch(moveLeft());
            break;
          case "ArrowRight":
            console.log("moveRight");
            dispatch(moveRight());
            break;
          default:
            if (ran === 1) setDirection("ArrowUp");
            else if (ran === 2) setDirection("ArrowDown");
            else if (ran === 3) setDirection("ArrowLeft");
            else setDirection("ArrowRight");
            break;
        }
        // dispatch(
        //   move({ x: snakeHead.head.value[0] + 1, y: snakeHead.head.value[1] })
        // );
      }, 120);
      return () => clearInterval(timer);
    }
  }, [isRunning, snakeHead, snakeDir]);

  const runGame = () => {
    dispatch(spawn(startPoint));
    setRunning(!isRunning);
  };

  return (
    <div>
      <button onClick={runGame}>Start</button>
    </div>
  );
};

export default GameControl;
