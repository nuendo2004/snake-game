import { configureStore } from "@reduxjs/toolkit";
import ViewReducer from "./ViewSlice";

const Store = configureStore({
  reducer: { viewPort: ViewReducer },
});

export default Store;
