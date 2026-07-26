import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  completeOnboarding: (data: Partial<UserProfile>) => void;
  completePlacementTest: () => void;
  resetUser: () => void;
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Learner',
  avatar: 'bot-blue',
  dailyGoalMinutes: 10,
  experienceLevel: 'beginner',
  learningGoal: 'curiosity',
  createdAt: new Date().toISOString(),
  hasCompletedOnboarding: false,
  hasTakenPlacementTest: false,
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('ai_passport_user');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to parse saved user profile:', e);
    }
    return DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('ai_passport_user', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const completeOnboarding = (data: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...data,
      hasCompletedOnboarding: true,
    }));
  };

  const completePlacementTest = () => {
    setProfile((prev) => ({
      ...prev,
      hasTakenPlacementTest: true,
    }));
  };

  const resetUser = () => {
    setProfile(DEFAULT_PROFILE);
    localStorage.removeItem('ai_passport_user');
  };

  return (
    <UserContext.Provider
      value={{
        profile,
        updateProfile,
        completeOnboarding,
        completePlacementTest,
        resetUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error('useUser must be used within UserProvider');
  return context;
};
