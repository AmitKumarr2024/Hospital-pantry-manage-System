import express from "express";
const router = express.Router();
import {
  createFoodChart,
  updateFoodChart,
  deleteFoodChart,
  getAllFoodCharts,
  getFoodChartById,
} from "../controllers/FoodChartController.js";
import checkManagerRole from "../middlewares/checkManagerRole .js";

router.post("/create-food-chart", createFoodChart);
router.put("/update-food-chart/:id", checkManagerRole, updateFoodChart);
router.delete("/delete-food-chart/:id", checkManagerRole, deleteFoodChart);
router.get("/all-food-charts", checkManagerRole, getAllFoodCharts);
router.get("/single-foodChart/:id", checkManagerRole, getFoodChartById);

export default router;
