import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
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
    enum: ['Assigned', 'Delivered'],
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
});

const Delivery = mongoose.model('Delivery', deliverySchema);
export default Delivery;