import { Suspense } from "react"
import { SiteHeader } from "@/components/site-header"
import BitcoinDCACalculator from "@/components/BitcoinDCACalculator"
import BitcoinEducation from "./components/BitcoinEducation"

export default function StackerLandingPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#FFA500]">Start Your Bitcoin Journey</h1>
        <p className="text-xl text-center mb-12 text-gray-300 max-w-2xl mx-auto">
          Discover the power of Dollar-Cost Averaging (DCA) with Bitcoin. Start small, invest regularly, and watch your
          savings grow over time.
        </p>
        <Suspense fallback={<div className="text-center">Loading DCA Calculator...</div>}>
          <BitcoinDCACalculator />
        </Suspense>
        <BitcoinEducation />
      </main>
    </div>
  )
}

