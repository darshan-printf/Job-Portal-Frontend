import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null, // Default state is null
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setData: (state, action) => {
      state.data = action.payload; // Update state with fetched data
    },
    clearData: (state) => {
      state.data = null; // Clear data when needed
    },
  },
});

export const { setData, clearData } = dataSlice.actions;
export default dataSlice.reducer;
