import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Shield, Bell, Cpu, Save, Lock, Mail } from 'lucide-react';

const AdminSettings = () => {
    const [settings, setSettings] = useState({
        quantumSensitivity: 85,
        autoFlagLimit: 3,
        emailAlerts: true,
        strictLockdown: true,
        retentionMode: '30_days'
    });

    const [saved, setSaved] = useState(false);

    const handleSave = () => {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
    };

    return (
        <div className="p-8 pb-32">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white flex items-center">
                        <Settings className="mr-3 text-primary" size={32} />
                        System Settings
                    </h2>
                    <p className="text-slate-400 mt-1">Configure Quantum AI parameters and platform security.</p>
                </div>
                <button
                    onClick={handleSave}
                    className={`px-8 py-3 rounded-lg font-bold shadow-lg transition-all flex items-center ${saved ? 'bg-success text-white' : 'bg-primary hover:bg-indigo-600 text-white shadow-indigo-500/30'}`}
                >
                    <Save size={18} className="mr-2" />
                    {saved ? 'Saved Successfully' : 'Save Changes'}
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Quantum AI Config */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-700 pb-4">
                        <Cpu className="text-secondary mr-2" size={24} />
                        Quantum AI Optimization
                    </h3>

                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-center mb-2">
                                <label className="text-white font-medium">Detection Sensitivity</label>
                                <span className="text-secondary font-mono bg-secondary/10 px-2 py-1 rounded">{settings.quantumSensitivity}%</span>
                            </div>
                            <input
                                type="range"
                                min="0" max="100"
                                value={settings.quantumSensitivity}
                                onChange={(e) => setSettings({ ...settings, quantumSensitivity: e.target.value })}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-secondary"
                            />
                            <p className="text-sm text-slate-400 mt-2">Adjust how aggressively the AI flags subtle background noises and micro-expressions.</p>
                        </div>

                        <div>
                            <label className="text-white font-medium block mb-2">Auto-Flag Threshold</label>
                            <select
                                value={settings.autoFlagLimit}
                                onChange={(e) => setSettings({ ...settings, autoFlagLimit: e.target.value })}
                                className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white focus:border-secondary focus:ring-1 focus:ring-secondary"
                            >
                                <option value="1">Strict (1 Warning = Flag)</option>
                                <option value="3">Moderate (3 Warnings = Flag)</option>
                                <option value="5">Lenient (5 Warnings = Flag)</option>
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* Security Config */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass rounded-2xl p-8">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-700 pb-4">
                        <Shield className="text-warning mr-2" size={24} />
                        Security & Lockdown
                    </h3>

                    <div className="space-y-4 mb-6">
                        <label className={`flex items-start p-4 rounded-xl cursor-pointer border transition-all ${settings.strictLockdown ? 'bg-warning/10 border-warning/50' : 'bg-slate-800/50 border-slate-700'}`}>
                            <input
                                type="checkbox"
                                checked={settings.strictLockdown}
                                onChange={() => setSettings({ ...settings, strictLockdown: !settings.strictLockdown })}
                                className="mt-1 w-5 h-5 text-warning bg-slate-900 border-slate-600 rounded mr-4"
                            />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Strict Browser Lockdown</h4>
                                <p className="text-slate-400 text-sm">Force fullscreen and instantly terminate exam if window loses focus for more than 5 seconds.</p>
                            </div>
                        </label>
                    </div>

                    <div>
                        <label className="text-white font-medium block mb-2">Data Retention Policy</label>
                        <select
                            value={settings.retentionMode}
                            onChange={(e) => setSettings({ ...settings, retentionMode: e.target.value })}
                            className="w-full bg-dark border border-slate-600 rounded-lg px-4 py-3 text-white"
                        >
                            <option value="15_days">15 Days (Compliance Minimum)</option>
                            <option value="30_days">30 Days (Recommended)</option>
                            <option value="90_days">90 Days (Extended Archive)</option>
                        </select>
                    </div>
                </motion.div>

                {/* Notifications Config */}
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass rounded-2xl p-8 lg:col-span-2">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center border-b border-slate-700 pb-4">
                        <Bell className="text-primary mr-2" size={24} />
                        Administrative Alerts
                    </h3>

                    <label className={`flex items-start p-4 rounded-xl cursor-pointer border transition-all ${settings.emailAlerts ? 'bg-primary/20 border-primary' : 'bg-slate-800/50 border-slate-700'}`}>
                        <input
                            type="checkbox"
                            checked={settings.emailAlerts}
                            onChange={() => setSettings({ ...settings, emailAlerts: !settings.emailAlerts })}
                            className="mt-1 w-5 h-5 text-primary bg-slate-900 border-slate-600 rounded mr-4"
                        />
                        <div>
                            <h4 className="text-lg font-semibold text-white">Critical Email Alerts</h4>
                            <p className="text-slate-400 text-sm">Receive instant email notifications when an instructor flags a severe violation or the system detects mass-anomaly events.</p>
                        </div>
                    </label>
                </motion.div>
            </div>
        </div>
    );
};

export default AdminSettings;
