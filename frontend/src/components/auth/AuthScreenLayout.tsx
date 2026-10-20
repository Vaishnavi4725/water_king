import { ReactNode } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthScreenLayoutProps {
  icon: ReactNode;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

export function AuthScreenLayout({
  icon,
  title,
  description,
  children,
  className = '',
}: AuthScreenLayoutProps) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] py-8">
      <Card className={`w-full max-w-md shadow-2xl rounded-3xl bg-gradient-to-br from-card via-muted/10 to-card backdrop-blur-sm border-2 hover:shadow-3xl transition-shadow duration-300 ${className}`}>
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-primary/30 via-accent/20 to-primary/10 flex items-center justify-center shadow-lg">
            {icon}
          </div>
          <div>
            <CardTitle className="text-2xl mb-2">{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
        </CardContent>
      </Card>
    </div>
  );
}
