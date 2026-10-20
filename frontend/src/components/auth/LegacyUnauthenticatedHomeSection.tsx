import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { BookOpen, Sparkles, Heart, Shield, Loader2, Calendar, Camera } from 'lucide-react';

interface LegacyUnauthenticatedHomeSectionProps {
  onLogin: () => void;
  isLoggingIn: boolean;
}

export function LegacyUnauthenticatedHomeSection({ onLogin, isLoggingIn }: LegacyUnauthenticatedHomeSectionProps) {
  return (
    <div className="w-full min-h-screen">
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-accent/5 to-background">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 mb-6 shadow-2xl">
            <BookOpen className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary/70 bg-clip-text text-transparent">
            DAYRY
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-4">
            Your intelligent companion for capturing life's moments
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
            AI-powered journaling with automatic mood tracking and beautiful insights.
          </p>
        </div>
      </section>

      {/* Why Choose DAYRY Section */}
      <section className="py-20 px-4 bg-background">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose DAYRY?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-muted/5 to-card border-2">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center mb-4 shadow-lg">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">AI-Powered Writing</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Get intelligent prompts and contextual suggestions to write meaningful entries effortlessly.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-muted/5 to-card border-2">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 flex items-center justify-center mb-4 shadow-lg">
                  <Heart className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">Mood Insights</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Track your emotional journey with automatic sentiment analysis and beautiful visualizations.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-muted/5 to-card border-2">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center mb-4 shadow-lg">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Private & Secure</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Your thoughts stay yours with Internet Identity authentication and optional PIN protection.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-muted/5 to-card border-2">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/30 via-accent/20 to-accent/10 flex items-center justify-center mb-4 shadow-lg">
                  <Calendar className="w-7 h-7 text-accent" />
                </div>
                <CardTitle className="text-xl mb-3">Calendar View</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Browse your entries with intuitive monthly and weekly layouts with mood-based highlighting.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-muted/5 to-card border-2">
              <CardHeader className="p-6">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 flex items-center justify-center mb-4 shadow-lg">
                  <Camera className="w-7 h-7 text-primary" />
                </div>
                <CardTitle className="text-xl mb-3">Photo Memories</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Attach photos to your entries and create beautiful weekly recaps to celebrate your moments.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-20 px-4 bg-muted/20">
        <div className="max-w-3xl mx-auto">
          <Card className="rounded-2xl shadow-xl bg-gradient-to-br from-card via-muted/5 to-card border-2">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6 text-center">What You'll Get</h3>
              <Separator className="mb-6" />
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">✨</span>
                  <div>
                    <span className="font-semibold">AI Writing Prompts:</span>{' '}
                    <span className="text-muted-foreground">Get contextual suggestions to start writing instantly.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">📸</span>
                  <div>
                    <span className="font-semibold">Photo Attachments:</span>{' '}
                    <span className="text-muted-foreground">Add up to 5 photos per entry to capture visual memories.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">😊</span>
                  <div>
                    <span className="font-semibold">Mood Tracking:</span>{' '}
                    <span className="text-muted-foreground">Automatic sentiment analysis detects your emotional state.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">📊</span>
                  <div>
                    <span className="font-semibold">Insights Dashboard:</span>{' '}
                    <span className="text-muted-foreground">Visualize mood trends and patterns over time.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">📅</span>
                  <div>
                    <span className="font-semibold">Calendar Navigation:</span>{' '}
                    <span className="text-muted-foreground">Browse entries with monthly and weekly calendar views.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary text-xl mt-0.5 flex-shrink-0">🔐</span>
                  <div>
                    <span className="font-semibold">PIN Protection:</span>{' '}
                    <span className="text-muted-foreground">Add an optional 4-digit PIN for extra privacy.</span>
                  </div>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Sign In Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-muted/20 via-background to-muted/10">
        <div className="max-w-2xl mx-auto">
          <Card className="rounded-3xl shadow-2xl bg-gradient-to-br from-card via-muted/10 to-card border-2">
            <CardContent className="p-8 md:p-12">
              <div className="text-center mb-8">
                <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center shadow-lg mb-4">
                  <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold mb-3">Ready to Start?</h2>
                <p className="text-muted-foreground text-lg">
                  Sign in with Internet Identity to begin your journaling journey.
                </p>
              </div>

              <Separator className="mb-8" />

              <div className="space-y-4">
                <Button
                  onClick={onLogin}
                  disabled={isLoggingIn}
                  className="w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                  size="lg"
                >
                  {isLoggingIn ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Connecting...
                    </>
                  ) : (
                    'Sign In with Internet Identity'
                  )}
                </Button>

                <p className="text-sm text-center text-muted-foreground">
                  New users will create an account • Existing users will log in
                </p>

                <div className="pt-4">
                  <p className="text-xs text-center text-muted-foreground">
                    Secure authentication powered by Internet Identity
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
