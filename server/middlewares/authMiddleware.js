import jwt from "jsonwebtoken";
import logger from "../helper/logger.js"; // Importing the logger

const jwtAuth = (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    logger.info("Token not found, user not logged in.");
    return res.status(401).json({
      message: "Please Login First and try again",
      error: true,
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decodedToken._id; // Set userId from token
    logger.info(`Token verified successfully for user: ${req.userId}`);
    next();
  } catch (error) {
    logger.info("Invalid or expired token.");
    return res.status(401).json({
      message: "Invalid or Expired Token",
      error: true,
    });
  }
};

export default jwtAuth;
