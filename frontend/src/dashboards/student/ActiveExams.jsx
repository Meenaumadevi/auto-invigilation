import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Clock, PlayCircle, AlertCircle, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ExamContext } from '../../context/ExamContext';

const ActiveExams = () => {
    const { activeExams, upcomingExams, startExam } = useContext(ExamContext);
    const navigate = useNavigate();

    return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                    <Clock className="mr-3 text-warning" size={32} />
                    Active Exams
                </h2>
                <p className="text-slate-400 mt-1">Exams you have started but not yet submitted.</p>
            </motion.div>

            {/* In Progress Exams */}
            {activeExams.length > 0 && (
                <div className="mb-12">
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-warning/30 pb-2 inline-block">In Progress</h3>
                    <div className="space-y-6">
                        {activeExams.map((exam, index) => (
                            <motion.div
                                key={exam.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="glass rounded-2xl p-6 border-l-4 border-warning flex flex-col md:flex-row justify-between items-center relative overflow-hidden group"
                            >
                                <div className="absolute top-0 right-0 w-32 h-32 bg-warning/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                                <div className="mb-4 md:mb-0 relative z-10 w-full md:w-1/2">
                                    <h3 className="text-2xl font-bold text-white mb-2">{exam.title}</h3>
                                    <div className="flex space-x-4 text-sm text-slate-400">
                                        <span className="flex items-center text-warning font-medium">
                                            <Clock size={16} className="mr-1" /> {exam.timeRemaining} Left
                                        </span>
                                        <span>{exam.answered} of {exam.totalQuestions} Questions Answered</span>
                                    </div>

                                    <div className="w-full bg-slate-800 rounded-full h-2.5 mt-4">
                                        <div className="bg-warning h-2.5 rounded-full shadow-[0_0_10px_rgba(234,179,8,0.5)]" style={{ width: `${(exam.answered / exam.totalQuestions) * 100}%` }}></div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate(`/dashboard/exam/${exam.id}`)}
                                    className="w-full md:w-auto relative z-10 flex items-center justify-center space-x-2 bg-warning hover:bg-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-bold shadow-lg shadow-warning/20 transition-all transform hover:-translate-y-1"
                                >
                                    <PlayCircle size={24} />
                                    <span>Resume Exam</span>
                                </button>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            {/* Upcoming / Ready to Start Exams */}
            {(upcomingExams.length > 0 || activeExams.length > 0) ? (
                <div>
                    <h3 className="text-xl font-bold text-white mb-4 border-b border-primary/30 pb-2 inline-block">Ready to Start</h3>
                    {upcomingExams.length > 0 ? (
                        <div className="grid grid-cols-1 gap-6">
                            {upcomingExams.map((exam, i) => (
                                <motion.div
                                    key={exam.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass rounded-2xl p-6 border-l-4 border-primary flex flex-col md:flex-row justify-between items-center hover:bg-slate-800/40 transition-colors"
                                >
                                    <div className="mb-4 md:mb-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <AlertCircle size={16} className="text-primary" />
                                            <span className="text-xs font-bold text-primary uppercase tracking-wider">Unattempted</span>
                                        </div>
                                        <h3 className="text-xl font-bold text-white mb-1">{exam.title}</h3>
                                        <div className="flex items-center text-sm text-slate-400 space-x-4">
                                            <span className="flex items-center"><Calendar size={14} className="mr-1" /> {exam.date}</span>
                                            <span className="flex items-center"><Clock size={14} className="mr-1" /> {exam.duration}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            startExam(exam.id);
                                            // Instead of navigating immediately to the arena, we just started it so we can stay here and let them see it move to In Progress, or navigate to it immediately. We'll navigate immediately to save clicks.
                                            navigate(`/dashboard/exam/${exam.id}`);
                                        }}
                                        className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all font-semibold"
                                    >
                                        Begin Exam Now
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center bg-slate-800/30 rounded-xl border border-dashed border-slate-700">
                            <p className="text-slate-400">You have no upcoming exams ready to start.</p>
                        </div>
                    )}
                </div>
            ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="glass rounded-3xl p-12 text-center max-w-2xl mx-auto mt-12">
                    <Clock size={64} className="text-slate-600 mx-auto mb-4 opacity-50" />
                    <h3 className="text-2xl font-bold text-white mb-2">No Active Exams</h3>
                    <p className="text-slate-400 mb-6">You don't have any incomplete exams running. Check 'Available Exams' to enroll in new ones.</p>
                    <button onClick={() => navigate('/dashboard/available')} className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-600 transition">Browse Exams</button>
                </motion.div>
            )}
        </div>
    );
};

export default ActiveExams;
