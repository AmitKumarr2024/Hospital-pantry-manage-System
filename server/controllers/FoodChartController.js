import mongoose from "mongoose";
import FoodChart from "../models/FoodChart.js";
import Patient from "../models/Patient.js";
import logger from "../helper/logger.js";

export const createFoodChart = async (req, res) => {
  try {
    const {
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      specialInstructions,
    } = req.body;

    logger.info("Received request to create food chart:", req.body);

    // Validate patientId
    if (!mongoose.Types.ObjectId.isValid(patientId)) {
      logger.info("Invalid Patient ID:", patientId);
      return res
        .status(400)
        .json({ message: "Invalid Patient ID", error: true });
    }

    // Check if the patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      logger.info("Patient not found with id:", patientId);
      return res
        .status(404)
        .json({ message: "Patient not found", error: true });
    }

    // Create new food chart
    const newFoodChart = new FoodChart({
      patientId: new mongoose.Types.ObjectId(patientId),
      morningMeal,
      afternoonMeal,
      eveningMeal,
      specialInstructions,
    });

    await newFoodChart.save();
    logger.info("Food Chart created successfully:", newFoodChart);

    res.status(201).json({
      message: "Food Chart created successfully",
      success: true,
      foodChart: newFoodChart,
    });
  } catch (error) {
    logger.error("Error creating food chart", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update an existing food chart
export const updateFoodChart = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      patientId,
      morningMeal,
      afternoonMeal,
      eveningMeal,
      specialInstructions,
    } = req.body;

    logger.info("Received request to update food chart with id:", id);
    logger.info("Update data received:", req.body);

    const foodChart = await FoodChart.findById(id);
    if (!foodChart) {
      logger.info("Food Chart not found with id:", id);
      return res
        .status(404)
        .json({ message: "Food Chart not found", error: true });
    }

    logger.info("Food Chart found:", foodChart);

    // Update food chart details
    foodChart.patientId = patientId || foodChart.patientId;
    foodChart.morningMeal = morningMeal || foodChart.morningMeal;
    foodChart.afternoonMeal = afternoonMeal || foodChart.afternoonMeal;
    foodChart.eveningMeal = eveningMeal || foodChart.eveningMeal;
    foodChart.specialInstructions =
      specialInstructions || foodChart.specialInstructions;

    await foodChart.save();
    logger.info("Food Chart updated successfully:", foodChart);

    res.status(200).json({
      message: "Food Chart updated successfully",
      success: true,
      foodChart,
    });
  } catch (error) {
    logger.error("Error updating food chart", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a food chart
export const deleteFoodChart = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Received request to delete food chart with id:", id);

    // Check if the food chart exists
    const foodChart = await FoodChart.findById(id);
    if (!foodChart) {
      logger.info("Food Chart not found with id:", id);
      return res
        .status(404)
        .json({ message: "Food Chart not found", error: true });
    }

    logger.info("Food Chart found:", foodChart);

    // Delete the food chart
    await FoodChart.deleteOne({ _id: id });
    logger.info("Food Chart deleted successfully with id:", id);

    res.status(200).json({
      message: "Food Chart deleted successfully",
      success: true,
    });
  } catch (error) {
    logger.error("Error deleting food chart", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all food charts
export const getAllFoodCharts = async (req, res) => {
  try {
    logger.info("Received request to get all food charts");

    const foodCharts = await FoodChart.find().populate("patientId");
    logger.info("Food Charts fetched successfully");

    res.status(200).json({
      message: "Food Charts fetched successfully",
      success: true,
      foodCharts,
    });
  } catch (error) {
    logger.error("Error fetching food charts", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a food chart by ID
export const getFoodChartById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Received request to get food chart with id:", id);

    const foodChart = await FoodChart.findById(id).populate("patientId");
    if (!foodChart) {
      logger.info("Food Chart not found with id:", id);
      return res
        .status(404)
        .json({ message: "Food Chart not found", error: true });
    }

    logger.info("Food Chart fetched successfully:", foodChart);

    res.status(200).json({
      message: "Food Chart fetched successfully",
      success: true,
      foodChart,
    });
  } catch (error) {
    logger.error("Error fetching food chart", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
