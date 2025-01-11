"use client"

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useBitcoinPriceData } from '../hooks/useBitcoinPriceData'
import { calculateDCA } from '../utils/dcaCalculations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import BitcoinEducation from '../components/bitcoin-education'
import Image from 'next/image'

export default function BitcoinDCACalculator() {
  const [weeklyAmount, setWeeklyAmount] = useState<number>(100)
  const [frequency, setFrequency] = useState<number>(2)
  const { priceData, isLoading, error } = useBitcoinPriceData()
  
  const dcaResults = useMemo(() => {
    if (priceData.length > 0) {
      return calculateDCA(priceData, weeklyAmount, frequency)
    }
    return []
  }, [priceData, weeklyAmount, frequency])

  const chartData = useMemo(() => {
    let totalInvested = 0
    return priceData.map((item, index) => {
      if (index % frequency === 0) {
        totalInvested += weeklyAmount
      }
      return {
        date: item.date,
        price: item.price,
        portfolioValue: dcaResults[index]?.portfolioValueUsd || null,
        invested: totalInvested
      }
    })
  }, [priceData, dcaResults, weeklyAmount, frequency])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      year: '2-digit'
    })
  }

  if (isLoading) return <div className="text-white">Loading price data...</div>
  if (error) return <div className="text-white">Error: {error}</div>

  const totalInvested = weeklyAmount * Math.floor(chartData.length / frequency)
  const currentValue = dcaResults[dcaResults.length - 1]?.portfolioValueUsd || 0
  const totalBtc = currentValue / chartData[chartData.length - 1].price
  const percentageGain = ((currentValue - totalInvested) / totalInvested) * 100

  return (
    <div className="dark bg-[#1C1C1C]">
      <div className="px-6 pt-6">
        <Card className="w-full max-w-4xl mx-auto bg-[#242424] border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Bitcoin Dollar Cost Average Calculator</CardTitle>
            <CardDescription className="text-gray-400">
              Calculate returns from {formatCurrency(weeklyAmount)} investments every {frequency} {frequency === 1 ? 'week' : 'weeks'} from 2020 to present
            </CardDescription>
          </CardHeader>
          <CardContent className="w-full max-w-4xl mx-auto px-4">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="w-full md:w-1/4 flex flex-col items-center md:items-start">
                  <div className="mb-6 flex items-center justify-center">
                    <Image
                      src="https://club-bink.trade/assets/bink_logo-DRnXuqb6.svg"
                      alt="Bink Logo"
                      width={200}
                      height={200}
                      className="dark:invert-0"
                    />
                  </div>
                  <div className="grid gap-4 w-full">
                    <div>
                      <Label htmlFor="weeklyAmount" className="text-gray-300">Weekly Investment (USD)</Label>
                      <Input
                        id="weeklyAmount"
                        type="number"
                        value={weeklyAmount}
                        onChange={(e) => setWeeklyAmount(Number(e.target.value))}
                        min={1}
                        className="bg-[#2A2A2A] border-gray-700 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency" className="text-gray-300">Investment Frequency (weeks)</Label>
                      <Input
                        id="frequency"
                        type="number"
                        value={frequency}
                        onChange={(e) => setFrequency(Number(e.target.value))}
                        min={1}
                        max={52}
                        className="bg-[#2A2A2A] border-gray-700 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-3/4">
                  {chartData.length > 0 && (
                    <div className="h-[400px] mt-6 md:mt-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={chartData}
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={formatDate}
                            interval={Math.floor(chartData.length / 8)}
                            angle={0}
                            textAnchor="middle"
                            stroke="#666666"
                          />
                          <YAxis 
                            yAxisId="left"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            stroke="#666666"
                          />
                          <YAxis 
                            yAxisId="right" 
                            orientation="right"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            stroke="#666666"
                          />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: '#1C1C1C',
                              border: '1px solid #333333',
                              borderRadius: '8px',
                              padding: '12px'
                            }}
                            itemStyle={(entry: any) => ({
                              color: entry.dataKey === 'price' ? '#ff9900' : 
                                     entry.dataKey === 'portfolioValue' ? '#00ff00' : '#0066cc'
                            })}
                            formatter={(value: number, name: string) => [
                              new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2
                              }).format(value),
                              ''
                            ]}
                            labelFormatter={(label) => new Date(label).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          />
                          <Legend />
                          <Line 
                            yAxisId="left" 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#ff9900" 
                            name="BTC Price" 
                            dot={false}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="portfolioValue" 
                            stroke="#00ff00" 
                            name="Portfolio Value" 
                            dot={false}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="invested" 
                            stroke="#0066cc" 
                            name="Total Invested" 
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-[#2A2A2A] border border-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Total Invested</h4>
                  <p className="text-xl md:text-2xl font-bold text-white">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="p-4 bg-[#2A2A2A] border border-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Current Value</h4>
                  <p className="text-xl md:text-2xl font-bold text-white">{formatCurrency(currentValue)}</p>
                </div>
                <div className="p-4 bg-[#2A2A2A] border border-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Total BTC</h4>
                  <p className="text-xl md:text-2xl font-bold text-white">{totalBtc.toFixed(8)} BTC</p>
                </div>
                <div className="p-4 bg-[#2A2A2A] border border-gray-800 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Return</h4>
                  <p className="text-xl md:text-2xl font-bold" style={{ color: percentageGain >= 0 ? '#00ff00' : '#ff4444' }}>
                    {percentageGain.toFixed(2)}%
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      <BitcoinEducation />
    </div>
  )
}

