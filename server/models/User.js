import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["Manager", "PantryStaff", "DeliveryPersonnel"],
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Static method for seeding users
userSchema.statics.seedUsers = async function () {
  const users = [
    {
      email: "hospital_manager@xyz.com",
      password: "Password@2025",
      role: "Manager",
    },
    {
      email: "hospital_pantry@xyz.com",
      password: "Password@2025",
      role: "PantryStaff",
    },
    {
      email: "hospital_delivery@xyz.com",
      password: "Password@2025",
      role: "DeliveryPersonnel",
    },
  ];

  try {
    
    await this.deleteMany();

    // Hash passwords and insert users
    for (const user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    await this.insertMany(users);

    console.log("Users seeded connected successfully!");
  } catch (error) {
    console.error("Error seeding users:", error);
  }
};

const User = mongoose.model("User", userSchema);
export default User;
