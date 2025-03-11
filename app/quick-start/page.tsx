"use client"

import { SiteHeader } from "@/components/site-header"
import QuickStartDCACalc from "@/components/QuickStartDCACalc"
import { OneClickScheduler } from "./components/one-click-scheduler"

export default function QuickStartPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#FFA500]">
          Quick Start Your Bitcoin Journey
        </h1>
        <p className="text-xl text-center mb-12 text-gray-300 max-w-2xl mx-auto">
          Calculate your potential returns and schedule regular Bitcoin trades with trusted friends in minutes.
        </p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">See How DCA Works</h2>
            <QuickStartDCACalc />
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Schedule Your First Trade</h2>
            <OneClickScheduler />
          </section>
        </div>
      </main>
    </div>
  )
}

