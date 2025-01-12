import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from "@/components/ui/button"
import { GlobeIcon } from 'lucide-react'

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  const languages = ['en', 'es', 'de'] as const;

  const handleLanguageToggle = () => {
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLanguageToggle}
      className="bg-neutral-700 text-neutral-200 hover:bg-primary-300 hover:text-white"
    >
      <GlobeIcon className="w-4 h-4 mr-2" />
      {language.toUpperCase()}
    </Button>
  );
};

export default LanguageSwitcher;

