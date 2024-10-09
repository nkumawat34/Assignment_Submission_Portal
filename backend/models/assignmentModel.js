// models/assignmentModel.js
const mongoose = require('mongoose');

const assignmentSchema = mongoose.Schema({
    userId: { type:String, required: true },
    task: { type: String, required: true },
    admin: { type:String,required: true },
    status: { type: String, default: 'pending' }, // pending, accepted, rejected
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);
