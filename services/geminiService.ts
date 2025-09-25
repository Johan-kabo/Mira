
import { GoogleGenAI } from "@google/genai";

// Assume process.env.API_KEY is configured in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  // In a real app, you'd want to handle this more gracefully.
  // For this example, we'll throw an error if the key is missing.
  console.error("API_KEY is not set in environment variables.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const generateImage = async (prompt: string): Promise<string> => {
  if (!API_KEY) {
    throw new Error("Gemini API key not configured.");
  }
  
  try {
    const response = await ai.models.generateImages({
      model: 'imagen-4.0-generate-001',
      prompt: prompt,
      config: {
        numberOfImages: 1,
        outputMimeType: 'image/png', // Using PNG for potential transparency
        aspectRatio: '1:1',
      },
    });

    if (response.generatedImages && response.generatedImages.length > 0) {
      const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
      return `data:image/png;base64,${base64ImageBytes}`;
    } else {
      throw new Error("No image was generated. The response may have been blocked.");
    }
  } catch (error) {
    console.error("Error generating image with Gemini:", error);
    if (error instanceof Error) {
        // You can customize error messages based on the error type
        if (error.message.includes('API key not valid')) {
            throw new Error('The provided API Key is invalid. Please check your configuration.');
        }
        if (error.message.includes('quota')) {
            throw new Error('You have exceeded your API quota. Please check your billing details.');
        }
    }
    throw new Error("Failed to generate image. Please try a different prompt.");
  }
};
