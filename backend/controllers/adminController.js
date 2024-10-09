// controllers/adminController.js
const Admin = require('../models/adminModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Admin registration
exports.registerAdmin = async (req, res) => {
    const { name, email, password } = req.body;
    const adminExists = await Admin.findOne({ email });
    
    if (adminExists) {
        return res.status(400).json({ message: 'Admin already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = await Admin.create({ name, email, password: hashedPassword });

    if (admin) {
        res.status(201).json({ message: 'Admin registered successfully' });
    } else {
        res.status(400).json({ message: 'Invalid admin data' });
    }
};

// Admin login
exports.loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    
    if (admin && await bcrypt.compare(password, admin.password)) {
        const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Controller to get all assignments for a specific user
exports.getAssignments = async (req, res) => {
    try {
        const { userId } = req.params; // Extract userId from request parameters
        console.log(userId)
        // Find assignments for the user
        const assignments = await Assignment.find({ userId: userId });

        // Check if assignments were found
        if (assignments.length === 0) {
            return res.status(404).json({ success: false, message: 'No assignments found for this user' });
        }

        // Return the assignments
        return res.status(200).json({ success: true, assignments });
    } catch (error) {
        console.error('Error fetching assignments:', error);
        return res.status(500).json({ success: false, message: 'Server error' });
    }
};


// Accept assignment
exports.acceptAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: 'accepted' }, { new: true });
    
    if (assignment) {
        res.json({ message: 'Assignment accepted', assignment });
    } else {
        res.status(400).json({ message: 'Assignment not found' });
    }
};

// Reject assignment
exports.rejectAssignment = async (req, res) => {
    const assignmentId = req.params.id;
    const assignment = await Assignment.findByIdAndUpdate(assignmentId, { status: 'rejected' }, { new: true });
    
    if (assignment) {
        res.json({ message: 'Assignment rejected', assignment });
    } else {
        res.status(400).json({ message: 'Assignment not found' });
    }
};
