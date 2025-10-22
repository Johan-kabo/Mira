import { GoogleGenAI } from "@google/genai";

// ✅ Accès à la clé API via import.meta.env (Vite)
const apiKey = import.meta.env.VITE_API_KEY;

if (!apiKey) {
  console.error("❌ Aucune clé API trouvée. Vérifie ton fichier .env !");
}

export const ai = new GoogleGenAI({ apiKey });
