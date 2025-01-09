import mongoose from "mongoose";

const foodChartSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true,
  },
  morningMeal: {
    type: String,
  },
  afternoonMeal: {
    type: String,
  },
  eveningMeal: {
    type: String,
  },
  specialInstructions: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const FoodChart = mongoose.model("FoodChart", foodChartSchema);

export default FoodChart;
