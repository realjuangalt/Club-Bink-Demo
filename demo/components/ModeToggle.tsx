import React from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation'

interface ModeToggleProps {
  mode: 'stacker' | 'dashboard';
  setMode: (mode: 'stacker' | 'dashboard') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  const router = useRouter()

  const toggleMode = () => {
    const newMode = mode === 'stacker' ? 'dashboard' : 'stacker';
    setMode(newMode);
    if (newMode === 'dashboard') {
      router.push('/dashboard');
    } else {
      router.push('/');
    }
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMode}
      className="bg-neutral-700 text-neutral-200 hover:bg-primary-300 hover:text-white"
    >
      {mode === 'stacker' ? 'Dashboard' : 'Stacker'}
    </Button>
  );
};

export default ModeToggle;

