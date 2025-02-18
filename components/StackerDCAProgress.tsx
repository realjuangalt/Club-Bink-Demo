"use client"

import { useMemo } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import bitcoinPriceData from "@/data/btcusd-weekly-price-historical.json"

interface StackerDCAProgressProps {
  isLogScale?: boolean
  showPurchaseHistory?: boolean
  showChart?: boolean
  showMetrics?: boolean
}

export function StackerDCAProgress({
  isLogScale = false,
  showPurchaseHistory = false,
  showChart = true,
  showMetrics = true,
}: StackerDCAProgressProps) {
  const demoData = useMemo(() => generateDemoData(), [])
  const visibleData = demoData
  const latestData = visibleData[visibleData.length - 1]
  const totalInvested = latestData.invested
  const currentValue = latestData.portfolioValue
  const profitLoss = currentValue - totalInvested
  const profitLossPercentage = ((profitLoss / totalInvested) * 100).toFixed(2)

  return (
    <div className="space-y-6">
      {showMetrics && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-[#2A2A2A] p-4">
            <CardContent>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">Total Invested</h3>
              <p className="text-base sm:text-2xl font-bold">${Math.round(totalInvested).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2A2A] p-4">
            <CardContent>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">Current Value</h3>
              <p className="text-base sm:text-2xl font-bold">${Math.round(currentValue).toLocaleString()}</p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2A2A] p-4">
            <CardContent>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">Profit/Loss</h3>
              <p className={`text-base sm:text-2xl font-bold ${profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                ${Math.round(Math.abs(profitLoss)).toLocaleString()}
              </p>
            </CardContent>
          </Card>
          <Card className="bg-[#2A2A2A] p-4">
            <CardContent>
              <h3 className="text-xs sm:text-sm font-medium text-gray-400">Percentage Gain/Loss</h3>
              <p className={`text-base sm:text-2xl font-bold ${profitLoss >= 0 ? "text-green-500" : "text-red-500"}`}>
                {Math.round(Number(profitLossPercentage))}%
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {showChart && (
        <div className="space-y-4">
          <div className="h-[300px] md:h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={visibleData} margin={{ right: 30, left: 20, bottom: 30 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(date) => new Date(date).toLocaleDateString()}
                  stroke="#666666"
                  tick={{ fontSize: 12 }}
                  interval="preserveEnd"
                  minTickGap={50}
                />
                <YAxis
                  yAxisId="left"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  stroke="#666666"
                  tick={{ fontSize: 12 }}
                  domain={["auto", "auto"]}
                  scale={isLogScale ? "log" : "auto"}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickFormatter={(value) => `$${value.toLocaleString()}`}
                  stroke="#666666"
                  tick={{ fontSize: 12 }}
                  domain={["auto", "auto"]}
                  scale={isLogScale ? "log" : "auto"}
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
        </div>
      )}

      {showPurchaseHistory && (
        <div className="overflow-x-auto mt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-400">Date</TableHead>
                <TableHead className="text-gray-400">Amount (USD)</TableHead>
                <TableHead className="text-gray-400">Bitcoin Price</TableHead>
                <TableHead className="text-gray-400">Bitcoin Amount</TableHead>
                <TableHead className="text-gray-400">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {demoData
                .slice(-5)
                .reverse()
                .map((transaction, index) => (
                  <TableRow key={index}>
                    <TableCell>{transaction.date}</TableCell>
                    <TableCell>$200.00</TableCell>
                    <TableCell>${transaction.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</TableCell>
                    <TableCell>{(200 / transaction.price).toFixed(8)} BTC</TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs bg-green-500">Completed</span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}

// Function to generate demo data
const generateDemoData = () => {
  const startDate = new Date("2021-04-16")
  const endDate = new Date()
  const data = []
  let totalInvested = 0
  let totalBtc = 0

  for (const priceData of bitcoinPriceData) {
    const currentDate = new Date(priceData.date)
    if (currentDate >= startDate && currentDate <= endDate) {
      if (data.length % 2 === 0) {
        // Invest every two weeks
        totalInvested += 200
        totalBtc += 200 / priceData.price
      }
      data.push({
        date: priceData.date,
        price: priceData.price,
        invested: totalInvested,
        portfolioValue: totalBtc * priceData.price,
      })
    }
  }

  return data
}

