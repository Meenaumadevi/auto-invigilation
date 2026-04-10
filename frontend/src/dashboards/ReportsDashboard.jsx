import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip as ChartTooltip,
    Legend,
    Filler
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { Download, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    ChartTooltip,
    Legend,
    Filler
);

const ReportsDashboard = () => {
    const reportRef = useRef(null);

    const handleExport = () => {
        // Native browser print dialog allows saving as PDF
        window.print();
    };

    const violationData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Violations Detected',
                data: [12, 19, 8, 24, 15, 5, 2],
                borderColor: '#eab308',
                backgroundColor: 'rgba(234, 179, 8, 0.2)',
                borderWidth: 3,
                tension: 0.4,
                fill: true,
                pointBackgroundColor: '#eab308',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#eab308',
            }
        ]
    };

    const examData = {
        labels: ['Math', 'Physics', 'Chemistry', 'Biology', 'CS'],
        datasets: [
            {
                label: 'Average Score (%)',
                data: [85, 72, 78, 90, 88],
                backgroundColor: '#6366f1',
                borderRadius: 4,
                borderWidth: 0,
            }
        ]
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1e293b',
                titleColor: '#fff',
                bodyColor: '#cbd5e1',
                borderColor: '#475569',
                borderWidth: 1,
                padding: 10,
                displayColors: false,
            }
        },
        scales: {
            x: {
                grid: {
                    color: '#334155',
                    drawBorder: false,
                },
                ticks: {
                    color: '#94a3b8'
                }
            },
            y: {
                grid: {
                    color: '#334155',
                    drawBorder: false,
                    borderDash: [3, 3]
                },
                ticks: {
                    color: '#94a3b8'
                }
            }
        }
    };

    return (
        <div className="p-8 print:p-0" ref={reportRef}>
            <div className="flex justify-between items-center mb-8 print:mb-4">
                <div>
                    <h2 className="text-3xl font-bold text-white print:text-black">Reports & Analytics</h2>
                    <p className="text-slate-400 mt-1 print:text-slate-600">System-wide performance and integrity metrics.</p>
                </div>
                <button
                    onClick={handleExport}
                    className="flex items-center bg-primary hover:bg-indigo-600 text-white px-5 py-2.5 rounded-lg font-medium shadow-lg hover:shadow-indigo-500/30 transition-all print:hidden"
                >
                    <Download size={18} className="mr-2" />
                    Export to PDF
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 print:block print:space-y-8">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-6 rounded-2xl w-full h-[400px] print:h-[300px] print:break-inside-avoid">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center print:text-black">
                        <TrendingUp size={20} className="mr-2 text-warning" />
                        System Violations Over Time
                    </h3>
                    <div className="h-[300px] print:h-[240px]">
                        <Line data={violationData} options={chartOptions} />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }} className="glass p-6 rounded-2xl w-full h-[400px] print:h-[300px] print:break-inside-avoid">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center print:text-black">
                        <TrendingUp size={20} className="mr-2 text-success" />
                        Average Exam Scores by Selection
                    </h3>
                    <div className="h-[300px] print:h-[240px]">
                        <Bar data={examData} options={chartOptions} />
                    </div>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="glass p-6 rounded-2xl w-full print:break-inside-avoid">
                <h3 className="text-xl font-bold text-white mb-6 print:text-black">Recent System Integrity Logs</h3>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-300 print:text-black">
                        <thead className="bg-slate-800/50 text-slate-200 uppercase text-xs print:bg-slate-100 print:text-black">
                            <tr>
                                <th className="px-4 py-3 rounded-tl-lg">Event ID</th>
                                <th className="px-4 py-3">Severity</th>
                                <th className="px-4 py-3">User</th>
                                <th className="px-4 py-3">Exam</th>
                                <th className="px-4 py-3 text-right rounded-tr-lg">Timestamp</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-700/50 print:divide-slate-200">
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-4 font-mono">EVT-8921</td>
                                <td className="px-4 py-4 flex items-center text-danger font-medium"><AlertTriangle size={14} className="mr-1" /> Auto-Flag</td>
                                <td className="px-4 py-4 font-medium text-white print:text-black">Charlie Davis</td>
                                <td className="px-4 py-4 text-slate-400 print:text-black">CS 301 Final</td>
                                <td className="px-4 py-4 text-right">10:45 AM, Oct 24</td>
                            </tr>
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-4 font-mono">EVT-8920</td>
                                <td className="px-4 py-4 flex items-center text-success font-medium"><CheckCircle size={14} className="mr-1" /> Secure</td>
                                <td className="px-4 py-4 font-medium text-white print:text-black">Alice Smith</td>
                                <td className="px-4 py-4 text-slate-400 print:text-black">Advanced Physics</td>
                                <td className="px-4 py-4 text-right">10:12 AM, Oct 24</td>
                            </tr>
                            <tr className="hover:bg-slate-800/30 transition-colors">
                                <td className="px-4 py-4 font-mono">EVT-8919</td>
                                <td className="px-4 py-4 flex items-center text-warning font-medium"><AlertTriangle size={14} className="mr-1" /> Tab Switch</td>
                                <td className="px-4 py-4 font-medium text-white print:text-black">Bob Johnson</td>
                                <td className="px-4 py-4 text-slate-400 print:text-black">Calculus III Final</td>
                                <td className="px-4 py-4 text-right">09:30 AM, Oct 24</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    );
};

export default ReportsDashboard;
