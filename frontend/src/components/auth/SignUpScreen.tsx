import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sparkles, Heart, Shield, Camera, Loader2, CheckCircle2, UserPlus } from 'lucide-react';

interface SignUpScreenProps {
  onSignUp: () => void;
  onSwitchToSignIn: () => void;
  isLoggingIn: boolean;
}

export function SignUpScreen({ onSignUp, onSwitchToSignIn, isLoggingIn }: SignUpScreenProps) {
  return (
    <div className="w-full min-h-screen flex flex-col items-center py-12 px-4 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
      {/* Hero Section - Centered */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-2xl mx-auto text-center space-y-8">
        {/* Logo */}
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 shadow-2xl">
          <BookOpen className="w-12 h-12 text-primary" />
        </div>

        {/* Brand Name */}
        <h1 className="text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary/70 bg-clip-text text-transparent">
          DAYRY
        </h1>

        {/* Tagline */}
        <p className="text-xl text-foreground/80 font-medium max-w-xl">
          Start your journaling journey today
        </p>

        {/* Description */}
        <p className="text-base text-muted-foreground max-w-lg">
          Create your account and begin capturing life's moments with AI-powered insights.
        </p>

        {/* What You'll Get Section */}
        <div className="w-full max-w-md bg-card/50 border border-border rounded-2xl p-6 space-y-3">
          <h3 className="font-semibold text-lg mb-4">What you'll get:</h3>
          <div className="flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Unlimited diary entries with AI assistance</p>
          </div>
          <div className="flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Automatic mood tracking and insights</p>
          </div>
          <div className="flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Secure blockchain-based storage</p>
          </div>
          <div className="flex items-start gap-3 text-left">
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-muted-foreground">Photo memories and weekly recaps</p>
          </div>
        </div>
      </div>

      {/* Why Choose DAYRY Section */}
      <div className="w-full max-w-5xl mx-auto pt-16 pb-8">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose DAYRY?</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Smart Writing */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Smart Writing</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered prompts and contextual suggestions to help you write
            </p>
          </div>

          {/* Mood Insights */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4">
              <Heart className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Mood Insights</h3>
            <p className="text-sm text-muted-foreground">
              Automatic mood tracking and emotional pattern analysis
            </p>
          </div>

          {/* Security */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Private & Secure</h3>
            <p className="text-sm text-muted-foreground">
              Your thoughts stay yours with blockchain security
            </p>
          </div>

          {/* Photo Memories */}
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center mb-4">
              <Camera className="w-8 h-8 text-accent" />
            </div>
            <h3 className="font-semibold text-lg mb-2">Photo Memories</h3>
            <p className="text-sm text-muted-foreground">
              Attach photos and create beautiful weekly recaps
            </p>
          </div>
        </div>
      </div>

      {/* Authentication Buttons Section - NOW AT THE BOTTOM */}
      <div className="w-full max-w-2xl mx-auto pt-16 pb-16">
        <Card className="shadow-2xl border-2">
          <CardHeader className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 mx-auto mb-4">
              <UserPlus className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-3xl">Create Your Account</CardTitle>
            <CardDescription className="text-base">
              New users can start their journaling journey here
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-sm font-medium">Your account includes:</p>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    Unlimited diary entries with AI writing assistance
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    Automatic mood tracking and emotional insights
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    Secure blockchain storage for your privacy
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                    Photo memories and beautiful weekly recaps
                  </li>
                </ul>
              </div>
              
              <Button
                onClick={onSignUp}
                disabled={isLoggingIn}
                className="w-full shadow-lg hover:shadow-xl transition-all duration-300"
                size="lg"
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account with Internet Identity
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                By creating an account, you agree to secure authentication via Internet Identity
              </p>

              <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Already have an account?</span>
                </div>
              </div>

              <Button
                variant="outline"
                onClick={onSwitchToSignIn}
                disabled={isLoggingIn}
                className="w-full"
                size="lg"
              >
                Sign In to Existing Account
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
