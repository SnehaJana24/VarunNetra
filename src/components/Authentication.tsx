import React from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Eye, EyeOff, Phone, Mail } from 'lucide-react';
import varunNetraLogo from 'figma:asset/e44aa1704c39379f905619749b1bc1e6c107d354.png';

interface AuthenticationProps {
  language: string;
  onAuthSuccess: () => void;
}

const translations = {
  en: {
    welcome: 'Welcome to VarunNetra',
    subtitle: 'Smart Water Management System',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    phoneNumber: 'Phone Number',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    fullName: 'Full Name',
    location: 'Location/City',
    forgotPassword: 'Forgot Password?',
    noAccount: "Don't have an account?",
    haveAccount: 'Already have an account?',
    signInButton: 'Sign In',
    signUpButton: 'Create Account',
    orContinueWith: 'Or continue with',
    phoneLogin: 'Phone',
    emailLogin: 'Email',
    enterPhone: 'Enter your phone number',
    enterEmail: 'Enter your email address',
    enterPassword: 'Enter your password',
    enterConfirmPassword: 'Confirm your password',
    enterFullName: 'Enter your full name',
    enterLocation: 'Enter your city/location'
  },
  hi: {
    welcome: 'VarunNetra में आपका स्वागत है',
    subtitle: 'स्मार्ट जल प्रबंधन प्रणाली',
    signIn: 'साइन इन करें',
    signUp: 'साइन अप करें',
    phoneNumber: 'फोन नंबर',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    fullName: 'पूरा नाम',
    location: 'स्थान/शहर',
    forgotPassword: 'पासवर्ड भूल गए?',
    noAccount: 'खाता नहीं है?',
    haveAccount: 'पहले से खाता है?',
    signInButton: 'साइन इन करें',
    signUpButton: 'खाता बनाएं',
    orContinueWith: 'या इसके साथ जारी रखें',
    phoneLogin: 'फोन',
    emailLogin: 'ईमेल',
    enterPhone: 'अपना फोन नंबर दर्ज करें',
    enterEmail: 'अपना ईमेल पता दर्ज करें',
    enterPassword: 'अपना पासवर्ड दर्ज करें',
    enterConfirmPassword: 'पासवर्ड की पुष्टि करें',
    enterFullName: 'अपना पूरा नाम दर्ज करें',
    enterLocation: 'अपना शहर/स्थान दर्ज करें'
  }
};

export function Authentication({ language, onAuthSuccess }: AuthenticationProps) {
  const t = translations[language as keyof typeof translations] || translations.en;
  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [loginMethod, setLoginMethod] = React.useState<'phone' | 'email'>('phone');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate authentication
    onAuthSuccess();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 p-4 relative">
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1648983102846-32ae9101a0ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMHRleHR1cmUlMjBzdWJ0bGUlMjBiYWNrZ3JvdW5kfGVufDF8fHx8MTc1NzU4MzA3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral')`
        }}
      />
      <div className="max-w-md mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-32 h-32 flex items-center justify-center">
              <img src={varunNetraLogo} alt="VarunNetra Logo" className="w-28 h-28 object-contain drop-shadow-lg transform hover:scale-105 transition-transform duration-300" style={{ 
                filter: 'drop-shadow(0 6px 8px rgba(0,0,0,0.2)) drop-shadow(0 2px 4px rgba(0,0,0,0.15))'
              }} />
            </div>
          </div>
          <h1 className="text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-2">
            VarunNetra
          </h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        {/* Auth Form */}
        <Card className="p-6 bg-white/80 backdrop-blur-sm border-blue-100">
          <Tabs defaultValue="signin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 bg-blue-50">
              <TabsTrigger value="signin">{t.signIn}</TabsTrigger>
              <TabsTrigger value="signup">{t.signUp}</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Login Method Toggle */}
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <Button
                    type="button"
                    variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setLoginMethod('phone')}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    {t.phoneLogin}
                  </Button>
                  <Button
                    type="button"
                    variant={loginMethod === 'email' ? 'default' : 'ghost'}
                    size="sm"
                    className="flex-1"
                    onClick={() => setLoginMethod('email')}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    {t.emailLogin}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-contact">
                    {loginMethod === 'phone' ? t.phoneNumber : t.email}
                  </Label>
                  <Input
                    id="signin-contact"
                    type={loginMethod === 'phone' ? 'tel' : 'email'}
                    placeholder={loginMethod === 'phone' ? t.enterPhone : t.enterEmail}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signin-password">{t.password}</Label>
                  <div className="relative">
                    <Input
                      id="signin-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.enterPassword}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button variant="link" size="sm" className="text-blue-600 p-0">
                    {t.forgotPassword}
                  </Button>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  {t.signInButton}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">{t.fullName}</Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder={t.enterFullName}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-phone">{t.phoneNumber}</Label>
                  <Input
                    id="signup-phone"
                    type="tel"
                    placeholder={t.enterPhone}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-email">{t.email}</Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder={t.enterEmail}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-location">{t.location}</Label>
                  <Input
                    id="signup-location"
                    type="text"
                    placeholder={t.enterLocation}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-password">{t.password}</Label>
                  <div className="relative">
                    <Input
                      id="signup-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder={t.enterPassword}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="signup-confirm-password">{t.confirmPassword}</Label>
                  <div className="relative">
                    <Input
                      id="signup-confirm-password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder={t.enterConfirmPassword}
                      required
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                >
                  {t.signUpButton}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}