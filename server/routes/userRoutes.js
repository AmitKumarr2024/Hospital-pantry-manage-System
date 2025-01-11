import express from "express";
import {
  login,
  logout,
  signup,
  singleUser,
} from "../controllers/userController.js";
import jwtAuth from "../middlewares/authMiddleware.js";

const user = express.Router();

user.post("/signup", signup); // User sign up
user.post("/login", login); // User log in
user.get("/singleUser/:id",jwtAuth, singleUser); // Get single user details
user.post("/logout", logout); // User log out

export default user;
