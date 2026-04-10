const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/exams', require('./routes/exams'));
app.get('/', (req, res) => {
    res.send('Auto Invigilation API is running...');
});

// Socket.io for Real-Time Monitoring
io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // When a student connects to an exam
    socket.on('join_exam', ({ examId, studentId }) => {
        socket.join(examId);
        console.log(`Student ${studentId} joined exam ${examId}`);
        // Notify admin
        io.to(`admin_${examId}`).emit('student_joined', { studentId, socketId: socket.id });
    });

    // When admin connects to monitor an exam
    socket.on('join_admin_monitoring', ({ examId }) => {
        socket.join(`admin_${examId}`);
        console.log(`Admin joined monitoring for exam ${examId}`);
    });

    // When a violation happens on the client
    socket.on('violation_alert', (data) => {
        console.log('Violation alert received:', data);
        // Forward to admin
        io.to(`admin_${data.examId}`).emit('new_violation', data);
    });

    socket.on('disconnect', () => {
        console.log(`User disconnected: ${socket.id}`);
    });
});

// MongoDB Connection
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/auto-invigilation';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB');
        server.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
