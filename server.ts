import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Lazy-initialized Gemini client
let genAI: GoogleGenAI | null = null;
function getGenAI() {
  if (!genAI) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY environment variable is missing.');
      return null;
    }
    genAI = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return genAI;
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', hasGeminiKey: Boolean(process.env.GEMINI_API_KEY) });
});

// Prompt Coach Endpoint
app.post('/api/coach', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt || typeof prompt !== 'string' || !prompt.trim()) {
      return res.status(400).json({ error: 'Please enter a prompt to analyze.' });
    }

    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured. Please ensure GEMINI_API_KEY is set in secrets.',
      });
    }

    const systemInstruction = `You are a friendly prompting coach for absolute beginners learning AI literacy.
Given a user's draft prompt:
Score it from 1–5 for:
• Clarity
• Specificity
• Context
Rewrite the prompt into a stronger version.
Explain the rewrite in one short sentence.
Keep the total response under 100 words.
Use encouraging language. Avoid jargon. Never expose chain-of-thought or internal reasoning.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `Draft Prompt: "${prompt.trim()}"`,
      config: {
        systemInstruction,
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            clarityScore: { type: Type.INTEGER, description: 'Score from 1 to 5' },
            specificityScore: { type: Type.INTEGER, description: 'Score from 1 to 5' },
            contextScore: { type: Type.INTEGER, description: 'Score from 1 to 5' },
            overallScore: { type: Type.NUMBER, description: 'Average score from 1 to 5' },
            improvedPrompt: { type: Type.STRING, description: 'Optimized rewrite of the prompt' },
            explanation: { type: Type.STRING, description: 'One short encouraging sentence explaining the improvement' },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '1-2 quick action tips',
            },
          },
          required: ['clarityScore', 'specificityScore', 'contextScore', 'improvedPrompt', 'explanation'],
        },
      },
    });

    const jsonText = response.text || '{}';
    const result = JSON.parse(jsonText);

    res.json({
      success: true,
      data: result,
    });
  } catch (err: any) {
    console.error('Error in /api/coach:', err);
    res.status(500).json({
      error: 'Failed to analyze prompt with Gemini API.',
      details: err.message,
    });
  }
});

// Daily Challenge Endpoint
app.post('/api/daily-challenge', async (req, res) => {
  try {
    const ai = getGenAI();
    if (!ai) {
      return res.status(503).json({
        error: 'Gemini API key is not configured.',
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: 'Generate a fun, practical daily AI literacy challenge multiple-choice question for a beginner.',
      config: {
        systemInstruction: 'You generate one high quality AI literacy multiple-choice quiz question.',
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            question: { type: Type.STRING },
            options: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
            },
            correctAnswerIndex: { type: Type.INTEGER },
            explanation: { type: Type.STRING },
            difficulty: { type: Type.STRING },
            topic: { type: Type.STRING },
          },
          required: ['question', 'options', 'correctAnswerIndex', 'explanation', 'difficulty', 'topic'],
        },
      },
    });

    const result = JSON.parse(response.text || '{}');
    res.json({ success: true, challenge: result });
  } catch (err: any) {
    console.error('Error in /api/daily-challenge:', err);
    res.status(500).json({
      error: 'Failed to generate daily challenge.',
      details: err.message,
    });
  }
});

// Vite Development or Production static handler
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
