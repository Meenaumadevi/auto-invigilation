import React from 'react';
import { motion } from 'framer-motion';

const PlaceholderPage = ({ title, description }) => {
    return (
        <div className="p-8 h-full flex flex-col items-center justify-center text-center">
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass p-12 rounded-3xl max-w-2xl border-2 border-primary/20">
                <h2 className="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">{title}</h2>
                <p className="text-xl text-slate-400 mb-8">{description}</p>
                <div className="inline-block p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                    <p className="text-slate-300 font-mono text-sm">Component under active development for QuantumGuard v1.1</p>
                </div>
            </motion.div>
        </div>
    );
};

export default PlaceholderPage;
