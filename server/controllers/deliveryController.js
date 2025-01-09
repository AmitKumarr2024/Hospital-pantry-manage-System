import Delivery from "../models/Delivery.js";
import Patient from "../models/Patient.js";
import logger from "../helper/logger.js";

// Create a new delivery
export const createDelivery = async (req, res) => {
  try {
    const { deliveryPerson, patientId, roomDetails, notes } = req.body;

    logger.debug("Received request to create delivery:", req.body);

    // Check if patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      logger.debug("Patient not found with id:", patientId);
      return res
        .status(404)
        .json({ message: "Patient not found", error: true });
    }

    // Create the delivery record
    const newDelivery = new Delivery({
      deliveryPerson,
      patientId,
      roomDetails,
      notes,
    });

    await newDelivery.save();
    logger.debug("Delivery created successfully:", newDelivery);

    res.status(201).json({
      message: "Delivery created successfully",
      success: true,
      delivery: newDelivery,
    });
  } catch (error) {
    logger.error("Error creating delivery", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get all deliveries and include patient details
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await Delivery.find().populate("patientId");

    if (deliveries.length === 0) {
      logger.debug("No deliveries found");
      return res
        .status(404)
        .json({ message: "No deliveries found", error: true });
    }

    logger.debug("Deliveries fetched successfully");
    res.status(200).json({ deliveries });
  } catch (error) {
    logger.error("Error fetching deliveries", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get a single delivery by ID and include patient details
export const getSingleDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    logger.debug("Received request to fetch single delivery with id:", id);

    const delivery = await Delivery.findById(id);

    if (!delivery) {
      logger.debug("Delivery not found with id:", id);
      return res
        .status(404)
        .json({ message: "Delivery not found", error: true });
    }

    logger.debug("Delivery fetched successfully:", delivery);
    res.status(200).json({ delivery });
  } catch (error) {
    logger.error("Error fetching delivery", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update delivery status (e.g., mark as delivered)
export const updateDeliveryStatus = async (req, res) => {
  try {
    const { id } = req.params;
    logger.debug("Received request to update delivery status for id:", id);

    const { deliveryPerson, status, deliveryTime, roomDetails, notes } =
      req.body;
    logger.debug("Update data received:", req.body);

    // Find the delivery record
    const delivery = await Delivery.findById(id);

    if (!delivery) {
      logger.debug("Delivery not found with id:", id);
      return res
        .status(404)
        .json({ message: "Delivery not found", error: true });
    }

    logger.debug("Delivery found:", delivery);

    // Update delivery details
    delivery.deliveryPerson = deliveryPerson || delivery.deliveryPerson;
    delivery.status = status || delivery.status;
    delivery.deliveryTime = deliveryTime || delivery.deliveryTime;
    delivery.roomDetails = roomDetails || delivery.roomDetails;
    delivery.notes = notes || delivery.notes;

    await delivery.save();
    logger.debug("Delivery status updated successfully:", delivery);

    res.status(200).json({
      message: "Delivery status updated successfully",
      success: true,
      delivery,
    });
  } catch (error) {
    logger.error("Error updating delivery status", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete a delivery record
export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    logger.debug("Received request to delete delivery with id:", id);

    // Find and delete the delivery record
    const delivery = await Delivery.findByIdAndDelete(id);

    if (!delivery) {
      logger.debug("Delivery not found with id:", id);
      return res
        .status(404)
        .json({ message: "Delivery not found", error: true });
    }

    logger.debug("Delivery deleted successfully with id:", id);
    res.status(200).json({
      message: "Delivery deleted successfully",
      success: true,
    });
  } catch (error) {
    logger.error("Error deleting delivery", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
