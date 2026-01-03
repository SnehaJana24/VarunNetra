import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Map, 
  MapPin,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Filter,
  Search,
  Navigation,
  Layers,
  Info,
  RefreshCw
} from 'lucide-react';
import indiaMap from 'src:asset/map.png';

interface MapWaterIndexProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'Water Index Map',
    subtitle: 'Real-time Pollution Monitoring Across India',
    backToDashboard: 'Back to Dashboard',
    legend: 'Map Legend',
    safeZone: 'Safe Zone',
    moderateZone: 'Moderate Risk Zone',
    highRiskZone: 'High Risk Zone',
    search: 'Search Location',
    filters: 'Filters',
    refresh: 'Refresh Data',
    zoomIn: 'Zoom In',
    zoomOut: 'Zoom Out',
    myLocation: 'My Location',
    lastUpdated: 'Last Updated',
    totalStations: 'Monitoring Stations',
    waterQualityIndex: 'Water Quality Index',
    pollutionLevel: 'Pollution Level',
    population: 'Population Affected',
    cities: {
      bhopal: { name: 'Bhopal', wqi: 75, status: 'moderate', population: '2.4M', region: 'Central Highlands' },
      patna: { name: 'Patna', wqi: 61, status: 'high', population: '2.3M', region: 'Bihar Plains' },
      hyderabad: { name: 'Hyderabad', wqi: 82, status: 'safe', population: '10.3M', region: 'Deccan Plateau' }
    },
    zoneDescriptions: {
      safe: 'Water quality meets international standards. Safe for all purposes.',
      moderate: 'Water quality acceptable but requires monitoring. Basic treatment recommended.',
      high: 'Water quality poor. Immediate treatment required before consumption.'
    }
  },
  hi: {
    title: 'जल सूचकांक मानचित्र',
    subtitle: 'भारत भर में वास्तविक समय प्रदूषण निगरानी',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    legend: 'म���नचित्र लेजेंड',
    safeZone: 'सुरक्षित क्षेत्र',
    moderateZone: 'मध्यम जोखिम क्षेत्र',
    highRiskZone: 'उच्च जोखिम क्षेत्र',
    search: 'स्थान खोजें',
    filters: 'फिल्टर',
    refresh: 'डेटा रीफ्रेश करें',
    zoomIn: 'ज़ूम इन',
    zoomOut: 'ज़ूम आउट',
    myLocation: 'मेरा स्थान',
    lastUpdated: 'अंतिम अपडेट',
    totalStations: 'निगरानी स्टेशन',
    waterQualityIndex: 'जल गुणवत्ता सूचकांक',
    pollutionLevel: 'प्रदूषण स्तर',
    population: 'प्रभावित जनसंख्या',
    cities: {
      bhopal: { name: 'भोपाल', wqi: 75, status: 'moderate', population: '2.4M', region: 'मध्य उच्चभूमि' },
      patna: { name: 'पटना', wqi: 61, status: 'high', population: '2.3M', region: 'बिहार मैदान' },
      hyderabad: { name: 'हैदराबाद', wqi: 82, status: 'safe', population: '10.3M', region: 'दक्कन पठार' }
    },
    zoneDescriptions: {
      safe: 'जल गुणवत्ता अंतर्राष्ट्रीय मानकों को पूरा करती है। सभी उद्देश्यों के लिए सुरक्षित।',
      moderate: 'जल गुणवत्ता स्वीकार्य है लेकिन निगरानी की आवश्यकता है। बुनियादी उपचार की सिफारिश।',
      high: 'जल गुणवत्ता खराब। सेवन से पहले तत्काल उपचार आवश्यक।'
    }
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case 'safe':
      return 'bg-green-500';
    case 'moderate':
      return 'bg-yellow-500';
    case 'high':
      return 'bg-red-500';
    default:
      return 'bg-gray-500';
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'safe':
      return <CheckCircle className="w-4 h-4 text-green-600" />;
    case 'moderate':
      return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    case 'high':
      return <XCircle className="w-4 h-4 text-red-600" />;
    default:
      return <Info className="w-4 h-4 text-gray-600" />;
  }
};

const getCityPosition = (cityKey: string) => {
  // Central India cities positioned within map boundaries
  const positions: { [key: string]: { top: string; left: string } } = {
    bhopal: { top: '50%', left: '43%' },           // Bhopal - Madhya Pradesh (Central)
    patna: { top: '42%', left: '56%' },            // Patna - Bihar (North-Central)
    hyderabad: { top: '65%', left: '48%' }         // Hyderabad - Telangana (South-Central)
  };
  return positions[cityKey] || { top: '50%', left: '50%' };
};

export function MapWaterIndex({ language, onNavigate }: MapWaterIndexProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [selectedCity, setSelectedCity] = React.useState<string | null>(null);
  const [filterStatus, setFilterStatus] = React.useState<'all' | 'safe' | 'moderate' | 'high'>('all');

  const filteredCities = Object.entries(t.cities).filter(([_, city]) => 
    filterStatus === 'all' || city.status === filterStatus
  );

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
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg shadow-lg flex items-center justify-center">
                  <div className="w-5 h-5 bg-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                </div>
              </div>
              <div>
                <h1 className="text-lg bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  {t.title}
                </h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                <Zap className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
              <span className="text-xs text-gray-500">
                {t.lastUpdated}: 2 min ago
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-4">
            {/* Search */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
              <div className="flex items-center space-x-2 mb-3">
                <Search className="w-4 h-4 text-gray-500" />
                <input 
                  type="text" 
                  placeholder={t.search}
                  className="flex-1 border-none outline-none bg-transparent text-sm"
                />
              </div>
              <Button size="sm" className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white">
                <Navigation className="w-4 h-4 mr-2" />
                {t.myLocation}
              </Button>
            </Card>

            {/* Legend */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="mb-3 flex items-center">
                <Layers className="w-4 h-4 text-blue-600 mr-2" />
                {t.legend}
              </h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">{t.safeZone}</p>
                    <p className="text-xs text-gray-500">WQI: 80-100</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">{t.moderateZone}</p>
                    <p className="text-xs text-gray-500">WQI: 60-79</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-red-500 rounded-full"></div>
                  <div>
                    <p className="text-sm">{t.highRiskZone}</p>
                    <p className="text-xs text-gray-500">WQI: 0-59</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Filters */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="mb-3 flex items-center">
                <Filter className="w-4 h-4 text-blue-600 mr-2" />
                {t.filters}
              </h3>
              <div className="space-y-2">
                <Button
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFilterStatus('all')}
                >
                  All Zones
                </Button>
                <Button
                  variant={filterStatus === 'safe' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFilterStatus('safe')}
                >
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Safe Zones
                </Button>
                <Button
                  variant={filterStatus === 'moderate' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFilterStatus('moderate')}
                >
                  <AlertTriangle className="w-4 h-4 mr-2 text-yellow-600" />
                  Moderate Risk
                </Button>
                <Button
                  variant={filterStatus === 'high' ? 'default' : 'outline'}
                  size="sm"
                  className="w-full justify-start"
                  onClick={() => setFilterStatus('high')}
                >
                  <XCircle className="w-4 h-4 mr-2 text-red-600" />
                  High Risk
                </Button>
              </div>
            </Card>

            {/* Stats */}
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100">
              <div className="space-y-3">
                <div className="text-center">
                  <p className="text-2xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    3
                  </p>
                  <p className="text-sm text-gray-600">{t.totalStations}</p>
                </div>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="w-3 h-3 bg-green-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs">1</p>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs">1</p>
                  </div>
                  <div>
                    <div className="w-3 h-3 bg-red-500 rounded-full mx-auto mb-1"></div>
                    <p className="text-xs">1</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Map */}
          <div className="lg:col-span-3">
            <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 h-full">
              <div className="flex items-center justify-between mb-4">
                <h3 className="flex items-center">
                  <Map className="w-5 h-5 text-blue-600 mr-2" />
                  India Water Quality Map
                </h3>
                <Button variant="outline" size="sm">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t.refresh}
                </Button>
              </div>
              
              {/* India Map Container */}
              <div className="relative h-[500px] bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg border border-blue-200 overflow-hidden">
                {/* India Map Background */}
                <div 
                  className="absolute inset-0 bg-contain bg-center bg-no-repeat"
                  style={{
                    backgroundImage: `url(${indiaMap})`,
                    filter: 'brightness(0.95) contrast(1.1)'
                  }}
                />
                
                {/* Map Overlay for Better Visibility */}
                <div className="absolute inset-0 bg-blue-100/20"></div>
                
                {/* Pollution Zone Overlays - Central India Focus */}
                <div className="absolute inset-0">
                  {/* High Pollution Zone - Bihar Plains (around Patna) */}
                  <div className="absolute w-14 h-14 bg-red-500/15 rounded-full border border-red-500/30" style={{ top: '40%', left: '54%' }}></div>
                  
                  {/* Moderate Pollution Zone - Central Highlands (around Bhopal) */}
                  <div className="absolute w-16 h-16 bg-yellow-500/15 rounded-full border border-yellow-500/30" style={{ top: '48%', left: '41%' }}></div>
                  
                  {/* Safe Zone - Deccan Plateau (around Hyderabad) */}
                  <div className="absolute w-14 h-14 bg-green-500/15 rounded-full border border-green-500/30" style={{ top: '63%', left: '46%' }}></div>
                </div>
                
                {/* City Markers with Enhanced Design */}
                {filteredCities.map(([cityKey, city]) => {
                  const position = getCityPosition(cityKey);
                  return (
                    <div
                      key={cityKey}
                      className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                      style={{ top: position.top, left: position.left }}
                      onClick={() => setSelectedCity(selectedCity === cityKey ? null : cityKey)}
                    >
                      {/* Pulsing Zone Effect */}
                      <div className={`absolute w-6 h-6 ${getStatusColor(city.status)} rounded-full opacity-20 animate-ping`} style={{ transform: 'translate(-50%, -50%)' }}></div>
                      
                      {/* Main City Marker */}
                      <div className={`relative w-3 h-3 ${getStatusColor(city.status)} rounded-full border-2 border-white shadow-lg hover:scale-150 transition-all duration-200 z-10`}>
                        <div className="w-full h-full rounded-full bg-white/50"></div>
                        
                        {/* City Name Label */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-30">
                          {city.name}
                        </div>
                      </div>
                      
                      {/* Enhanced City Info Popup */}
                      {selectedCity === cityKey && (
                        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl p-4 w-64 border border-gray-200 z-40">
                          <div className="flex items-center justify-between mb-3">
                            <div>
                              <h4 className="text-base">{city.name}</h4>
                              <p className="text-xs text-gray-500">{city.region}</p>
                            </div>
                            {getStatusIcon(city.status)}
                          </div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between items-center">
                              <span className="text-gray-600">Water Quality Index:</span>
                              <span className={`text-lg ${
                                city.status === 'safe' ? 'text-green-600' :
                                city.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                              }`}>{city.wqi}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Population Affected:</span>
                              <span>{city.population}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Status:</span>
                              <span className={`${
                                city.status === 'safe' ? 'text-green-600' :
                                city.status === 'moderate' ? 'text-yellow-600' : 'text-red-600'
                              }`}>
                                {city.status === 'safe' ? 'Safe' : city.status === 'moderate' ? 'Moderate Risk' : 'High Risk'}
                              </span>
                            </div>
                            <div className="mt-3 p-2 bg-gray-50 rounded-lg">
                              <p className="text-xs text-gray-600 leading-relaxed">
                                {t.zoneDescriptions[city.status as keyof typeof t.zoneDescriptions]}
                              </p>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
                
                {/* Map Controls */}
                <div className="absolute top-4 right-4 space-y-2">
                  <Button variant="outline" size="sm" className="bg-white">+</Button>
                  <Button variant="outline" size="sm" className="bg-white">-</Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Enhanced Statistics with Real-time Data */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500"></div>
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
            <p className="text-2xl text-green-600 mb-1">1</p>
            <p className="text-sm text-gray-600">Safe Zones</p>
            <p className="text-xs text-green-600 mt-1">WQI: 80-100</p>
          </Card>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
            <AlertTriangle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
            <p className="text-2xl text-yellow-600 mb-1">1</p>
            <p className="text-sm text-gray-600">Moderate Risk</p>
            <p className="text-xs text-yellow-600 mt-1">WQI: 60-79</p>
          </Card>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-red-500"></div>
            <XCircle className="w-8 h-8 text-red-600 mx-auto mb-2" />
            <p className="text-2xl text-red-600 mb-1">1</p>
            <p className="text-sm text-gray-600">High Risk</p>
            <p className="text-xs text-red-600 mt-1">WQI: 0-59</p>
          </Card>
          
          <Card className="p-4 bg-white/80 backdrop-blur-sm border-blue-100 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-blue-500"></div>
            <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl text-blue-600 mb-1">15M+</p>
            <p className="text-sm text-gray-600">People Monitored</p>
            <p className="text-xs text-blue-600 mt-1">3 Central Cities</p>
          </Card>
        </div>

        {/* Regional Analysis */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mt-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Navigation className="w-5 h-5 text-blue-600 mr-2" />
            Regional Water Quality Analysis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
              <h4 className="mb-2 text-green-800">Best Performing Region</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Deccan Plateau (Hyderabad)</span>
                  <span className="text-green-600">WQI: 82</span>
                </div>
                <p className="text-xs text-green-700 mt-2">
                  Excellent water management infrastructure and sustainable practices in the region.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-4 rounded-lg border border-yellow-200">
              <h4 className="mb-2 text-yellow-800">Needs Monitoring</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Central Highlands (Bhopal)</span>
                  <span className="text-yellow-600">WQI: 75</span>
                </div>
                <p className="text-xs text-yellow-700 mt-2">
                  Moderate water quality requiring regular monitoring and basic treatment.
                </p>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-red-50 to-red-100 p-4 rounded-lg border border-red-200">
              <h4 className="mb-2 text-red-800">Requires Immediate Action</h4>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Bihar Plains (Patna)</span>
                  <span className="text-red-600">WQI: 61</span>
                </div>
                <p className="text-xs text-red-700 mt-2">
                  Poor water quality due to industrial pollution and inadequate treatment facilities.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Water Quality Improvement Recommendations */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mt-6">
          <h3 className="text-lg mb-4 flex items-center">
            <Info className="w-5 h-5 text-blue-600 mr-2" />
            Improvement Recommendations
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-base text-blue-800">Short-term Actions (1-6 months)</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Install advanced water filtration systems</p>
                    <p className="text-xs text-gray-500">Immediate impact on water quality in high-risk zones</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Increase monitoring frequency</p>
                    <p className="text-xs text-gray-500">Real-time alerts for pollution spikes</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <Info className="w-5 h-5 text-cyan-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Public awareness campaigns</p>
                    <p className="text-xs text-gray-500">Community participation in water conservation</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="text-base text-green-800">Long-term Solutions (6-24 months)</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Navigation className="w-5 h-5 text-green-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Watershed management programs</p>
                    <p className="text-xs text-gray-500">Sustainable water resource management</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <Layers className="w-5 h-5 text-teal-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Industrial effluent treatment</p>
                    <p className="text-xs text-gray-500">Mandatory treatment for industrial discharge</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm">Smart infrastructure development</p>
                    <p className="text-xs text-gray-500">IoT-based monitoring and automated treatment</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
