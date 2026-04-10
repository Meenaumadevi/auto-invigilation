import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, Calendar, Clock, Book, X, Save } from 'lucide-react';

const mockExams = [
    { id: 1, title: 'Advanced Physics Midterm', date: 'Oct 24, 2023', duration: '60 mins', students: 45, status: 'Active' },
    { id: 2, title: 'Introduction to Computer Science', date: 'Nov 12, 2023', duration: '120 mins', students: 120, status: 'Scheduled' },
    { id: 3, title: 'Calculus III Final', date: 'Dec 05, 2023', duration: '180 mins', students: 85, status: 'Draft' }
];

const ExamManagement = () => {
    const [exams, setExams] = useState(mockExams);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingExam, setEditingExam] = useState(null);
    const [formData, setFormData] = useState({ title: '', date: '', duration: '', topic: '', questions: [] });

    // Add Question State
    const [newQuestion, setNewQuestion] = useState({ text: '', answer: '', options: ['', '', '', ''] });
    const handleOpenModal = (exam = null) => {
        if (exam) {
            setEditingExam(exam);
            setFormData({ ...exam, topic: exam.topic || 'General', questions: exam.questions || [] });
        } else {
            setEditingExam(null);
            setFormData({ title: '', date: '', duration: '', topic: '', questions: [] });
        }
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        setExams(exams.filter(e => e.id !== id));
    };

    const handleSave = () => {
        if (!formData.title) return;

        if (editingExam) {
            setExams(exams.map(e => e.id === editingExam.id ? { ...e, ...formData } : e));
        } else {
            setExams([...exams, { ...formData, id: Date.now(), students: 0, status: 'Scheduled' }]);
        }
        setIsModalOpen(false);
    };

    const handleAddQuestion = () => {
        if (newQuestion.text && newQuestion.answer && newQuestion.options.some(opt => opt !== '')) {
            setFormData({ ...formData, questions: [...formData.questions, newQuestion] });
            setNewQuestion({ text: '', answer: '', options: ['', '', '', ''] });
        }
    };

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center">
                        <Book className="mr-3 text-primary" size={32} />
                        Exam Management
                    </h2>
                    <p className="text-slate-400 mt-1">Create, schedule, and manage online assessments.</p>
                </div>

                <button
                    onClick={() => handleOpenModal()}
                    className="bg-gradient-to-r from-primary to-secondary text-white px-5 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center"
                >
                    <Plus size={20} className="mr-2" />
                    Create New Exam
                </button>
            </div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl overflow-hidden w-full">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300">
                        <thead className="bg-slate-800/80 text-slate-200 uppercase text-xs">
                            <tr>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Exam Title</th>
                                <th className="px-6 py-4 flex items-center"><Calendar size={14} className="mr-1" /> Date</th>
                                <th className="px-6 py-4 flex items-center"><Clock size={14} className="mr-1" /> Duration</th>
                                <th className="px-6 py-4">Quantum Token</th>
                                <th className="px-6 py-4">Enrolled</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50">
                            {exams.map((exam) => (
                                <tr key={exam.id} className="hover:bg-slate-800/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${exam.status === 'Active' ? 'bg-success/20 text-success' :
                                            exam.status === 'Scheduled' ? 'bg-primary/20 text-primary' :
                                                'bg-slate-700 text-slate-300'
                                            }`}>
                                            {exam.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white text-base">{exam.title}</td>
                                    <td className="px-6 py-4">{exam.date}</td>
                                    <td className="px-6 py-4">{exam.duration}</td>
                                    <td className="px-6 py-4">
                                        {exam.quantumToken ? (
                                            <span className="font-mono text-xs text-secondary bg-secondary/10 px-2 py-1 rounded border border-secondary/20">
                                                {exam.quantumToken}
                                            </span>
                                        ) : (
                                            <span className="text-slate-500 text-xs italic">Pending</span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4">{exam.students} Students</td>
                                    <td className="px-6 py-4 text-right flex justify-end space-x-3">
                                        <button onClick={() => handleOpenModal(exam)} className="p-2 text-slate-400 hover:text-primary bg-slate-800 rounded-lg transition-colors">
                                            <Edit2 size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(exam.id)} className="p-2 text-slate-400 hover:text-danger bg-slate-800 rounded-lg transition-colors">
                                            <Trash2 size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* Exam Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                                <h3 className="text-2xl font-bold text-white">
                                    {editingExam ? 'Edit Exam configuration' : 'Create New Exam'}
                                </h3>
                                <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                                <div className="grid grid-cols-2 gap-6 mb-8">
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Exam Title</label>
                                        <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Advanced Physics Final" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Date</label>
                                        <input type="text" value={formData.date} onChange={e => setFormData({ ...formData, date: e.target.value })} className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Nov 15, 2024" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Duration</label>
                                        <input type="text" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. 120 mins" />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="block text-sm font-medium text-slate-400 mb-2">Topic/Department</label>
                                        <input type="text" value={formData.topic} onChange={e => setFormData({ ...formData, topic: e.target.value })} className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" placeholder="e.g. Computer Science" />
                                    </div>
                                </div>

                                <div className="border-t border-slate-700 pt-6">
                                    <h4 className="text-lg font-semibold text-white mb-4">Questions Bank</h4>

                                    <div className="bg-dark/50 p-4 rounded-xl border border-slate-700 mb-6">
                                        <div className="grid grid-cols-1 gap-4 mb-4">
                                            <input type="text" value={newQuestion.text} onChange={e => setNewQuestion({ ...newQuestion, text: e.target.value })} placeholder="Question text..." className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary" />

                                            <div className="grid grid-cols-2 gap-4">
                                                {newQuestion.options.map((opt, i) => (
                                                    <input
                                                        key={i}
                                                        type="text"
                                                        value={opt}
                                                        onChange={e => {
                                                            const newOpts = [...newQuestion.options];
                                                            newOpts[i] = e.target.value;
                                                            setNewQuestion({ ...newQuestion, options: newOpts });
                                                        }}
                                                        placeholder={`Option ${i + 1}...`}
                                                        className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                                    />
                                                ))}
                                            </div>

                                            <select
                                                value={newQuestion.answer}
                                                onChange={e => setNewQuestion({ ...newQuestion, answer: e.target.value })}
                                                className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                                            >
                                                <option value="">Select Correct Answer</option>
                                                {newQuestion.options.map((opt, i) => opt && <option key={i} value={opt}>{opt}</option>)}
                                            </select>
                                        </div>
                                        <button onClick={handleAddQuestion} className="bg-primary hover:bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition flex items-center shadow-lg">
                                            <Plus size={16} className="mr-1" /> Add Question to Bank
                                        </button>
                                    </div>

                                    {formData.questions.length > 0 ? (
                                        <ul className="space-y-3">
                                            {formData.questions.map((q, idx) => (
                                                <li key={idx} className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-start space-y-2">
                                                    <div>
                                                        <span className="text-primary font-bold mr-2">Q{idx + 1}.</span>
                                                        <span className="text-white">{q.text}</span>
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-2 w-full pl-6">
                                                        {q.options && q.options.map((opt, i) => opt && (
                                                            <div key={i} className={`text-sm px-3 py-1 rounded-md border ${q.answer === opt ? 'bg-success/20 border-success text-success font-medium' : 'bg-slate-700/50 border-slate-600 text-slate-300'}`}>
                                                                {opt} {q.answer === opt && '✓'}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-slate-500 text-center py-4 bg-slate-800/30 rounded-xl border border-dashed border-slate-700">No questions added yet. Exam will use defaults.</p>
                                    )}
                                </div>
                            </div>

                            <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex justify-end space-x-4">
                                <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition font-medium">Cancel</button>
                                <button onClick={handleSave} className="bg-primary hover:bg-indigo-600 text-white px-8 py-2 rounded-lg font-bold shadow-lg flex items-center transition">
                                    <Save size={18} className="mr-2" /> Save Exam
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ExamManagement;
