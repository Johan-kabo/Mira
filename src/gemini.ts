import { GoogleGenAI } from "@google/genai";

// FIX: Use process.env.API_KEY as per the guidelines to fix the 'ImportMeta' error.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });