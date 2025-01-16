'use client'

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface LocalPriceChartProps {
  data: Array<{ date: string; price: number }>
}

export function LocalPriceChart({ data }: LocalPriceChartProps) {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short'
    })
  }

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#666666"
          />
          <YAxis
            tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
            stroke="#666666"
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1C1C1C',
              border: '1px solid #333333',
              borderRadius: '8px'
            }}
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Price']}
            labelFormatter={(label) => formatDate(label.toString())}
          />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#ff9900"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

