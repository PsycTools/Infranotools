import { GoogleGenAI } from "@google/genai";

// Initialize safely. If key is missing, we will handle it in the function.
const getAiClient = () => {
  if (!process.env.API_KEY) return null;
  return new GoogleGenAI({ apiKey: process.env.API_KEY });
};

export const generateText = async (prompt: string, systemInstruction?: string): Promise<string> => {
  const ai = getAiClient();
  
  if (!ai) {
    // Simulation for demo purposes if no API key is present
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`[DEMO MODE - NO API KEY]\n\nIn a real deployment, this would process: "${prompt}"\n\nResult: The demonic forces have successfully processed your text.`);
      }, 1500);
    });
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful assistant embedded in a tool called 'Infrano Tools'. Keep responses concise and relevant to the tool's purpose.",
      }
    });
    return response.text || "The void returned silence.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error: The connection to the infernal intelligence failed.";
  }
};
