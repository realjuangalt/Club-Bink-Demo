'use client'

import { useEffect } from 'react'
import BitcoinDCACalculator from '../components/bitcoin-dca-calculator'
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch('/dashboard')
  }, [router])

  return (
    <BitcoinDCACalculator initialMode="stacker" setMode={(mode) => {
      if (mode === 'dashboard') {
        router.push('/dashboard')
      }
    }} />
  )
}

