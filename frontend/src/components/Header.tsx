import { Button } from '@/components/ui/button';
import { BookOpen, History, TrendingUp, Settings, LogOut } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UiScaleSetting } from './UiScaleSetting';
import { PinSettings } from './PinSettings';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';

interface HeaderProps {
  activeView: 'write' | 'history' | 'insights';
  onViewChange: (view: 'write' | 'history' | 'insights') => void;
}

export function Header({ activeView, onViewChange }: HeaderProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { identity, clear } = useInternetIdentity();
  const queryClient = useQueryClient();

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  };

  const handleLogout = async () => {
    // Clear authentication session
    await clear();
    // Clear all cached queries
    queryClient.clear();
    // Redirect to homepage
    window.location.href = '/';
  };

  const isAuthenticated = !!identity && !identity.getPrincipal().isAnonymous();

  return (
    <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 max-w-5xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img
              src="/assets/generated/diary-icon-transparent.dim_64x64.png"
              alt="Diary"
              className="w-8 h-8"
            />
            <h1 className="text-xl font-bold">My Diary</h1>
          </div>

          <nav className="flex items-center gap-2">
            <Button
              variant={activeView === 'write' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('write')}
              className="gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Write</span>
            </Button>
            <Button
              variant={activeView === 'history' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('history')}
              className="gap-2"
            >
              <History className="w-4 h-4" />
              <span className="hidden sm:inline">History</span>
            </Button>
            <Button
              variant={activeView === 'insights' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onViewChange('insights')}
              className="gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span className="hidden sm:inline">Insights</span>
            </Button>

            <div className="ml-2 flex items-center gap-2 border-l pl-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="w-9 h-9"
              >
                {mounted && resolvedTheme === 'dark' ? (
                  <Sun className="h-4 w-4" />
                ) : (
                  <Moon className="h-4 w-4" />
                )}
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-9 h-9">
                    <Settings className="h-4 w-4" />
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Settings</DialogTitle>
                    <DialogDescription>
                      Customize your diary experience
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="max-h-[60vh]">
                    <div className="space-y-6 pr-4">
                      <UiScaleSetting />
                      <PinSettings />
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              {isAuthenticated && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleLogout}
                  className="w-9 h-9"
                  title="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              )}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
