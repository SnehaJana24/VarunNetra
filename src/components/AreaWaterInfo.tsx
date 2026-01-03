import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  Droplets, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp,
  MapPin,
  Thermometer,
  Activity,
  Zap,
  Shield,
  Eye,
  Download,
  RefreshCw
} from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface AreaWaterInfoProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'Area Water Quality Report',
    subtitle: 'Mumbai, Maharashtra - Bandra West',
    backToDashboard: 'Back to Dashboard',
    lastUpdated: 'Last Updated',
    downloadReport: 'Download Report',
    refresh: 'Refresh Data',
    overview: 'Overview',
    detailed: 'Detailed Analysis',
    trends: 'Historical Trends',
    recommendations: 'Recommendations',
    waterQualityIndex: 'Water Quality Index',
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    poor: 'Poor',
    phLevel: 'pH Level',
    tds: 'Total Dissolved Solids',
    turbidity: 'Turbidity',
    chlorine: 'Chlorine Level',
    heavyMetals: 'Heavy Metal Pollution Index',
    hei: 'Health Effects Index',
    source: 'Water Source',
    treatment: 'Treatment Status',
    distribution: 'Distribution Quality',
    compliance: 'Safety Compliance',
    safeForDrinking: 'Safe for Drinking',
    parameters: {
      ph: {
        value: '7.2',
        status: 'Normal',
        range: '6.5 - 8.5',
        description: 'Optimal pH level for drinking water'
      },
      tds: {
        value: '180',
        unit: 'mg/L',
        status: 'Good',
        range: '< 300 mg/L',
        description: 'Total dissolved solids within acceptable limits'
      },
      turbidity: {
        value: '0.8',
        unit: 'NTU',
        status: 'Excellent',
        range: '< 1 NTU',
        description: 'Water is clear with minimal suspended particles'
      },
      chlorine: {
        value: '0.3',
        unit: 'mg/L',
        status: 'Good',
        range: '0.2 - 0.5 mg/L',
        description: 'Adequate disinfection level'
      },
      heavyMetals: {
        lead: { value: '0.002', unit: 'mg/L', limit: '0.01', status: 'Safe' },
        mercury: { value: '0.0005', unit: 'mg/L', limit: '0.001', status: 'Safe' },
        arsenic: { value: '0.003', unit: 'mg/L', limit: '0.01', status: 'Safe' },
        cadmium: { value: '0.001', unit: 'mg/L', limit: '0.003', status: 'Safe' }
      }
    },
    indices: {
      wqi: { value: 92, status: 'Excellent', color: 'green' },
      hmpi: { value: 15, status: 'Low Risk', color: 'green' },
      hei: { value: 8, status: 'Minimal Risk', color: 'green' }
    },
    recommendations: [
      'Continue regular monitoring of water quality parameters',
      'Maintain proper storage to prevent contamination',
      'Regular cleaning of overhead tanks recommended',
      'Consider water testing every 6 months'
    ]
  },
  hi: {
    title: 'क्षेत्रीय जल गुणवत्ता रिपोर्ट',
    subtitle: 'मुंबई, महाराष्ट्र - बांद्रा वेस्ट',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    lastUpdated: 'अंतिम अपडेट',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    refresh: 'डेटा रीफ्रेश करें',
    overview: 'सिंहावलोकन',
    detailed: 'विस्तृत विश्लेषण',
    trends: 'ऐतिहासिक रुझान',
    recommendations: 'सुझाव',
    waterQualityIndex: 'जल गुणवत्ता सूचकांक',
    excellent: 'उत्कृष्ट',
    good: 'अच्छा',
    fair: 'ठीक',
    poor: 'खराब',
    phLevel: 'pH स्तर',
    tds: 'कुल घुलित ठोस पदार्थ',
    turbidity: 'मैलापन',
    chlorine: 'क्लोरीन स्तर',
    heavyMetals: 'भारी धातु प्रदूषण सूचकांक',
    hei: 'स्वास्थ्य प्रभाव सूचकांक',
    source: 'जल स्रोत',
    treatment: 'उपचार स्थिति',
    distribution: 'वितरण गुणवत्ता',
    compliance: 'सुरक्षा अनुपालन',
    safeForDrinking: 'पीने के लिए सुरक्षित',
    parameters: {
      ph: {
        value: '7.2',
        status: 'सामान्य',
        range: '6.5 - 8.5',
        description: 'पीने के पानी के लिए इष्टतम pH स्तर'
      },
      tds: {
        value: '180',
        unit: 'mg/L',
        status: 'अच्छा',
        range: '< 300 mg/L',
        description: 'स्वीकार्य सीमा के भीतर कुल घुलित ठोस पदार्थ'
      },
      turbidity: {
        value: '0.8',
        unit: 'NTU',
        status: 'उत्कृष्ट',
        range: '< 1 NTU',
        description: 'न्यूनतम निलंबित कणों के साथ स्पष्ट पानी'
      },
      chlorine: {
        value: '0.3',
        unit: 'mg/L',
        status: 'अच्छा',
        range: '0.2 - 0.5 mg/L',
        description: 'पर्याप्त कीटाणुशोधन स्तर'
      },
      heavyMetals: {
        lead: { value: '0.002', unit: 'mg/L', limit: '0.01', status: 'सुरक्षित' },
        mercury: { value: '0.0005', unit: 'mg/L', limit: '0.001', status: 'सुरक्षित' },
        arsenic: { value: '0.003', unit: 'mg/L', limit: '0.01', status: 'सुरक्षित' },
        cadmium: { value: '0.001', unit: 'mg/L', limit: '0.003', status: 'सुरक्षित' }
      }
    },
    indices: {
      wqi: { value: 92, status: 'उत्कृष्ट', color: 'green' },
      hmpi: { value: 15, status: 'कम जोखिम', color: 'green' },
      hei: { value: 8, status: 'न्यूनतम जोखिम', color: 'green' }
    },
    recommendations: [
      'जल गुणवत्ता मापदंडों की नियमित निगरानी जारी रखें',
      'संदूषण को रोकने के लिए उचित भंडारण बनाए रखें',
      'ओवरहेड टैंकों की नियमित सफाई की सिफारिश',
      'हर 6 महीने में पानी की जांच पर विचार करें'
    ]
  }
};

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'excellent':
    case 'उत्कृष्ट':
    case 'safe':
    case 'सुरक्षित':
      return 'bg-green-100 text-green-800';
    case 'good':
    case 'अच्छा':
    case 'normal':
    case 'सामान्य':
      return 'bg-blue-100 text-blue-800';
    case 'fair':
    case 'ठीक':
      return 'bg-yellow-100 text-yellow-800';
    case 'poor':
    case 'खराब':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export function AreaWaterInfo({ language, onNavigate }: AreaWaterInfoProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [lastUpdated] = React.useState(new Date());

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
                <p className="text-sm text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {t.subtitle}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t.downloadReport}
              </Button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refresh}
              </Button>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            {t.lastUpdated}: {lastUpdated.toLocaleString()}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 relative z-10">
        {/* Key Indices */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.waterQualityIndex}</p>
                <p className="text-3xl bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {t.indices.wqi.value}
                </p>
                <Badge className={`mt-2 ${getStatusColor(t.indices.wqi.status)}`}>
                  {t.indices.wqi.status}
                </Badge>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Droplets className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.heavyMetals}</p>
                <p className="text-3xl bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {t.indices.hmpi.value}
                </p>
                <Badge className={`mt-2 ${getStatusColor(t.indices.hmpi.status)}`}>
                  {t.indices.hmpi.status}
                </Badge>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.hei}</p>
                <p className="text-3xl bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">
                  {t.indices.hei.value}
                </p>
                <Badge className={`mt-2 ${getStatusColor(t.indices.hei.status)}`}>
                  {t.indices.hei.status}
                </Badge>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <Eye className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="overview">{t.overview}</TabsTrigger>
            <TabsTrigger value="detailed">{t.detailed}</TabsTrigger>
            <TabsTrigger value="trends">{t.trends}</TabsTrigger>
            <TabsTrigger value="recommendations">{t.recommendations}</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Main Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.phLevel}</h3>
                  <Thermometer className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{t.parameters.ph.value}</span>
                    <Badge className={getStatusColor(t.parameters.ph.status)}>
                      {t.parameters.ph.status}
                    </Badge>
                  </div>
                  <Progress value={72} className="h-2" />
                  <div className="text-sm text-gray-600">
                    <p>Range: {t.parameters.ph.range}</p>
                    <p>{t.parameters.ph.description}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.tds}</h3>
                  <Activity className="w-5 h-5 text-cyan-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{t.parameters.tds.value}</span>
                    <Badge className={getStatusColor(t.parameters.tds.status)}>
                      {t.parameters.tds.status}
                    </Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-sm text-gray-600">
                    <p>Range: {t.parameters.tds.range}</p>
                    <p>{t.parameters.tds.description}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.turbidity}</h3>
                  <Eye className="w-5 h-5 text-green-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{t.parameters.turbidity.value}</span>
                    <Badge className={getStatusColor(t.parameters.turbidity.status)}>
                      {t.parameters.turbidity.status}
                    </Badge>
                  </div>
                  <Progress value={20} className="h-2" />
                  <div className="text-sm text-gray-600">
                    <p>Range: {t.parameters.turbidity.range}</p>
                    <p>{t.parameters.turbidity.description}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg">{t.chlorine}</h3>
                  <Zap className="w-5 h-5 text-blue-600" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl">{t.parameters.chlorine.value}</span>
                    <Badge className={getStatusColor(t.parameters.chlorine.status)}>
                      {t.parameters.chlorine.status}
                    </Badge>
                  </div>
                  <Progress value={60} className="h-2" />
                  <div className="text-sm text-gray-600">
                    <p>Range: {t.parameters.chlorine.range}</p>
                    <p>{t.parameters.chlorine.description}</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Safety Status */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <div className="flex items-center space-x-3 mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <h3 className="text-lg text-green-700">{t.safeForDrinking}</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Shield className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">{t.source}</p>
                  <p className="text-xs text-green-600">Municipal Supply</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <Activity className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">{t.treatment}</p>
                  <p className="text-xs text-green-600">Advanced Treatment</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">{t.distribution}</p>
                  <p className="text-xs text-green-600">Good Quality</p>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm">{t.compliance}</p>
                  <p className="text-xs text-green-600">100% Compliant</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="detailed" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">Heavy Metals Analysis</h3>
              <div className="space-y-4">
                {Object.entries(t.parameters.heavyMetals).map(([metal, data]) => (
                  <div key={metal} className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex-1">
                      <p className="capitalize">{metal}</p>
                      <p className="text-sm text-gray-600">
                        {data.value} {data.unit} / Limit: {data.limit} {data.unit}
                      </p>
                    </div>
                    <Badge className={getStatusColor(data.status)}>
                      {data.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="trends" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">7-Day Quality Trend</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Water Quality Index</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">+2% improvement</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>Heavy Metal Index</span>
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Stable</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span>pH Stability</span>
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    <span className="text-green-600">Consistent</span>
                  </div>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4">Recommended Actions</h3>
              <div className="space-y-3">
                {t.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm">{recommendation}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}