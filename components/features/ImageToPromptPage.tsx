import React, { useState, useCallback } from 'react';
import { ai } from '../../src/gemini';
import type { Page } from '../../types';

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

const ImageToPromptPage: React.FC<{ onNavigate: (page: Page) => void }> = ({ onNavigate }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [generatedPrompt, setGeneratedPrompt] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
            setGeneratedPrompt(null);
            setError(null);
        }
    };

    const handleGeneratePrompt = useCallback(async () => {
        if (!imageFile) {
            setError("Please upload an image first.");
            return;
        }

        const MAX_SIZE_BYTES = 4.5 * 1024 * 1024; 
        if (imageFile.size > MAX_SIZE_BYTES) {
            setError(`Image size is too large (max 4.5MB). Please upload a smaller file.`);
            return;
        }

        setLoading(true);
        setError(null);
        setGeneratedPrompt(null);
        try {
            const { base64, mimeType } = await fileToBase64(imageFile);
            
            const imagePart = {
                inlineData: { data: base64, mimeType },
            };
            const textPart = {
                text: "Describe this image in detail. Generate a descriptive and imaginative prompt that could be used to create a similar image with an AI image generator.",
            };

            const response = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: { parts: [imagePart, textPart] },
            });
            setGeneratedPrompt(response.text);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, [imageFile]);
    
    const handleCopyPrompt = () => {
        if (generatedPrompt) {
            navigator.clipboard.writeText(generatedPrompt);
            alert("Prompt copied to clipboard!");
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <button onClick={() => onNavigate('home')} className="flex items-center space-x-2 text-gray-300 hover:text-white mb-8">
                <BackArrowIcon />
                <span>Back to Home</span>
            </button>

            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">Image to Prompt Generator</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    Upload an image and let our AI analyze it to generate a detailed, creative text prompt.
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Controls */}
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div>
                        <label htmlFor="image-upload" className="block text-lg font-medium text-white mb-2">Upload Image</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                                <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-purple-500 px-2">
                                        <span>Upload a file</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} />
                                    </label>
                                    <p className="pl-1 hidden sm:block">or drag and drop</p>
                                </div>
                                <p className="text-xs text-gray-500">PNG, JPG up to 4.5MB</p>
                            </div>
                        </div>
                    </div>
                     {imagePreview && (
                        <div>
                            <h3 className="text-lg font-medium text-white mb-2">Image Preview</h3>
                            <img src={imagePreview} alt="Original preview" className="rounded-lg max-h-60 w-auto mx-auto" />
                        </div>
                    )}
                    <button onClick={handleGeneratePrompt} disabled={loading || !imageFile} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? 'Analyzing...' : 'Generate Prompt'}
                    </button>
                </div>

                {/* Results */}
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[400px] flex flex-col justify-center items-center">
                    {loading && <LoadingSpinner />}
                    {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
                    {!loading && !error && !generatedPrompt && (
                        <p className="text-gray-500">Your generated prompt will appear here.</p>
                    )}
                    {generatedPrompt && (
                        <div className="w-full text-left">
                            <h2 className="text-2xl font-bold text-white mb-4 text-center">Generated Prompt</h2>
                            <p className="text-gray-300 bg-gray-900/50 p-4 rounded-lg whitespace-pre-wrap break-words">{generatedPrompt}</p>
                            <button onClick={handleCopyPrompt} className="mt-6 w-full bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">Copy Prompt</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ImageToPromptPage;