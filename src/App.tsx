import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { ProgressProvider } from './context/ProgressContext';

import { LandingPage } from './pages/LandingPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { PlacementTestPage } from './pages/PlacementTestPage';
import { HomePage } from './pages/HomePage';
import { LessonPage } from './pages/LessonPage';
import { PromptCoachPage } from './pages/PromptCoachPage';
import { ProfilePage } from './pages/ProfilePage';
import { LeaderboardPage } from './pages/LeaderboardPage';
import { PracticePage } from './pages/PracticePage';
import { SettingsPage } from './pages/SettingsPage';

const AppRoutes: React.FC = () => {
  const { profile } = useUser();

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      <Route path="/placement-test" element={<PlacementTestPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/lesson/:unitId/:lessonId" element={<LessonPage />} />
      <Route path="/prompt-coach" element={<PromptCoachPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/practice" element={<PracticePage />} />
      <Route path="/settings" element={<SettingsPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <ProgressProvider>
          <Router>
            <AppRoutes />
          </Router>
        </ProgressProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
