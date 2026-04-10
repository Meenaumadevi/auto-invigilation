import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { LayoutDashboard, BookOpen, Clock, CheckCircle, Bell, User, Settings, LogOut, Video } from 'lucide-react';

const Sidebar = () => {
    const { user, logout } = useContext(AuthContext);

    const studentLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Available Exams', path: '/dashboard/available', icon: <BookOpen size={20} /> },
        { name: 'Active Exams', path: '/dashboard/active', icon: <Clock size={20} /> },
        { name: 'Exam History', path: '/dashboard/history', icon: <CheckCircle size={20} /> },
        { name: 'Notifications', path: '/dashboard/notifications', icon: <Bell size={20} /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <User size={20} /> },
    ];

    const adminLinks = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard size={20} /> },
        { name: 'Exam Management', path: '/dashboard/manage', icon: <BookOpen size={20} /> },
        { name: 'Live Monitoring', path: '/dashboard/monitoring', icon: <Video size={20} /> },
        { name: 'Reports & Analytics', path: '/dashboard/reports', icon: <CheckCircle size={20} /> },
        { name: 'Settings', path: '/dashboard/settings', icon: <Settings size={20} /> },
    ];

    const links = user?.role === 'admin' ? adminLinks : studentLinks;

    return (
        <div className="w-64 bg-darkcard min-h-screen text-slate-300 flex flex-col items-center py-6 border-r border-slate-700/50">
            <div className="w-full px-6 mb-8 text-center">
                <h1 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">QuantumGuard</h1>
                <p className="text-xs text-slate-500 mt-1 uppercase tracking-widest">{user?.role} Portal</p>
            </div>

            <nav className="flex-1 w-full px-4 space-y-2">
                {links.map((link) => (
                    <NavLink
                        key={link.name}
                        to={link.path}
                        end={link.path === '/dashboard'}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                ? 'bg-gradient-to-r from-primary/20 to-secondary/20 text-white border border-primary/30 shadow-[0_0_15px_rgba(99,102,241,0.1)]'
                                : 'hover:bg-slate-800 hover:text-white'
                            }`
                        }
                    >
                        {link.icon}
                        <span className="font-medium text-sm">{link.name}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="w-full px-4 mt-auto">
                <button
                    onClick={logout}
                    className="flex w-full items-center space-x-3 px-4 py-3 text-red-400 hover:bg-slate-800 hover:text-red-300 rounded-lg transition-colors"
                >
                    <LogOut size={20} />
                    <span className="font-medium text-sm">Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Sidebar;
