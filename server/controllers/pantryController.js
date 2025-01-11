import Pantry from "../models/Pantry.js";
import logger from "../helper/logger.js";

// Add New Pantry Item
export const addNewPantryItem = async (req, res) => {
  try {
    const { staffName, contact, location, assignedTasks, pantryItems } = req.body;

    logger.info("Received request to add new pantry item:", req.body);

    // Validate required fields
    if (!staffName || !contact || !location || !pantryItems) {
      logger.info("Missing required fields:", req.body);
      return res.status(400).json({
        message: "Staff name, contact, location, and pantry items are required",
        error: true,
      });
    }

    // Create a new pantry item
    const newPantryItem = new Pantry({
      staffName,
      contact,
      location,
      assignedTasks,
      pantryItems,
    });

    // Save the new pantry item to the database
    await newPantryItem.save();
    logger.info("Pantry item added successfully:", newPantryItem);

    // Return success response
    res.status(201).json({
      message: "Pantry item added successfully",
      data: newPantryItem,
      success: true,
    });
  } catch (error) {
    logger.error("Error in addNewPantryItem controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get All Pantry Items
export const getAllPantryItems = async (req, res) => {
  try {
    logger.info("Received request to get all pantry items");

    // Retrieve all pantry items from the database
    const pantryItems = await Pantry.find();

    // If no pantry items exist
    if (!pantryItems.length) {
      logger.info("No pantry items found");
      return res.status(404).json({ message: "No pantry items found", error: true });
    }

    logger.info("Pantry items retrieved successfully");
    // Return success response with pantry items
    res.status(200).json({
      message: "Pantry items retrieved successfully",
      data: pantryItems,
      success: true,
    });
  } catch (error) {
    logger.error("Error in getAllPantryItems controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get Single Pantry Item
export const getSinglePantryItem = async (req, res) => {
  try {
    const { id } = req.params; // Get pantry ID from request parameters
    logger.info("Received request to get single pantry item with id:", id);

    // Fetch pantry item and populate staff details
    const pantryItem = await Pantry.findById(id).populate("staffName");

    // If pantry item doesn't exist
    if (!pantryItem) {
      logger.info("Pantry item not found with id:", id);
      return res.status(404).json({ message: "Pantry item not found", error: true });
    }

    logger.info("Pantry item retrieved successfully:", pantryItem);
    // Return success response with pantry and staff details
    res.status(200).json({
      message: "Pantry and staff details retrieved successfully",
      data: {
        staffName: pantryItem.staffName,
        contact: pantryItem.contact,
        location: pantryItem.location,
        assignedTasks: pantryItem.assignedTasks,
        pantryItems: pantryItem.pantryItems,
      },
      success: true,
    });
  } catch (error) {
    logger.error("Error in getSinglePantryItem controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Update Pantry Item
export const updatePantryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { staffName, contact, location, assignedTasks, pantryItems } = req.body;

    logger.info("Received request to update pantry item with id:", id);
    logger.info("Update data received:", req.body);

    // Find the pantry item to update
    const pantryItem = await Pantry.findById(id);

    // If pantry item does not exist
    if (!pantryItem) {
      logger.info("Pantry item not found with id:", id);
      return res.status(404).json({ message: "Pantry item not found", error: true });
    }

    // Update fields if provided
    if (staffName) pantryItem.staffName = staffName;
    if (contact) pantryItem.contact = contact;
    if (location) pantryItem.location = location;
    if (assignedTasks) pantryItem.assignedTasks = assignedTasks;
    if (pantryItems && Array.isArray(pantryItems)) pantryItem.pantryItems = pantryItems;

    // Save the updated pantry item
    await pantryItem.save();
    logger.info("Pantry item updated successfully:", pantryItem);

    // Return success response with updated pantry item
    res.status(200).json({
      message: "Pantry item updated successfully",
      data: pantryItem,
      success: true,
    });
  } catch (error) {
    logger.error("Error in updatePantryItem controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete Pantry Item
export const deletePantry = async (req, res) => {
  try {
    const { id } = req.params; // Get pantry ID to delete the item
    logger.info("Received request to delete pantry item with id:", id);

    // Find and delete pantry by ID
    const pantry = await Pantry.findByIdAndDelete(id);

    // If pantry item not found
    if (!pantry) {
      logger.info("Pantry item not found with id:", id);
      return res.status(404).json({ message: "Pantry not found", error: true });
    }

    logger.info("Pantry item deleted successfully with id:", id);
    // Return success response
    res.status(200).json({
      message: "Pantry deleted successfully",
      success: true,
    });
  } catch (error) {
    logger.error("Error in deletePantry controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
