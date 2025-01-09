import Pantry from "../models/Pantry.js";
import logger from "../helper/logger.js";

// Add New Pantry Item
export const addNewPantryItem = async (req, res) => {
  try {
    const { staffName, contact, location, assignedTasks, pantryItems } =
      req.body;

    logger.debug("Received request to add new pantry item:", req.body);

    // Check if all required fields are provided
    if (!staffName || !contact || !location || !pantryItems) {
      logger.debug("Missing required fields:", req.body);
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
    logger.debug("Pantry item added successfully:", newPantryItem);

    // Send a success response
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
    logger.debug("Received request to get all pantry items");

    // Fetch all pantry items from the database
    const pantryItems = await Pantry.find();

    // If no items are found
    if (!pantryItems.length) {
      logger.debug("No pantry items found");
      return res
        .status(404)
        .json({ message: "No pantry items found", error: true });
    }

    logger.debug("Pantry items retrieved successfully");
    // Send success response with pantry items
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
    const { id } = req.params; // Extract pantry ID from the request parameters
    logger.debug("Received request to get single pantry item with id:", id);

    // Fetch the pantry item using the provided ID and populate staff details
    const pantryItem = await Pantry.findById(id).populate("staffName"); // Populate staff details (staffName, contact, location, etc.)

    // If the pantry item does not exist
    if (!pantryItem) {
      logger.debug("Pantry item not found with id:", id);
      return res
        .status(404)
        .json({ message: "Pantry item not found", error: true });
    }

    logger.debug("Pantry item retrieved successfully:", pantryItem);
    // Send success response with all pantry and staff details
    res.status(200).json({
      message: "Pantry and staff details retrieved successfully",
      data: {
        staffName: pantryItem.staffName, // Staff name from pantry model
        contact: pantryItem.contact, // Staff contact from pantry model
        location: pantryItem.location, // Staff location from pantry model
        assignedTasks: pantryItem.assignedTasks, // Assigned tasks
        pantryItems: pantryItem.pantryItems, // List of pantry items
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
    const { staffName, contact, location, assignedTasks, pantryItems } =
      req.body;

    logger.debug("Received request to update pantry item with id:", id);
    logger.debug("Update data received:", req.body);

    // Find the pantry item to update
    const pantryItem = await Pantry.findById(id);

    if (!pantryItem) {
      logger.debug("Pantry item not found with id:", id);
      return res
        .status(404)
        .json({ message: "Pantry item not found", error: true });
    }

    // Update fields if provided
    if (staffName) pantryItem.staffName = staffName;
    if (contact) pantryItem.contact = contact;
    if (location) pantryItem.location = location;
    if (assignedTasks) pantryItem.assignedTasks = assignedTasks;

    // Update pantryItems array if provided
    if (pantryItems && Array.isArray(pantryItems)) {
      pantryItem.pantryItems = pantryItems;
    }

    // Save the updated pantry item
    await pantryItem.save();
    logger.debug("Pantry item updated successfully:", pantryItem);

    // Send success response with the updated pantry item
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
    const { id } = req.params; // Pantry ID to delete the entire pantry
    logger.debug("Received request to delete pantry item with id:", id);

    // Find and delete the pantry by its ID
    const pantry = await Pantry.findByIdAndDelete(id);

    if (!pantry) {
      logger.debug("Pantry item not found with id:", id);
      return res.status(404).json({ message: "Pantry not found", error: true });
    }

    logger.debug("Pantry item deleted successfully with id:", id);
    // Send success response
    res.status(200).json({
      message: "Pantry deleted successfully",
      success: true,
    });
  } catch (error) {
    logger.error("Error in deletePantry controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
