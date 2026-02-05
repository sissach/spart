import { GoogleGenAI } from "@google/genai";

// Initialize the Gemini API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

/**
 * Gets design advice for a given prompt using the Gemini model.
 */
export const getDesignAdvice = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: `Du bist ein erfahrener leitender Architekt von ESPART Architekten. 
        Dein Stil ist minimalistisch, hochwertig und schweizerisch geprägt. 
        Biete prägnante Designberatung zu Materialien und Licht. 
        Antworte ausschließlich auf Deutsch.`,
        temperature: 0.7,
      },
    });

    return response.text || "Ich bin gerade nicht erreichbar.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Bitte versuchen Sie es später erneut.";
  }
};