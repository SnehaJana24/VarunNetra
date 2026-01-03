import React from 'react';
import { LanguagePreferences } from './components/LanguagePreferences';
import { Authentication } from './components/Authentication';
import { Dashboard } from './components/Dashboard';
import { AIChatbot } from './components/AIChatbot';
import { AreaWaterInfo } from './components/AreaWaterInfo';
import { TestYourWater } from './components/TestYourWater';
import { WaterReports } from './components/WaterReports';
import { AboutUs } from './components/AboutUs';
import { MapWaterIndex } from './components/MapWaterIndex';

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [currentView, setCurrentView] = React.useState<'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map'>('dashboard');

  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleNavigate = (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => {
    setCurrentView(view);
  };

  if (!selectedLanguage) {
    return <LanguagePreferences onLanguageSelect={handleLanguageSelect} />;
  }

  if (!isAuthenticated) {
    return <Authentication language={selectedLanguage} onAuthSuccess={handleAuthSuccess} />;
  }

  if (currentView === 'chatbot') {
    return <AIChatbot language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  if (currentView === 'areawater') {
    return <AreaWaterInfo language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  if (currentView === 'testwater') {
    return <TestYourWater language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  if (currentView === 'reports') {
    return <WaterReports language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  if (currentView === 'about') {
    return <AboutUs language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  if (currentView === 'map') {
    return <MapWaterIndex language={selectedLanguage} onNavigate={handleNavigate} />;
  }

  return <Dashboard language={selectedLanguage} onNavigate={handleNavigate} />;
}