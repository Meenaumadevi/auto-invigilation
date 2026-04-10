import React, { createContext, useState } from 'react';

export const ExamContext = createContext();

const initialAvailableExams = [
    { id: 101, title: 'Introduction to Computer Science', department: 'Computer Science', duration: '120 mins', enrollments: 342, difficulty: 'Beginner', date: 'Upcoming' },
    { id: 102, title: 'Data Structures & Algorithms', department: 'Computer Science', duration: '180 mins', enrollments: 215, difficulty: 'Advanced', date: 'Upcoming' },
    { id: 103, title: 'Quantum Mechanics Basics', department: 'Physics', duration: '90 mins', enrollments: 89, difficulty: 'Intermediate', date: 'Upcoming' },
    { id: 104, title: 'Organic Chemistry II', department: 'Chemistry', duration: '150 mins', enrollments: 120, difficulty: 'Advanced', date: 'Upcoming' },
    { id: 105, title: 'Calculus I', department: 'Mathematics', duration: '120 mins', enrollments: 450, difficulty: 'Beginner', date: 'Upcoming' },
    { id: 106, title: 'Machine Learning Fundamentals', department: 'Computer Science', duration: '120 mins', enrollments: 198, difficulty: 'Intermediate', date: 'Upcoming' }
];

export const getExamQuestions = (examId) => {
    // Default fallback questions
    const fallback = [
        { id: 1, text: 'What is the primary function of a blockchain?', options: ['Decentralized ledger', 'Centralized database', 'Operating System', 'Web browser'], answer: 'Decentralized ledger' },
        { id: 2, text: 'Identify the correct definition of Agile methodology.', options: ['Iterative development', 'Waterfall sequence', 'Hardware manufacturing', 'Physical networking'], answer: 'Iterative development' }
    ];

    if (examId === 101) return [
        { id: 1, text: 'What does CPU stand for?', options: ['Central Process Unit', 'Computer Personal Unit', 'Central Processing Unit', 'Central Processor Unit'], answer: 'Central Processing Unit' },
        { id: 2, text: 'Which of the following is an example of an operating system?', options: ['Microsoft Word', 'Linux', 'Google Chrome', 'Python'], answer: 'Linux' },
        { id: 3, text: 'What is the main function of RAM?', options: ['Long term storage', 'Short term active memory', 'Cooling', 'Graphics processing'], answer: 'Short term active memory' }
    ];
    if (examId === 102) return [
        { id: 1, text: 'Which data structure uses LIFO?', options: ['Queue', 'Stack', 'Tree', 'Graph'], answer: 'Stack' },
        { id: 2, text: 'What is the time complexity of binary search?', options: ['O(n)', 'O(n^2)', 'O(log n)', 'O(1)'], answer: 'O(log n)' },
        { id: 3, text: 'Which of the following sorting algorithms is generally fastest on average?', options: ['Bubble Sort', 'Insertion Sort', 'Quick Sort', 'Selection Sort'], answer: 'Quick Sort' }
    ];
    if (examId === 103) return [
        { id: 1, text: 'What does quantum superposition refer to?', options: ['Being in multiple states simultaneously', 'Energy loss', 'Speed of light travel', 'Particle mass'], answer: 'Being in multiple states simultaneously' },
        { id: 2, text: 'What phenomena allows particles to be correlated over vast distances?', options: ['Quantum entanglement', 'Gravity', 'Electromagnetism', 'Strong force'], answer: 'Quantum entanglement' }
    ];

    return fallback;
};

const initialHistory = [
    { id: 1, title: 'Calculus I Midterm', date: 'Oct 15, 2023', score: '92/100', grade: 'A', status: 'Graded', flagged: false, details: 'Excellent work. Showed clear steps.' },
    { id: 2, title: 'Physics 101 Quiz', date: 'Oct 02, 2023', score: '85/100', grade: 'B+', status: 'Graded', flagged: false, details: 'Good understanding of basic concepts.' },
];

export const ExamProvider = ({ children }) => {
    const [availableExams, setAvailableExams] = useState(initialAvailableExams);
    const [upcomingExams, setUpcomingExams] = useState([
        { id: 3, title: 'Advanced Physics Midterm', date: 'Tomorrow, 10:00 AM', duration: '60 mins', status: 'Pending' }
    ]);
    const [activeExams, setActiveExams] = useState([
        { id: 4, title: 'Introduction to Psychology', timeRemaining: '1h 14m', totalQuestions: 50, answered: 24, status: 'In Progress' }
    ]);
    const [examHistory, setExamHistory] = useState(initialHistory);
    const [notifications, setNotifications] = useState([
        { id: 1, message: 'Your Calculus I Midterm has been graded. You scored 92/100.', type: 'success', time: '2 hours ago' },
        { id: 2, message: 'Reminder: Advanced Physics Midterm tomorrow at 10:00 AM.', type: 'info', time: '1 day ago' },
    ]);

    const enrollExam = (exam) => {
        // Check if already enrolled
        if (upcomingExams.find(e => e.id === exam.id)) return;

        const newExam = {
            ...exam,
            date: 'Flexible Timing',
            status: 'Pending'
        };

        setUpcomingExams(prev => [...prev, newExam]);
        setAvailableExams(prev => prev.filter(e => e.id !== exam.id));

        addNotification(`You have successfully enrolled in ${exam.title}.`, 'success');
    };

    const startExam = (examId) => {
        const examToStart = upcomingExams.find(e => e.id === examId);
        if (!examToStart) return;

        setUpcomingExams(prev => prev.filter(e => e.id !== examId));

        setActiveExams(prev => [
            ...prev,
            {
                ...examToStart,
                timeRemaining: examToStart.duration,
                totalQuestions: 20,
                answered: 0,
                status: 'In Progress'
            }
        ]);
    };

    const submitExam = (examId, score, flagged) => {
        const finishedExam = activeExams.find(e => e.id === examId) || upcomingExams.find(e => e.id === examId) || { title: 'Exam ' + examId };

        // Remove from active or upcoming
        setActiveExams(prev => prev.filter(e => e.id !== examId));
        setUpcomingExams(prev => prev.filter(e => e.id !== examId));

        const historyItem = {
            id: Date.now(),
            title: finishedExam.title || 'Completed Exam',
            date: new Date().toLocaleDateString(),
            score: `${score}/100`,
            grade: score >= 90 ? 'A' : score >= 80 ? 'B' : score >= 70 ? 'C' : 'F',
            status: 'Graded',
            flagged: flagged,
            details: flagged ? 'System detected multiple violations during the exam. Assigned for manual review.' : 'Auto-graded successfully without any flags.'
        };

        setExamHistory(prev => [historyItem, ...prev]);
        addNotification(`You have submitted ${finishedExam.title}. Score: ${score}/100`, 'success');
    };

    const addNotification = (message, type = 'info') => {
        const newNotif = {
            id: Date.now(),
            message,
            type,
            time: 'Just now'
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    return (
        <ExamContext.Provider value={{
            availableExams,
            upcomingExams,
            activeExams,
            examHistory,
            notifications,
            enrollExam,
            startExam,
            submitExam,
            addNotification
        }}>
            {children}
        </ExamContext.Provider>
    );
};
