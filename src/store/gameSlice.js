import { createSlice } from "@reduxjs/toolkit";

const gameState = {
  isRunning: false,
  snakeDirection: "",
  snakeSize: 1,
  score: 0,
};

const gameSlice = createSlice({
  name: "gameState",
  initialState: gameState,
  reducers: {
    changeDir(state, action) {
      state.snakeDirection = action.payload;
    },
  },
});

export const { changeDir } = gameSlice.actions;

export default gameSlice.reducer;
