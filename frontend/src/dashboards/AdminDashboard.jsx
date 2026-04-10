import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Users, FileText, AlertTriangle, Activity, Cpu } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

const quantumData = [
    { time: '08:00', anomalies: 2 },
    { time: '09:00', anomalies: 5 },
    { time: '10:00', anomalies: 12 },
    { time: '11:00', anomalies: 3 },
    { time: '12:00', anomalies: 1 },
    { time: '13:00', anomalies: 8 },
    { time: '14:00', anomalies: 15 },
];

const suspiciousLogs = [
    { id: 1, student: 'Bob Johnson', exam: 'Advanced Physics', violation: 'Tab Switched', time: '10:42 AM', severity: 'Medium' },
    { id: 2, student: 'Charlie Davis', exam: 'CS 301 Final', violation: 'Multiple Faces Detected', time: '10:45 AM', severity: 'High' },
    { id: 3, student: 'Diana Evans', exam: 'Calculus III', violation: 'Audio Anomaly', time: '11:15 AM', severity: 'Low' },
];

const AdminDashboard = () => {
    const { user } = useContext(AuthContext);

    const stats = [
        { title: 'Total Students', value: '1,245', icon: <Users size={24} className="text-primary" /> },
        { title: 'Active Exams', value: '12', icon: <FileText size={24} className="text-success" /> },
        { title: 'Total Violations', value: '34', icon: <AlertTriangle size={24} className="text-danger" /> },
        { title: 'System Health', value: '98%', icon: <Activity size={24} className="text-secondary" /> },
    ];

    return (
        <div className="p-8">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8 flex justify-between items-end">
                <div>
                    <h2 className="text-3xl font-bold text-white">Welcome, {user?.name}</h2>
                    <p className="text-slate-400 mt-1">Here is the overview of the QuantumGuard Platform.</p>
                </div>
                <div className="bg-primary/20 border border-primary/50 px-4 py-2 rounded-lg flex items-center text-primary text-sm font-semibold">
                    <Cpu size={18} className="mr-2 animate-pulse" />
                    Quantum-Enhanced AI Active
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass p-6 rounded-2xl flex items-center justify-between"
                    >
                        <div>
                            <p className="text-slate-400 text-sm">{stat.title}</p>
                            <h3 className="text-2xl font-bold text-white mt-1">{stat.value}</h3>
                        </div>
                        <div className="p-4 bg-slate-800/50 rounded-xl">
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts and Data Table */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-2xl h-96 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white">Anomaly Detection Over Time</h3>
                        <p className="text-slate-400 text-sm">Powered by our Quantum-AI Engine</p>
                    </div>
                    <div className="flex-1 min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={quantumData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorAnomalies" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                                <XAxis dataKey="time" stroke="#94a3b8" fontSize={12} />
                                <YAxis stroke="#94a3b8" fontSize={12} />
                                <RechartsTooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#fff' }} />
                                <Area type="monotone" dataKey="anomalies" stroke="#8b5cf6" fillOpacity={1} fill="url(#colorAnomalies)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="glass p-6 rounded-2xl h-96 flex flex-col">
                    <div className="mb-4">
                        <h3 className="text-xl font-bold text-white">Suspicious Behavior Logs</h3>
                        <p className="text-slate-400 text-sm">Real-time alerts of warned and cheating students</p>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
                        <div className="space-y-4">
                            {suspiciousLogs.map(log => (
                                <div key={log.id} className="bg-slate-800/50 p-4 rounded-xl border-l-4 border-danger hover:bg-slate-800 transition-colors">
                                    <div className="flex justify-between items-start mb-2">
                                        <h4 className="font-bold text-white">{log.student}</h4>
                                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${log.severity === 'High' ? 'bg-danger/20 text-danger' : log.severity === 'Medium' ? 'bg-warning/20 text-warning' : 'bg-secondary/20 text-secondary'}`}>
                                            {log.severity}
                                        </span>
                                    </div>
                                    <p className="text-sm text-danger font-medium">{log.violation}</p>
                                    <div className="flex justify-between items-center mt-2 text-xs text-slate-400">
                                        <span>{log.exam}</span>
                                        <span>{log.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminDashboard;
