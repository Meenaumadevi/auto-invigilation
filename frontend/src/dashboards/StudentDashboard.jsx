import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { ExamContext } from '../context/ExamContext';
import { motion } from 'framer-motion';
import { BookOpen, Clock, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const { user } = useContext(AuthContext);
    const { upcomingExams, startExam } = useContext(ExamContext);
    const navigate = useNavigate();

    const widgets = [
        { title: 'Upcoming Exams', value: upcomingExams.length.toString(), icon: <BookOpen size={24} className="text-primary" /> },
        { title: 'Completed Exams', value: '12', icon: <CheckCircleIcon /> },
        { title: 'Violations Flagged', value: '0', icon: <AlertCircle size={24} className="text-warning" /> },
    ];

    return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white">Hello, {user?.name}</h2>
                <p className="text-slate-400 mt-1">Your academic dashboard and upcoming schedules.</p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {widgets.map((widget, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-2xl flex items-center justify-between"
                    >
                        <div>
                            <p className="text-slate-400 text-sm">{widget.title}</p>
                            <h3 className="text-3xl font-bold text-white mt-1">{widget.value}</h3>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl">
                            {widget.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="glass p-6 rounded-2xl w-full">
                <h3 className="text-xl font-bold text-white mb-4">Upcoming Schedule</h3>

                {upcomingExams.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingExams.map(exam => (
                            <div key={exam.id} className="flex items-center justify-between p-4 bg-slate-800/50 rounded-xl border border-primary/30">
                                <div>
                                    <h4 className="text-lg font-bold text-white">{exam.title}</h4>
                                    <p className="text-sm text-slate-400">Duration: {exam.duration} • Scheduled: {exam.date}</p>
                                </div>
                                <button
                                    onClick={() => {
                                        startExam(exam.id);
                                        navigate(`/dashboard/active`);
                                    }}
                                    className="px-6 py-2 bg-gradient-to-r from-primary to-secondary text-white rounded-lg font-medium shadow-lg hover:shadow-indigo-500/50 transition-all"
                                >
                                    Start Exam Phase
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                        <p className="text-slate-400">You have no upcoming exams. Browse the catalog to enroll.</p>
                        <button
                            onClick={() => navigate('/dashboard/available')}
                            className="mt-4 px-4 py-2 border border-primary text-primary hover:bg-primary/10 rounded-lg transition-colors"
                        >
                            Browse Catalog
                        </button>
                    </div>
                )}
            </motion.div>
        </div>
    );
};

const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-success"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

export default StudentDashboard;
