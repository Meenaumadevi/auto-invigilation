import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Award, Calendar, FileText, X } from 'lucide-react';
import { ExamContext } from '../../context/ExamContext';

const ExamHistory = () => {
    const { examHistory } = useContext(ExamContext);
    const [selectedExam, setSelectedExam] = useState(null);
    return (
        <div className="p-8 max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                    <CheckCircle className="mr-3 text-success" size={32} />
                    Exam History
                </h2>
                <p className="text-slate-400 mt-1">Review your past performance and evaluation statuses.</p>
            </motion.div>

            <div className="grid grid-cols-1 gap-6">
                {examHistory.map((exam, i) => (
                    <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`glass rounded-2xl p-6 flex flex-col md:flex-row justify-between items-center border-l-4 ${exam.flagged ? 'border-danger' :
                            exam.status === 'Graded' ? 'border-success' : 'border-slate-500'
                            }`}
                    >
                        <div className="flex-1 w-full md:w-auto mb-6 md:mb-0">
                            <div className="flex items-center space-x-3 mb-2">
                                <h3 className="text-xl font-bold text-white">{exam.title}</h3>
                                {exam.flagged && <span className="text-xs bg-danger/20 text-danger px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">Flagged</span>}
                            </div>

                            <div className="flex items-center text-sm text-slate-400 space-x-4">
                                <span className="flex items-center"><Calendar size={14} className="mr-1" /> {exam.date}</span>
                                <span className="flex items-center"><FileText size={14} className="mr-1" /> Auto-Invigilated</span>
                            </div>
                        </div>

                        <div className="flex w-full md:w-auto items-center justify-between md:justify-end md:space-x-8 bg-slate-800/50 p-4 rounded-xl">
                            <div className="text-center px-4 border-r border-slate-700">
                                <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Status</span>
                                <span className={`font-semibold ${exam.status === 'Graded' ? 'text-success' : 'text-warning'}`}>{exam.status}</span>
                            </div>
                            <div className="text-center px-4">
                                <span className="block text-xs text-slate-400 uppercase tracking-widest mb-1">Score</span>
                                <span className="text-2xl font-bold text-white flex items-center justify-center">
                                    {exam.score}
                                    {exam.grade !== 'Pending' && <Award size={20} className="ml-2 text-primary" />}
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setSelectedExam(exam)}
                            className="w-full md:w-auto mt-4 md:mt-0 md:ml-6 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition font-medium"
                        >
                            View Specifics
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* View Specifics Modal */}
            <AnimatePresence>
                {selectedExam && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
                        onClick={() => setSelectedExam(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
                            className="bg-slate-900 border border-slate-700 p-8 rounded-2xl max-w-lg w-full relative shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            <button onClick={() => setSelectedExam(null)} className="absolute top-4 right-4 text-slate-400 hover:text-white">
                                <X size={24} />
                            </button>
                            <h3 className="text-2xl font-bold text-white mb-2">{selectedExam.title}</h3>
                            <p className="text-slate-400 mb-6 border-b border-slate-700 pb-4">Completed on {selectedExam.date}</p>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg">
                                    <span className="text-slate-400">Final Score</span>
                                    <span className="text-xl font-bold text-white">{selectedExam.score}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg">
                                    <span className="text-slate-400">Letter Grade</span>
                                    <span className="text-xl font-bold text-primary">{selectedExam.grade}</span>
                                </div>
                                <div className="flex justify-between items-center bg-slate-800/50 p-4 rounded-lg">
                                    <span className="text-slate-400">System Integrity</span>
                                    <span className={`font-bold ${selectedExam.flagged ? 'text-danger' : 'text-success'}`}>
                                        {selectedExam.flagged ? 'Violations Detected' : 'Clean'}
                                    </span>
                                </div>
                            </div>

                            <div className="bg-slate-800 p-5 rounded-xl border border-slate-700">
                                <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-2">Evaluator Remarks</h4>
                                <p className="text-slate-200 leading-relaxed">{selectedExam.details || 'No additional remarks provided.'}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExamHistory;
