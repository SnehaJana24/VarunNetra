import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Mail, 
  MapPin, 
  Users, 
  Heart,
  Github,
  Linkedin,
  Globe,
  Award,
  Target,
  Lightbulb,
  Shield,
  Droplets,
  Eye
} from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface AboutUsProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'About Us',
    subtitle: 'Team Navyasetu - Water Management Innovators',
    backToDashboard: 'Back to Dashboard',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourValues: 'Our Values',
    contactInfo: 'Contact Information',
    teamInfo: 'Team Information',
    achievements: 'Achievements',
    features: 'Key Features',
    mission: 'To provide comprehensive water quality monitoring and management solutions that ensure safe, clean water access for communities across India through innovative technology and data-driven insights.',
    vision: 'To create a water-secure future where every community has access to real-time water quality information and advanced tools for sustainable water management.',
    values: [
      {
        title: 'Innovation',
        description: 'Leveraging cutting-edge technology for water solutions',
        icon: 'lightbulb'
      },
      {
        title: 'Reliability',
        description: 'Providing accurate and dependable water quality data',
        icon: 'shield'
      },
      {
        title: 'Sustainability',
        description: 'Promoting eco-friendly water management practices',
        icon: 'droplets'
      },
      {
        title: 'Transparency',
        description: 'Open and accessible water quality information for all',
        icon: 'eye'
      }
    ],
    achievementsList: [
      {
        title: 'Real-time Monitoring',
        description: '24/7 water quality surveillance system',
        metric: '100+ sensors'
      },
      {
        title: 'AI-Powered Analysis',
        description: 'Advanced health diagnosis and recommendations',
        metric: '95% accuracy'
      },
      {
        title: 'Multi-language Support',
        description: 'Accessible in 9+ Indian languages',
        metric: '9 languages'
      },
      {
        title: 'Community Reach',
        description: 'Serving communities across India',
        metric: '50+ cities'
      }
    ],
    keyFeatures: [
      'Real-time water quality testing with IoT sensors',
      'AI-powered health chatbot for waterborne disease detection',
      'Interactive pollution maps with zone-based alerts',
      'Historical data analysis and trend reporting',
      'Multi-language support for regional accessibility',
      'Emergency response and hospital location services'
    ],
    teamName: 'Team Navyasetu',
    email: 'navyasetu@gmail.com',
    address: 'Panihati, Kolkata, West Bengal, India',
    github: 'github.com/navyasetu',
    linkedin: 'linkedin.com/company/navyasetu',
    website: 'navyasetu.org'
  },
  hi: {
    title: 'हमारे बारे में',
    subtitle: 'टीम नव्यसेतु - जल प्रबंधन नवाचारी',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    ourMission: 'हमारा मिशन',
    ourVision: 'हमारी दृष्टि',
    ourValues: 'हमारे मूल्य',
    contactInfo: 'संपर्क जानकारी',
    teamInfo: 'टीम जानकारी',
    achievements: 'उपलब्धियां',
    features: 'मुख्य विशेषताएं',
    mission: 'नवाचार तकनीक और डेटा-संचालित अंतर्दृष्टि के माध्यम से भारत भर के समुदायों के लिए सुरक्षित, स्वच्छ पानी की पहुंच सुनिश्चित करने वाले व्यापक जल गुणवत्ता निगरानी और प्रबंधन समाधान प्रदान करना।',
    vision: 'एक जल-सुरक्षित भविष्य बनाना जहां हर समुदाय के पास वास्तविक समय जल गुणवत्ता जानकारी और टिकाऊ जल प्रबंधन के लिए उन्नत उपकरणों तक पहुंच हो।',
    values: [
      {
        title: 'नवाचार',
        description: 'जल समाधानों के लिए अत्याधुनिक तकनीक का लाभ उठाना',
        icon: 'lightbulb'
      },
      {
        title: 'विश्वसनीयता',
        description: 'सटीक और भरोसेमंद जल गुणवत्ता डेटा प्रदान करना',
        icon: 'shield'
      },
      {
        title: 'स्थिरता',
        description: 'पर्यावरण-अनुकूल जल प्रबंधन प्रथाओं को बढ़ावा देना',
        icon: 'droplets'
      },
      {
        title: 'पारदर्शिता',
        description: 'सभी के लिए खुली और सुलभ जल गुणवत्ता जानकारी',
        icon: 'eye'
      }
    ],
    achievementsList: [
      {
        title: 'वास्तविक समय निगरानी',
        description: '24/7 जल गुणवत्ता निगरानी सिस्टम',
        metric: '100+ सेंसर'
      },
      {
        title: 'AI-संचालित विश्लेषण',
        description: 'उन्नत स्वास्थ्य निदान और सुझाव',
        metric: '95% सटीकता'
      },
      {
        title: 'बहुभाषी समर्थन',
        description: '9+ भारतीय भाषाओं में उपलब्ध',
        metric: '9 भाषाएं'
      },
      {
        title: 'सामुदायिक पहुंच',
        description: 'भारत भर के समुदायों की सेवा',
        metric: '50+ शहर'
      }
    ],
    keyFeatures: [
      'IoT सेंसर के साथ वास्तविक समय जल गुणवत्ता परीक्षण',
      'जल-जनित रोग पहचान के लिए AI-संचालित स्वास्थ्य चैटबॉट',
      'क्षेत्र-आधारित अलर्ट के साथ इंटरैक्टिव प्रदूषण मानचित्र',
      'ऐतिहासिक डेटा विश्लेषण और रुझान रिपोर्टिंग',
      'क्षेत्रीय पहुंच के लिए बहुभाषी समर्थन',
      'आपातकालीन प्रतिक्रिया और अस्पताल स्थान सेवाएं'
    ],
    teamName: 'टीम नव्यसेतु',
    email: 'navyasetu@gmail.com',
    address: 'पानीहाटी, कोलकाता, पश्चिम बंगाल, भारत',
    github: 'github.com/navyasetu',
    linkedin: 'linkedin.com/company/navyasetu',
    website: 'navyasetu.org'
  }
};

const getValueIcon = (iconType: string) => {
  switch (iconType) {
    case 'lightbulb': return <Lightbulb className="w-8 h-8" />;
    case 'shield': return <Shield className="w-8 h-8" />;
    case 'droplets': return <Droplets className="w-8 h-8" />;
    case 'eye': return <Eye className="w-8 h-8" />;
    default: return <Heart className="w-8 h-8" />;
  }
};

export function AboutUs({ language, onNavigate }: AboutUsProps) {
  const t = translations[language as keyof typeof translations] || translations.en;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative">
      <div 
        className="absolute inset-0 opacity-8 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1648983102846-32ae9101a0ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRleHR1cmUlMjBzdWJ0bGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NzU4MzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />

      {/* Header */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-blue-100 relative z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => onNavigate('dashboard')}
                className="bg-blue-100 hover:bg-blue-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToDashboard}
              </Button>
              <div className="w-10 h-10 flex items-center justify-center">
                <img src={varunNetraLogo} alt="VarunNetra Logo" className="w-8 h-8 object-contain drop-shadow-md" />
              </div>
              <div>
                <h1 className="text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 relative z-10">
        {/* Hero Section */}
        <Card className="p-8 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <div className="text-center">
            <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-blue-100 to-cyan-100 rounded-full">
              <img src={varunNetraLogo} alt="VarunNetra Logo" className="w-12 h-12 object-contain" />
            </div>
            <h2 className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
              VarunNetra
            </h2>
            <p className="text-lg text-gray-600 mb-4">{t.teamName}</p>
            <Badge className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200">
              Water Management Innovators
            </Badge>
          </div>
        </Card>

        {/* Contact Information */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Mail className="w-5 h-5 text-blue-600 mr-2" />
            {t.contactInfo}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="text-sm text-gray-600">{t.teamInfo}</p>
                  <p>{t.teamName}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-cyan-50 rounded-lg">
                <Mail className="w-5 h-5 text-cyan-600" />
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-blue-600">{t.email}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-teal-50 rounded-lg">
                <MapPin className="w-5 h-5 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Address</p>
                  <p>{t.address}</p>
                </div>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Linkedin className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm" className="flex-1">
                  <Globe className="w-4 h-4 mr-2" />
                  Website
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <h3 className="text-lg mb-4 flex items-center">
              <Target className="w-5 h-5 text-blue-600 mr-2" />
              {t.ourMission}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t.mission}</p>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <h3 className="text-lg mb-4 flex items-center">
              <Eye className="w-5 h-5 text-cyan-600 mr-2" />
              {t.ourVision}
            </h3>
            <p className="text-gray-700 leading-relaxed">{t.vision}</p>
          </Card>
        </div>

        {/* Our Values */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Heart className="w-5 h-5 text-red-600 mr-2" />
            {t.ourValues}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.values.map((value, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                <div className="w-16 h-16 mx-auto mb-3 flex items-center justify-center bg-white rounded-full shadow-sm">
                  <div className="text-blue-600">
                    {getValueIcon(value.icon)}
                  </div>
                </div>
                <h4 className="mb-2">{value.title}</h4>
                <p className="text-sm text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Achievements */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Award className="w-5 h-5 text-yellow-600 mr-2" />
            {t.achievements}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.achievementsList.map((achievement, index) => (
              <div key={index} className="text-center p-4 bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg border border-yellow-100">
                <div className="text-2xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
                  {achievement.metric}
                </div>
                <h4 className="mb-2">{achievement.title}</h4>
                <p className="text-sm text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Key Features */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
          <h3 className="text-lg mb-4 flex items-center">
            <Lightbulb className="w-5 h-5 text-green-600 mr-2" />
            {t.features}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {t.keyFeatures.map((feature, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                <p className="text-sm">{feature}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}