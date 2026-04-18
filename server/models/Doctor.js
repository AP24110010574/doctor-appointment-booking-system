const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: Number, default: 0 },
  fee: { type: Number, default: 0 },
  email: { type: String, required: true },
  hospital: { type: String },
  availableSlots: [{ type: String }],
  isApproved: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('Doctor', doctorSchema);