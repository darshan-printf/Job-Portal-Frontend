import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice"; // Import the new slice

const store = configureStore({
  reducer: {
    data: dataReducer
  },
});

export default store;
