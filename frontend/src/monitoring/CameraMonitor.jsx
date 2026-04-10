import React, { useEffect, useRef, useState } from 'react';

const CameraMonitor = ({ onViolation }) => {
    const videoRef = useRef(null);
    const [hasCamera, setHasCamera] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let stream = null;

        const startCamera = async () => {
            try {
                stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
                setHasCamera(true);
            } catch (err) {
                setError('Camera and Microphone access is required for this exam.');
                onViolation('Camera/Mic permission denied');
            }
        };

        startCamera();

        return () => {
            if (stream) {
                stream.getTracks().forEach((track) => track.stop());
            }
        };
    }, [onViolation]);

    return (
        <div className="relative rounded-xl overflow-hidden shadow-lg border-2 border-slate-700 w-full aspect-video bg-black flex items-center justify-center">
            {!hasCamera && !error && (
                <span className="text-slate-500 animate-pulse">Initializing Monitoring AI...</span>
            )}
            {error && (
                <span className="text-danger flex text-center p-4 text-sm font-semibold">{error}</span>
            )}
            <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className={`w-full h-full object-cover ${hasCamera ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}
            />

            {/* AI Overlay Decoration */}
            {hasCamera && (
                <div className="absolute inset-0 pointer-events-none border border-primary/30 rounded-xl">
                    <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-primary"></div>
                    <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-primary"></div>
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-primary"></div>
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-primary"></div>

                    <div className="absolute top-2 left-1/2 -translate-x-1/2 flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
                        <span className="text-[10px] uppercase font-mono text-success bg-black/50 px-1 rounded">Tracking Active</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CameraMonitor;
