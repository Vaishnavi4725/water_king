import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Lock, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { verifyPin } from '@/lib/pinSecurity';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AuthScreenLayout } from './auth/AuthScreenLayout';

interface PinVerificationProps {
  onVerified: () => void;
}

export function PinVerification({ onVerified }: PinVerificationProps) {
  const [pin, setPin] = useState('');
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 5;

  const handlePinComplete = (value: string) => {
    if (verifyPin(value)) {
      toast.success('PIN verified! 🎉');
      onVerified();
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      setPin('');
      
      if (newAttempts >= maxAttempts) {
        toast.error('Too many failed attempts. Please refresh and try again.');
      } else {
        toast.error(`Incorrect PIN. ${maxAttempts - newAttempts} attempts remaining.`);
      }
    }
  };

  return (
    <AuthScreenLayout
      icon={<Lock className="w-8 h-8 text-primary" />}
      title="🔐 Enter Your PIN"
      description="Enter your 4-digit PIN to access your diary"
    >
      {attempts > 0 && attempts < maxAttempts && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Incorrect PIN. {maxAttempts - attempts} attempts remaining.
          </AlertDescription>
        </Alert>
      )}

      {attempts >= maxAttempts && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Too many failed attempts. Please refresh the page to try again.
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-center">
        <InputOTP
          maxLength={4}
          value={pin}
          onChange={(value) => {
            setPin(value);
            if (value.length === 4) {
              handlePinComplete(value);
            }
          }}
          disabled={attempts >= maxAttempts}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button
        variant="outline"
        onClick={() => window.location.reload()}
        className="w-full"
      >
        🔄 Refresh Page
      </Button>
    </AuthScreenLayout>
  );
}
