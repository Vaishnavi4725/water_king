import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Lock, Trash2, Edit } from 'lucide-react';
import { toast } from 'sonner';
import { isPinSet, setPinHash, removePinHash, verifyPin } from '@/lib/pinSecurity';

export function PinSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'set' | 'change' | 'remove'>('set');
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [step, setStep] = useState<'current' | 'new' | 'confirm'>('current');

  const hasPinSet = isPinSet();

  const resetState = () => {
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setStep('current');
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      resetState();
    }
  };

  const handleSetPin = () => {
    setMode('set');
    setStep('new');
    setIsOpen(true);
  };

  const handleChangePin = () => {
    setMode('change');
    setStep('current');
    setIsOpen(true);
  };

  const handleRemovePin = () => {
    setMode('remove');
    setStep('current');
    setIsOpen(true);
  };

  const handlePinInput = (value: string, type: 'current' | 'new' | 'confirm') => {
    if (type === 'current') {
      setCurrentPin(value);
      if (value.length === 4) {
        if (verifyPin(value)) {
          if (mode === 'remove') {
            removePinHash();
            toast.success('PIN removed successfully!');
            handleOpenChange(false);
          } else {
            setStep('new');
          }
        } else {
          toast.error('Incorrect PIN');
          setCurrentPin('');
        }
      }
    } else if (type === 'new') {
      setNewPin(value);
      if (value.length === 4) {
        setStep('confirm');
      }
    } else if (type === 'confirm') {
      setConfirmPin(value);
      if (value.length === 4) {
        if (value === newPin) {
          setPinHash(value);
          toast.success(mode === 'set' ? 'PIN set successfully!' : 'PIN changed successfully!');
          handleOpenChange(false);
        } else {
          toast.error('PINs do not match');
          setNewPin('');
          setConfirmPin('');
          setStep('new');
        }
      }
    }
  };

  const getDialogTitle = () => {
    if (mode === 'remove') return 'Remove PIN';
    if (mode === 'change') {
      if (step === 'current') return 'Enter Current PIN';
      if (step === 'new') return 'Enter New PIN';
      return 'Confirm New PIN';
    }
    if (step === 'new') return 'Set Your PIN';
    return 'Confirm Your PIN';
  };

  const getDialogDescription = () => {
    if (mode === 'remove') return 'Enter your current PIN to remove it';
    if (mode === 'change' && step === 'current') return 'Enter your current PIN to change it';
    if (step === 'new') return 'Create a 4-digit PIN';
    return 'Enter your PIN again to confirm';
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="w-5 h-5" />
            PIN Security
          </CardTitle>
          <CardDescription>
            {hasPinSet
              ? 'Your diary is protected with a PIN'
              : 'Add a PIN to secure your diary entries'}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {!hasPinSet ? (
            <Button onClick={handleSetPin} className="w-full gap-2">
              <Lock className="w-4 h-4" />
              Set PIN
            </Button>
          ) : (
            <div className="flex gap-2">
              <Button onClick={handleChangePin} variant="outline" className="flex-1 gap-2">
                <Edit className="w-4 h-4" />
                Change PIN
              </Button>
              <Button onClick={handleRemovePin} variant="outline" className="flex-1 gap-2">
                <Trash2 className="w-4 h-4" />
                Remove PIN
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center py-6">
            <InputOTP
              maxLength={4}
              value={
                step === 'current'
                  ? currentPin
                  : step === 'new'
                  ? newPin
                  : confirmPin
              }
              onChange={(value) => handlePinInput(value, step)}
            >
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
              </InputOTPGroup>
            </InputOTP>
          </div>
          {step !== 'current' && (
            <Button
              variant="outline"
              onClick={() => {
                if (step === 'confirm') {
                  setConfirmPin('');
                  setStep('new');
                } else {
                  setNewPin('');
                  setStep(mode === 'change' ? 'current' : 'new');
                }
              }}
            >
              Back
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
