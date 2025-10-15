import React, { useState, useCallback } from 'react';
import { ai } from '../../src/gemini';
import { Modality, GenerateContentResponse } from '@google/genai';
import type { Page } from '../../types';

const LoadingSpinner = () => (
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
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

interface AIImageEditorPageProps {
    content: {
        title: string;
        subtitle: string;
        uploadLabel: string;
        uploadFile: string;
        uploadInstructions: string;
        preview: string;
        previews: string;
        promptLabel: string;
        promptPlaceholder: string;
        applyButton: string;
        editingButton: string;
        errorUpload: string;
        errorPrompt: string;
        errorSize: string;
        errorNoResponse: string;
        errorNoImage: string;
        resultsPlaceholder: string;
        resultsTitle: string;
        downloadButton: string;
    }
}

const AIImageEditorPage: React.FC<AIImageEditorPageProps> = ({ content }) => {
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [originalImages, setOriginalImages] = useState<string[]>([]);
    const [resultImage, setResultImage] = useState<string | null>(null);
    const [prompt, setPrompt] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);


    const processFiles = (files: File[] | FileList) => {
        if (files && files.length > 0) {
            const newFiles = Array.from(files);
            const newImageUrls = newFiles.map(file => URL.createObjectURL(file));

            setImageFiles(prev => [...prev, ...newFiles]);
            setOriginalImages(prev => [...prev, ...newImageUrls]);

            setResultImage(null);
            setError(null);
        }
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            processFiles(event.target.files);
        }
    };

    const handlePaste = useCallback((event: React.ClipboardEvent) => {
        const filesToProcess: File[] = [];
        // FIX: Iterate directly over `event.clipboardData.items` which is a `DataTransferItemList`.
        // This ensures `item` is correctly typed as `DataTransferItem`, allowing access to `type` and `getAsFile()`.
        for (const item of event.clipboardData.items) {
            if (item.type.includes('image')) {
                const file = item.getAsFile();
                if (file) {
                    filesToProcess.push(file);
                }
            }
        }
        if (filesToProcess.length > 0) {
            processFiles(filesToProcess);
            event.preventDefault();
        }
    }, []);
    
    const handleRemoveImage = (indexToRemove: number) => {
        URL.revokeObjectURL(originalImages[indexToRemove]);

        setImageFiles(prev => prev.filter((_, index) => index !== indexToRemove));
        setOriginalImages(prev => prev.filter((_, index) => index !== indexToRemove));
    };


    const handleEditImage = useCallback(async () => {
        if (imageFiles.length === 0) {
            setError(content.errorUpload);
            return;
        }
        if (!prompt.trim()) {
            setError(content.errorPrompt);
            return;
        }

        const totalSize = imageFiles.reduce((acc, file) => acc + file.size, 0);
        const MAX_SIZE_BYTES = 4.5 * 1024 * 1024; 
        if (totalSize > MAX_SIZE_BYTES) {
            setError(content.errorSize);
            return;
        }

        setLoading(true);
        setError(null);
        setResultImage(null);
        try {
            
            const imagePayloads = await Promise.all(
                imageFiles.map(file => fileToBase64(file))
            );

            const imageParts = imagePayloads.map(payload => ({
                inlineData: { data: payload.base64, mimeType: payload.mimeType }
            }));
            const textPart = { text: prompt };

            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash-image',
                contents: { parts: [...imageParts, textPart] },
                config: {
                    responseModalities: [Modality.IMAGE],
                },
            });
            
            const candidate = response.candidates?.[0];
            if (!candidate || !candidate.content || !candidate.content.parts) {
                throw new Error(content.errorNoResponse);
            }

            for (const part of candidate.content.parts) {
                if (part.inlineData) {
                    const base64ImageBytes: string = part.inlineData.data;
                    const newImageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
                    setResultImage(newImageUrl);
                    return;
                }
            }
            throw new Error(content.errorNoImage);

        } catch (err) {
            setError(err instanceof Error ? err.message : "An unknown error occurred.");
        } finally {
            setLoading(false);
        }
    }, [imageFiles, prompt, content]);

    return (
        <div className="max-w-7xl mx-auto" onPaste={handlePaste}>
            <div className="text-center mb-12">
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">{content.title}</h1>
                <p className="text-gray-400 max-w-2xl mx-auto mt-4">
                    {content.subtitle}
                </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-start">
                {/* Controls */}
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 space-y-6">
                    <div>
                        <label htmlFor="image-upload" className="block text-lg font-medium text-white mb-2">{content.uploadLabel}</label>
                        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
                            <div className="space-y-1 text-center">
                               <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                <div className="flex text-sm text-gray-400">
                                    <label htmlFor="file-upload" className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-purple-400 hover:text-purple-300 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-900 focus-within:ring-purple-500 px-2">
                                        <span>{content.uploadFile}</span>
                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" accept="image/png, image/jpeg" onChange={handleFileChange} multiple />
                                    </label>
                                    <p className="pl-1 hidden sm:block">{content.uploadInstructions}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                     {originalImages.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-lg font-medium text-white">{originalImages.length > 1 ? content.previews : content.preview}</h3>
                             <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
                                {originalImages.map((src, index) => (
                                    <div key={src} className="relative group">
                                        <img src={src} alt={`upload preview ${index + 1}`} className="rounded-md aspect-square object-cover" />
                                        <button onClick={() => handleRemoveImage(index)} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity" aria-label={`Remove image ${index + 1}`}>
                                            <CloseIcon />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                     <div>
                        <label htmlFor="prompt" className="block text-lg font-medium text-white mb-2">{content.promptLabel}</label>
                        <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} rows={3}
                            className="w-full p-2 bg-white/10 text-white rounded-md border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder={content.promptPlaceholder}></textarea>
                    </div>

                    <button onClick={handleEditImage} disabled={loading || imageFiles.length === 0 || !prompt} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-full flex items-center justify-center space-x-2 hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
                        {loading ? content.editingButton : content.applyButton}
                    </button>
                </div>

                {/* Results */}
                <div className="bg-[#1c162d]/50 border border-white/10 rounded-2xl p-6 sm:p-8 min-h-[400px] flex flex-col justify-center items-center">
                    {loading && <LoadingSpinner />}
                    {error && <p className="text-red-400 bg-red-900/50 p-4 rounded-lg text-center">{error}</p>}
                    {!loading && !error && !resultImage && (
                        <p className="text-gray-500">{content.resultsPlaceholder}</p>
                    )}
                    {resultImage && (
                        <div className="w-full text-center">
                             <h2 className="text-2xl font-bold text-white mb-4">{content.resultsTitle}</h2>
                            <img src={resultImage} alt="Edited result" className="max-w-full max-h-[500px] rounded-lg mx-auto" />
                            <a href={resultImage} download={`edited-image-${Date.now()}.png`} className="mt-6 inline-block bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors">{content.downloadButton}</a>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIImageEditorPage;