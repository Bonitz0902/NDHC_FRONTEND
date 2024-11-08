import { createSlice } from "@reduxjs/toolkit";

const sampleSlice = createSlice({
  name: "sampleSlice",
  initialState: {
    sampleSlice: [],
  },
  reducers: {
    sampleReducer: (state, action) => {
      state.sampleItems = action.payload;
    },
  },
});

export const { sampleReducer } = sampleSlice.actions;
export default sampleSlice.reducer;
