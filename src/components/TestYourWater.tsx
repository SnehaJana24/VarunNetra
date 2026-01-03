import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Badge } from './ui/badge';
import { 
  ArrowLeft, 
  Bluetooth, 
  TestTube, 
  Wifi, 
  WifiOff,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Settings,
  Zap,
  Thermometer,
  Droplets,
  Activity,
  Shield,
  Clock,
  Play,
  Pause,
  Download
} from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface TestYourWaterProps {
  language: string;
  onNavigate: (view: 'dashboard' | 'chatbot' | 'areawater' | 'testwater' | 'reports' | 'about' | 'map') => void;
}

const translations = {
  en: {
    title: 'Test Your Water',
    subtitle: 'Hardware Sensor Connection',
    backToDashboard: 'Back to Dashboard',
    bluetoothStatus: 'Bluetooth Status',
    sensorStatus: 'Sensor Status',
    connected: 'Connected',
    disconnected: 'Disconnected',
    connecting: 'Connecting...',
    searching: 'Searching for devices...',
    connect: 'Connect Device',
    disconnect: 'Disconnect',
    refresh: 'Refresh',
    startTest: 'Start Water Test',
    stopTest: 'Stop Test',
    downloadResults: 'Download Results',
    deviceInfo: 'Device Information',
    testProgress: 'Test Progress',
    liveReadings: 'Live Sensor Readings',
    testHistory: 'Test History',
    instructions: 'Testing Instructions',
    deviceName: 'VarunNetra Water Sensor v2.1',
    deviceId: 'VN-WS-2024-001',
    batteryLevel: 'Battery Level',
    signalStrength: 'Signal Strength',
    lastSync: 'Last Sync',
    testInstructions: [
      '1. Ensure sensor is clean and dry before testing',
      '2. Immerse sensor completely in water sample',
      '3. Wait for stabilization (30-60 seconds)',
      '4. Keep sensor still during measurement',
      '5. Clean sensor after each test'
    ],
    parameters: {
      ph: { name: 'pH Level', value: '7.2', unit: '', status: 'Normal' },
      tds: { name: 'TDS', value: '145', unit: 'mg/L', status: 'Good' },
      temperature: { name: 'Temperature', value: '24.5', unit: '°C', status: 'Normal' },
      turbidity: { name: 'Turbidity', value: '0.8', unit: 'NTU', status: 'Clear' },
      conductivity: { name: 'Conductivity', value: '210', unit: 'µS/cm', status: 'Good' },
      orp: { name: 'ORP', value: '+320', unit: 'mV', status: 'Good' }
    }
  },
  hi: {
    title: 'अपना पानी टेस्ट करें',
    subtitle: 'हार्डवेयर सेंसर कनेक्शन',
    backToDashboard: 'डैशबोर्ड पर वापस जाएं',
    bluetoothStatus: 'ब्लूटूथ स्थिति',
    sensorStatus: 'सेंसर स��थिति',
    connected: 'जुड़ा हुआ',
    disconnected: 'डिस्कनेक्ट',
    connecting: 'कनेक्ट हो रहा है...',
    searching: 'डिवाइस खोज रहे हैं...',
    connect: 'डिवाइस कनेक्ट करें',
    disconnect: 'डिस्कनेक्ट करें',
    refresh: 'रीफ्रेश करें',
    startTest: 'जल परीक्षण शुरू करें',
    stopTest: 'परीक्षण बंद करें',
    downloadResults: 'परिणाम डाउनलोड करें',
    deviceInfo: 'डिवाइस जानकारी',
    testProgress: 'परीक्षण प्रगति',
    liveReadings: 'लाइव सेंसर रीडिंग',
    testHistory: 'परीक्षण इतिहास',
    instructions: 'परीक्षण निर्देश',
    deviceName: 'VarunNetra जल सेंसर v2.1',
    deviceId: 'VN-WS-2024-001',
    batteryLevel: 'बैटरी स्तर',
    signalStrength: 'सिग्नल शक्ति',
    lastSync: 'अंतिम सिंक',
    testInstructions: [
      '1. परीक्षण से पहले सेंसर को साफ और सूखा रखें',
      '2. सेंसर को पानी के नमूने में पूरी तरह डुबोएं',
      '3. स्थिरीकरण की प्रतीक्षा करें (30-60 सेकंड)',
      '4. माप के दौरान सेंसर को स्थिर रखें',
      '5. प्रत्येक परीक्षण के बाद सेंसर को साफ करें'
    ],
    parameters: {
      ph: { name: 'pH स्तर', value: '7.2', unit: '', status: 'सामान्य' },
      tds: { name: 'TDS', value: '145', unit: 'mg/L', status: 'अच्छा' },
      temperature: { name: 'तापमान', value: '24.5', unit: '°C', status: 'सामान्य' },
      turbidity: { name: 'मैलापन', value: '0.8', unit: 'NTU', status: 'साफ' },
      conductivity: { name: 'चालकता', value: '210', unit: 'µS/cm', status: 'अच्छा' },
      orp: { name: 'ORP', value: '+320', unit: 'mV', status: 'अच्छा' }
    }
  }
};

const getStatusColor = (status: string, isConnected: boolean = false) => {
  if (isConnected) {
    return 'bg-green-100 text-green-800 border-green-200';
  }
  switch (status.toLowerCase()) {
    case 'connected':
    case 'जुड़ा हुआ':
    case 'good':
    case 'अच्छा':
    case 'normal':
    case 'सामान्य':
    case 'clear':
    case 'साफ':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'connecting':
    case 'कनेक्ट हो रहा है...':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'disconnected':
    case 'डिस्कनेक्ट':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export function TestYourWater({ language, onNavigate }: TestYourWaterProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [bluetoothConnected, setBluetoothConnected] = React.useState(false);
  const [sensorConnected, setSensorConnected] = React.useState(false);
  const [isConnecting, setIsConnecting] = React.useState(false);
  const [isSearching, setIsSearching] = React.useState(false);
  const [testRunning, setTestRunning] = React.useState(false);
  const [testProgress, setTestProgress] = React.useState(0);
  const [batteryLevel] = React.useState(85);
  const [signalStrength] = React.useState(92);

  const handleConnect = async () => {
    setIsConnecting(true);
    setIsSearching(true);
    
    // Simulate device search and connection
    setTimeout(() => {
      setIsSearching(false);
      setTimeout(() => {
        setBluetoothConnected(true);
        setSensorConnected(true);
        setIsConnecting(false);
      }, 2000);
    }, 3000);
  };

  const handleDisconnect = () => {
    setBluetoothConnected(false);
    setSensorConnected(false);
    setTestRunning(false);
    setTestProgress(0);
  };

  const handleStartTest = () => {
    if (!sensorConnected) return;
    
    setTestRunning(true);
    setTestProgress(0);
    
    // Simulate test progress
    const interval = setInterval(() => {
      setTestProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTestRunning(false);
          return 100;
        }
        return prev + 2;
      });
    }, 300);
  };

  const handleStopTest = () => {
    setTestRunning(false);
    setTestProgress(0);
  };

  React.useEffect(() => {
    // Simulate random sensor readings when connected
    if (sensorConnected && testRunning) {
      const interval = setInterval(() => {
        // This would update live readings in a real implementation
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [sensorConnected, testRunning]);

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
            <div className="flex items-center space-x-2">
              <Badge className={getStatusColor('', bluetoothConnected)}>
                <Bluetooth className="w-3 h-3 mr-1" />
                {bluetoothConnected ? t.connected : t.disconnected}
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-4 relative z-10">
        {/* Connection Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg flex items-center">
                <Bluetooth className="w-5 h-5 text-blue-600 mr-2" />
                {t.bluetoothStatus}
              </h3>
              {bluetoothConnected ? (
                <Wifi className="w-6 h-6 text-green-600" />
              ) : (
                <WifiOff className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div className="space-y-3">
              <Badge className={getStatusColor(bluetoothConnected ? t.connected : t.disconnected, bluetoothConnected)}>
                {isConnecting ? t.connecting : (bluetoothConnected ? t.connected : t.disconnected)}
              </Badge>
              {isSearching && (
                <p className="text-sm text-blue-600 flex items-center">
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  {t.searching}
                </p>
              )}
            </div>
          </Card>

          <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg flex items-center">
                <TestTube className="w-5 h-5 text-cyan-600 mr-2" />
                {t.sensorStatus}
              </h3>
              {sensorConnected ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div className="space-y-3">
              <Badge className={getStatusColor(sensorConnected ? t.connected : t.disconnected, sensorConnected)}>
                {sensorConnected ? t.connected : t.disconnected}
              </Badge>
              {sensorConnected && (
                <div className="text-sm text-gray-600">
                  <p>Device: {t.deviceName}</p>
                  <p>ID: {t.deviceId}</p>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Control Buttons */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
          <div className="flex flex-wrap gap-3">
            {!bluetoothConnected ? (
              <Button
                onClick={handleConnect}
                disabled={isConnecting}
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
              >
                {isConnecting ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Bluetooth className="w-4 h-4 mr-2" />
                )}
                {t.connect}
              </Button>
            ) : (
              <>
                <Button
                  onClick={handleDisconnect}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <WifiOff className="w-4 h-4 mr-2" />
                  {t.disconnect}
                </Button>
                {!testRunning ? (
                  <Button
                    onClick={handleStartTest}
                    disabled={!sensorConnected}
                    className="bg-gradient-to-r from-green-600 to-teal-600 hover:from-green-700 hover:to-teal-700 text-white"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    {t.startTest}
                  </Button>
                ) : (
                  <Button
                    onClick={handleStopTest}
                    variant="outline"
                    className="border-orange-300 text-orange-600 hover:bg-orange-50"
                  >
                    <Pause className="w-4 h-4 mr-2" />
                    {t.stopTest}
                  </Button>
                )}
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadResults}
                </Button>
              </>
            )}
          </div>
        </Card>

        {sensorConnected && (
          <>
            {/* Device Information */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
              <h3 className="text-lg mb-4 flex items-center">
                <Settings className="w-5 h-5 text-gray-600 mr-2" />
                {t.deviceInfo}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3">
                  <Zap className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.batteryLevel}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={batteryLevel} className="w-16 h-2" />
                      <span className="text-sm">{batteryLevel}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Activity className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.signalStrength}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={signalStrength} className="w-16 h-2" />
                      <span className="text-sm">{signalStrength}%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-cyan-600" />
                  <div>
                    <p className="text-sm text-gray-600">{t.lastSync}</p>
                    <p className="text-sm">2 min ago</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Test Progress */}
            {testRunning && (
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
                <h3 className="text-lg mb-4 flex items-center">
                  <TestTube className="w-5 h-5 text-blue-600 mr-2" />
                  {t.testProgress}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Testing in progress...</span>
                    <span className="text-sm">{testProgress}%</span>
                  </div>
                  <Progress value={testProgress} className="h-3" />
                  <p className="text-xs text-gray-600">
                    Keep sensor immersed and still during measurement
                  </p>
                </div>
              </Card>
            )}

            {/* Live Readings */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100 mb-6">
              <h3 className="text-lg mb-4 flex items-center">
                <Activity className="w-5 h-5 text-green-600 mr-2" />
                {t.liveReadings}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(t.parameters).map(([key, param]) => (
                  <div key={key} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm">{param.name}</p>
                      {key === 'ph' && <Thermometer className="w-4 h-4 text-blue-600" />}
                      {key === 'tds' && <Droplets className="w-4 h-4 text-cyan-600" />}
                      {key === 'temperature' && <Thermometer className="w-4 h-4 text-orange-600" />}
                      {key === 'turbidity' && <Shield className="w-4 h-4 text-green-600" />}
                      {key === 'conductivity' && <Zap className="w-4 h-4 text-purple-600" />}
                      {key === 'orp' && <Activity className="w-4 h-4 text-indigo-600" />}
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-lg">{param.value}</span>
                      <span className="text-sm text-gray-600">{param.unit}</span>
                    </div>
                    <Badge className={`mt-2 ${getStatusColor(param.status)}`} size="sm">
                      {param.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>

            {/* Instructions */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
              <h3 className="text-lg mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 text-orange-600 mr-2" />
                {t.instructions}
              </h3>
              <div className="space-y-2">
                {t.testInstructions.map((instruction, index) => (
                  <p key={index} className="text-sm text-gray-700">
                    {instruction}
                  </p>
                ))}
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}