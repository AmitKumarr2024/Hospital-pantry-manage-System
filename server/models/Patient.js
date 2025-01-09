import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["Male", "Female", "Other"],
  },
  contact: {
    type: String,
    required: true,
  },
  emergencyContact: {
    type: String,
  },
  allergies: [
    {
      type: String,
    },
  ],
  disease: {
    type: String,
  },
  room: {
    type: String,
  },
  dietChart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "FoodChart",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Patient = mongoose.model("Patient", patientSchema);

export default Patient;
