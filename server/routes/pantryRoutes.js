import express from "express";
import {
  addNewPantryItem,
  deletePantry,
  getAllPantryItems,
  getSinglePantryItem,
  updatePantryItem,
} from "../controllers/pantryController.js";
import jwtAuth from "../middlewares/authMiddleware.js";

const pantry = express.Router();

pantry.post("/addItem", addNewPantryItem); // Add new pantry item
pantry.get("/all-pantry-item", getAllPantryItems); // Get all pantry items
pantry.get("/single-Item/:id", getSinglePantryItem); // Get one pantry item
pantry.put("/update-item/:id", updatePantryItem); // Update pantry item
pantry.delete("/delete-item/:id", deletePantry); // Remove a pantry item

export default pantry;
