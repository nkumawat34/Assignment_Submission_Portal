// controllers/userController.js
const User = require('../models/userModel');
const Assignment = require('../models/assignmentModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


// User registration
exports.registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    
    
    if (userExists) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    if (user) {
        res.status(201).json({ message: 'User registered successfully' });
    } else {
        res.status(400).json({ message: 'Invalid user data' });
    }
};

// User login
exports.loginUser = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
   
    if (user && await bcrypt.compare(password, user.password)) {
        
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });
       
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid email or password' });
    }
};

// Upload assignment
exports.uploadAssignment = async (req, res) => {
    try {
        const { userId, task, admin } = req.body;

        // Validate required fields
        if (!userId || !task || !admin) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Check if task or admin is empty
        if (task.trim() === '' || admin.trim() === '') {
            return res.status(400).json({ message: 'Task or admin cannot be empty' });
        }

        // Create the assignment in the database
        const assignment = await Assignment.create({
            userId,
            task,
            admin
        });

        if (assignment) {
            res.status(201).json({ message: 'Assignment uploaded successfully' });
        } else {
            res.status(400).json({ message: 'Assignment upload failed' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


// Fetch all admins
exports.getAllAdmins = async (req, res) => {
    const admins = await User.find({ role: 'admin' });
    res.json(admins);
};


// Controller to get all assignments for a specific user
exports.getAllAssignmentsByUserId = async (req, res) => {
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

