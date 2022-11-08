import { configureStore } from "@reduxjs/toolkit";
import viewReducer from "./ViewSlice";
import snakeReducer from "./snakeSlice";
import gameReducer from "./gameSlice";

const Store = configureStore({
  reducer: {
    viewPort: viewReducer,
    snake: snakeReducer,
    gameState: gameReducer,
  },
});

export default Store;
