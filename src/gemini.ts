import { GoogleGenAI } from "@google/genai";

// FIX: The API key must be accessed from process.env.API_KEY as per the guidelines,
// instead of Vite-specific import.meta.env.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });