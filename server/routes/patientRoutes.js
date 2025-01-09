import express from "express";

import {
  createPatient,
  deletePatient,
  getAllPatients,
  getPatientById,
  updatePatient,
} from "../controllers/PatientController.js";
import checkManagerRole from "../middlewares/checkManagerRole .js";


const router = express.Router();

router.post("/create-patient", createPatient); // Add new patient
router.put("/update-patient/:id", checkManagerRole, updatePatient); // Update patient details
router.delete("/delete-patient/:id", deletePatient); // Remove a patient
router.get("/all-patients", getAllPatients); // Get all patients
router.get("/single-patient/:id", getPatientById); // Get one patient by ID

export default router;
