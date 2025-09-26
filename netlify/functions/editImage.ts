import { GoogleGenAI, Modality, GenerateContentResponse } from "@google/genai";

// FIX: Use the VITE_API_KEY environment variable that the user has configured in Netlify.
const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { image, prompt } = JSON.parse(event.body);

    if (!image || !image.base64 || !image.mimeType) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Image data is required.' }) };
    }
    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required.' }) };
    }
    
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

    for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
            const base64ImageBytes: string = part.inlineData.data;
            const imageUrl = `data:${part.inlineData.mimeType};base64,${base64ImageBytes}`;
            return {
              statusCode: 200,
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ imageUrl }),
            };
        }
    }
    
    throw new Error("Could not find an image in the model's response.");

  } catch (error) {
    console.error("Error in editImage function:", error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || "An internal server error occurred." }),
    };
  }
};
