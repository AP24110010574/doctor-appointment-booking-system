const express = require('express');
const router = express.Router();
const { getAllDoctors, getDoctorById, getDoctorProfile, updateDoctorProfile } = require('../controllers/doctorController');
const { protect, doctorOnly } = require('../middleware/authMiddleware');

router.get('/', getAllDoctors);
router.get('/profile', protect, doctorOnly, getDoctorProfile);
router.put('/profile', protect, doctorOnly, updateDoctorProfile);
router.get('/:id', getDoctorById);

module.exports = router;