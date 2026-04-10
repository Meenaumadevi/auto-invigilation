import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const res = await login(email, password);
        if (res.success) {
            navigate('/dashboard'); // We'll handle role-based routing in a protected wrapper later
        } else {
            setError(res.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 to-slate-900 px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass p-8 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden"
            >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
                <h2 className="text-3xl font-bold text-white mb-6 text-center">Auto Invigilation</h2>
                <h3 className="text-xl text-slate-300 mb-8 text-center">Welcome Back</h3>

                {error && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-danger text-white p-3 rounded mb-4 text-sm text-center">
                        {error}
                    </motion.div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="admin@example.com"
                        />
                    </div>
                    <div>
                        <label className="block text-slate-400 text-sm mb-2">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full bg-slate-800/50 border border-slate-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                        />
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-3 font-semibold shadow-lg hover:shadow-indigo-500/30 transition-shadow"
                    >
                        Login
                    </motion.button>
                </form>
                <p className="mt-6 text-center text-slate-400">
                    Don't have an account? <Link to="/register" className="text-primary hover:text-indigo-400 transition-colors">Register here</Link>
                </p>
            </motion.div>
        </div>
    );
};

export default Login;
