import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Bell, CheckCircle, Info, AlertTriangle } from 'lucide-react';
import { ExamContext } from '../../context/ExamContext';

const NotificationsPage = () => {
    const { notifications } = useContext(ExamContext);

    const getIcon = (type) => {
        switch (type) {
            case 'success': return <CheckCircle className="text-success" size={24} />;
            case 'warning': return <AlertTriangle className="text-warning" size={24} />;
            case 'danger': return <AlertTriangle className="text-danger" size={24} />;
            default: return <Info className="text-primary" size={24} />;
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
                <h2 className="text-3xl font-bold text-white flex items-center">
                    <Bell className="mr-3 text-primary" size={32} />
                    Notifications
                </h2>
                <p className="text-slate-400 mt-1">System alerts, exam updates, and academic announcements.</p>
            </motion.div>

            {notifications.length > 0 ? (
                <div className="space-y-4">
                    {notifications.map((notif, i) => (
                        <motion.div
                            key={notif.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass rounded-xl p-5 flex items-start space-x-4 border-l-4 hover:bg-slate-800/50 transition"
                            style={{
                                borderLeftColor: notif.type === 'success' ? '#22c55e' :
                                    notif.type === 'warning' ? '#eab308' :
                                        notif.type === 'danger' ? '#ef4444' : '#6366f1'
                            }}
                        >
                            <div className="p-2 bg-slate-800 rounded-lg">
                                {getIcon(notif.type)}
                            </div>
                            <div className="flex-1">
                                <p className="text-white text-lg">{notif.message}</p>
                                <p className="text-slate-400 text-sm mt-1">{notif.time}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="glass rounded-2xl p-12 text-center text-slate-500">
                    <Bell size={48} className="mx-auto mb-4 opacity-30" />
                    <p className="text-lg">You have no notifications at this time.</p>
                </div>
            )}
        </div>
    );
};

export default NotificationsPage;
