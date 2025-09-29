import { GoogleGenAI } from "@google/genai";

// IMPORTANT: Replace "YOUR_API_KEY_HERE" with your actual Google Gemini API key.
const API_KEY = "YOUR_API_KEY_HERE";

if (API_KEY === "YOUR_API_KEY_HERE") {
  console.warn("Please replace 'YOUR_API_KEY_HERE' in src/gemini.ts with your actual Google Gemini API key.");
}

export const ai = new GoogleGenAI({ apiKey: API_KEY });
