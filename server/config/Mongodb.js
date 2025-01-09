import mongoose from "mongoose";
import User from "../models/User.js";

const MongoDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("MongoDb Connected successfully");
    await  User.seedUsers();

  } catch (error) {
    console.log("MongoDb connection has issue: ", error);
  }
};

export default MongoDatabase;
