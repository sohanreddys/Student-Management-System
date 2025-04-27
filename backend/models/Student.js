const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    studentId: { type: String, required: true, unique: true, trim: true },
    firstName: { type: String, required: true, minlength: 2, trim: true },
    lastName: { type: String, required: true, minlength: 2, trim: true },
    email: { 
        type: String, 
        required: true, 
        match: /\S+@\S+\.\S+/, 
        lowercase: true, 
        trim: true 
    },
    dob: { type: Date, required: true },
    department: { type: String, required: true, trim: true },
    enrollmentYear: { 
        type: Number,
        required: true,
        min: 2000,
        max: new Date().getFullYear()
    },
    isActive: { type: Boolean, default: true }
}, { timestamps: true }); 

module.exports = mongoose.model('Student', studentSchema);
