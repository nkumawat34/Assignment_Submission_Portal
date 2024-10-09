// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, uploadAssignment, getAllAdmins, getAllAssignmentsByUserId } = require('../controllers/userController');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/upload', uploadAssignment);
router.get('/admins', getAllAdmins);
router.get("/assignments/:userId", getAllAssignmentsByUserId);
module.exports = router;
