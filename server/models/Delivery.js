import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema(
  {
    deliveryPerson: {
      type: String,
      required: true,
    },
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true,
    },
    roomDetails: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['Assigned', 'Delivered', 'Cancel'],
      default: 'Assigned',
    },
    deliveryTime: {
      type: Date,
    },
    notes: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {   // New field added
      type: Date,
      default: Date.now,  // Sets default value to the current time when a document is created
    },
  },
  {
    timestamps: true, // This automatically adds `createdAt` and `updatedAt`
  }
);

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;
