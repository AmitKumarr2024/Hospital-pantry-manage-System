import express from "express";
import {
  createDelivery,
  deleteDelivery,
  getAllDeliveries,
  getSingleDelivery,
  updateDeliveryStatus,
} from "../controllers/deliveryController.js";

const router = express.Router();

router.post("/create-delivery", createDelivery); // Add new delivery
router.get("/single-delivery/:id", getSingleDelivery); // Get deliveries (optional filter by patientId)
router.put("/update-delivery/:id", updateDeliveryStatus); // Change delivery status
router.delete("/delete-delivery/:id", deleteDelivery); // Remove a delivery
router.get("/get-All-Delivery", getAllDeliveries);
export default router;
