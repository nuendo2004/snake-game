import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useRef } from "react";
import styles from "./Board.module.css";
import { setHeight, setWidth } from "../store/ViewSlice";

const Board = () => {
  const row = useSelector((state) => state.viewPort.height);
  const col = useSelector((state) => state.viewPort.width);
  const cellPixel = useSelector((state) => state.viewPort.pixel);
  const [grid, setGrid] = useState([]);
  const [windowSize, setWindowSize] = useState({ height: 0, width: 0 });
  const isRunning = false;
  const dispatch = useDispatch();
  const boardViewSize = useRef();

  const snakeHead = useSelector((state) => state.snake);

  const resizeBoard = (height, width) => {
    if (height / cellPixel < height || width / cellPixel < width) {
      dispatch(setHeight(Math.floor(height / cellPixel) - 6));
      dispatch(setWidth(Math.floor(width / cellPixel)));
    }
  };

  const getSystemSize = () => {
    console.log(boardViewSize);
    const { clientWidth: width } = boardViewSize.current;
    const { innerHeight: height } = window;
    return { height, width };
  };

  useEffect(() => {
    const handleResize = () => {
      console.log("resize");
      setWindowSize(getSystemSize());
      if (!isRunning) {
        resizeBoard(windowSize.height, windowSize.width);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    //++++++++++++create grid+++++++++++++//
    let grid = [];
    for (let r = 0; r < row; r++) {
      for (let c = 0; c < col; c++) {
        grid.push({ row: r, col: c });
      }
    }
    console.log(row, col);
    setGrid(grid);
    //+++++++++++ clean up ++++++++++++++++//

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [windowSize.height, windowSize.width, row, col]);

  const renderGrid = (grid) => {
    return grid.map((cell) => {
      const isSnake = () => {
        return (
          cell.row === snakeHead.head.value[0] &&
          cell.col === snakeHead.head.value[1]
        );
      };
      return (
        <div
          className={`${styles.cell} ${isSnake() ? styles.snake : ""}`}
          key={`${cell.row}_${cell.col}`}
        />
      );
    });
  };

  return (
    <div
      ref={boardViewSize}
      className={styles.board}
      style={{
        gridTemplateRows: `repeat(${row}, 20px)`,
        gridTemplateColumns: `repeat(${col}, 20px)`,
      }}
    >
      {renderGrid(grid)}
    </div>
  );
};

export default Board;
