'use client'

import BitcoinDCACalculator from '../components/bitcoin-dca-calculator'
import { LanguageProvider } from '../contexts/LanguageContext'
import { useState } from 'react';

export default function Home() {
  const [mode, setMode] = useState<'stacker' | 'evangelist'>('stacker');

  return (
    <LanguageProvider>
      <main className="min-h-screen bg-[#1C1C1C]">
        {mode === 'stacker' ? (
          <BitcoinDCACalculator initialMode={mode} setMode={setMode} />
        ) : (
          // TODO: Implement Evangelist page
          <div className="text-white p-4">Evangelist page coming soon!</div>
        )}
      </main>
    </LanguageProvider>
  )
}

