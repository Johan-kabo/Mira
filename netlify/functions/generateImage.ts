import { GoogleGenAI } from "@google/genai";

// FIX: Use the VITE_API_KEY environment variable that the user has configured in Netlify.
// This is a Netlify Function, which runs on the server.
const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });

export const handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { prompt } = JSON.parse(event.body);

    if (!prompt) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Prompt is required.' }) };
    }

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
      const imageUrl = `data:image/png;base64,${base64ImageBytes}`;
      return {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ imageUrl }),
      };
    } else {
      throw new Error("No image was generated. The response may have been blocked.");
    }

  } catch (error) {
    console.error("Error in generateImage function:", error);
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: error.message || "An internal server error occurred." }),
    };
  }
};
