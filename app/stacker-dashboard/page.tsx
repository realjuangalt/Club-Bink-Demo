"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StackerDCAProgress } from "@/components/StackerDCAProgress"
import { Switch } from "@/components/ui/switch"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function StackerDashboard() {
  const router = useRouter()
  const [isLogScale, setIsLogScale] = useState(false)

  const toggleScale = () => {
    setIsLogScale(!isLogScale)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Stacker Dashboard</h1>

        <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg mb-8">
          <CardHeader>
            <div className="flex justify-between items-center mb-4">
              <CardTitle className="text-2xl text-[#FFA500]">Your Bitcoin DCA Journey</CardTitle>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-400">Linear</span>
                <Switch
                  checked={isLogScale}
                  onCheckedChange={toggleScale}
                  className="data-[state=checked]:bg-[#FFA500]"
                />
                <span className="text-sm text-gray-400">Log</span>
              </div>
            </div>
            <CardDescription className="text-gray-400">Track your investment progress over time</CardDescription>
          </CardHeader>
          <CardContent>
            <StackerDCAProgress isLogScale={isLogScale} showChart={true} />
          </CardContent>
        </Card>

        <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-[#FFA500]">Purchase History</CardTitle>
            <CardDescription className="text-gray-400">Your recent Bitcoin purchases</CardDescription>
          </CardHeader>
          <CardContent>
            <StackerDCAProgress showPurchaseHistory={true} showChart={false} showMetrics={false} />
          </CardContent>
        </Card>

        <div className="text-center mt-8">
          <Button className="bg-[#FFA500] text-black hover:bg-[#FF9000]" onClick={() => router.push("/demo-end")}>
            Schedule Next DCA Trade
          </Button>
        </div>
      </main>
    </div>
  )
}

