import express from "express";
import dotenv from "dotenv";
import MongoDatabase from "./config/Mongodb.js";
import UserRouter from "./routes/userRoutes.js";
import PantryRouter from "./routes/pantryRoutes.js";
import PatientRouter from "./routes/patientRoutes.js";
import DeliveryRouter from "./routes/deliveryRoutes.js";
import FoodChartRouter from "./routes/foodChartRoutes.js";
import cookieParser from "cookie-parser";
import logger from "./helper/logger.js"; // Import the logger

dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", UserRouter);
app.use("/api/pantry-item", PantryRouter);
app.use("/api/delivery", DeliveryRouter);
app.use("/api/patient", PatientRouter);
app.use("/api/foodChart", FoodChartRouter);

// app.get("/", (req, res) => {
//   res.status(200).json({ message: "Hello WOrld Amit" });
// });

app.listen(port, () => {
  logger.info(`Server started at port: ${port}`); // Use logger for logging
  MongoDatabase();
});
