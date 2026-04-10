const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now },
    status: { type: String, enum: ['completed', 'flagged', 'disqualified'], default: 'completed' }
}, { timestamps: true });

module.exports = mongoose.model('Result', resultSchema);
