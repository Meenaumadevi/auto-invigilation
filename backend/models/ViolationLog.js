const mongoose = require('mongoose');

const violationLogSchema = new mongoose.Schema({
    exam: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
    student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: {
        type: String,
        enum: ['tab_switch', 'multiple_faces', 'no_face', 'looking_away', 'mobile_phone_detected', 'audio_noise'],
        required: true
    },
    severity: { type: String, enum: ['low', 'medium', 'high'], default: 'low' },
    timestamp: { type: Date, default: Date.now },
    screenshotUrl: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ViolationLog', violationLogSchema);
