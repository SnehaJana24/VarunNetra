import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Badge } from './ui/badge';
import { 
  Droplets, 
  CloudRain, 
  Gauge, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle,
  Calendar,
  MapPin,
  BarChart3,
  Settings,
  User,
  Bell,
  TestTube,
  MapIcon,
  Bot,
  FileText,
  Info
} from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface DashboardProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    welcome: 'Welcome to VarunNetra',
    subtitle: 'Smart Water Management System',
    overview: 'Overview',
    consumption: 'Consumption',
    conservation: 'Conservation',
    reports: 'Reports',
    dailyUsage: 'Daily Water Usage',
    monthlyTarget: 'Monthly Conservation Target',
    currentUsage: 'Current Usage',
    recommendedLimit: 'Recommended Limit',
    waterQuality: 'Water Quality',
    excellent: 'Excellent',
    alerts: 'Active Alerts',
    noAlerts: 'No active alerts',
    savingsThisMonth: 'Savings This Month',
    efficiency: 'Water Efficiency',
    recentActivity: 'Recent Activity',
    viewAll: 'View All',
    settings: 'Settings'
  },
  hi: {
    welcome: 'VarunNetra में आपका स्वागत है',
    subtitle: 'स्मार्ट जल प्रबंधन प्रणाली',
    overview: 'सिंहावलोकन',
    consumption: 'उपभोग',
    conservation: 'संरक्षण',
    reports: 'रिपोर्ट',
    dailyUsage: 'दैनिक जल उपयोग',
    monthlyTarget: 'मासिक संरक्षण लक्ष्य',
    currentUsage: 'वर्तमान उपयोग',
    recommendedLimit: 'अनुशंसित सीमा',
    waterQuality: 'जल गुणवत्ता',
    excellent: 'उत्कृष्ट',
    alerts: 'सक्रिय अलर्ट',
    noAlerts: 'कोई सक्रिय अलर्ट नहीं',
    savingsThisMonth: 'इस महीने की बचत',
    efficiency: 'जल दक्षता',
    recentActivity: 'हाल की गतिविधि',
    viewAll: 'सभी देखें',
    settings: 'सेटिंग्स'
  }
};

export function Dashboard({ language, onNavigate }: DashboardProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  
  const activities = [
    { type: 'usage', message: 'Kitchen tap usage recorded', time: '2 hours ago', icon: Droplets },
    { type: 'alert', message: 'High usage detected', time: '4 hours ago', icon: AlertTriangle },
    { type: 'conservation', message: 'Target achieved for the day', time: '1 day ago', icon: CheckCircle },
    { type: 'quality', message: 'Water quality test completed', time: '2 days ago', icon: Gauge }
  ];

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
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm" className="bg-blue-100 hover:bg-blue-200">
                <User className="w-5 h-5 text-blue-600" />
              </Button>
              <div className="w-14 h-14 flex items-center justify-center">
                <img src={varunNetraLogo} alt="VarunNetra Logo" className="w-12 h-12 object-contain drop-shadow-md transform hover:scale-110 transition-transform duration-200" style={{ 
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15)) drop-shadow(0 1px 2px rgba(0,0,0,0.1))'
                }} />
              </div>
              <div>
                <h1 className="text-xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  VarunNetra
                </h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        {/* Welcome Section */}
        <div className="mb-6">
          <h2 className="text-2xl mb-1">{t.welcome}</h2>
          <p className="text-gray-600">Monitor and optimize your water usage efficiently</p>
        </div>

        {/* Main Feature Icons */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-blue-50 hover:border-blue-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('testwater')}
            >
              <TestTube className="w-10 h-10 text-blue-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">TEST YOUR WATER</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-cyan-50 hover:border-cyan-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('areawater')}
            >
              <Droplets className="w-10 h-10 text-cyan-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">KNOW YOUR AREA WATER</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-teal-50 hover:border-teal-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('map')}
            >
              <MapIcon className="w-10 h-10 text-teal-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">MAP OF WATER INDEX</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-green-50 hover:border-green-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('chatbot')}
            >
              <Bot className="w-10 h-10 text-green-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">AI CHATBOT</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-purple-50 hover:border-purple-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('reports')}
            >
              <FileText className="w-10 h-10 text-purple-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">WATER REPORTS</span>
            </Button>
            
            <Button
              variant="outline"
              className="h-28 flex flex-col items-center justify-center space-y-3 hover:bg-orange-50 hover:border-orange-300 transition-colors hover:shadow-lg"
              onClick={() => onNavigate('about')}
            >
              <Info className="w-10 h-10 text-orange-600" />
              <span className="text-sm text-center font-semibold uppercase tracking-wide">ABOUT US</span>
            </Button>
          </div>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="consumption">{t.consumption}</TabsTrigger>
            <TabsTrigger value="conservation">{t.conservation}</TabsTrigger>
            <TabsTrigger value="reports">{t.reports}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Droplets className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.dailyUsage}</p>
                    <p className="text-xl">185L</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.efficiency}</p>
                    <p className="text-xl">92%</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-cyan-100 p-2 rounded-lg">
                    <Gauge className="w-5 h-5 text-cyan-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.waterQuality}</p>
                    <p className="text-xl">{t.excellent}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-100 p-2 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.alerts}</p>
                    <p className="text-xl">0</p>
                  </div>
                </div>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Usage Progress */}
              <Card className="col-span-2 p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.monthlyTarget}</h3>
                  <Badge variant="secondary">March 2025</Badge>
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>{t.currentUsage}</span>
                      <span>4,250L / 5,000L</span>
                    </div>
                    <Progress value={85} className="h-3" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <div className="text-center">
                      <p className="text-2xl text-green-600">750L</p>
                      <p className="text-sm text-gray-600">{t.savingsThisMonth}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl text-blue-600">15%</p>
                      <p className="text-sm text-gray-600">Reduction vs last month</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Recent Activity */}
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.recentActivity}</h3>
                  <Button variant="ghost" size="sm">{t.viewAll}</Button>
                </div>
                <div className="space-y-4">
                  {activities.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-gray-100 p-1.5 rounded-full">
                        <activity.icon className="w-3 h-3 text-gray-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="consumption" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">Water Consumption Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <CloudRain className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Kitchen</p>
                  <p className="text-xl">85L/day</p>
                </div>
                <div className="text-center p-4 bg-cyan-50 rounded-lg">
                  <Droplets className="w-8 h-8 text-cyan-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Bathroom</p>
                  <p className="text-xl">120L/day</p>
                </div>
                <div className="text-center p-4 bg-teal-50 rounded-lg">
                  <BarChart3 className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Garden</p>
                  <p className="text-xl">45L/day</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="conservation" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">Conservation Tips & Achievements</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm">Install low-flow showerheads</p>
                    <p className="text-xs text-gray-500">Completed - Saved 50L this week</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm">Fix kitchen tap leak</p>
                    <p className="text-xs text-gray-500">In progress - Potential 30L/day savings</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                  <MapPin className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-sm">Install rainwater harvesting</p>
                    <p className="text-xs text-gray-500">Planned - Estimated 200L/day collection</p>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">Usage Reports & Analytics</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col">
                  <BarChart3 className="w-6 h-6 mb-2" />
                  <span>Monthly Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <TrendingUp className="w-6 h-6 mb-2" />
                  <span>Efficiency Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <Gauge className="w-6 h-6 mb-2" />
                  <span>Quality Report</span>
                </Button>
                <Button variant="outline" className="h-20 flex flex-col">
                  <CloudRain className="w-6 h-6 mb-2" />
                  <span>Conservation Report</span>
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}