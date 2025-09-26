import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// Per guidelines, the API key must be obtained from process.env.API_KEY.
// It is assumed to be available in the execution environment.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface Base64Image {
    base64: string;
    mimeType: string;
}

export const generateImage = async (prompt: string): Promise<string> => {
    try {
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/png',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes = response.generatedImages[0].image.imageBytes;
            // Return a data URL that can be used directly in an <img> src attribute
            return `data:image/png;base64,${base64ImageBytes}`;
        } else {
            // Provide a more specific error if no image is returned, which can happen if the prompt is rejected.
            throw new Error("Image generation failed. The prompt may have been blocked by safety settings.");
        }
    } catch (error) {
        console.error("Error in generateImage:", error);
        // Re-throw the error so the UI component can catch it and display a message.
        throw new Error(error.message || "An unexpected error occurred while generating the image.");
    }
};

export const getPromptFromImage = async (image: Base64Image): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType,
            },
        };
        const textPart = {
            text: "Describe this image in detail. Generate a descriptive and imaginative prompt that could be used to create a similar image with an AI image generator.",
        };

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, textPart] },
        });

        return response.text;
    } catch (error) {
        console.error("Error in getPromptFromImage:", error);
        throw new Error(error.message || "An unexpected error occurred while analyzing the image.");
    }
};

export const editImage = async (image: Base64Image, prompt: string): Promise<string> => {
    try {
        const imagePart = {
            inlineData: {
                data: image.base64,
                mimeType: image.mimeType,
            },
        };
        const textPart = { text: prompt };

        const response: GenerateContentResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash-image-preview',
            contents: { parts: [imagePart, textPart] },
            config: {
                responseModalities: [Modality.IMAGE, Modality.TEXT],
            },
        });
        
        // Find the image part in the response
        for (const part of response.candidates[0].content.parts) {
            if (part.inlineData) {
                const base64ImageBytes: string = part.inlineData.data;
                return `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            }
        }
        
        throw new Error("No edited image was returned by the model.");
    } catch (error) {
        console.error("Error in editImage:", error);
        throw new Error(error.message || "An unexpected error occurred while editing the image.");
    }
};
