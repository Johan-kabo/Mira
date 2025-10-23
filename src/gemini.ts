import { GoogleGenAI } from "@google/genai";

// FIX: Access API key from process.env.API_KEY as per guidelines.
// This resolves the TypeScript error related to 'import.meta.env'.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
