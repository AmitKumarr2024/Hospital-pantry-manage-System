import Patient from "../models/Patient.js";
import FoodChart from "../models/FoodChart.js";
import logger from "../helper/logger.js";

const createDefaultDietChart = async () => {
  const defaultDietChart = new FoodChart({
    morningMeal: "Default Morning Meal",
    afternoonMeal: "Default Afternoon Meal",
    eveningMeal: "Default Evening Meal",
    specialInstructions: "No special instructions",
  });
  await defaultDietChart.save();
  logger.info("Default diet chart created:", defaultDietChart);
  return defaultDietChart._id; // Return the ID after saving
};

export const createPatient = async (req, res) => {
  try {
    const {
      name,
      age,
      gender,
      contact,
      emergencyContact,
      allergies,
      disease,
      room,
      dietChartId,
    } = req.body;

    logger.info("Received request to create patient:", req.body);

    // Check if the diet chart exists before creating the patient
    let dietChart = await FoodChart.findById(dietChartId);
    if (!dietChart) {
      logger.info("Diet Chart not found, creating default diet chart");
      // Create a default diet chart if none exists
      dietChartId = await createDefaultDietChart(); // This will assign the newly created diet chart ID
    }

    // Now that we have a valid dietChartId, create a new patient entry
    const newPatient = new Patient({
      name,
      age,
      gender,
      contact,
      emergencyContact,
      allergies,
      disease,
      room,
      dietChart: dietChartId, // Use the dietChartId (which is valid now)
    });

    await newPatient.save();
    logger.info("Patient created successfully:", newPatient);

    res.status(201).json({
      message: "Patient created successfully",
      success: true,
      patient: newPatient,
    });
  } catch (error) {
    logger.error("Error creating patient", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      age,
      gender,
      contact,
      emergencyContact,
      allergies,
      disease,
      room,
      dietChartId,
    } = req.body;

    logger.info("Received request to update patient with id:", id);
    logger.info("Update data received:", req.body);

    // Check if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      logger.info("Patient not found with id:", id);
      return res
        .status(404)
        .json({ message: "Patient not found", error: true });
    }

    // Check if the diet chart exists before updating the patient
    if (dietChartId) {
      const dietChart = await FoodChart.findById(dietChartId);
      if (!dietChart) {
        logger.info("Diet Chart not found with id:", dietChartId);
        return res
          .status(404)
          .json({ message: "Diet Chart not found", error: true });
      }
      patient.dietChart = dietChartId; // Update diet chart
    }

    logger.info("Patient found:", patient);

    // Update patient details
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.gender = gender || patient.gender;
    patient.contact = contact || patient.contact;
    patient.emergencyContact = emergencyContact || patient.emergencyContact;
    patient.allergies = allergies || patient.allergies;
    patient.disease = disease || patient.disease;
    patient.room = room || patient.room;

    await patient.save();
    logger.info("Patient updated successfully:", patient);

    res.status(200).json({
      message: "Patient updated successfully",
      success: true,
      patient,
    });
  } catch (error) {
    logger.error("Error updating patient", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;

    logger.info("Received request to delete patient with id:", id);

    // Check if the patient exists
    const patient = await Patient.findById(id);
    if (!patient) {
      logger.info("Patient not found with id:", id);
      return res
        .status(404)
        .json({ message: "Patient not found", error: true });
    }

    logger.info("Patient found:", patient);

    // Delete the patient
    await patient.deleteOne();
    logger.info("Patient deleted successfully");

    res.status(200).json({
      message: "Patient deleted successfully",
      success: true,
    });
  } catch (error) {
    logger.error("Error deleting patient", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getAllPatients = async (req, res) => {
  try {
    logger.info("Received request to get all patients");

    const patients = await Patient.find().populate("dietChart");
    logger.info("Patients fetched successfully");

    res.status(200).json({
      message: "Patients fetched successfully",
      success: true,
      patients,
    });
  } catch (error) {
    logger.error("Error fetching patients", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    logger.info("Received request to get patient with id:", id);

    // Fetch the patient with populated diet chart details
    const patient = await Patient.findById(id).populate("dietChart");
    if (!patient) {
      logger.info("Patient not found with id:", id);
      return res
        .status(404)
        .json({ message: "Patient not found", error: true });
    }

    logger.info("Patient fetched successfully:", patient);

    res.status(200).json({
      message: "Patient fetched successfully",
      success: true,
      patient,
    });
  } catch (error) {
    logger.error("Error fetching patient", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
