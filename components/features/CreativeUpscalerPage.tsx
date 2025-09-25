import React, { useState, useCallback } from 'react';
import { editImage } from '../../services/geminiService';
import type { Page } from '../../App';

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
);

const BackArrowIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
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

const CreativeUpscalerPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [originalImage, setOriginalImage] = useState<string | null>(null);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setOriginalImage(URL.createObjectURL(file));
            setResultImage(null);
            setError(null);
        }
    };

    const handleUpscaleImage = useCallback(async () => {
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }
        setLoading(true);
        setError(null);
        setResultImage(null);
        try {
            const { base64, mimeType } = await fileToBase64(imageFile);
            const prompt = "Upscale this image, enhancing its details, sharpness, and overall resolution. Make it look like a high-quality photograph.";
            const newImageUrl = await editImage({ base64, mimeType }, prompt);
            setResultImage(newImageUrl);
        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, [imageFile]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8">
                <BackArrowIcon />
                <span>Back to Home</span>
            </button>

            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white">Creative AI Upscaler</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    Transform your low-resolution images into stunning, high-definition masterpieces with a single click.
                </p>
            </div>

            <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-8">
                {/* Uploader and Button */}
                <div className="max-w-md mx-auto space-y-6">
                    <div>
                         <label htmlFor="file-upload" className="relative cursor-pointer w-full flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md hover:border-purple-500 transition-colors">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <span className="text-purple-400 font-medium">{imageFile ? `${imageFile.name} selected` : 'Click to upload an image'}</span>
                                <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
                            </div>
                        </label>
                    </div>

                    <button onClick={handleUpscaleImage} disabled={loading || !imageFile} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Upscaling...' : 'Upscale Image'}
                    </button>
                </div>
                
                {/* Results */}
                <div className="mt-12">
                    {loading && <div className="flex justify-center"><LoadingSpinner /></div>}
                    {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
                     {!loading && !error && !originalImage && (
                        <p className="text-gray-500 text-center min-h-[300px] flex items-center justify-center">The comparison will appear here.</p>
                    )}
                    {originalImage && (
                        <div className="grid md:grid-cols-2 gap-8">
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Original</h2>
                                <img src={originalImage} alt="Original" className="rounded-lg mx-auto" />
                            </div>
                            <div className="text-center">
                                <h2 className="text-2xl font-bold text-white mb-4">Upscaled Result</h2>
                                {resultImage ? (
                                    <div>
                                        <img src={resultImage} alt="Upscaled" className="rounded-lg mx-auto" />
                                        <a href={resultImage} download={`upscaled-${Date.now()}.png`} className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">Download Image</a>
                                    </div>
                                ) : (
                                    <div className="rounded-lg bg-black/20 h-full flex items-center justify-center min-h-[300px]">
                                        <p className="text-gray-500">Waiting for result...</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreativeUpscalerPage;
