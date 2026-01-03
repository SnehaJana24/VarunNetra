import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Send, 
  Bot, 
  User, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  Lightbulb,
  MapPin,
  BarChart3,
  Thermometer,
  Heart,
  Camera,
  FileImage,
  Navigation,
  Phone,
  Clock,
  Shield
} from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface AIChatbotProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'VarunNetra AI Health Assistant',
    subtitle: 'AI-Powered Health & Water Management Support',
    backToDashboard: 'Back to Dashboard',
    typePlaceholder: 'Describe symptoms, upload images, ask about water-related health concerns...',
    send: 'Send',
    welcomeMessage: 'Hello! I\'m your VarunNetra AI Health Assistant. I can analyze symptoms and images to detect waterborne diseases linked to heavy metal exposure, provide health guidance, and locate nearby healthcare facilities. How can I help you today?',
    quickActions: 'Quick Health Actions',
    healthFeatures: 'Health Analysis Features',
    uploadImage: 'Upload Symptom Image',
    findHospitals: 'Find Nearby Hospitals',
    emergencyContact: 'Emergency Contact',
    suggestedQuestions: [
      'I have stomach pain and nausea, could it be from water?',
      'Analyze this skin rash image for waterborne disease',
      'Find nearest hospitals with gastroenterology department',
      'What are symptoms of heavy metal poisoning?',
      'I have persistent headaches and fatigue',
      'Check for arsenic poisoning symptoms'
    ],
    quickActionButtons: [
      { icon: 'heart', text: 'Health Check', action: 'health' },
      { icon: 'camera', text: 'Image Analysis', action: 'image' },
      { icon: 'navigation', text: 'Find Hospitals', action: 'hospitals' },
      { icon: 'shield', text: 'Safety Tips', action: 'safety' }
    ],
    emergencyNumbers: {
      ambulance: '108',
      poisonControl: '1066',
      waterHelpline: '1916'
    }
  },
  hi: {
    title: 'VarunNetra AI स्वास्थ्य सहायक',
    subtitle: 'AI-संचालित स्वास्थ्य और जल प्रबंधन सहायता',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    typePlaceholder: 'लक्षण बताएं, चित्र अपलोड करें, पानी संबंधी स्वास्थ्य चिंताओं के बारे में पूछें...',
    send: 'भेजें',
    welcomeMessage: 'नमस्ते! मैं आपका VarunNetra AI स्वास्थ्य सहायक हूँ। मैं भारी धातु के संपर्क से जुड़ी जल-जनित बीमारियों का पता लगाने के लिए लक्षणों और छवियों का विश्लेषण कर सकता हूँ, स्वास्थ्य मार्गदर्शन प्रदान कर सकता हूँ, और नजदीकी स्वास्थ्य सुविधाओं का पता लगा सकता हूँ। आज मैं आपकी कैसे मदद कर सकता हूँ?',
    quickActions: 'त्वरित स्वास्थ्य कार्य',
    healthFeatures: 'स्वास्थ्य विश्लेषण सुविधाएं',
    uploadImage: 'लक्षण चित्र अपलोड करें',
    findHospitals: 'नजदीकी अस्पताल खोजें',
    emergencyContact: 'आपातकालीन संपर्क',
    suggestedQuestions: [
      'मुझे पेट दर्द और मतली है, क्या यह पानी से हो सकता है?',
      'जल-जनित रोग के लिए इस त्वचा के चकत्ते की छवि का विश्लेषण करें',
      'गैस्ट्रोएंटेरोलॉजी विभाग के साथ निकटतम अस्पताल खोजें',
      'भारी धातु विषाक्तता के लक्षण क्या हैं?',
      'मुझे लगातार सिरदर्द और थकान है',
      'आर्सेनिक विषाक्तता के लक्षण जांचें'
    ],
    quickActionButtons: [
      { icon: 'heart', text: 'स्वास्थ्य जांच', action: 'health' },
      { icon: 'camera', text: 'चित्र विश्लेषण', action: 'image' },
      { icon: 'navigation', text: 'अस्पताल खोजें', action: 'hospitals' },
      { icon: 'shield', text: 'सुरक्षा सुझाव', action: 'safety' }
    ],
    emergencyNumbers: {
      ambulance: '108',
      poisonControl: '1066',
      waterHelpline: '1916'
    }
  }
};

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  timestamp: Date;
  quickReplies?: string[];
}

export function AIChatbot({ language, onNavigate }: AIChatbotProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [messages, setMessages] = React.useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: t.welcomeMessage,
      timestamp: new Date(),
      quickReplies: t.suggestedQuestions.slice(0, 3)
    }
  ]);
  const [inputValue, setInputValue] = React.useState('');
  const [isTyping, setIsTyping] = React.useState(false);
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Health-related responses
    if (message.includes('stomach') || message.includes('nausea') || message.includes('पेट') || message.includes('मतली')) {
      return language === 'hi'
        ? '🔍 लक्षण विश्लेषण: पेट दर्द और मतली जल-जनित बैक्टीरिया से हो सकते हैं। तुरंत कार्य: 1) साफ पानी पिएं 2) मसालेदार खाना बंद करें 3) ORS घोल लें। यदि 24 घंटे में सुधार न हो तो डॉक्टर से मिलें। 📍 निकटतम अस्पताल: फोर्टिस हॉस्पिटल, बांद्रा (2.3 km) - गैस्ट्रोएंटेरोलॉजी विभाग उपलब्ध। 🚨 आपातकाल: 108'
        : '🔍 Symptom Analysis: Stomach pain and nausea could be from waterborne bacteria. Immediate actions: 1) Drink clean water 2) Avoid spicy food 3) Take ORS solution. If no improvement in 24 hours, see a doctor. 📍 Nearest Hospital: Fortis Hospital, Bandra (2.3 km) - Gastroenterology dept available. 🚨 Emergency: 108';
    }
    
    if (message.includes('skin') || message.includes('rash') || message.includes('त्वचा') || message.includes('चकत्ते')) {
      return language === 'hi'
        ? '🔍 छवि विश्लेषण सुझाव: त्वचा के चकत्ते भारी धातु संदूषण (आर्सेनिक/सीसा) का संकेत हो सकते हैं। लक्षण जांच: 1) खुजली की तीव्रता 2) चकत्तों का रंग 3) अन्य लक्षण (बुखार/सिरदर्द)। 📷 कृपया चकत्तों की स्पष्ट तस्वीर अपलोड करें। 📍 विशेषज्ञ: डॉ. शर्मा (त्वचा विशेषज्ञ) - लीलावती अस्पताल (1.8 km)'
        : '🔍 Image Analysis Suggestion: Skin rashes could indicate heavy metal contamination (arsenic/lead). Symptom check: 1) Itching intensity 2) Rash color 3) Other symptoms (fever/headache). 📷 Please upload clear photos of the rashes. 📍 Specialist: Dr. Sharma (Dermatologist) - Lilavati Hospital (1.8 km)';
    }
    
    if (message.includes('hospital') || message.includes('nearest') || message.includes('अस्पताल') || message.includes('निकटतम')) {
      return language === 'hi'
        ? '🏥 Bhuvan API से नजदीकी अस्पताल:\n\n1. **फोर्टिस हॉस्पिटल, बांद्रा** (2.3 km)\n   📞 022-6767-5000 | गैस्ट्रो, न्यूरो, आपातकाल\n\n2. **लीलावती अस्पताल** (1.8 km)\n   📞 022-2675-1000 | त्वचा, आंतरिक चिकित्सा\n\n3. **हिंदुजा अस्पताल** (3.1 km)\n   📞 022-4510-8888 | विष नियंत्रण केंद्र\n\n🚗 निर्देश प्राप्त करने के लिए "दिशा दिखाएं" कहें।'
        : '🏥 Nearby Hospitals via Bhuvan API:\n\n1. **Fortis Hospital, Bandra** (2.3 km)\n   📞 022-6767-5000 | Gastro, Neuro, Emergency\n\n2. **Lilavati Hospital** (1.8 km)\n   📞 022-2675-1000 | Dermatology, Internal Medicine\n\n3. **Hinduja Hospital** (3.1 km)\n   📞 022-4510-8888 | Poison Control Center\n\n🚗 Say "show directions" for navigation guidance.';
    }
    
    if (message.includes('heavy metal') || message.includes('arsenic') || message.includes('lead') || message.includes('भारी धातु') || message.includes('आर्सेनिक')) {
      return language === 'hi'
        ? '⚠️ भारी धातु विषाक्तता के लक्षण:\n\n**आर्सेनिक:** पेट दर्द, उल्टी, त्वचा में परिवर्तन, हाथ-पैर में सुन्नता\n**सीसा:** सिरदर्द, चिड़चिड़ाहट, मेमोरी लॉस, पेट दर्द\n**मरकरी:** कांपना, व्यवहार में बदलाव, गुर्दे की समस्या\n\n🧪 तुरंत जांच: रक्त और मूत्र परीक्षण\n📍 विष नियंत्रण हेल्पलाइन: 1066\n🏥 तत्काल अस्पताल जाएं यदि गंभीर लक्षण हों'
        : '⚠️ Heavy Metal Poisoning Symptoms:\n\n**Arsenic:** Stomach pain, vomiting, skin changes, numbness in hands/feet\n**Lead:** Headaches, irritability, memory loss, abdominal pain\n**Mercury:** Tremors, behavioral changes, kidney problems\n\n🧪 Immediate Tests: Blood and urine analysis\n📍 Poison Control Helpline: 1066\n🏥 Go to hospital immediately if severe symptoms';
    }
    
    if (message.includes('headache') || message.includes('fatigue') || message.includes('सिरदर्द') || message.includes('थकान')) {
      return language === 'hi'
        ? '🔍 सिरदर्द और थकान विश्लेषण:\n\n**संभावित कारण:** जल-जनित संदूषण, भारी धातु एक्सपोजर\n**चेकलिस्ट:**\n✓ क्या पानी में धातु का स्वाद है?\n✓ कितने दिन से लक्षण हैं?\n✓ अन्य घर के सदस्यों में भी समस्या?\n\n**तत्काल कार्य:** साफ बोतलबंद पानी पिएं, आराम करें\n📍 न्यूरोलॉजी जांच: जसलोक अस्पताल (2.7 km)\n⚠️ यदि तेज़ सिरदर्द तो तुरंत 108 पर कॉल करें'
        : '🔍 Headache and Fatigue Analysis:\n\n**Possible Causes:** Waterborne contamination, heavy metal exposure\n**Checklist:**\n✓ Does water taste metallic?\n✓ How many days symptoms persist?\n✓ Do other family members have issues?\n\n**Immediate Actions:** Drink clean bottled water, rest\n📍 Neurology Check: Jaslok Hospital (2.7 km)\n⚠️ For severe headache, call 108 immediately';
    }
    
    if (message.includes('water quality') || message.includes('जल गुणवत्ता')) {
      return language === 'hi' 
        ? '📊 आपके क्षेत्र की जल गुणवत्ता रिपोर्ट:\n\n✅ pH: 7.2 (सामान्य)\n✅ TDS: 180 mg/L (अच्छा)\n⚠️ भारी धातु सूचकांक: 15 (कम जोखिम)\n✅ बैक्टीरिया: नकारात्मक\n\n🏥 यदि पानी से संबंधित स्वास्थ्य समस्या हो तो तुरंत जांच कराएं। क्या आप विस्तृत रिपोर्ट देखना चाहते हैं?'
        : '📊 Your Area Water Quality Report:\n\n✅ pH: 7.2 (Normal)\n✅ TDS: 180 mg/L (Good)\n⚠️ Heavy Metal Index: 15 (Low Risk)\n✅ Bacteria: Negative\n\n🏥 If you have water-related health issues, get tested immediately. Would you like to see detailed report?';
    }
    
    // Emergency and safety responses
    if (message.includes('emergency') || message.includes('urgent') || message.includes('आपातकाल')) {
      return language === 'hi'
        ? '🚨 आपातकालीन संपर्क:\n\n🚑 एम्बुलेंस: 108\n☠️ विष नियंत्रण: 1066\n💧 जल हेल्पलाइन: 1916\n👨‍⚕️ तत्काल डॉक्टर: 102\n\n📍 निकटतम 24x7 अस्पताल:\n- फोर्टिस बांद्रा (2.3 km)\n- लीलावती (1.8 km)\n\n⚠️ गंभीर लक्षणों में देरी न करें!'
        : '🚨 Emergency Contacts:\n\n🚑 Ambulance: 108\n☠️ Poison Control: 1066\n💧 Water Helpline: 1916\n👨‍⚕️ Doctor on Call: 102\n\n📍 Nearest 24x7 Hospitals:\n- Fortis Bandra (2.3 km)\n- Lilavati (1.8 km)\n\n⚠️ Don\'t delay for severe symptoms!';
    }
    
    // Default health-focused response
    return language === 'hi'
      ? '👨‍⚕️ मैं आपका VarunNetra स्वास्थ्य सहायक हूँ। मैं जल-जनित रोगों की पहचान, लक्षण विश्लेषण, और स्वास्थ्य सेवा खोजने में मदद कर सकता हूँ। कृपया अपने लक्षण विस्तार से बताएं या छवि अपलोड करें। आपातकाल में 108 पर कॉल करें।'
      : '👨‍⚕️ I\'m your VarunNetra Health Assistant. I can help identify waterborne diseases, analyze symptoms, and locate healthcare services. Please describe your symptoms in detail or upload images. For emergencies, call 108.';
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: content.trim(),
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: getAIResponse(content),
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickAction = (action: string) => {
    let question = '';
    switch (action) {
      case 'health':
        question = language === 'hi' ? 'मुझे पेट दर्द और मतली है, क्या यह पानी से हो सकता है?' : 'I have stomach pain and nausea, could it be from water?';
        break;
      case 'image':
        question = language === 'hi' ? 'मैं त्वचा के चकत्तों की छवि का विश्लेषण करना चाहता हूँ' : 'I want to analyze image of skin rashes';
        break;
      case 'hospitals':
        question = language === 'hi' ? 'गैस्ट्रोएंटेरोलॉजी विभाग के साथ निकटतम अस्पताल खोजें' : 'Find nearest hospitals with gastroenterology department';
        break;
      case 'safety':
        question = language === 'hi' ? 'भारी धातु विषाक्तता के लक्षण क्या हैं?' : 'What are symptoms of heavy metal poisoning?';
        break;
    }
    handleSendMessage(question);
  };

  const getQuickActionIcon = (iconType: string) => {
    switch (iconType) {
      case 'heart': return <Heart className="w-5 h-5" />;
      case 'camera': return <Camera className="w-5 h-5" />;
      case 'navigation': return <Navigation className="w-5 h-5" />;
      case 'shield': return <Shield className="w-5 h-5" />;
      default: return <Bot className="w-5 h-5" />;
    }
  };

  React.useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

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
        <div className="max-w-4xl mx-auto px-4 py-4">
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
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <Bot className="w-3 h-3 mr-1" />
                Online
              </Badge>
            </div>
          </div>
          
          {/* Team Information */}
          <div className="mt-3 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="text-center">
              <p className="text-sm">
                <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Developed by Team Navyasetu
                </span>
              </p>
              <p className="text-xs text-gray-600 mt-1">
                📧 navyasetu@gmail.com
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 h-[calc(100vh-120px)] flex flex-col relative z-10">
        {/* Health Features & Quick Actions */}
        <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 mb-4">
          <h3 className="text-sm mb-3">{t.healthFeatures}</h3>
          
          {/* Image Upload Section */}
          <div className="mb-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-3">
              <FileImage className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <p className="text-sm">{t.uploadImage}</p>
                <p className="text-xs text-gray-600">Upload photos of symptoms for AI analysis</p>
              </div>
              <Button variant="outline" size="sm" className="bg-white">
                <Camera className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Emergency Section */}
          <div className="mb-4 p-3 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-red-600" />
                <div>
                  <p className="text-sm">{t.emergencyContact}</p>
                  <div className="text-xs text-gray-600">
                    🚑 {t.emergencyNumbers.ambulance} | ☠️ {t.emergencyNumbers.poisonControl} | 💧 {t.emergencyNumbers.waterHelpline}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h3 className="text-sm mb-3">{t.quickActions}</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {t.quickActionButtons.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickAction(action.action)}
                className="flex items-center space-x-2 h-auto py-2 hover:bg-blue-50"
              >
                {getQuickActionIcon(action.icon)}
                <span className="text-xs">{action.text}</span>
              </Button>
            ))}
          </div>
        </Card>

        {/* Chat Messages */}
        <Card className="flex-1 bg-white/80 backdrop-blur-sm border-blue-100 flex flex-col">
          <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.type === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-gray-100 text-gray-900'
                    }`}
                  >
                    <div className="flex items-start space-x-2">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        message.type === 'user' ? 'bg-white/20' : 'bg-green-100'
                      }`}>
                        {message.type === 'user' ? (
                          <User className="w-3 h-3 text-white" />
                        ) : (
                          <Bot className="w-3 h-3 text-green-600" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        <p className={`text-xs mt-1 ${
                          message.type === 'user' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {message.timestamp.toLocaleTimeString()}
                        </p>
                        {message.quickReplies && (
                          <div className="mt-2 space-y-1">
                            {message.quickReplies.map((reply, index) => (
                              <Button
                                key={index}
                                variant="outline"
                                size="sm"
                                onClick={() => handleSendMessage(reply)}
                                className="text-xs h-auto py-1 px-2 bg-white/50 hover:bg-white/80 border-gray-300"
                              >
                                {reply}
                              </Button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                        <Bot className="w-3 h-3 text-green-600" />
                      </div>
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="border-t border-gray-200 p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="flex space-x-2"
            >
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.typePlaceholder}
                className="flex-1 bg-white border-gray-300 focus:border-blue-500"
                disabled={isTyping}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                <Send className="w-4 h-4" />
                <span className="sr-only">{t.send}</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}