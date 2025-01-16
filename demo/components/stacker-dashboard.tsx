'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useBitcoinPriceData } from '../hooks/useBitcoinPriceData'
import { DCAStoryChart } from './dca-story-chart'
import { LocalPriceChart } from './local-price-chart'
import { TradeHistory } from './trade-history'
import { DCADataBox } from './DCADataBox';
// Remove this line if it exists and MetricCard is not used elsewhere in the file
// import { MetricCard } from './metric-card';
import { Bell } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useMockDataService } from '../services/mockDataService'
import ModeToggle from './ModeToggle'

export function StackerDashboard() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false)
  const [showSats, setShowSats] = useState(false)
  const { priceData, isLoading } = useBitcoinPriceData()
  const router = useRouter()
  const { userData, saveUserProfile, saveTrade, exportTradesToCSV } = useMockDataService()

  const currentPrice = priceData[priceData.length - 1]?.price || 0

  const metrics = useMemo(() => {
    const totalInvested = userData?.trades.reduce((sum, trade) => sum + trade.amount * trade.price, 0) || 0
    const totalBtc = userData?.trades.reduce((sum, trade) => sum + (trade.type === 'BUY' ? trade.amount : -trade.amount), 0) || 0
    const currentValue = totalBtc * currentPrice
    const averagePrice = totalBtc > 0 ? totalInvested / totalBtc : 0
    const percentageReturn = totalInvested > 0 ? Math.round(((currentValue - totalInvested) / totalInvested) * 100) : 0

    return {
      totalInvested,
      totalBtc,
      currentValue,
      averagePrice,
      percentageReturn
    }
  }, [userData?.trades, currentPrice])

  const handleNewTrade = (type: 'BUY' | 'SELL', amount: number) => {
    saveTrade({
      date: new Date().toISOString(),
      type,
      amount,
      price: currentPrice,
    })
  }

  const toggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled)
  }

  const toggleBtcDenomination = () => {
    setShowSats(!showSats)
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  const weeklyPriceData = priceData.slice(-7)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-neutral-100">Stacker Dashboard</h1>
        <div className="flex gap-2">
          <ModeToggle 
            mode="dashboard" 
            setMode={(newMode) => {
              if (newMode === 'stacker') {
                router.push('/')
              }
            }} 
          />
        </div>
      </div>

      {/* Personal DCA Calculator Box */}
      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-neutral-100">PERSONAL DCA CALCULATOR BOX</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg p-4 mb-4">
            <DCAStoryChart data={priceData} userTrades={userData?.trades || []} />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <DCADataBox title="Total Invested" value={metrics.totalInvested} />
            <DCADataBox title="Current Value" value={metrics.currentValue} />
            <DCADataBox title="Total BTC" value={`₿${metrics.totalBtc.toFixed(8)}`} />
            <DCADataBox title="Avg Buy Price" value={metrics.averagePrice} />
            <DCADataBox title="Return" value={metrics.percentageReturn} isPercentage={true} />
          </div>
        </CardContent>
      </Card>

      {/* Buy The Dip Feature */}
      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-neutral-100">BUY THE DIP MONETIZABLE FEATURE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-transparent rounded-lg p-4 mb-4">
            <LocalPriceChart data={weeklyPriceData} />
          </div>
          <div className="flex gap-4">
            <Button
              variant="outline"
              className={`flex-1 ${
                notificationsEnabled ? 'bg-green-600' : 'bg-green-500'
              } text-neutral-100 hover:bg-green-600`}
              onClick={toggleNotifications}
            >
              <Bell className="w-4 h-4 mr-2" />
              GET PRICE ALERTS!
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold"
              onClick={() => handleNewTrade('BUY', 0.01)}
            >
              BUY THE DIP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card className="bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-neutral-100">TRANSACTION HISTORY</CardTitle>
        </CardHeader>
        <CardContent>
          <TradeHistory trades={userData?.trades.slice(-10) || []} />
          <Button 
            variant="outline"
            onClick={() => {
              const csvContent = exportTradesToCSV()
              const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
              const link = document.createElement("a")
              if (link.download !== undefined) {
                const url = URL.createObjectURL(blob)
                link.setAttribute("href", url)
                link.setAttribute("download", "trade_history.csv")
                link.style.visibility = 'hidden'
                document.body.appendChild(link)
                link.click()
                document.body.removeChild(link)
              }
            }}
            className="mt-4"
          >
            Export Trade History
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

