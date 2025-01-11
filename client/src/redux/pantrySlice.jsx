import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pantryItems: [],
  isLoading: false,
  error: null,
};

const pantrySlice = createSlice({
  name: "pantry",
  initialState,
  reducers: {
    setPantryItems: (state, action) => {
      state.pantryItems = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPantryItems, setLoading, setError } = pantrySlice.actions;

export const selectPantry = (state) => state.pantry;

export default pantrySlice.reducer;
