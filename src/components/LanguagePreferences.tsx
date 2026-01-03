import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Check } from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface LanguagePreferencesProps {
  onLanguageSelect: (language: string) => void;
}

const languages = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া' }
];

export function LanguagePreferences({ onLanguageSelect }: LanguagePreferencesProps) {
  const [selectedLanguage, setSelectedLanguage] = React.useState('en');

  const handleLanguageSelect = (languageCode: string) => {
    setSelectedLanguage(languageCode);
  };

  const handleContinue = () => {
    onLanguageSelect(selectedLanguage);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4 relative">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1648983102846-32ae9101a0ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRleHR1cmUlMjBzdWJ0bGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NzU4MzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-28 h-28 flex items-center justify-center">
              <img src={varunNetraLogo} alt="VarunNetra Logo" className="w-24 h-24 object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ 
                filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.15)) drop-shadow(0 1px 3px rgba(0,0,0,0.1))'
              }} />
            </div>
          </div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            VarunNetra
          </h1>
          <p className="text-gray-600">Choose your preferred language</p>
          <p className="text-sm text-gray-500">अपनी पसंदीदा भाषा चुनें</p>
        </div>

        {/* Language Options */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
            {languages.map((language) => (
              <div
                key={language.code}
                onClick={() => handleLanguageSelect(language.code)}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-md ${
                  selectedLanguage === language.code
                    ? 'border-blue-500 bg-blue-50 shadow-md'
                    : 'border-gray-200 bg-white hover:border-blue-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {language.name}
                    </div>
                    <div className="text-lg text-gray-700 mt-1">
                      {language.nativeName}
                    </div>
                  </div>
                  {selectedLanguage === language.code && (
                    <div className="bg-blue-500 rounded-full p-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white py-3 rounded-xl transition-all duration-200 transform hover:scale-[1.02]"
          >
            Continue / जारी रखें
          </Button>
        </Card>
      </div>
    </div>
  );
}