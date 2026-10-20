import { Button } from '@/components/ui/button';
import { Loader2, Sparkles, Heart, Shield, Calendar, Camera } from 'lucide-react';

interface SignInScreenProps {
  onSignIn: () => void;
  onSwitchToSignUp: () => void;
  isLoggingIn: boolean;
}

export function SignInScreen({ onSignIn, onSwitchToSignUp, isLoggingIn }: SignInScreenProps) {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-br from-primary/5 via-accent/5 to-background overflow-y-auto">
      {/* Hero Section */}
      <div className="w-full flex flex-col items-center justify-center py-12 px-4">
        <div className="flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8">
          {/* Logo */}
          <div className="inline-flex items-center justify-center">
            <img 
              src="/assets/generated/dayry-logo.dim_512x512.png" 
              alt="DAYRY Logo" 
              className="w-48 h-48 object-contain"
            />
          </div>

          {/* Tagline */}
          <p className="text-xl text-foreground/80 font-medium max-w-xl">
            Your intelligent companion for capturing life's moments
          </p>

          {/* Description */}
          <p className="text-base text-muted-foreground max-w-lg">
            AI-powered journaling with automatic mood tracking and beautiful insights
          </p>
        </div>
      </div>

      {/* Why Choose DAYRY? Section */}
      <div className="w-full flex flex-col items-center px-4 py-12">
        <div className="max-w-6xl mx-auto w-full space-y-8">
          <h2 className="text-4xl font-bold text-center text-foreground">
            Why Choose DAYRY?
          </h2>

          {/* Feature Cards Grid - Exactly 5 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* AI-Powered Writing */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                AI-Powered Writing
              </h3>
              <p className="text-muted-foreground">
                Get intelligent prompts and contextual suggestions to write meaningful entries effortlessly.
              </p>
            </div>

            {/* Mood Insights */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Mood Insights
              </h3>
              <p className="text-muted-foreground">
                Track your emotional journey with automatic sentiment analysis and beautiful visualizations.
              </p>
            </div>

            {/* Private & Secure */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Private & Secure
              </h3>
              <p className="text-muted-foreground">
                Your thoughts stay yours with Internet Identity authentication and optional PIN protection.
              </p>
            </div>

            {/* Calendar View */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Calendar View
              </h3>
              <p className="text-muted-foreground">
                Browse your entries with intuitive monthly and weekly layouts with mood-based highlighting.
              </p>
            </div>

            {/* Photo Memories */}
            <div className="p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 hover:shadow-lg transition-shadow">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center mb-4">
                <Camera className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">
                Photo Memories
              </h3>
              <p className="text-muted-foreground">
                Attach photos to your entries and create beautiful weekly recaps to celebrate your moments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* What You'll Get Section */}
      <div className="w-full flex flex-col items-center px-4 py-12">
        <div className="max-w-4xl mx-auto w-full">
          <div className="p-8 md:p-12 rounded-3xl bg-card/50 backdrop-blur-sm border border-border/50">
            <h2 className="text-3xl font-bold text-center text-foreground mb-8">
              What You'll Get
            </h2>

            <div className="space-y-6">
              {/* AI Writing Prompts */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">✨</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    AI Writing Prompts:
                  </h4>
                  <p className="text-muted-foreground">
                    Get contextual suggestions to start writing instantly.
                  </p>
                </div>
              </div>

              {/* Photo Attachments */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📷</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Photo Attachments:
                  </h4>
                  <p className="text-muted-foreground">
                    Add up to 5 photos per entry to capture visual memories.
                  </p>
                </div>
              </div>

              {/* Mood Tracking */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">😊</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Mood Tracking:
                  </h4>
                  <p className="text-muted-foreground">
                    Automatic sentiment analysis detects your emotional state.
                  </p>
                </div>
              </div>

              {/* Insights Dashboard */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📊</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Insights Dashboard:
                  </h4>
                  <p className="text-muted-foreground">
                    Visualize mood trends and patterns over time.
                  </p>
                </div>
              </div>

              {/* Calendar Navigation */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">📅</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    Calendar Navigation:
                  </h4>
                  <p className="text-muted-foreground">
                    Browse entries with monthly and weekly calendar views.
                  </p>
                </div>
              </div>

              {/* PIN Protection */}
              <div className="flex items-start gap-4">
                <span className="text-2xl">🔒</span>
                <div>
                  <h4 className="text-lg font-semibold text-foreground">
                    PIN Protection:
                  </h4>
                  <p className="text-muted-foreground">
                    Add an optional 4-digit PIN for extra privacy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Buttons Section - NOW AT THE BOTTOM */}
      <div className="w-full flex flex-col items-center px-4 py-16">
        <div className="max-w-md mx-auto w-full space-y-4">
          <h2 className="text-2xl font-bold text-center text-foreground mb-6">
            Ready to Start?
          </h2>
          
          <Button
            onClick={onSignIn}
            disabled={isLoggingIn}
            className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
            size="lg"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Signing in...
              </>
            ) : (
              <>Sign In with Internet Identity</>
            )}
          </Button>

          <p className="text-xs text-center text-muted-foreground">
            Secure authentication powered by Internet Identity
          </p>

          <div className="text-center pt-2">
            <p className="text-sm text-muted-foreground mb-2">
              Don't have an account yet?
            </p>
            <Button
              variant="outline"
              onClick={onSwitchToSignUp}
              disabled={isLoggingIn}
              className="w-full"
            >
              Create New Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
