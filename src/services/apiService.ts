import { CoachAnalysis, DailyChallenge } from '../types';

// Call Gemini API Prompt Coach endpoint
export async function analyzePromptWithCoach(promptText: string): Promise<CoachAnalysis> {
  try {
    const res = await fetch('/api/coach', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: promptText }),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.data) {
        return {
          id: 'coach-' + Date.now(),
          timestamp: new Date().toISOString(),
          originalPrompt: promptText,
          clarityScore: data.data.clarityScore || 3,
          specificityScore: data.data.specificityScore || 3,
          contextScore: data.data.contextScore || 3,
          overallScore: data.data.overallScore || 3.5,
          improvedPrompt: data.data.improvedPrompt || promptText,
          explanation: data.data.explanation || 'Great start! Adding specific constraints elevates this prompt.',
          tips: data.data.tips || ['Add a target audience', 'Specify output format'],
        };
      }
    }
  } catch (err) {
    console.warn('Network or API endpoint issue in analyzePromptWithCoach, falling back to local coach rules:', err);
  }

  // Fallback intelligent client-side coach logic if server/key is unavailable
  return fallbackAnalyzePrompt(promptText);
}

// Fallback Coach Logic
function fallbackAnalyzePrompt(promptText: string): CoachAnalysis {
  const words = promptText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;

  const hasRole = /act as|role|as an? (expert|teacher|designer|developer|writer|doctor|recruiter)/i.test(promptText);
  const hasFormat = /table|bullet|list|json|markdown|paragraph|summary|steps|words|sentences/i.test(promptText);
  const hasConstraint = /do not|under|exactly|limit|only|without|must/i.test(promptText);
  const hasContext = wordCount > 8;

  let clarityScore = Math.min(5, Math.max(1, Math.floor(wordCount / 3) + (hasFormat ? 1 : 0)));
  let specificityScore = Math.min(5, Math.max(1, (hasConstraint ? 2 : 1) + (hasRole ? 2 : 1)));
  let contextScore = Math.min(5, Math.max(1, (hasContext ? 2 : 1) + (hasRole ? 2 : 1)));

  if (wordCount < 4) {
    clarityScore = 1;
    specificityScore = 1;
    contextScore = 1;
  }

  const overallScore = Number(((clarityScore + specificityScore + contextScore) / 3).toFixed(1));

  let improvedPrompt = promptText;
  if (!hasRole) {
    improvedPrompt = `Act as an expert advisor. ${improvedPrompt}`;
  }
  if (!hasFormat) {
    improvedPrompt = `${improvedPrompt} Format your response clearly in 3 bullet points with an executive summary.`;
  }
  if (!hasConstraint) {
    improvedPrompt = `${improvedPrompt} Keep the output concise and under 150 words.`;
  }

  return {
    id: 'coach-fb-' + Date.now(),
    timestamp: new Date().toISOString(),
    originalPrompt: promptText,
    clarityScore,
    specificityScore,
    contextScore,
    overallScore,
    improvedPrompt,
    explanation:
      wordCount < 5
        ? 'Short prompts are often vague. Adding an expert role, context, and formatting constraints dramatically improves output quality.'
        : 'Your draft covers the main request! We enhanced it by specifying an expert persona, explicit formatting, and word count constraints.',
    tips: [
      hasRole ? 'Great job defining a role!' : 'Try starting with "Act as an expert [Role]"',
      hasFormat ? 'Good structural guidelines.' : 'Specify output format (e.g., bullet points or Markdown table)',
    ],
  };
}

// Fetch Daily Challenge
export async function fetchDailyChallenge(): Promise<DailyChallenge> {
  const todayStr = new Date().toISOString().split('T')[0];

  try {
    const res = await fetch('/api/daily-challenge', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      const data = await res.json();
      if (data.success && data.challenge) {
        return {
          date: todayStr,
          question: data.challenge.question,
          options: data.challenge.options,
          correctAnswerIndex: data.challenge.correctAnswerIndex ?? 0,
          explanation: data.challenge.explanation,
          difficulty: data.challenge.difficulty || 'Medium',
          topic: data.challenge.topic || 'Daily AI Literacy',
          xpReward: 30,
        };
      }
    }
  } catch (err) {
    console.warn('Daily challenge endpoint unavailable, using static daily challenge:', err);
  }

  // Static Daily Challenges pool fallback
  const fallbackPool: DailyChallenge[] = [
    {
      date: todayStr,
      question: "Which of these best describes what happens during an AI model's 'Context Window' limit?",
      options: [
        'The screen turns off after 10 minutes of inactivity',
        'Earlier messages fall out of working memory, causing the AI to forget early details',
        'The AI stops answering in English',
        'The model requires a paid subscription to continue'
      ],
      correctAnswerIndex: 1,
      explanation:
        'When a conversation exceeds the model context window capacity, earlier tokens are dropped from active memory.',
      difficulty: 'Medium',
      topic: 'Context Memory',
      xpReward: 30,
    },
    {
      date: todayStr,
      question: "What is the primary benefit of 'Few-Shot' prompting over 'Zero-Shot' prompting?",
      options: [
        'It uses fewer internet servers',
        'It provides concrete input-output examples that dramatically increase accuracy for custom formats',
        'It makes the AI answer in poetry',
        'It forces the AI to check your spelling'
      ],
      correctAnswerIndex: 1,
      explanation:
        'Showing concrete examples demonstrates exact patterns and rules visually to the transformer model.',
      difficulty: 'Easy',
      topic: 'Prompt Engineering',
      xpReward: 30,
    },
    {
      date: todayStr,
      question: "What does 'RAG' stand for in modern AI architecture?",
      options: [
        'Random Algorithm Generator',
        'Retrieval-Augmented Generation',
        'Rapid AI Grading',
        'Realtime Audio Grid'
      ],
      correctAnswerIndex: 1,
      explanation:
        'Retrieval-Augmented Generation fetches facts from verified documents before passing them to the LLM to prevent hallucinations.',
      difficulty: 'Hard',
      topic: 'AI Architecture',
      xpReward: 30,
    }
  ];

  // Pick challenge based on day of year
  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 1000 / 60 / 60 / 24
  );
  return fallbackPool[dayOfYear % fallbackPool.length];
}
