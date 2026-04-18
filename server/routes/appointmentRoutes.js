const express = require('express');
const router = express.Router();
const { bookAppointment, getMyAppointments, getDoctorAppointments, updateAppointmentStatus, cancelAppointment, getAllAppointments } = require('../controllers/appointmentController');
const { protect, adminOnly, doctorOnly } = require('../middleware/authMiddleware');

router.post('/', protect, bookAppointment);
router.get('/my', protect, getMyAppointments);
router.get('/doctor', protect, doctorOnly, getDoctorAppointments);
router.get('/all', protect, adminOnly, getAllAppointments);
router.put('/:id', protect, doctorOnly, updateAppointmentStatus);
router.delete('/:id', protect, cancelAppointment);

module.exports = router;