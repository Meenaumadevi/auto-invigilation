import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock } from 'lucide-react';
import { AuthContext } from '../context/AuthContext';
import { ExamContext, getExamQuestions } from '../context/ExamContext';
import { io } from 'socket.io-client';
import CameraMonitor from '../monitoring/CameraMonitor';
import { useParams } from 'react-router-dom';

const ExamArena = () => {
    const { id: routeExamId } = useParams();
    const examId = routeExamId ? parseInt(routeExamId, 10) : 1;

    const [questions, setQuestions] = useState([]);
    const [timeLeft, setTimeLeft] = useState(60 * 60); // 1 hour
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({});

    // Security states
    const [hasAgreedToRules, setHasAgreedToRules] = useState(false);
    const [rulesAgreed, setRulesAgreed] = useState({ camera: false, mic: false, tabs: false });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [warnings, setWarnings] = useState(0);

    const { user } = useContext(AuthContext);
    const { submitExam } = useContext(ExamContext);
    const navigate = useNavigate();

    useEffect(() => {
        setQuestions(getExamQuestions(examId));
    }, [examId]);

    // Basic security: full screen enforcement
    useEffect(() => {
        const handleFullscreenChange = () => {
            if (!document.fullscreenElement) {
                setIsFullscreen(false);
                handleViolation('Exited full screen');
            } else {
                setIsFullscreen(true);
            }
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
    }, []);

    // Basic security: tab switch detection
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleViolation('Tab switched or unfocused');
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('blur', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            window.removeEventListener('blur', handleVisibilityChange);
        };
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => prev > 0 ? prev - 1 : 0);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleViolation = (reason) => {
        setWarnings(prev => prev + 1);
        // In a real app we would emit this to Socket.io here
        alert(`SECURITY WARNING: ${reason}. This action has been logged.`);
    };

    const startFullscreen = () => {
        document.documentElement.requestFullscreen().catch((err) => {
            console.log('Error attempting to enable fullscreen:', err.message);
        });
    };

    const handleFinalSubmit = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }

        let score = 0;
        if (questions.length > 0) {
            questions.forEach((q, idx) => {
                if (answers[idx] === q.answer) {
                    score += (100 / questions.length);
                }
            });
        }

        submitExam(examId, Math.round(score), warnings > 0);
        navigate('/dashboard/history');
    };

    const allRulesAgreed = rulesAgreed.camera && rulesAgreed.mic && rulesAgreed.tabs;

    if (!hasAgreedToRules) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-8 rounded-2xl max-w-2xl w-full border-t-4 border-primary shadow-2xl">
                    <div className="text-center mb-8">
                        <AlertTriangle size={48} className="text-primary mx-auto mb-4" />
                        <h2 className="text-3xl font-bold text-white mb-2">Pre-Exam Instructions</h2>
                        <p className="text-slate-400">Please review and agree to the following security protocols before entering the exam arena.</p>
                    </div>

                    <div className="space-y-4 mb-8">
                        <label className={`flex items-start p-4 rounded-xl cursor-pointer border transition-all ${rulesAgreed.camera ? 'bg-primary/20 border-primary' : 'bg-slate-800/50 border-slate-700'}`}>
                            <input type="checkbox" checked={rulesAgreed.camera} onChange={() => setRulesAgreed({ ...rulesAgreed, camera: !rulesAgreed.camera })} className="mt-1 w-5 h-5 text-primary bg-slate-900 border-slate-600 focus:ring-primary mr-4 rounded" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Camera Access Required</h4>
                                <p className="text-slate-400 text-sm">I agree to keep my webcam on for the duration of the exam. The AI will monitor eye movements and presence.</p>
                            </div>
                        </label>

                        <label className={`flex items-start p-4 rounded-xl cursor-pointer border transition-all ${rulesAgreed.mic ? 'bg-primary/20 border-primary' : 'bg-slate-800/50 border-slate-700'}`}>
                            <input type="checkbox" checked={rulesAgreed.mic} onChange={() => setRulesAgreed({ ...rulesAgreed, mic: !rulesAgreed.mic })} className="mt-1 w-5 h-5 text-primary bg-slate-900 border-slate-600 focus:ring-primary mr-4 rounded" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Microphone Monitoring</h4>
                                <p className="text-slate-400 text-sm">I agree to allow ambient audio recording to ensure testing integrity.</p>
                            </div>
                        </label>

                        <label className={`flex items-start p-4 rounded-xl cursor-pointer border transition-all ${rulesAgreed.tabs ? 'bg-primary/20 border-primary' : 'bg-slate-800/50 border-slate-700'}`}>
                            <input type="checkbox" checked={rulesAgreed.tabs} onChange={() => setRulesAgreed({ ...rulesAgreed, tabs: !rulesAgreed.tabs })} className="mt-1 w-5 h-5 text-primary bg-slate-900 border-slate-600 focus:ring-primary mr-4 rounded" />
                            <div>
                                <h4 className="text-lg font-semibold text-white">Browser Lockdown</h4>
                                <p className="text-slate-400 text-sm">I understand that exiting fullscreen or switching tabs will be recorded instantly as an academic violation.</p>
                            </div>
                        </label>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button onClick={() => navigate('/dashboard')} className="px-6 py-3 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition font-medium">
                            Cancel
                        </button>
                        <button
                            onClick={() => setHasAgreedToRules(true)}
                            disabled={!allRulesAgreed}
                            className={`px-8 py-3 rounded-lg font-bold shadow-lg transition-all ${allRulesAgreed ? 'bg-primary text-white hover:shadow-indigo-500/30' : 'bg-slate-700 text-slate-500 cursor-not-allowed'}`}
                        >
                            I Agree, Continue
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (!isFullscreen) {
        return (
            <div className="min-h-screen bg-dark flex flex-col items-center justify-center p-4">
                <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass p-8 rounded-2xl max-w-lg text-center border-t-4 border-warning">
                    <AlertTriangle size={48} className="text-warning mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-white mb-2">Exam Security Protocol</h2>
                    <p className="text-slate-400 mb-6">
                        This exam requires fullscreen mode. Once you start, navigating away, switching tabs, or exiting fullscreen will be recorded as an academic violation.
                    </p>
                    <button
                        onClick={startFullscreen}
                        className="w-full bg-gradient-to-r from-primary to-secondary text-white rounded-lg px-4 py-3 font-semibold shadow-lg hover:shadow-indigo-500/30 transition-all"
                    >
                        Enter Fullscreen & Start Exam
                    </button>
                </motion.div>
            </div>
        );
    }

    const formatTime = (seconds) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className="min-h-screen bg-slate-900 text-white flex flex-col user-select-none">
            {/* Header */}
            <header className="bg-slate-800 p-4 border-b border-slate-700 flex justify-between items-center shadow-md">
                <div>
                    <h1 className="text-xl font-bold text-primary">Advanced Physics Midterm</h1>
                    <p className="text-sm text-slate-400">{user?.name} | ID: {user?._id?.substring(0, 8)}</p>
                </div>
                <div className="flex items-center space-x-6">
                    <div className="flex items-center text-warning bg-warning/10 px-3 py-1 rounded-full border border-warning/20">
                        <AlertTriangle size={16} className="mr-2" />
                        <span className="font-medium text-sm">Warnings: {warnings}</span>
                    </div>
                    <div className="flex items-center text-white bg-slate-700 px-4 py-2 rounded-lg font-mono text-lg">
                        <Clock size={20} className="mr-2 text-secondary" />
                        {formatTime(timeLeft)}
                    </div>
                    <button onClick={handleFinalSubmit} className="bg-success hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                        End Exam
                    </button>
                </div>
            </header>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar Nav */}
                <div className="w-64 bg-slate-800 border-r border-slate-700 p-4 overflow-y-auto hidden md:block">
                    <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 font-semibold">Questions</h3>
                    <div className="grid grid-cols-4 gap-2">
                        {questions.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentQuestion(idx)}
                                className={`h-10 w-10 rounded shadow flex items-center justify-center font-medium transition-colors ${currentQuestion === idx
                                    ? 'bg-primary text-white border-2 border-indigo-400'
                                    : answers[idx]
                                        ? 'bg-slate-700 text-slate-300 border border-success/50'
                                        : 'bg-slate-700/50 text-slate-400 border border-slate-600 hover:bg-slate-700'
                                    }`}
                            >
                                {idx + 1}
                            </button>
                        ))}
                    </div>

                    <h3 className="text-sm text-slate-400 uppercase tracking-wider mb-4 font-semibold mt-8 border-t border-slate-700 pt-8">AI Monitoring</h3>
                    <CameraMonitor onViolation={handleViolation} />
                </div>

                {/* Question Area */}
                <div className="flex-1 p-8 overflow-y-auto bg-dark">
                    <div className="max-w-3xl mx-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-slate-200">Question {currentQuestion + 1} of {questions.length}</h2>
                        </div>

                        <motion.div
                            key={currentQuestion}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="glass p-8 rounded-2xl mb-8 border-l-4 border-l-secondary"
                        >
                            {questions.length > 0 && (
                                <>
                                    <p className="text-xl leading-relaxed mb-8">{questions[currentQuestion].text}</p>

                                    <div className="space-y-4">
                                        {questions[currentQuestion].options.map((option, idx) => (
                                            <label
                                                key={idx}
                                                className={`flex items-center p-4 rounded-xl cursor-pointer border transition-all ${answers[currentQuestion] === option
                                                    ? 'bg-primary/20 border-primary shadow-inner'
                                                    : 'bg-slate-800/50 border-slate-700 hover:bg-slate-800 hover:border-slate-500'
                                                    }`}
                                            >
                                                <input
                                                    type="radio"
                                                    name={`question_${currentQuestion}`}
                                                    value={option}
                                                    checked={answers[currentQuestion] === option}
                                                    onChange={() => setAnswers({ ...answers, [currentQuestion]: option })}
                                                    className="w-5 h-5 text-primary bg-slate-900 border-slate-600 focus:ring-primary focus:ring-2 mr-4"
                                                />
                                                <span className="text-lg text-slate-200">{option}</span>
                                            </label>
                                        ))}
                                    </div>
                                </>
                            )}
                        </motion.div>

                        {/* Navigation Buttons */}
                        <div className="flex justify-between items-center mt-8">
                            <button
                                onClick={() => setCurrentQuestion(prev => Math.max(0, prev - 1))}
                                disabled={currentQuestion === 0}
                                className="px-6 py-3 bg-slate-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-slate-700 transition"
                            >
                                Previous
                            </button>
                            {currentQuestion < questions.length - 1 ? (
                                <button
                                    onClick={() => setCurrentQuestion(prev => Math.min(questions.length - 1, prev + 1))}
                                    className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-indigo-600 shadow-lg shadow-indigo-500/20 transition"
                                >
                                    Next Question
                                </button>
                            ) : (
                                <button
                                    onClick={handleFinalSubmit}
                                    className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:shadow-green-500/30 transition-all transform hover:-translate-y-1"
                                >
                                    Submit Final Answers
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ExamArena;
