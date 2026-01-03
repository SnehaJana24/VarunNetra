import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  ArrowLeft, 
  FileText, 
  Download,
  TrendingUp,
  TrendingDown,
  Calendar,
  BarChart3,
  LineChart,
  PieChart,
  AlertTriangle,
  CheckCircle,
  Info
} from 'lucide-react';
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart as RechartsBarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface WaterReportsProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'Water Quality Reports',
    subtitle: 'Historical Analysis & Trends',
    backToDashboard: 'Back to Dashboard',
    downloadReport: 'Download Report',
    qualityTrends: 'Quality Trends',
    pollutionLevels: 'Pollution Levels',
    comparison: 'Year Comparison',
    insights: 'Key Insights',
    currentYear: '2024',
    previousYear: '2023',
    last5Years: 'Last 5 Years',
    waterQualityIndex: 'Water Quality Index',
    phLevel: 'pH Level',
    tdsLevel: 'TDS Level',
    heavyMetals: 'Heavy Metals',
    bacterialCount: 'Bacterial Count',
    overallTrend: 'Overall Trend',
    improving: 'Improving',
    declining: 'Declining',
    stable: 'Stable',
    yearlyComparison: 'Yearly Comparison',
    monthlyData: 'Monthly Data',
    pollutionSources: 'Pollution Sources',
    industrial: 'Industrial',
    domestic: 'Domestic',
    agricultural: 'Agricultural',
    natural: 'Natural',
    recommendations: 'Recommendations',
    keyInsights: [
      'Water quality has improved by 15% compared to last year',
      'Heavy metal pollution reduced by 22% in industrial areas',
      'pH levels maintained within WHO standards consistently',
      'Bacterial contamination incidents decreased by 30%',
      'TDS levels show seasonal variation patterns'
    ],
    recommendations: [
      'Continue regular monitoring of industrial discharge',
      'Implement stricter agricultural runoff controls',
      'Upgrade water treatment facilities in high-risk zones',
      'Increase public awareness about water conservation'
    ]
  },
  hi: {
    title: 'जल गुणवत्ता रिपोर्ट',
    subtitle: 'ऐतिहासिक विश्लेषण और रुझान',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    downloadReport: 'रिपोर्ट डाउनलोड करें',
    qualityTrends: 'गुणवत्ता रुझान',
    pollutionLevels: 'प्रदूषण स्तर',
    comparison: 'वर्ष तुलना',
    insights: 'मुख्य अंतर्दृष्टि',
    currentYear: '२०२४',
    previousYear: '२०२३',
    last5Years: 'पिछले ५ वर्ष',
    waterQualityIndex: 'जल गुणवत्ता सूचकांक',
    phLevel: 'pH स्तर',
    tdsLevel: 'TDS स्तर',
    heavyMetals: 'भारी धातु',
    bacterialCount: 'बैक्टीरिया संख्या',
    overallTrend: 'समग्र रुझान',
    improving: 'सुधार',
    declining: 'गिरावट',
    stable: 'स्थिर',
    yearlyComparison: 'वार्षिक तुलना',
    monthlyData: 'मासिक डेटा',
    pollutionSources: 'प्रदूषण स्रोत',
    industrial: 'औद्योगिक',
    domestic: 'घरेलू',
    agricultural: 'कृषि',
    natural: 'प्राकृतिक',
    recommendations: 'सुझाव',
    keyInsights: [
      'पिछले वर्ष की तुलना में जल गुणवत्ता में 15% सुधार',
      'औद्योगिक क्षेत्रों में भारी धातु प्रदूषण में 22% कमी',
      'pH स्तर लगातार WHO मानकों के भीतर बना रहा',
      'बैक्टीरियल संदूषण घटनाओं में 30% कमी',
      'TDS स्तर मौसमी भिन्नता पैटर्न दिखाते हैं'
    ],
    recommendations: [
      'औद्योगिक निर्वहन की नियमित निगरानी जारी रखें',
      'कृषि अपवाह नियंत्रण को सख्त बनाएं',
      'उच्च जोखिम वाले क्षेत्रों में जल उपचार सुविधाओं को अपग्रेड करें',
      'जल संरक्षण के बारे में जन जागरूकता बढ़ाएं'
    ]
  }
};

// Sample data for charts
const monthlyQualityData = [
  { month: 'Jan', wqi: 78, ph: 7.1, tds: 165, heavyMetals: 12 },
  { month: 'Feb', wqi: 82, ph: 7.3, tds: 158, heavyMetals: 10 },
  { month: 'Mar', wqi: 85, ph: 7.2, tds: 162, heavyMetals: 8 },
  { month: 'Apr', wqi: 89, ph: 7.4, tds: 155, heavyMetals: 7 },
  { month: 'May', wqi: 87, ph: 7.2, tds: 168, heavyMetals: 9 },
  { month: 'Jun', wqi: 91, ph: 7.3, tds: 152, heavyMetals: 6 },
  { month: 'Jul', wqi: 88, ph: 7.1, tds: 159, heavyMetals: 8 },
  { month: 'Aug', wqi: 93, ph: 7.4, tds: 148, heavyMetals: 5 },
  { month: 'Sep', wqi: 90, ph: 7.2, tds: 156, heavyMetals: 7 },
  { month: 'Oct', wqi: 95, ph: 7.3, tds: 145, heavyMetals: 4 },
  { month: 'Nov', wqi: 92, ph: 7.2, tds: 150, heavyMetals: 6 },
  { month: 'Dec', wqi: 94, ph: 7.4, tds: 147, heavyMetals: 5 }
];

const yearlyComparisonData = [
  { year: '2020', wqi: 68, ph: 6.9, tds: 195, heavyMetals: 25 },
  { year: '2021', wqi: 72, ph: 7.0, tds: 188, heavyMetals: 22 },
  { year: '2022', wqi: 76, ph: 7.1, tds: 180, heavyMetals: 18 },
  { year: '2023', wqi: 84, ph: 7.2, tds: 165, heavyMetals: 12 },
  { year: '2024', wqi: 92, ph: 7.3, tds: 155, heavyMetals: 8 }
];

const pollutionSourcesData = [
  { name: 'Industrial', value: 35, color: '#ef4444' },
  { name: 'Domestic', value: 28, color: '#f97316' },
  { name: 'Agricultural', value: 22, color: '#eab308' },
  { name: 'Natural', value: 15, color: '#22c55e' }
];

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e'];

export function WaterReports({ language, onNavigate }: WaterReportsProps) {
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
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {t.downloadReport}
              </Button>
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                2024
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-4 relative z-10">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.waterQualityIndex}</p>
                <p className="text-2xl bg-gradient-to-r from-green-600 to-green-700 bg-clip-text text-transparent">92</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">+15%</span>
                </div>
              </div>
              <BarChart3 className="w-8 h-8 text-green-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.phLevel}</p>
                <p className="text-2xl bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">7.3</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-blue-600 mr-1" />
                  <span className="text-sm text-blue-600">Stable</span>
                </div>
              </div>
              <LineChart className="w-8 h-8 text-blue-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.heavyMetals}</p>
                <p className="text-2xl bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">8</p>
                <div className="flex items-center mt-2">
                  <TrendingDown className="w-4 h-4 text-green-600 mr-1" />
                  <span className="text-sm text-green-600">-22%</span>
                </div>
              </div>
              <AlertTriangle className="w-8 h-8 text-orange-600" />
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.overallTrend}</p>
                <Badge className="bg-green-100 text-green-800 mt-2">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t.improving}
                </Badge>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600" />
            </div>
          </Card>
        </div>

        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/70 backdrop-blur-sm">
            <TabsTrigger value="trends">{t.qualityTrends}</TabsTrigger>
            <TabsTrigger value="comparison">{t.comparison}</TabsTrigger>
            <TabsTrigger value="pollution">{t.pollutionLevels}</TabsTrigger>
            <TabsTrigger value="insights">{t.insights}</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            {/* Monthly Quality Trends */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <LineChart className="w-5 h-5 text-blue-600 mr-2" />
                {t.monthlyData} - 2024
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlyQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="wqi" stroke="#3b82f6" fill="#dbeafe" name="WQI" />
                    <Line type="monotone" dataKey="ph" stroke="#06b6d4" name="pH" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Parameter Trends */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-cyan-600 mr-2" />
                Parameter Trends
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={monthlyQualityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="tds" stroke="#10b981" name="TDS (mg/L)" />
                    <Line type="monotone" dataKey="heavyMetals" stroke="#ef4444" name="Heavy Metals" />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-6">
            {/* 5-Year Comparison */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <BarChart3 className="w-5 h-5 text-purple-600 mr-2" />
                {t.last5Years} - {t.yearlyComparison}
              </h3>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsBarChart data={yearlyComparisonData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="year" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="wqi" fill="#3b82f6" name="Water Quality Index" />
                    <Bar dataKey="heavyMetals" fill="#ef4444" name="Heavy Metals Index" />
                  </RechartsBarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Improvement Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <h4 className="mb-4">2023 vs 2024 Improvement</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Water Quality Index</span>
                    <Badge className="bg-green-100 text-green-800">+9.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Heavy Metal Reduction</span>
                    <Badge className="bg-green-100 text-green-800">-33%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>pH Stability</span>
                    <Badge className="bg-blue-100 text-blue-800">+4.5%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>TDS Reduction</span>
                    <Badge className="bg-green-100 text-green-800">-6%</Badge>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <h4 className="mb-4">5-Year Progress</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Overall Improvement</span>
                    <Badge className="bg-green-100 text-green-800">+35%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pollution Reduction</span>
                    <Badge className="bg-green-100 text-green-800">-68%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Compliance Rate</span>
                    <Badge className="bg-green-100 text-green-800">+45%</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Treatment Efficiency</span>
                    <Badge className="bg-blue-100 text-blue-800">+28%</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pollution" className="space-y-6">
            {/* Pollution Sources */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <h3 className="text-lg mb-4 flex items-center">
                  <PieChart className="w-5 h-5 text-orange-600 mr-2" />
                  {t.pollutionSources}
                </h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        dataKey="value"
                        data={pollutionSourcesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                      >
                        {pollutionSourcesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
              </Card>

              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
                <h3 className="text-lg mb-4">Pollution Reduction Targets</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Industrial Discharge</span>
                      <span className="text-sm">75% reduced</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Agricultural Runoff</span>
                      <span className="text-sm">60% reduced</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Domestic Waste</span>
                      <span className="text-sm">45% reduced</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="insights" className="space-y-6">
            {/* Key Insights */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <Info className="w-5 h-5 text-blue-600 mr-2" />
                Key Insights
              </h3>
              <div className="space-y-3">
                {t.keyInsights.map((insight, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <p className="text-sm">{insight}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recommendations */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 text-orange-600 mr-2" />
                {t.recommendations}
              </h3>
              <div className="space-y-3">
                {t.recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
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