import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import fs from "fs"; // Import fs for file reading
import MongoDatabase from "./config/Mongodb.js";
import UserRouter from "./routes/userRoutes.js";
import PantryRouter from "./routes/pantryRoutes.js";
import PatientRouter from "./routes/patientRoutes.js";
import DeliveryRouter from "./routes/deliveryRoutes.js";
import FoodChartRouter from "./routes/foodChartRoutes.js";
import cookieParser from "cookie-parser";
import logger from "./helper/logger.js"; // Import the enhanced logger

dotenv.config();

const app = express();
const port = process.env.PORT || 8002;

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS setup
app.use(
  cors({
    origin: "http://localhost:5173",

    credentials: true,
  })
);

// Routes
app.use("/api/users", UserRouter);
app.use("/api/pantry-item", PantryRouter);
app.use("/api/delivery", DeliveryRouter);
app.use("/api/patient", PatientRouter);
app.use("/api/foodChart", FoodChartRouter);

// Logging incoming requests
app.use((req, res, next) => {
  logger.info(`Incoming request: ${req.method} ${req.url}`);
  next();
});

// Endpoint to read and display the log file content
app.get("/logs", (req, res) => {
  const logFilePath = "./logs/app.log"; // Path to the log file

  // Check if the log file exists
  if (fs.existsSync(logFilePath)) {
    // Read the file contents asynchronously
    fs.readFile(logFilePath, "utf-8", (err, data) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error reading log file", error: err });
      }
      // Return the log file content as response
      res.status(200).json({ logContent: data });
    });
  } else {
    res.status(404).json({ message: "Log file not found" });
  }
});

// Start the server
app.listen(port, () => {
  logger.info(`Server started at port: ${port}`); // Log server start
  MongoDatabase();
});
