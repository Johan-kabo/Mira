import { GoogleGenAI } from "@google/genai";

// FIX: Per coding guidelines, API key must be retrieved from process.env.API_KEY.
// La clé API doit être accessible via import.meta.env.VITE_API_KEY comme requis par Vite pour le déploiement.
export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });