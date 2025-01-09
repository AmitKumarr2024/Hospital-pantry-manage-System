import jwt from "jsonwebtoken";
import User from "../models/User.js";


const checkManagerRole = async (req, res, next) => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Authentication token is required", error: true });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded",decoded._id);
    

    const user = await User.findById(decoded._id);
    console.log("auth user",user);
    
    if (!user) {
      return res.status(404).json({ message: "User not found", error: true });
    }

    if (user.role === "admin" || user.role === "Manager") {
      req.user = user;
      next();
    } else {
      return res
        .status(403)
        .json({
          message: "Forbidden: You don't have the required role",
          error: true,
        });
    }
  } catch (error) {
    console.error("Error in checkManagerRole middleware", error.message);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: true });
  }
};

export default checkManagerRole;
