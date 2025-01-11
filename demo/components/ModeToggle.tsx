import React from 'react';
import { Button } from "@/components/ui/button";
import { useTranslation } from '../hooks/useTranslation';

interface ModeToggleProps {
  mode: 'stacker' | 'evangelist';
  setMode: (mode: 'stacker' | 'evangelist') => void;
}

const ModeToggle: React.FC<ModeToggleProps> = ({ mode, setMode }) => {
  const { t } = useTranslation();

  const toggleMode = () => {
    setMode(mode === 'stacker' ? 'evangelist' : 'stacker');
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={toggleMode}
      className="bg-gray-700 text-gray-300 hover:bg-blue-600 hover:text-white"
    >
      {mode === 'stacker' ? t('stacker') : t('evangelist')}
    </Button>
  );
};

export default ModeToggle;

