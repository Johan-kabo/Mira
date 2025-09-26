import { GoogleGenAI } from "@google/genai";

// FIX: Use the VITE_API_KEY environment variable that the user has configured in Netlify.
const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { image } = JSON.parse(event.body);
    if (!image || !image.base64 || !image.mimeType) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Image data is required.' }) };
    }
    
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

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: response.text }),
    };

  } catch (error) {
    console.error("Error in getPromptFromImage function:", error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || "An internal server error occurred." }),
    };
  }
};
