'use client'

import { useMemo } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { format, subYears } from 'date-fns'

interface Trade {
  date: string
  type: string
  amount: number
  price: number
}

interface DCAStoryChartProps {
  data: Array<{ date: string; price: number }>
  userTrades: Trade[]
}

export function DCAStoryChart({ data, userTrades }: DCAStoryChartProps) {
  const chartData = useMemo(() => {
    let cumulativeInvestment = 0
    let cumulativeBitcoin = 0
    
    // Determine the start date (1 year before the first transaction or current date)
    const startDate = userTrades.length > 0
      ? subYears(new Date(userTrades[0].date), 1)
      : subYears(new Date(), 1)

    // Filter data to start from the determined start date
    const filteredData = data.filter(dataPoint => new Date(dataPoint.date) >= startDate)
    
    return filteredData.map(dataPoint => {
      const date = new Date(dataPoint.date)
      const relevantTrades = userTrades.filter(trade => new Date(trade.date) <= date)
      
      cumulativeInvestment = relevantTrades.reduce((sum, trade) => sum + trade.amount * trade.price, 0)
      cumulativeBitcoin = relevantTrades.reduce((sum, trade) => sum + (trade.type === 'BUY' ? trade.amount : -trade.amount), 0)
      
      const portfolioValue = cumulativeBitcoin * dataPoint.price
      const averagePurchasePrice = cumulativeBitcoin > 0 ? cumulativeInvestment / cumulativeBitcoin : 0

      return {
        date: dataPoint.date,
        price: dataPoint.price,
        investment: cumulativeInvestment,
        portfolioValue: portfolioValue,
        averagePurchasePrice: averagePurchasePrice
      }
    })
  }, [data, userTrades])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value)
  }

  const formatDate = (date: string) => {
    return format(new Date(date), 'MMM yyyy')
  }

  return (
    <div className="h-[320px]">
      <ResponsiveContainer width="100%" height="100%" className="mb-4">
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#666666"
            interval="preserveStartEnd"
            minTickGap={50}
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
              padding: '8px',
              fontSize: '11px'
            }}
            formatter={(value: number) => [
              formatCurrency(value),
              ''  // Remove label since colors match the legend
            ]}
            labelFormatter={(label) => formatDate(label.toString())}
          />
          <Legend 
            wrapperStyle={{
              fontSize: '10px',
              paddingTop: '10px'
            }}
            layout="horizontal"
            verticalAlign="bottom"
            align="center"
            iconSize={8}
            iconType="circle"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="price"
            stroke="#ff9900"
            dot={false}
            name="Bitcoin Price"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="investment"
            stroke="#0066cc"
            dot={false}
            name="Fiat Invested"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="portfolioValue"
            stroke="#00ff00"
            dot={false}
            name="Portfolio Value"
          />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="averagePurchasePrice"
            stroke="#8884d8"
            dot={false}
            name="Average Purchase Price"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

