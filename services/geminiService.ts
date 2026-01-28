
import { GoogleGenAI } from "@google/genai";
import { UserSegment, UpliftResult } from "../types";

export const getCausalInsights = async (results: UpliftResult[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    As a Senior Causal Inference Specialist at a top tech company (like ByteDance or Meituan), 
    analyze these marketing Uplift Modeling results:
    
    ${results.map(r => `- ${r.segment}: ${r.count} users, Treatment CR: ${r.conversionRateTreatment}, Control CR: ${r.conversionRateControl}, Uplift: ${r.uplift}`).join('\n')}
    
    Provide:
    1. A summary of the 'True Incremental Effect'.
    2. Strategic recommendation: Who should we target for the next campaign to maximize ROI?
    3. Technical explanation of why Uplift modeling is superior to simple A/B testing for personalized marketing.
    4. An 'Interview Tip' for a data science candidate on how to explain this in a technical interview.
    
    Format the response as clear Markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Failed to fetch insights. Please ensure your API key is valid.";
  }
};

export const explainCausalMethod = async (method: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const prompt = `Explain the causal inference algorithm '${method}' (e.g., S-Learner, T-Learner, X-Learner) in the context of marketing attribution. 
  Focus on how it handles heterogeneous treatment effects and why it's used instead of basic correlation. 
  Include a section on 'Interview Prep' specifically for companies like Alibaba or Meituan.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    return "Could not load explanation.";
  }
};
