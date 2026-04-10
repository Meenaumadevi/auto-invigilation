import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Video, Eye, ShieldAlert, X, History, Activity } from 'lucide-react';

const mockStudents = [
    { id: '101', name: 'Alice Smith', status: 'online', warnings: 0 },
    { id: '102', name: 'Bob Johnson', status: 'warning', warnings: 2 },
    { id: '103', name: 'Charlie Davis', status: 'flagged', warnings: 5 },
    { id: '104', name: 'Diana Evans', status: 'offline', warnings: 1 }
];

const AdminMonitor = () => {
    const [students, setStudents] = useState(mockStudents);
    const [activeTab, setActiveTab] = useState('grid');
    const [selectedStudent, setSelectedStudent] = useState(null);

    const handleFlag = (id) => {
        setStudents(prev => prev.map(s =>
            s.id === id ? { ...s, status: 'flagged', warnings: s.warnings + 1 } : s
        ));
    };

    const handleView = (student) => {
        // Generate mock violation history based on warning count
        const violations = [];
        for (let i = 0; i < student.warnings; i++) {
            const types = ['Tab Switched', 'Face Left Frame', 'Multiple Faces Detected', 'Suspicious Audio'];
            violations.push({
                type: types[i % types.length],
                time: `10:${40 + i}:15 AM`
            });
        }
        setSelectedStudent({ ...student, violations });
    };

    // Simulated socket updates
    useEffect(() => {
        const interval = setInterval(() => {
            // Simulate random violation for Bob
            if (Math.random() > 0.8) {
                setStudents(prev => prev.map(s =>
                    s.name === 'Bob Johnson' ? { ...s, status: 'flagged', warnings: s.warnings + 1 } : s
                ));
            }
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="p-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center">
                        <Video className="mr-3 text-secondary" size={32} />
                        Live Exam Monitoring
                    </h2>
                    <p className="text-slate-400 mt-1">Advanced Physics Midterm - 4 Students Connected</p>
                </div>

                <div className="flex bg-slate-800 rounded-lg p-1">
                    <button
                        className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'grid' ? 'bg-primary text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setActiveTab('grid')}
                    >
                        Camera Grid
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md transition-colors ${activeTab === 'alerts' ? 'bg-danger text-white shadow' : 'text-slate-400 hover:text-white'}`}
                        onClick={() => setActiveTab('alerts')}
                    >
                        Alert Feed
                    </button>
                </div>
            </div>

            {activeTab === 'grid' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {students.map((student) => (
                        <motion.div
                            key={student.id}
                            layout
                            className={`glass rounded-xl overflow-hidden border-t-4 ${student.status === 'online' ? 'border-success' :
                                student.status === 'warning' ? 'border-warning' :
                                    student.status === 'flagged' ? 'border-danger' : 'border-slate-500'
                                }`}
                        >
                            {/* Dummy Camera Feed */}
                            <div className="h-48 bg-slate-900 relative flex items-center justify-center border-b border-slate-700 overflow-hidden group">
                                {student.status === 'offline' ? (
                                    <div className="text-center">
                                        <Video size={32} className="mx-auto text-slate-600 mb-2" />
                                        <span className="text-slate-500 font-medium">Feed Disconnected</span>
                                    </div>
                                ) : (
                                    <>
                                        {/* Fake Video Stream Background */}
                                        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-700 via-slate-900 to-black"></div>

                                        {/* Quantum Scanning Overlay */}
                                        <div className={`absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-bounce ${student.status === 'flagged' ? 'via-danger' : student.status === 'warning' ? 'via-warning' : 'via-success'}`}></div>

                                        <div className="relative z-10 text-center">
                                            <div className="text-slate-400 font-mono text-xs mb-1">
                                                Quantum Stream {student.id}
                                            </div>
                                            <div className={`text-sm font-bold tracking-widest uppercase ${student.status === 'flagged' ? 'text-danger' : student.status === 'warning' ? 'text-warning' : 'text-success'}`}>
                                                {student.status === 'flagged' ? 'ANOMALY DETECTED' : student.status === 'warning' ? 'ANALYZING' : 'SECURE'}
                                            </div>
                                        </div>

                                        {/* Face Box Simulation */}
                                        <div className={`absolute inset-0 border-2 m-8 rounded-lg transition-colors duration-1000 ${student.status === 'flagged' ? 'border-danger shadow-[0_0_15px_rgba(239,68,68,0.5)]' : student.status === 'warning' ? 'border-warning shadow-[0_0_15px_rgba(234,179,8,0.3)]' : 'border-success/30'}`}>
                                            <div className="absolute top-1 left-1 w-2 h-2 border-t-2 border-l-2 border-inherit"></div>
                                            <div className="absolute top-1 right-1 w-2 h-2 border-t-2 border-r-2 border-inherit"></div>
                                            <div className="absolute bottom-1 left-1 w-2 h-2 border-b-2 border-l-2 border-inherit"></div>
                                            <div className="absolute bottom-1 right-1 w-2 h-2 border-b-2 border-r-2 border-inherit"></div>
                                        </div>
                                    </>
                                )}

                                {/* Status Badge */}
                                <div className={`absolute top-3 right-3 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${student.status === 'online' ? 'bg-success/20 text-success border border-success/30' :
                                    student.status === 'warning' ? 'bg-warning/20 text-warning border border-warning/30' :
                                        student.status === 'flagged' ? 'bg-danger/20 text-danger animate-pulse border border-danger/50' : 'bg-slate-700 text-slate-300'
                                    }`}>
                                    {student.status}
                                </div>
                            </div>

                            {/* Student Info */}
                            <div className="p-4 bg-slate-800/80">
                                <h3 className="text-white font-semibold flex items-center justify-between">
                                    {student.name}
                                    {student.warnings > 0 && (
                                        <span className="flex items-center text-danger text-sm bg-danger/10 px-2 py-0.5 rounded-full">
                                            <AlertTriangle size={14} className="mr-1" /> {student.warnings}
                                        </span>
                                    )}
                                </h3>
                                <div className="mt-4 flex space-x-2">
                                    <button onClick={() => handleView(student)} className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-1.5 rounded text-sm transition font-medium flex justify-center items-center">
                                        <Eye size={16} className="mr-1" /> View
                                    </button>
                                    <button onClick={() => handleFlag(student.id)} className="flex-1 bg-danger/10 hover:bg-danger hover:text-white text-danger py-1.5 rounded text-sm transition font-medium flex justify-center items-center">
                                        <ShieldAlert size={16} className="mr-1" /> Flag
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            )}

            {activeTab === 'alerts' && (
                <div className="glass p-6 rounded-2xl w-full max-w-4xl max-h-[600px] overflow-y-auto">
                    <h3 className="text-xl font-bold text-white mb-6">Recent Violations</h3>
                    <div className="space-y-4">
                        <div className="flex items-start p-4 bg-danger/10 border border-danger/30 rounded-lg">
                            <div className="p-2 bg-danger/20 rounded-full text-danger mr-4">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="text-danger font-bold">Multiple Faces Detected</h4>
                                <p className="text-slate-300 text-sm mt-1">Charlie Davis was flagged by AI for having multiple faces in the camera frame.</p>
                                <div className="text-slate-500 text-xs mt-2 font-mono">10:45:22 AM - Exam: Advanced Physics</div>
                            </div>
                        </div>
                        <div className="flex items-start p-4 bg-warning/10 border border-warning/30 rounded-lg">
                            <div className="p-2 bg-warning/20 rounded-full text-warning mr-4">
                                <AlertTriangle size={24} />
                            </div>
                            <div>
                                <h4 className="text-warning font-bold">Tab Switched</h4>
                                <p className="text-slate-300 text-sm mt-1">Bob Johnson navigated away from the exam interface.</p>
                                <div className="text-slate-500 text-xs mt-2 font-mono">10:42:15 AM - Exam: Advanced Physics</div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* Student Details Modal */}
            <AnimatePresence>
                {selectedStudent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-slate-800 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col"
                        >
                            <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/50">
                                <h3 className="text-2xl font-bold text-white flex items-center">
                                    <Activity className="mr-2 text-primary" />
                                    Quantum Analysis Log
                                </h3>
                                <button onClick={() => setSelectedStudent(null)} className="text-slate-400 hover:text-white transition-colors">
                                    <X size={24} />
                                </button>
                            </div>

                            <div className="p-6">
                                <div className="flex items-center space-x-4 mb-6">
                                    <div className="h-16 w-16 bg-slate-700 rounded-full flex items-center justify-center border-2 border-primary text-xl font-bold text-white">
                                        {selectedStudent.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-white">{selectedStudent.name}</h4>
                                        <p className="text-slate-400 text-sm">Target ID: {selectedStudent.id}</p>
                                    </div>
                                </div>

                                <div className="bg-dark/50 p-4 rounded-xl border border-slate-700 mb-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-slate-400 font-medium">Current Status</span>
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${selectedStudent.status === 'online' ? 'bg-success/20 text-success' : selectedStudent.status === 'warning' ? 'bg-warning/20 text-warning' : 'bg-danger/20 text-danger'}`}>
                                            {selectedStudent.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-400 font-medium">Total Warnings</span>
                                        <span className="font-mono text-white text-lg font-bold">{selectedStudent.warnings}</span>
                                    </div>
                                </div>

                                <div>
                                    <h5 className="text-white font-semibold flex items-center mb-3">
                                        <History size={18} className="mr-2 text-slate-400" />
                                        Behavioral Anomalies
                                    </h5>
                                    {selectedStudent.violations && selectedStudent.violations.length > 0 ? (
                                        <ul className="space-y-3">
                                            {selectedStudent.violations.map((v, idx) => (
                                                <li key={idx} className="bg-slate-800 p-3 rounded-lg border-l-4 border-danger flex justify-between items-center">
                                                    <span className="text-slate-200 font-medium text-sm">{v.type}</span>
                                                    <span className="text-slate-500 font-mono text-xs">{v.time}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <div className="text-center py-6 bg-slate-800/30 rounded-xl border border-dashed border-slate-700 text-success font-medium">
                                            No anomalies detected. Secure connection.
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-700 bg-slate-800/50 flex justify-end space-x-3">
                                <button onClick={() => setSelectedStudent(null)} className="px-6 py-2 rounded-lg text-slate-300 hover:bg-slate-700 transition font-medium">Close</button>
                                <button onClick={() => handleFlag(selectedStudent.id)} className="px-6 py-2 bg-danger hover:bg-red-600 text-white rounded-lg shadow-lg flex items-center transition font-medium">
                                    <ShieldAlert size={18} className="mr-2" /> Issue Manual Warning
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminMonitor;
