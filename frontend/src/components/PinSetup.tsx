import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Lock, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import { setPinHash } from '@/lib/pinSecurity';
import { AuthScreenLayout } from './auth/AuthScreenLayout';

interface PinSetupProps {
  onComplete: () => void;
  onSkip?: () => void;
}

export function PinSetup({ onComplete, onSkip }: PinSetupProps) {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'enter' | 'confirm'>('enter');

  const handlePinComplete = (value: string) => {
    if (step === 'enter') {
      setPin(value);
      setStep('confirm');
    } else {
      setConfirmPin(value);
      if (value === pin) {
        setPinHash(value);
        toast.success('PIN set successfully! 🎉');
        onComplete();
      } else {
        toast.error('PINs do not match. Please try again.');
        setPin('');
        setConfirmPin('');
        setStep('enter');
      }
    }
  };

  const handleSkip = () => {
    if (onSkip) {
      onSkip();
    } else {
      onComplete();
    }
  };

  return (
    <AuthScreenLayout
      icon={step === 'enter' ? <Lock className="w-8 h-8 text-primary" /> : <ShieldCheck className="w-8 h-8 text-primary" />}
      title={step === 'enter' ? '🔒 Set Your PIN' : '✅ Confirm Your PIN'}
      description={step === 'enter' ? 'Create a 4-digit PIN to secure your diary entries 🛡️' : 'Enter your PIN again to confirm'}
    >
      <div className="flex justify-center">
        <InputOTP
          maxLength={4}
          value={step === 'enter' ? pin : confirmPin}
          onChange={(value) => {
            if (step === 'enter') {
              setPin(value);
            } else {
              setConfirmPin(value);
            }
            if (value.length === 4) {
              handlePinComplete(value);
            }
          }}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      {step === 'enter' && (
        <Button
          variant="ghost"
          onClick={handleSkip}
          className="w-full"
        >
          Skip for now ⏭️
        </Button>
      )}

      {step === 'confirm' && (
        <Button
          variant="outline"
          onClick={() => {
            setPin('');
            setConfirmPin('');
            setStep('enter');
          }}
          className="w-full"
        >
          ← Back
        </Button>
      )}
    </AuthScreenLayout>
  );
}
