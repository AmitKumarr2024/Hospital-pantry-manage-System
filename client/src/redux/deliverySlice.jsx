import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  deliveryDetails: [],
  isLoading: false,
  error: null,
};

const deliverySlice = createSlice({
  name: "delivery",
  initialState,
  reducers: {
    setDeliveryDetails: (state, action) => {
      state.deliveryDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    set_Error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setDeliveryDetails, setLoading, set_Error } =
  deliverySlice.actions;

export const selectDelivery = (state) => state.delivery;

export default deliverySlice.reducer;
