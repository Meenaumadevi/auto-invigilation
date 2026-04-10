import React, { useState, useContext } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Clock, Users, ArrowRight } from 'lucide-react';
import { ExamContext } from '../../context/ExamContext';
import { useNavigate } from 'react-router-dom';

const AvailableExams = () => {
    const { availableExams, enrollExam } = useContext(ExamContext);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const filteredExams = availableExams.filter(exam =>
        exam.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exam.department.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                    <BookOpen className="mr-3 text-primary" size={32} />
                    Available Exams
                </h2>
                <p className="text-slate-400 mt-1">Browse and enroll in upcoming automated exams across various departments.</p>
            </motion.div>

            <div className="mb-8">
                <input
                    type="text"
                    placeholder="Search courses or departments..."
                    className="w-full max-w-md bg-slate-800/50 border border-slate-700 text-white rounded-xl px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredExams.map((exam, index) => (
                    <motion.div
                        key={exam.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="glass rounded-2xl p-6 border-t-4 border-primary hover:border-secondary transition-colors group cursor-pointer"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-slate-800 text-primary">
                                {exam.department}
                            </span>
                            <span className={`text-xs font-semibold px-2 py-1 rounded ${exam.difficulty === 'Beginner' ? 'bg-success/20 text-success' :
                                exam.difficulty === 'Intermediate' ? 'bg-warning/20 text-warning' :
                                    'bg-danger/20 text-danger'
                                }`}>
                                {exam.difficulty}
                            </span>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{exam.title}</h3>

                        <div className="flex items-center justify-between text-sm text-slate-400 mb-6 border-b border-slate-700 pb-4">
                            <div className="flex items-center"><Clock size={16} className="mr-1" /> {exam.duration}</div>
                            <div className="flex items-center"><Users size={16} className="mr-1" /> {exam.enrollments} Enrolled</div>
                        </div>

                        <button
                            onClick={() => {
                                enrollExam(exam);
                                navigate('/dashboard');
                            }}
                            className="w-full flex items-center justify-center space-x-2 bg-slate-800 hover:bg-primary text-white py-2.5 rounded-lg transition-colors font-medium"
                        >
                            <span>Enroll Now</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                ))}

                {filteredExams.length === 0 && (
                    <div className="col-span-full py-12 text-center text-slate-500">
                        No exams found matching your search.
                    </div>
                )}
            </div>
        </div>
    );
};

export default AvailableExams;
