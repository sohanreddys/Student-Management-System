const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Create Student
router.post('/', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Get All Students
router.get('/', async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Get Student by ID
router.get('/:id', async (req, res) => {
    const student = await Student.findById(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
});

// Update Student
router.put('/:id', async (req, res) => {
    const student = await Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!student) return res.status(404).send('Student not found');
    res.json(student);
});

// Delete Student
router.delete('/:id', async (req, res) => {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) return res.status(404).send('Student not found');
    res.send('Student deleted');
});

module.exports = router;
