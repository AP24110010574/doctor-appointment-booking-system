const express = require('express');
const router = express.Router();
const { getAllUsers, getAllDoctors, approveDoctor, deleteUser } = require('../controllers/adminController');
const { protect, adminOnly } = require('../middleware/authMiddleware');

router.get('/users', protect, adminOnly, getAllUsers);
router.get('/doctors', protect, adminOnly, getAllDoctors);
router.put('/doctors/:id/approve', protect, adminOnly, approveDoctor);
router.delete('/users/:id', protect, adminOnly, deleteUser);

module.exports = router;