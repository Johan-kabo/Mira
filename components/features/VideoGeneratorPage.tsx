import React, { useState, useCallback } from 'react';
import { ai } from '../../src/gemini';

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
);

const DownloadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const fileToBase64 = (file: File): Promise<{ base64: string; mimeType: string }> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const result = reader.result as string;
            const base64 = result.split(',')[1];
            const mimeType = result.split(';')[0].split(':')[1];
            resolve({ base64, mimeType });
        };
        reader.onerror = (error) => reject(error);
    });
};

interface VideoGeneratorPageProps {
    content: {
        title: string;
        subtitle: string;
        promptLabel: string;
        promptPlaceholder: string;
        imageLabel: string;
        uploadFile: string;
        uploadInstructions: string;
        uploadHint: string;
        imagePreview: string;
        generateButton: string;
        generatingButton: string;
        loadingRequest: string;
        loadingProgress: string;
        loadingStatus: string;
        loadingFinalizing: string;
        errorPrompt: string;
        errorSize: string;
        errorApiKey: string;
        errorDownload: string;
        errorGeneric: string;
        resultsPlaceholder: string;
        resultsTitle: string;
    }
}

const VideoGeneratorPage: React.FC<VideoGeneratorPageProps> = ({ content }) => {
    const [prompt, setPrompt] = useState('');
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [loadingMessage, setLoadingMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [videoUrl, setVideoUrl] = useState<string | null>(null);

    const processFile = (file: File | null) => {
        if (!file) return;
        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));
        setError(null);
    };

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        processFile(event.target.files?.[0] ?? null);
    };

    const handlePaste = useCallback((event: React.ClipboardEvent) => {
        const items = event.clipboardData.items;
        // FIX: Iterate directly over `items` which is a `DataTransferItemList`.
        // This ensures `item` is correctly typed as `DataTransferItem`, allowing access to `type` and `getAsFile()`.
        for (const item of items) {
            if (item.type.includes('image')) {
                const file = item.getAsFile();
                if (file) {
                    processFile(file);
                    event.preventDefault();
                    return;
                }
            }
        }
    }, []);
    
    const handleRemoveImage = () => {
        if (imagePreview) {
            URL.revokeObjectURL(imagePreview);
        }
        setImageFile(null);
        setImagePreview(null);
    };

    const handleGenerateVideo = useCallback(async () => {
        if (!prompt.trim() && !imageFile) {
            setError(content.errorPrompt);
            return;
        }

        if (imageFile) {
            const MAX_SIZE_BYTES = 4.5 * 1024 * 1024;
            if (imageFile.size > MAX_SIZE_BYTES) {
                setError(content.errorSize);
                return;
            }
        }

        setLoading(true);
        setError(null);
        setVideoUrl(null);
        setLoadingMessage(content.loadingRequest);

        try {
            const generateVideoPayload: {
                model: string;
                prompt: string;
                config: { numberOfVideos: number };
                image?: { imageBytes: string; mimeType: string };
            } = {
                model: 'veo-2.0-generate-001',
                prompt: prompt,
                 config: {
                    numberOfVideos: 1
                }
            };

            if (imageFile) {
                const { base64, mimeType } = await fileToBase64(imageFile);
                generateVideoPayload.image = {
                    imageBytes: base64,
                    mimeType: mimeType
                };
            }

            let operation = await ai.models.generateVideos(generateVideoPayload);

            setLoadingMessage(content.loadingProgress);

            while (!operation.done) {
                await new Promise(resolve => setTimeout(resolve, 10000)); // Poll every 10 seconds
                setLoadingMessage(content.loadingStatus);
                operation = await ai.operations.getVideosOperation({operation: operation});
            }

            setLoadingMessage(content.loadingFinalizing);

            const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
            if (!downloadLink) {
                throw new Error("Video generation completed, but no video URI was found in the response.");
            }

            // FIX: Per coding guidelines, API key must be retrieved from process.env.API_KEY.
            // Utiliser import.meta.env.VITE_API_KEY pour accéder à la clé API côté client avec Vite
            const apiKey = process.env.API_KEY;
            if (!apiKey) {
                throw new Error(content.errorApiKey);
            }
            
            const response = await fetch(`${downloadLink}&key=${apiKey}`);
            if (!response.ok) {
                const errorBody = await response.text();
                const errorMessage = content.errorDownload
                    .replace('{statusText}', response.statusText)
                    .replace('{errorBody}', errorBody);
                throw new Error(errorMessage);
            }
            
            const videoBlob = await response.blob();
            const url = URL.createObjectURL(videoBlob);
            setVideoUrl(url);

        } catch (err) {
            setError(err instanceof Error ? err.message : content.errorGeneric);
        } finally {
            setLoading(false);
            setLoadingMessage('');
        }
    }, [prompt, imageFile, content]);

    return (
        <div className="max-w-7xl mx-auto" onPaste={handlePaste}>
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    {content.subtitle}
                </p>
            </div>

            <div className="max-w-3xl mx-auto">
                {/* Controls */}
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                     <div>
                        <label htmlFor="prompt" className="block text-lg font-medium text-white mb-2">{content.promptLabel}</label>
                        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3}
                            className="w-full p-2 bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={content.promptPlaceholder}></textarea>
                    </div>

                    <div>
                        <label htmlFor="image-upload" className="block text-lg font-medium text-white mb-2">{content.imageLabel}</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                               <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-purple-500 px-2">
                                        <span>{content.uploadFile}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1 hidden sm:block">{content.uploadInstructions}</p>
                                </div>
                                <p className="text-xs text-gray-500">{content.uploadHint}</p>
                            </div>
                        </div>
                    </div>

                    {imagePreview && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-white">{content.imagePreview}</h3>
                            <div className="relative group w-32">
                                <img src={imagePreview} alt="upload preview" className="rounded-md aspect-square object-cover" />
                                <button onClick={handleRemoveImage} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label="Remove image">
                                    <CloseIcon />
                                </button>
                            </div>
                        </div>
                    )}

                    <button onClick={handleGenerateVideo} disabled={loading || (!prompt && !imageFile)} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? content.generatingButton : content.generateButton}
                    </button>
                </div>

                {/* Results */}
                <div className="mt-8 bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[400px] flex flex-col justify-center items-center">
                    {loading && (
                        <div className="text-center">
                            <LoadingSpinner />
                            <p className="text-gray-300 mt-4">{loadingMessage}</p>
                        </div>
                    )}
                    {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
                    {!loading && !error && !videoUrl && (
                        <p className="text-gray-500">{content.resultsPlaceholder}</p>
                    )}
                    {videoUrl && (
                        <div className="w-full text-center">
                             <h2 className="text-2xl font-bold text-white mb-4">{content.resultsTitle}</h2>
                             <div className="relative group">
                                <video src={videoUrl} controls autoPlay loop className="max-w-full rounded-lg mx-auto" />
                                <a
                                    href={videoUrl}
                                    download={`mira-ai-video-${Date.now()}.mp4`}
                                    className="absolute top-4 right-4 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-opacity opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer"
                                    aria-label="Download video"
                                    title="Download video"
                                >
                                    <DownloadIcon />
                                </a>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default VideoGeneratorPage;