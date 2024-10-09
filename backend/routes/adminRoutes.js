// routes/adminRoutes.js
const express = require('express');
const { registerAdmin, loginAdmin, getAssignments, acceptAssignment, rejectAssignment } = require('../controllers/adminController');
const { protect, adminProtect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerAdmin);
router.post('/login', loginAdmin);
router.get('/assignments/:userId',  getAssignments);
router.put('/assignments/:id/accept',  acceptAssignment);
router.put('/assignments/:id/reject', rejectAssignment);

module.exports = router;
