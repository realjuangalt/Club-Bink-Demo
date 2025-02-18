"use client"

import type React from "react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import dailyPriceData from "@/data/btcusd-daily-price-last_quarter.json"

export const BinkPriceChart: React.FC = () => {
  const binkPriceData = dailyPriceData.map((item) => ({
    ...item,
    price: Number(item.price.toFixed(2)),
    binkPrice: Number((item.price * 0.98).toFixed(2)), // Bink price is 2% below BTC price
    localP2PPrice: Number((item.price * 0.96).toFixed(2)), // Local P2P price is 4% below BTC price
  }))

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString()
  }

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value)
  }

  const PriceFlag = ({ x, y, stroke, value }: { x: number; y: number; stroke: string; value: number }) => {
    return (
      <g transform={`translate(${x},${y})`}>
        <rect x={5} y={-10} width={60} height={20} fill={stroke} rx={4} opacity={0.9} />
        <text x={35} y={2} textAnchor="middle" fill="#fff" fontSize={10} fontWeight="bold">
          ${Math.round(value).toLocaleString()}
        </text>
      </g>
    )
  }

  return (
    <div className="h-[300px] md:h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={binkPriceData} margin={{ right: 70, top: 10, left: 10, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#666666"
            tick={{ fontSize: 12 }}
            interval="preserveStartEnd"
          />
          <YAxis
            tickFormatter={(value) => `$${value.toLocaleString()}`}
            stroke="#666666"
            tick={{ fontSize: 12 }}
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
            type="monotone"
            dataKey="price"
            stroke="#FFA500"
            name="BTC Price"
            dot={false}
            strokeWidth={2}
            label={({ x, y, value, index }) =>
              index === binkPriceData.length - 1 ? <PriceFlag x={x} y={y} stroke="#FFA500" value={value} /> : null
            }
          />
          <Line
            type="monotone"
            dataKey="binkPrice"
            stroke="#00FF00"
            name="Bink Price"
            dot={false}
            strokeWidth={2}
            label={({ x, y, value, index }) =>
              index === binkPriceData.length - 1 ? <PriceFlag x={x} y={y} stroke="#00FF00" value={value} /> : null
            }
          />
          <Line
            type="monotone"
            dataKey="localP2PPrice"
            stroke="#4A90E2"
            name="Local P2P Price"
            dot={false}
            strokeWidth={2}
            label={({ x, y, value, index }) =>
              index === binkPriceData.length - 1 ? <PriceFlag x={x} y={y} stroke="#4A90E2" value={value} /> : null
            }
          />
          <ReferenceLine x={binkPriceData[binkPriceData.length - 1].date} stroke="#666" strokeDasharray="3 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

