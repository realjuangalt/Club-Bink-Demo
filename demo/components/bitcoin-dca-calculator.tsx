"use client"

import { useState, useMemo, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useBitcoinPriceData } from '../hooks/useBitcoinPriceData'
import { calculateDCA } from '../utils/dcaCalculations'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import BitcoinEducation from './bitcoin-education'
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'
import LanguageSwitcher from './LanguageSwitcher'
import ModeToggle from './ModeToggle';

interface BitcoinDCACalculatorProps {
  initialMode: 'stacker' | 'evangelist';
  setMode: (mode: 'stacker' | 'evangelist') => void;
}

export default function BitcoinDCACalculator({ initialMode, setMode }: BitcoinDCACalculatorProps) {
  const [weeklyAmount, setWeeklyAmount] = useState<number>(100)
  const [frequency, setFrequency] = useState<number>(2)
  const [mode, setLocalMode] = useState<'stacker' | 'evangelist'>(initialMode);
  const { language } = useLanguage()
  const { t } = useTranslation()
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

  const handleFrequencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setFrequency(value);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat(language, {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatDate = (date: string) => {
    const d = new Date(date)
    return d.toLocaleDateString(language, {
      month: 'short',
      year: '2-digit'
    })
  }

  useEffect(() => {
    setMode(mode);
  }, [mode, setMode]);

  if (isLoading) return <div className="text-neutral-100">{t('loading')}</div>
  if (error) return <div className="text-neutral-100">{t('error', { message: error })}</div>

  const totalInvested = weeklyAmount * Math.floor(chartData.length / frequency)
  const currentValue = dcaResults[dcaResults.length - 1]?.portfolioValueUsd || 0
  const totalBtc = currentValue / chartData[chartData.length - 1].price
  const percentageGain = ((currentValue - totalInvested) / totalInvested) * 100

  return (
    <div className="dark bg-neutral-900">
      <div className="px-6 pt-6">
        <Card className="w-full max-w-4xl mx-auto bg-neutral-800 border-neutral-700 mt-8 relative">
          <CardHeader>
            <div className="absolute top-4 right-4 flex gap-2">
              <ModeToggle mode={mode} setMode={setLocalMode} />
              <LanguageSwitcher />
            </div>
            <CardTitle className="text-neutral-100">{t('title')}</CardTitle>
            <CardDescription className="text-neutral-300">
              {t('description', { 
                amount: formatCurrency(weeklyAmount), 
                frequency: frequency, 
                frequencyUnit: frequency === 1 ? t('week') : t('weeks')
              })}
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
                      <Label htmlFor="weeklyAmount" className="text-neutral-200">{t('weeklyInvestment')}</Label>
                      <Input
                        id="weeklyAmount"
                        type="number"
                        value={weeklyAmount}
                        onChange={(e) => setWeeklyAmount(Number(e.target.value))}
                        onBlur={(e) => {
                          const value = Number(e.target.value);
                          setWeeklyAmount(Math.max(10, Math.round(value / 10) * 10));
                        }}
                        min={10}
                        step={10}
                        className="bg-neutral-700 border-neutral-700 text-neutral-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="frequency" className="text-neutral-200">{t('investmentFrequency')}</Label>
                      <Input
                        id="frequency"
                        type="number"
                        value={frequency}
                        onChange={handleFrequencyChange}
                        min={1}
                        max={52}
                        className="bg-neutral-700 border-neutral-700 text-neutral-100"
                      />
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-3/4">
                  {chartData.length > 0 && (
                    <div className="h-[300px] sm:h-[400px] mt-6 md:mt-0">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={chartData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                          <XAxis 
                            dataKey="date" 
                            tickFormatter={formatDate}
                            interval={Math.floor(chartData.length / 6)}
                            angle={-45}
                            textAnchor="end"
                            height={50}
                            stroke="#666666"
                            tick={{ fontSize: 12 }}
                          />
                          <YAxis 
                            yAxisId="left"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            stroke="#666666"
                            tick={{ fontSize: 12 }}
                            width={45}
                          />
                          <YAxis 
                            yAxisId="right" 
                            orientation="right"
                            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                            stroke="#666666"
                            tick={{ fontSize: 12 }}
                            width={45}
                          />
                          <Tooltip
                            contentStyle={{ 
                              backgroundColor: '#1C1C1C',
                              border: '1px solid #333333',
                              borderRadius: '8px',
                              padding: '12px'
                            }}
                            itemStyle={(entry: any) => ({
                              color: entry.dataKey === 'price' ? '#FFA500' : 
                                     entry.dataKey === 'portfolioValue' ? '#00FF00' : '#0066cc'
                            })}
                            formatter={(value: number, name: string) => [
                              new Intl.NumberFormat(language, {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 0,
                                maximumFractionDigits: 0
                              }).format(value),
                              ''
                            ]}
                            labelFormatter={(label) => new Date(label).toLocaleDateString(language, {
                              year: 'numeric',
                              month: 'short'
                            })}
                          />
                          <Legend 
                            verticalAlign="top" 
                            height={36}
                            wrapperStyle={{
                              paddingTop: '10px',
                              fontSize: '12px'
                            }}
                          />
                          <Line 
                            yAxisId="left" 
                            type="monotone" 
                            dataKey="price" 
                            stroke="#FFA500" 
                            name={t('btcPrice')}
                            dot={false}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="portfolioValue" 
                            stroke="#00FF00" 
                            name={t('portfolioValue')}
                            dot={false}
                          />
                          <Line 
                            yAxisId="right" 
                            type="monotone" 
                            dataKey="invested" 
                            stroke="#0066cc" 
                            name={t('totalInvestedChart')}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-neutral-700 border border-neutral-700 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">{t('totalInvested')}</h4>
                  <p className="text-xl md:text-2xl font-bold text-neutral-100">{formatCurrency(totalInvested)}</p>
                </div>
                <div className="p-4 bg-neutral-700 border border-neutral-700 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">{t('currentValue')}</h4>
                  <p className="text-xl md:text-2xl font-bold text-neutral-100">{formatCurrency(currentValue)}</p>
                </div>
                <div className="p-4 bg-neutral-700 border border-neutral-700 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">{t('totalBTC')}</h4>
                  <p className="text-xl md:text-2xl font-bold text-neutral-100">{totalBtc.toFixed(8)} BTC</p>
                </div>
                <div className="p-4 bg-neutral-700 border border-neutral-700 rounded-lg">
                  <h4 className="text-sm font-medium text-neutral-300 mb-2">{t('return')}</h4>
                  <p className="text-xl md:text-2xl font-bold" style={{ color: percentageGain >= 0 ? 'text-success-200' : '#ff4444' }}>
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

