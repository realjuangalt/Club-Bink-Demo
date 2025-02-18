"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { useBitcoinPriceData } from "@/app/stacker-landing/hooks/useBitcoinPriceData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import bitcoinPriceData from "@/data/btcusd-weekly-price-historical.json"
import { Switch } from "@/components/ui/switch"

export default function BitcoinDCACalculator() {
  const [weeklyAmount, setWeeklyAmount] = useState<string>("100")
  const [frequency, setFrequency] = useState<string>("2") // Update 1: Changed initial frequency to "2"
  const [timeRange, setTimeRange] = useState<number>(48) // Default to 48 weeks initially
  const [isLogScale, setIsLogScale] = useState(false) // Update 3: Changed initial state to false
  const { priceData, isLoading, error } = useBitcoinPriceData(bitcoinPriceData)
  const router = useRouter()

  useEffect(() => {
    if (priceData.length > 0) {
      const targetDate = new Date("2021-04-16")
      const endDate = new Date(priceData[priceData.length - 1].date)
      const diffTime = Math.abs(endDate.getTime() - targetDate.getTime())
      const diffWeeks = Math.ceil(diffTime / (1000 * 60 * 60 * 24 * 7))
      setTimeRange(Math.min(diffWeeks, priceData.length))
    }
  }, [priceData])

  const maxTimeRange = priceData.length
  const startDate = priceData.length > 0 ? new Date(priceData[0].date) : new Date()
  const endDate = priceData.length > 0 ? new Date(priceData[priceData.length - 1].date) : new Date()
  const totalMonths =
    priceData.length > 0
      ? (endDate.getFullYear() - startDate.getFullYear()) * 12 + endDate.getMonth() - startDate.getMonth() + 1
      : 0

  const formatTimeRange = (months: number) => {
    const years = Math.floor(months / 12)
    const remainingMonths = months % 12
    if (years === 0) return `${months} month${months !== 1 ? "s" : ""}`
    if (remainingMonths === 0) return `${years} year${years !== 1 ? "s" : ""}`
    return `${years} year${years !== 1 ? "s" : ""} ${remainingMonths} month${remainingMonths !== 1 ? "s" : ""}`
  }

  const chartData = useMemo(() => {
    if (priceData.length === 0) return []

    const weeklyAmountNum = Number.parseFloat(weeklyAmount) || 0
    const frequencyNum = Number.parseInt(frequency) || 1

    // Calculate the start index based on the time range
    const startIndex = priceData.length - timeRange

    let totalInvested = 0
    let totalBtc = 0

    return priceData.slice(startIndex).map((item, index) => {
      if (index % frequencyNum === 0) {
        totalInvested += weeklyAmountNum
        totalBtc += weeklyAmountNum / item.price
      }

      const portfolioValue = totalBtc * item.price

      return {
        date: item.date,
        price: item.price,
        portfolioValue: portfolioValue,
        invested: totalInvested,
      }
    })
  }, [priceData, weeklyAmount, frequency, timeRange])

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatCurrency = (value: number, decimals = 2) => {
    // Update 4
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(value)
  }

  if (priceData.length === 0) {
    return <div className="text-center">No price data available</div>
  }
  if (isLoading) return <div className="text-center">Loading...</div>
  if (error) return <div className="text-center text-red-500">Error: {error}</div>

  const lastDataPoint = chartData[chartData.length - 1] || { invested: 0, portfolioValue: 0, price: 0 }
  const totalInvested = lastDataPoint.invested
  const currentValue = lastDataPoint.portfolioValue
  const totalBtc = currentValue / lastDataPoint.price
  const percentageGain = totalInvested > 0 ? ((currentValue - totalInvested) / totalInvested) * 100 : 0

  return (
    <Card className="w-full mx-auto bg-[#1E1E1E] border-gray-700 shadow-lg mb-16 max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] rounded-b-lg">
      <div className="bg-[#FFA500] text-black py-4 px-6 rounded-t-lg">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Welcome to Club Bink</h1>
      </div>
      <CardHeader className="pt-6">
        <CardTitle className="text-2xl md:text-3xl text-[#FFA500]">Bitcoin DCA Calculator</CardTitle>
        <CardDescription className="text-sm md:text-base text-gray-400">
          Calculate your potential returns by investing regularly in Bitcoin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="weeklyAmount" className="text-sm md:text-base text-gray-300">
              Weekly Investment (USD)
            </Label>
            <Input
              id="weeklyAmount"
              type="number"
              value={weeklyAmount}
              onChange={(e) => setWeeklyAmount(e.target.value)}
              className="bg-[#2A2A2A] border-gray-600 text-white text-sm md:text-base p-2 md:p-3"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="frequency" className="text-sm md:text-base text-gray-300">
              Investment Frequency (weeks)
            </Label>
            <Input
              id="frequency"
              type="number"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
              min={1}
              step={1} // Update 2: Added step={1}
              className="bg-[#2A2A2A] border-gray-600 text-white text-sm md:text-base p-2 md:p-3"
            />
          </div>
        </div>
        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                scale={isLogScale ? "log" : "linear"} // Update 4
                domain={["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                scale={isLogScale ? "log" : "linear"} // Update 4
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2A2A",
                  border: "1px solid #333333",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [formatCurrency(value), ""]}
                labelFormatter={(label) => formatDate(label as string)}
                labelStyle={{ color: "#FFA500" }}
              />
              <Legend wrapperStyle={{ fontSize: "12px" }} />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="price"
                stroke="#FFA500"
                name="BTC Price"
                dot={false}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="portfolioValue"
                stroke="#00FF00"
                name="Portfolio Value"
                dot={false}
                strokeWidth={2}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="invested"
                stroke="#4A90E2"
                name="Total Invested"
                dot={false}
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2">
          <Label htmlFor="timeRange" className="text-sm md:text-base text-gray-300">
            Time Range: {formatTimeRange(Math.ceil((timeRange * totalMonths) / maxTimeRange))}
          </Label>
          <Slider
            id="timeRange"
            min={1}
            max={maxTimeRange}
            step={1}
            value={[timeRange]}
            onValueChange={(value) => setTimeRange(value[0])}
            className="w-full"
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Invested", value: formatCurrency(totalInvested, 0) }, // Update 1
            { label: "Current Value", value: formatCurrency(currentValue, 0) }, // Update 1
            { label: "Total BTC", value: `${totalBtc.toFixed(6)} BTC` }, // Update 2
            {
              label: "Return",
              value: `${Math.round(percentageGain)}%`, // Update 3
              color: percentageGain >= 0 ? "text-green-500" : "text-red-500",
            },
          ].map((item, index) => (
            <div key={index} className="bg-[#2A2A2A] p-3 md:p-4 rounded-lg">
              <h4 className="text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">{item.label}</h4>
              <p className={`text-base md:text-lg lg:text-xl font-bold ${item.color || ""}`}>{item.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center">
          <Button
            onClick={() => router.push("/stacker-sign-up")}
            className="bg-[#FFA500] text-black hover:bg-[#FF9000] text-xl py-6 px-12"
          >
            Sign Up Now
          </Button>
        </div>
        <div className="flex items-center justify-end space-x-2 mt-4">
          <span className="text-sm text-gray-400">Linear</span>
          <Switch
            checked={!isLogScale}
            onCheckedChange={(checked) => setIsLogScale(!checked)}
            className="data-[state=unchecked]:bg-[#2A2A2A] data-[state=checked]:bg-[#FFA500]"
          />
          <span className="text-sm text-gray-400">Log</span>
        </div>
      </CardContent>
    </Card>
  )
}

