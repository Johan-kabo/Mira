import React, { useState, useEffect, useRef } from 'react';

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white"></div>
);

interface TextToAudioPageProps {
    content: {
        title: string;
        subtitle: string;
        textLabel: string;
        textPlaceholder: string;
        voiceLabel: string;
        rateLabel: string;
        pitchLabel: string;
        downloadHint: string;
        errorPermission: string;
        errorSpeech: string;
        errorText: string;
        generateButton: string;
        processingButton: string;
        loadingVoices: string;
        downloadReady: string;
        downloadButton: string;
    }
}

const TextToAudioPage: React.FC<TextToAudioPageProps> = ({ content }) => {
    const [text, setText] = useState('Bonjour! Bienvenue sur Mira AI. Écrivez quelque chose ici et écoutez-le prendre vie.');
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceURI, setSelectedVoiceURI] = useState<string | undefined>();
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);
    const [isProcessing, setIsProcessing] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    useEffect(() => {
        const loadVoices = () => {
            const availableVoices = window.speechSynthesis.getVoices();
            if (availableVoices.length > 0) {
                setVoices(availableVoices);
                const defaultVoice = availableVoices.find(v => v.lang.startsWith('fr')) || availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
                if (defaultVoice) {
                    setSelectedVoiceURI(defaultVoice.voiceURI);
                }
            }
        };

        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();

        return () => {
            window.speechSynthesis.onvoiceschanged = null;
            if (window.speechSynthesis.speaking) {
                window.speechSynthesis.cancel();
            }
        };
    }, []);

    const handleStop = () => {
        window.speechSynthesis.cancel(); 
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        setIsProcessing(false);
    };

    const handleGenerateAndPlay = async () => {
        if (!text.trim()) {
            setError(content.errorText);
            return;
        }

        setError(null);
        setDownloadUrl(null);
        setIsProcessing(true);
        audioChunksRef.current = [];

        let displayStream: MediaStream;
        try {
            displayStream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            streamRef.current = displayStream;
        } catch (err) {
            setError(content.errorPermission);
            setIsProcessing(false);
            return;
        }

        const audioStream = new MediaStream(displayStream.getAudioTracks());
        const recorder = new MediaRecorder(audioStream, { mimeType: 'audio/webm' });
        mediaRecorderRef.current = recorder;

        recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                audioChunksRef.current.push(event.data);
            }
        };

        recorder.onstop = () => {
            const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
            const url = URL.createObjectURL(audioBlob);
            setDownloadUrl(url);
            
            if (streamRef.current) {
                streamRef.current.getTracks().forEach(track => track.stop());
                streamRef.current = null;
            }
        };

        recorder.start();

        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoice = voices.find(v => v.voiceURI === selectedVoiceURI);
        if (selectedVoice) utterance.voice = selectedVoice;
        utterance.rate = rate;
        utterance.pitch = pitch;

        utterance.onend = () => {
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            setIsProcessing(false);
        };
        
        utterance.onerror = (e) => {
            setError(content.errorSpeech.replace('{error}', e.error));
            if (mediaRecorderRef.current?.state === 'recording') {
                mediaRecorderRef.current.stop();
            }
            setIsProcessing(false);
        };

        window.speechSynthesis.speak(utterance);
    };


    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    {content.subtitle}
                </p>
            </div>

            <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                <div>
                    <label htmlFor="text-input" className="block text-lg font-medium text-white mb-2">{content.textLabel}</label>
                    <textarea
                        id="text-input"
                        rows={6}
                        className="w-full p-3 bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder={content.textPlaceholder}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div>
                        <label htmlFor="voice-select" className="block text-sm font-medium text-white mb-2">{content.voiceLabel}</label>
                        <select
                            id="voice-select"
                            className="w-full p-2.5 bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            value={selectedVoiceURI}
                            onChange={(e) => setSelectedVoiceURI(e.target.value)}
                            disabled={voices.length === 0}
                        >
                            {voices.length > 0 ? (
                                voices.map(voice => (
                                    <option key={voice.voiceURI} value={voice.voiceURI}>
                                        {`${voice.name} (${voice.lang})`}
                                    </option>
                                ))
                            ) : (
                                <option>{content.loadingVoices}</option>
                            )}
                        </select>
                    </div>
                     <div>
                        <label htmlFor="rate-slider" className="block text-sm font-medium text-white mb-2">{content.rateLabel.replace('{rate}', rate.toFixed(1))}</label>
                        <input
                            id="rate-slider"
                            type="range"
                            min="0.5"
                            max="2"
                            step="0.1"
                            value={rate}
                            onChange={(e) => setRate(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                     <div>
                        <label htmlFor="pitch-slider" className="block text-sm font-medium text-white mb-2">{content.pitchLabel.replace('{pitch}', pitch.toFixed(1))}</label>
                        <input
                            id="pitch-slider"
                            type="range"
                            min="0"
                            max="2"
                            step="0.1"
                            value={pitch}
                            onChange={(e) => setPitch(parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                    </div>
                </div>

                <div className="bg-purple-900/20 border border-purple-700 text-purple-200 text-xs rounded-lg p-3 text-center">
                    {content.downloadHint}
                </div>
                
                {error && <p className="text-red-400 bg-red-900/50 p-3 rounded-lg text-center text-sm">{error}</p>}

                <button
                    onClick={isProcessing ? handleStop : handleGenerateAndPlay}
                    disabled={!text.trim() || voices.length === 0}
                    className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-3 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed text-lg font-semibold"
                >
                    {isProcessing ? (
                        <>
                            <LoadingSpinner />
                            <span>{content.processingButton}</span>
                        </>
                    ) : (
                       <>
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" /></svg>
                         <span>{content.generateButton}</span>
                       </>
                    )}
                </button>
                
                {downloadUrl && (
                    <div className="text-center border-t border-white/10 pt-6">
                        <h3 className="text-lg font-medium text-white">{content.downloadReady}</h3>
                        <a 
                            href={downloadUrl}
                            download="mira-ai-audio.webm"
                            className="mt-3 inline-block bg-white text-black px-8 py-2 rounded-lg hover:bg-gray-200 transition-colors font-bold"
                        >
                            {content.downloadButton}
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TextToAudioPage;