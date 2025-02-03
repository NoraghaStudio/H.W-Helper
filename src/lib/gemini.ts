import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB6fdpyY84JcGp6rohsQdl6JRfd9H1O1Bs');

export async function analyzeHomework(imageData: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    
    const prompt = `You are a helpful teacher explaining homework to parents. 
    Analyze this homework problem and provide:
    1. The subject area
    2. A clear, step-by-step explanation that parents can understand
    3. Key concepts their child should understand
    
    Important formatting instructions:
    - Do not use markdown formatting (no **, *, or other markdown symbols)
    - Use plain text only
    - Use line breaks for new paragraphs
    - Number your steps with plain numbers (1., 2., etc.)
    
    Keep the tone friendly and encouraging.`;

    if (!imageData) {
      throw new Error('No image data provided');
    }

    const parts = [
      { text: prompt },
      {
        inlineData: {
          mimeType: 'image/jpeg',
          data: imageData
        }
      }
    ];

    const result = await model.generateContent(parts);
    
    if (!result.response) {
      throw new Error('No response from Gemini API');
    }

    const text = result.response.text();
    if (!text) {
      throw new Error('Empty response from Gemini API');
    }

    return text;
  } catch (error) {
    console.error('Error analyzing homework:', error);
    if (error instanceof Error) {
      throw new Error(`Failed to analyze homework: ${error.message}`);
    }
    throw new Error('Failed to analyze homework. Please try again.');
  }
}