import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Mail, Shield, Edit3, Settings, Camera, Lock, Check } from 'lucide-react';
import { AuthContext } from '../../context/AuthContext';
import { ExamContext } from '../../context/ExamContext';

const StudentProfile = () => {
    const { user } = useContext(AuthContext);
    const { examHistory } = useContext(ExamContext);

    // Interactive states for buttons
    const [tfaEnabled, setTfaEnabled] = useState(false);
    const [testingCamera, setTestingCamera] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);


    return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white">Student Profile</h2>
                <p className="text-slate-400 mt-1">Manage your academic identity and account settings.</p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - ID Card */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }} className="lg:col-span-1">
                    <div className="glass rounded-3xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110"></div>

                        <div className="flex flex-col items-center">
                            <div className="w-32 h-32 rounded-full border-4 border-slate-700 p-1 mb-4 relative">
                                <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center text-primary">
                                    <User size={64} />
                                </div>
                                <button className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover:bg-indigo-600 transition shadow-lg">
                                    <Edit3 size={16} />
                                </button>
                            </div>

                            <h3 className="text-2xl font-bold text-white mb-1">{user?.name || "Student User"}</h3>
                            <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-6">Quantum ID: {user?._id?.substring(0, 8) || "QTM-8912"}</span>

                            <div className="w-full space-y-3">
                                <div className="flex items-center text-slate-300 bg-slate-800/50 p-3 rounded-lg">
                                    <Mail size={18} className="mr-3 text-slate-400" />
                                    <span className="text-sm">{user?.email || "student@example.com"}</span>
                                </div>
                                <div className="flex items-center text-slate-300 bg-slate-800/50 p-3 rounded-lg">
                                    <Shield size={18} className="mr-3 text-slate-400" />
                                    <span className="text-sm capitalize">{user?.role || "Student"} Role</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column - Stats & Settings */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="lg:col-span-2 space-y-8">

                    {/* Academic Stats */}
                    <div className="glass rounded-3xl p-8">
                        <h3 className="text-xl font-bold text-white mb-6 border-b border-slate-700 pb-4">Academic Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center shadow-inner hover:bg-slate-800 transition-colors">
                                <span className="block text-3xl font-bold text-primary mb-1">{examHistory.length}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Exams Taken</span>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center shadow-inner hover:bg-slate-800 transition-colors">
                                <span className="block text-3xl font-bold text-success mb-1">
                                    {examHistory.filter(e => e.grade === 'A' || e.grade === 'B' || e.grade === 'B+').length > 0 ? '3.8' : 'N/A'}
                                </span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Average GPA</span>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center shadow-inner hover:bg-slate-800 transition-colors">
                                <span className="block text-3xl font-bold text-warning mb-1">
                                    {examHistory.filter(e => e.flagged).length}
                                </span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Violations</span>
                            </div>
                            <div className="bg-slate-800/50 p-4 rounded-xl text-center shadow-inner hover:bg-slate-800 transition-colors">
                                <span className="block text-3xl font-bold text-secondary mb-1">{examHistory.length * 3}</span>
                                <span className="text-xs text-slate-400 uppercase tracking-wider">Credits</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Settings */}
                    <div className="glass rounded-3xl p-8">
                        <div className="flex justify-between items-center mb-6 border-b border-slate-700 pb-4">
                            <h3 className="text-xl font-bold text-white">System Settings</h3>
                            <Settings size={20} className="text-slate-400" />
                        </div>

                        <div className="space-y-4">
                            {/* 2FA Setting */}
                            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition border border-transparent hover:border-slate-700">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-slate-800 rounded-lg text-primary">
                                        <Shield size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Two-Factor Authentication</h4>
                                        <p className="text-sm text-slate-400">Secure your account with 2FA.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setTfaEnabled(!tfaEnabled)}
                                    className={`px-6 py-2 border rounded-lg text-sm transition font-medium flex items-center space-x-2 ${tfaEnabled
                                            ? 'border-success bg-success/10 text-success hover:bg-success/20'
                                            : 'border-primary text-primary hover:bg-primary/10'
                                        }`}
                                >
                                    {tfaEnabled ? <><Check size={16} /> <span>Enabled</span></> : <span>Enable</span>}
                                </button>
                            </div>

                            {/* Camera Test Setting */}
                            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition border border-transparent hover:border-slate-700">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-slate-800 rounded-lg text-secondary">
                                        <Camera size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Camera Hardware Test</h4>
                                        <p className="text-sm text-slate-400">Verify your webcam before exams.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setTestingCamera(true);
                                        setTimeout(() => setTestingCamera(false), 2000);
                                    }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition ${testingCamera ? 'bg-secondary/50 text-white cursor-wait' : 'bg-slate-700 text-white hover:bg-slate-600'
                                        }`}
                                >
                                    {testingCamera ? 'Testing...' : 'Run Test'}
                                </button>
                            </div>

                            {/* Password Setting */}
                            <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl hover:bg-slate-800/50 transition border border-transparent hover:border-slate-700">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 bg-slate-800 rounded-lg text-warning">
                                        <Lock size={20} />
                                    </div>
                                    <div>
                                        <h4 className="text-white font-medium">Change Password</h4>
                                        <p className="text-sm text-slate-400">Update your account password.</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => {
                                        setPasswordChanged(true);
                                        setTimeout(() => setPasswordChanged(false), 3000);
                                    }}
                                    className={`px-6 py-2 rounded-lg text-sm font-medium transition flex items-center space-x-2 ${passwordChanged ? 'bg-success/20 text-success' : 'bg-slate-700 text-white hover:bg-slate-600'
                                        }`}
                                >
                                    {passwordChanged ? <><Check size={16} /> <span>Sent Email</span></> : <span>Update</span>}
                                </button>
                            </div>
                        </div>
                    </div>

                </motion.div>
            </div>
        </div>
    );
};

export default StudentProfile;
