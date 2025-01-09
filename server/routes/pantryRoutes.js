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

pantry.post("/addItem", jwtAuth, addNewPantryItem); // Add new pantry item
pantry.get("/all-pantry-item", jwtAuth, getAllPantryItems); // Get all pantry items
pantry.get("/single-Item/:id", jwtAuth, getSinglePantryItem); // Get one pantry item
pantry.put("/update-item/:id", jwtAuth, updatePantryItem); // Update pantry item
pantry.delete("/delete-item/:id", jwtAuth, deletePantry); // Remove a pantry item

export default pantry;
