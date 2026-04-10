const express = require('express');
const router = express.Router();
const Exam = require('../models/Exam');
const { generateQuantumHex } = require('../utils/quantumRng');

// Create a new exam
router.post('/', async (req, res) => {
    try {
        const examData = { ...req.body };

        // Generate a True Quantum Security Token for the exam
        examData.quantumToken = await generateQuantumHex(8);

        const exam = await Exam.create(examData);
        res.status(201).json(exam);
    } catch (error) {
        console.error('Error creating exam:', error);
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const exams = await Exam.find({});
        res.json(exams);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Get single exam
router.get('/:id', async (req, res) => {
    try {
        const exam = await Exam.findById(req.params.id);
        if (!exam) return res.status(404).json({ message: 'Exam not found' });
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

// Update exam status
router.put('/:id/status', async (req, res) => {
    const { isActive } = req.body;
    try {
        const exam = await Exam.findByIdAndUpdate(req.params.id, { isActive }, { new: true });
        res.json(exam);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
