import mongoose from "mongoose";

const pantrySchema = new mongoose.Schema({
  staffName: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  assignedTasks: [
    {
      task: String,
      status: {
        type: String,
        enum: ["Pending", "In Progress", "Completed"],
        default: "Pending",
      },
    },
  ],
  pantryItems: [
    {
      name: {
        type: String,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      expiryDate: {
        type: Date,
        required: true,
      },
      unit: {
        type: String,
        required: true,
      },
      supplier: {
        type: String,
      },
      storageLocation: {
        type: String,
      },
      addedDate: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Pantry = mongoose.model("Pantry", pantrySchema);
export default Pantry;
