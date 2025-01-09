import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import logger from "../helper/logger.js";

export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    logger.debug(`Received signup request with email: ${email}, role: ${role}`);

    // Define the allowed roles
    const allowedRoles = ["PantryStaff", "DeliveryPersonnel"];
    
    // Validate the role
    if (!allowedRoles.includes(role)) {
      logger.debug(`Invalid role: ${role}`);
      return res.status(400).json({ message: "Invalid role", error: true });
    }

    const userExist = await User.findOne({ email });
    if (userExist) {
      logger.debug(`User already exists with email: ${email}`);
      return res.status(409).json({ message: "User already exists", error: true });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      role,
    });

    await newUser.save();
    logger.debug("User created successfully:", newUser);

    res.status(201).json({
      message: "User created successfully",
      data: {
        _id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
      success: true,
    });
  } catch (error) {
    logger.error("Error in signup controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.debug(`Received login request with email: ${email}`);

    const userExist = await User.findOne({ email });

    if (!userExist) {
      logger.debug(`User not found with email: ${email}`);
      return res.status(404).json({ message: "User not found", error: true });
    }

    const isValidPassword = await bcrypt.compare(password, userExist.password);
    if (!isValidPassword) {
      logger.debug("Invalid credentials");
      return res
        .status(401)
        .json({ message: "Invalid credentials", error: true });
    }

    const tokenData = {
      _id: userExist._id,
      email: userExist.email,
      role: userExist.role,
    };

    const newToken = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "2d",
    });

    const isProduction = process.env.NODE_ENV === "production";

    const tokenOptions = {
      httpOnly: true,
      secure: isProduction,
      sameSite: "strict",
    };

    res.cookie("token", newToken, tokenOptions).status(200).json({
      message: "Login successful",
      data: newToken,
      success: true,
    });
    logger.debug("Login successful");
  } catch (error) {
    logger.error("Error in login controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const singleUser = async (req, res) => {
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      logger.debug("Unauthorized request");
      return res.status(401).json({ message: "Unauthorized", error: true });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded._id;
    logger.debug(`Decoded user ID from token: ${userId}`);

    const user = await User.findById(userId);

    if (!user) {
      logger.debug(`User not found with ID: ${userId}`);
      return res.status(404).json({ message: "User not found", error: true });
    }

    logger.debug("User retrieved successfully:", user);
    res.status(200).json({
      message: "User retrieved successfully",
      data: user,
      success: true,
    });
  } catch (error) {
    logger.error("Error in singleUser controller", error.message);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });
    logger.debug("Logout successful");
    res.status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    logger.error("Error in logout controller:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: true });
  }
};
