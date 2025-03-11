"use client"

import { useState, useMemo, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useBitcoinPriceData } from "@/app/stacker-landing/hooks/useBitcoinPriceData"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import bitcoinPriceData from "@/data/btcusd-weekly-price-historical.json"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"

export interface DCAValues {
  weeklyAmount: string
  frequency: number
}

interface QuickStartDCACalcProps {
  onValuesChange?: (values: DCAValues) => void
}

export default function QuickStartDCACalc({ onValuesChange }: QuickStartDCACalcProps) {
  const [weeklyAmount, setWeeklyAmount] = useState<string>("100")
  const [frequency, setFrequency] = useState<string>("2")
  const [timeRange, setTimeRange] = useState<number>(48)
  const [isLogScale, setIsLogScale] = useState(false)
  const { priceData, isLoading, error } = useBitcoinPriceData(bitcoinPriceData)

  // Notify parent component when values change
  useEffect(() => {
    if (onValuesChange) {
      onValuesChange({
        weeklyAmount,
        frequency: Number(frequency),
      })
    }
  }, [weeklyAmount, frequency, onValuesChange])

  const chartData = useMemo(() => {
    if (priceData.length === 0) return []

    const weeklyAmountNum = Number.parseFloat(weeklyAmount) || 0
    const frequencyNum = Number.parseInt(frequency) || 1

    const startIndex = priceData.length - timeRange

    let totalInvested = 0
    let totalBtc = 0

    return priceData.slice(startIndex).map((item, index) => {
      if (index % frequencyNum === 0) {
        totalInvested += weeklyAmountNum
        totalBtc += weeklyAmountNum / item.price
      }

      return {
        date: item.date,
        price: item.price,
        portfolioValue: totalBtc * item.price,
        invested: totalInvested,
      }
    })
  }, [priceData, weeklyAmount, frequency, timeRange])

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
        <h1 className="text-2xl md:text-3xl font-bold text-center">Bitcoin DCA Calculator</h1>
      </div>
      <CardHeader className="pt-6">
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
              step={1}
              className="bg-[#2A2A2A] border-gray-600 text-white text-sm md:text-base p-2 md:p-3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="timeRange" className="text-sm md:text-base text-gray-300">
            Time Range: {Math.ceil(timeRange)} weeks
          </Label>
          <Slider
            id="timeRange"
            min={1}
            max={priceData.length}
            step={1}
            value={[timeRange]}
            onValueChange={(value) => setTimeRange(value[0])}
            className="w-full"
          />
        </div>

        <div className="h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
              <XAxis
                dataKey="date"
                tickFormatter={(date) => new Date(date).toLocaleDateString()}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                interval="preserveStartEnd"
              />
              <YAxis
                yAxisId="left"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                scale={isLogScale ? "log" : "linear"}
                domain={["auto", "auto"]}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                tickFormatter={(value) => `$${value.toLocaleString()}`}
                stroke="#666666"
                tick={{ fontSize: 12 }}
                scale={isLogScale ? "log" : "linear"}
                domain={["auto", "auto"]}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2A2A2A",
                  border: "1px solid #333333",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value: number) => [`$${value.toLocaleString()}`, ""]}
                labelFormatter={(label) => new Date(label as string).toLocaleDateString()}
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

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: "Total Invested", value: `$${Math.round(totalInvested).toLocaleString()}` },
            { label: "Current Value", value: `$${Math.round(currentValue).toLocaleString()}` },
            { label: "Total BTC", value: `${totalBtc.toFixed(8)} BTC` },
            {
              label: "Return",
              value: `${Math.round(percentageGain)}%`,
              color: percentageGain >= 0 ? "text-green-500" : "text-red-500",
            },
          ].map((item, index) => (
            <div key={index} className="bg-[#2A2A2A] p-3 md:p-4 rounded-lg">
              <h4 className="text-xs md:text-sm font-medium text-gray-400 mb-1 md:mb-2">{item.label}</h4>
              <p className={`text-base md:text-lg lg:text-xl font-bold ${item.color || ""}`}>{item.value}</p>
            </div>
          ))}
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

