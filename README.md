# 🛂 AI Literacy Passport

> **AI Literacy Passport** — A gamified, interactive web application that empowers anyone to understand how AI works, master prompt engineering, spot hallucinations, and build practical AI skills.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-ai--literacy--passport--2.vercel.app-blueviolet?style=for-the-badge&logo=vercel)](https://ai-literacy-passport-2.vercel.app/prompt-coach)
[![Gemini Powered](https://img.shields.io/badge/AI%20Engine-Google%20Gemini%20API-4285F4?style=for-the-badge&logo=google)](https://ai.google.dev/)
[![Tech Stack](https://img.shields.io/badge/Stack-React%2019%20%7C%20TypeScript%20%7C%20Tailwind%20v4-cyan?style=for-the-badge)](https://react.dev)

---

## 🌐 Live Application & Key Links

- **Official Web App:** [https://ai-literacy-passport-2.vercel.app](https://ai-literacy-passport-2.vercel.app)

---

## 🌟 Overview

**AI Literacy Passport** turns the complex, fast-evolving world of Artificial Intelligence into a friendly, bite-sized, gamified journey. Whether you are a student, educator, professional, or curious non-technical learner, AI Literacy Passport guides you from basic machine learning concepts to advanced prompt engineering and ethical AI evaluation.

### Why AI Literacy Passport?
- **Zero Technical Prerequisites:** Complex topics like transformers, LLM context windows, and embeddings are explained using visual analogies and intuitive real-world examples.
- **Learn by Doing:** Interactive quiz formats including multiple choice, prompt audits, hallucination spotters, and scenario choices.
- **Flagship Gemini AI Integration:** Get instant, personalized coaching on your own draft prompts using Google's Gemini models.
- **Durable Gamification:** Earn XP, maintain daily streaks, collect official passport stamps, protect your hearts, and climb weekly league leaderboards.

---

## ✨ Key Features

### 1. 🤖 Flagship Feature: AI Prompt Coach (Powered by Gemini)
- **Instant Prompt Analysis:** Paste any draft prompt (e.g., for writing emails, coding, summarizing documents, or research) to get immediate AI-driven feedback.
- **Multidimensional Scoring (1.0 – 5.0):** Evaluates prompts across **Clarity**, **Specificity**, and **Contextual Depth**.
- **Boosted AI Rewrite:** Gemini automatically crafts a production-grade, highly effective version of your draft prompt with 1-click copy functionality.
- **Actionable Tips & History:** Receives step-by-step guidance on how to improve your prompting skills, backed by persistent session history.

### 2. 🗺️ Gamified Skill Path & Curriculum
- **Unit 1: What is AI Really?** — Demystifying generative AI, training data, pattern recognition, and key terminology.
- **Unit 2: The Art of Prompt Engineering** — The CLEAR framework (Context, Role, Task, Format, Constraints), system instructions, and few-shot prompting.
- **Unit 3: AI Hallucinations & Critical Thinking** — Spotting fake facts, understanding model confidence, verification techniques, and bias detection.
- **Unit 4: Practical AI Workflows** — Automating tasks, research synthesis, creative collaboration, and AI tool selection.
- **Unit 5: Responsible & Ethical AI** — Privacy, copyright, environmental impact, deepfakes, and ethical AI guidelines.

### 3. 🎯 Placement Test & Custom Onboarding
- **Adaptive Start:** Take a 10-question placement test to skip modules you already understand, or start fresh from Unit 1.
- **Personalized Goals:** Choose daily learning targets (5, 10, 15, or 20 minutes/day) and tailored focus areas (Career Growth, Education, Productivity, Curiosity).

### 4. 🛂 Official Passport Profile & Collectible Stamps
- **Digital Passport:** Tracks your official learner identity, total XP, current level, league standing, and accuracy percentage.
- **Unlocked Stamps:** Earn authentic stamped badges upon completing units and achieving major skill milestones.

### 5. 🏆 Weekly Leaderboard & League Competition
- **League System:** Compete across Bronze, Silver, Gold, Platinum, and Diamond leagues.
- **Real-Time Standings:** Top learners advance every Sunday, encouraging consistent daily study habits.

### 6. 🔁 Spaced Repetition Practice Inbox
- **Smart Weak-Spot Collection:** Automatically captures questions you answered incorrectly during lessons.
- **Targeted Practice:** Revisit past mistakes to solidify memory retention and refill hearts for free.

### 7. ⚙️ Backup, Restore & Data Management
- **Local Persistence & Privacy:** All progress, streaks, and stamp collections are saved locally in browser storage.
- **JSON Import/Export:** Download complete progress backups or migrate your state across devices seamlessly.

---

## 🛠️ Tech Stack

### Frontend & UI Design
- **React 19** — Latest React standard with functional hooks and state architecture.
- **TypeScript** — Full end-to-end type safety.
- **Vite** — High-performance development and bundling environment.
- **Tailwind CSS v4** — Modern utility-first styling with custom glassmorphism design system.
- **Motion (Framer Motion)** — Micro-interactions, fluid layout transitions, and card animations.
- **Lucide React** — Crisp vector icon set.
- **Canvas Confetti** — Milestone celebration effects.

### Backend & AI Engine
- **Express.js (Node.js)** — Lightweight server architecture proxying secure API routes.
- **@google/genai SDK** — Native Google Gemini API integration (`gemini-2.5-flash`) for server-side AI prompt coaching and evaluation.

---

## 📁 Repository Structure

```
├── .env.example              # Sample environment variables configuration
├── index.html                # Main HTML entry point
├── package.json              # Dependencies and build scripts
├── server.ts                 # Full-stack Express server & Gemini API proxy
├── src/
│   ├── components/
│   │   ├── common/           # Header, Byte Mascot, Passport Stamps, etc.
│   │   ├── lesson/           # Question Cards, Feedback Sheets, Multiple Choice
│   │   └── path/             # Skill Path Unit Cards, Lesson Nodes
│   ├── context/
│   │   └── UserContext.tsx   # Global state for XP, Hearts, Streaks, Stamps
│   ├── data/
│   │   └── unitsData.ts      # Complete curriculum, lesson questions, & placement test
│   ├── pages/
│   │   ├── HomePage.tsx            # Main Skill Map view
│   │   ├── LandingPage.tsx         # Hero page & product showcase
│   │   ├── LeaderboardPage.tsx     # Weekly league competition
│   │   ├── LessonPage.tsx          # Interactive lesson execution
│   │   ├── OnboardingPage.tsx      # Goal selection & path customization
│   │   ├── PlacementTestPage.tsx   # Skill level assessment
│   │   ├── PracticePage.tsx        # Spaced repetition weak-spots inbox
│   │   ├── ProfilePage.tsx         # Official AI Passport & Stamps
│   │   ├── PromptCoachPage.tsx     # Live Gemini AI Prompt Coach
│   │   └── SettingsPage.tsx        # Preferences, theme & backup export
│   ├── services/
│   │   └── geminiService.ts        # Client-side API caller for Prompt Coach
│   ├── types/                      # TypeScript definitions (Lesson, Stamp, UserProfile)
│   ├── App.tsx                     # React Router layout & navigation
│   ├── main.tsx                    # React entry point
│   └── index.css                   # Global Tailwind CSS imports & custom styles
└── vite.config.ts            # Vite configuration
```
Screenshots
---
<img width="1920" height="1080" alt="1- Prompt Coach" src="https://github.com/user-attachments/assets/0aba0a0e-bfcb-41e6-80be-fd835ac4aed7" />

<img width="1920" height="1080" alt="2- Passport" src="https://github.com/user-attachments/assets/678f0440-6309-45ab-a872-547e033ff0b2" />

<img width="1920" height="1080" alt="3-Main" src="https://github.com/user-attachments/assets/59e92a39-9d74-4ecd-bf6a-03119ad17432" />

<img width="1920" height="1080" alt="4-Gold League" src="https://github.com/user-attachments/assets/32b5fba1-0a74-49c0-a328-09422226d4db" />

<img width="1920" height="1080" alt="5- Quiz Learning" src="https://github.com/user-attachments/assets/02f0e069-cd06-4574-b494-e42af5b3f52a" />

<img width="1920" height="1080" alt="6- Learning Map" src="https://github.com/user-attachments/assets/35d20684-bbe7-42d6-9678-1efc7876a12c" />

<img width="1920" height="1080" alt="7- Main" src="https://github.com/user-attachments/assets/c71c263f-60dc-4115-bdb4-d466c4797add" />

## 🚀 Getting Started Locally

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher
- **Gemini API Key**: Obtain a free API key from [Google AI Studio](https://aistudio.google.com/)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ai-literacy-passport.git
cd ai-literacy-passport
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Create a `.env` file in the root directory (or copy `.env.example`):
```bash
cp .env.example .env
```
Add your Gemini API Key inside `.env`:
```env
GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### 4. Start the Local Development Server
```bash
npm run dev
```
Open your browser and navigate to `http://localhost:3000`.

---

## 📦 Build & Production Deployment

### Build the Production Bundle
```bash
npm run build
```
This builds both the React static frontend using Vite and bundles `server.ts` into CommonJS using `esbuild`.

### Start Production Server
```bash
npm start
```
The application will serve on port `3000`.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

<p align="center">
  <b>Built with ❤️ using React & Google Gemini AI</b><br/>
  <i>Stamped and Verified for AI Literacy Worldwide.</i>
</p>
