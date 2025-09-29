import { GoogleGenAI } from "@google/genai";

// The API key must be obtained exclusively from the environment variable `process.env.API_KEY`.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });