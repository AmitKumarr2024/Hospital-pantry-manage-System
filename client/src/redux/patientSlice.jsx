import { createSlice } from "@reduxjs/toolkit";
import { setError } from "./pantrySlice";

const initialState = {
  PatientDetails: [],
  isLoading: false,
  error: null,
};

const patientSlice = createSlice({
  name: "patient",
  initialState,
  reducers: {
    setPatientItems: (state, action) => {
      state.PatientDetails = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    set_Error: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setPatientItems, setLoading, set_Error } = patientSlice.actions;

export const selectPatient = (state) => state.patient;

export default patientSlice.reducer;
