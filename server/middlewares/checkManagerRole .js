import jwt from "jsonwebtoken";
import User from "../models/User.js";
import logger from "../helper/logger.js"; // Importing the logger

const checkManagerRole = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      logger.info("Authentication token is required but not provided.");
      return res
        .status(401)
        .json({ message: "Authentication token is required", error: true });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    logger.info(`Token verified for user with ID: ${decoded._id}`);

    const user = await User.findById(decoded._id);
    logger.info(`User fetched: ${user ? user.role : 'No user found'}`);

    if (!user) {
      logger.info("User not found with ID:", decoded._id);
      return res.status(404).json({ message: "User not found", error: true });
    }

    if (user.role === "admin" || user.role === "Manager") {
      logger.info(`User with role ${user.role} authorized to proceed.`);
      req.user = user;
      next();
    } else {
      logger.info(`User with role ${user.role} is not authorized to proceed.`);
      return res
        .status(403)
        .json({
          message: "Forbidden: You don't have the required role",
          error: true,
        });
    }
  } catch (error) {
    logger.error("Error in checkManagerRole middleware", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export default checkManagerRole;
