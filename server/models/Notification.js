const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  status: { type: String, enum: ['Read', 'Unread'], default: 'Unread' },
  type: { type: String, enum: ['Confirmation', 'Reminder', 'General'], default: 'General' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);