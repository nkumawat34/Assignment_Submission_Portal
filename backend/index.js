// app.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors=require("cors")
dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(cors())

const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');

app.use('/api/users', userRoutes);
app.use('/api/admins', adminRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
