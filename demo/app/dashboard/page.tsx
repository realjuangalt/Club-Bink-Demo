'use client'

import { StackerDashboard } from '@/components/stacker-dashboard'
import { useRouter } from 'next/navigation'

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#1C1C1C]">
      <div className="p-4 md:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900 shadow-sm">
            <div className="p-4 md:p-6 lg:p-8">
              <StackerDashboard 
                mode="dashboard"
                setMode={(mode) => {
                  if (mode === 'stacker') {
                    router.push('/')
                  }
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

