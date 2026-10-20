import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/sonner';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DiaryEditor } from './components/DiaryEditor';
import { DiaryHistory } from './components/DiaryHistory';
import { InsightsDashboard } from './components/InsightsDashboard';
import { SignInScreen } from './components/auth/SignInScreen';
import { SignUpScreen } from './components/auth/SignUpScreen';
import { ProfileSetup } from './components/auth/ProfileSetup';
import { useState, useEffect } from 'react';
import { useUiScale } from './hooks/useUiScale';
import { InternetIdentityProvider, useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';

type AuthScreen = 'signin' | 'signup';

function AppContent() {
  const [activeView, setActiveView] = useState<'write' | 'history' | 'insights'>('write');
  const [authScreen, setAuthScreen] = useState<AuthScreen>('signin');
  const { identity, login, loginStatus, clear } = useInternetIdentity();
  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  
  // Initialize UI scale on app mount
  useUiScale();

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();
  const isLoggingIn = loginStatus === 'logging-in';
  const isInitializing = loginStatus === 'initializing';

  // Reset to sign-in screen when user logs out
  useEffect(() => {
    if (!isAuthenticated && !isInitializing) {
      setAuthScreen('signin');
    }
  }, [isAuthenticated, isInitializing]);

  // Show loading during initialization
  if (isInitializing) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading...</p>
          </div>
        </div>
      </ThemeProvider>
    );
  }

  // Show authentication screens when not logged in
  if (!isAuthenticated) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1">
            {authScreen === 'signin' ? (
              <SignInScreen
                onSignIn={login}
                onSwitchToSignUp={() => setAuthScreen('signup')}
                isLoggingIn={isLoggingIn}
              />
            ) : (
              <SignUpScreen
                onSignUp={login}
                onSwitchToSignIn={() => setAuthScreen('signin')}
                isLoggingIn={isLoggingIn}
              />
            )}
          </main>
          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  // Show profile setup if user doesn't have a profile yet
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;
  
  if (showProfileSetup) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen flex flex-col bg-background">
          <main className="flex-1">
            <ProfileSetup onLogout={clear} />
          </main>
          <Footer />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col bg-background">
        <Header activeView={activeView} onViewChange={setActiveView} />
        <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
          {activeView === 'write' && <DiaryEditor />}
          {activeView === 'history' && <DiaryHistory />}
          {activeView === 'insights' && <InsightsDashboard />}
        </main>
        <Footer />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}

export default function App() {
  return (
    <InternetIdentityProvider>
      <AppContent />
    </InternetIdentityProvider>
  );
}
