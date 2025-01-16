"use client"

import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { ArrowDown, ArrowUp } from 'lucide-react'

interface MetricCardProps {
  title: string
  value: number | string
  trend?: 'up' | 'down'
  isBtcValue?: boolean
}

export function MetricCard({ title, value, trend, isBtcValue = false }: MetricCardProps) {
  const [showSats, setShowSats] = useState(false)

  const toggleDenomination = () => {
    if (isBtcValue) {
      setShowSats(!showSats)
    }
  }

  const formatValue = () => {
    if (typeof value === 'number') {
      if (isBtcValue) {
        return showSats
          ? `${Math.round(value * 100000000).toLocaleString()} sats`
          : value.toFixed(8);
      }
      if (title.toLowerCase().includes('total btc')) {
        return value.toFixed(8);
      }
      if (title.toLowerCase().includes('return')) {
        return `${Math.round(Number(value))}%`;
      }
      // For all other numeric values, round to the nearest integer
      return Math.round(value).toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 });
    }
    return value;
  }

  return (
    <Card 
      className={`bg-neutral-800 border-neutral-700 ${isBtcValue ? 'relative overflow-hidden' : ''}`}
    >
      {isBtcValue && (
        <div 
          className="absolute top-2 right-2 bg-neutral-700 rounded-full p-1 cursor-pointer"
          onClick={toggleDenomination}
        >
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${showSats ? 'bg-orange-500' : 'bg-blue-500'}`}>
            {showSats ? 'SATS' : 'BTC'}
          </div>
        </div>
      )}
      <CardContent className="pt-6">
        <div className="text-sm font-medium text-neutral-400">
          {title.toLowerCase().includes('total invested') ? 'Total Invested' : 
           title.toLowerCase().includes('total btc') ? 'Total BTC' : title}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span 
            className={`text-2xl font-bold ${title.toLowerCase().includes('return') ? 'text-green-400' : 'text-neutral-100'}`}
            title={typeof value === 'number' ? value.toFixed(2) : value}
          >
            {title.toLowerCase().includes('total btc') && '₿'}{formatValue()}
          </span>
          {trend && (
            <span className={`ml-2 ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
              {trend === 'up' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

