import { configureStore } from "@reduxjs/toolkit";
import pantryReducer from "./pantrySlice"; // Adjust path as needed
import patientReducer from "./patientSlice";
import deliveryReducer from "./deliverySlice";
// Create and configure the store
const store = configureStore({
  reducer: {
    pantry: pantryReducer, // Add pantrySlice reducer here
    patient: patientReducer,
    delivery: deliveryReducer,
  },
});

export default store;
