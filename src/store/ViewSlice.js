import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
  name: "gameView",
  initialState: {
    OSsize: { width: 720, height: 1080 },
    height: 0,
    width: 0,
    pixel: 20,
    grid: false,
  },
  reducers: {
    setHeight: (state, action) => {
      state.height = action.payload;
    },
    setWidth: (state, action) => {
      state.width = action.payload;
    },
    tgGrid: (state) => {
      state.grid = !state.grid;
    },
  },
});

export const { setHeight, setWidth, tgGrid } = viewSlice.actions;

export default viewSlice.reducer;
