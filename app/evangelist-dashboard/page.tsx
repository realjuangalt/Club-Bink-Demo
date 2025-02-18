"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { SiteHeader } from "@/components/site-header"
import Link from "next/link"
import { Copy, Users, TrendingUp, History } from "lucide-react"
import { BinkPriceChart } from "@/components/BinkPriceChart"

// Mock data for the orderbook
const orderbookData = [
  { username: "alice", tradesDone: 5, fiatAmount: 100, satsAmount: 300000, status: "scheduled" },
  { username: "bob", tradesDone: 3, fiatAmount: 50, satsAmount: 150000, status: "pending fiat" },
  { username: "charlie", tradesDone: 10, fiatAmount: 200, satsAmount: 600000, status: "ready" },
  // Add more data as needed
]

// Mock data for transaction history
const transactionHistory = [
  { date: "2023-03-15", username: "alice", fiatAmount: 100, satsAmount: 300000, status: "successful" },
  { date: "2023-03-10", username: "bob", fiatAmount: 50, satsAmount: 150000, status: "failed" },
  { date: "2023-03-05", username: "charlie", fiatAmount: 200, satsAmount: 600000, status: "successful" },
  // Add more data as needed
]

// Mock price data for the BinkPriceChart
const mockPriceData = [
  { date: "2024-01-01", price: 42000 },
  { date: "2024-02-01", price: 45000 },
  { date: "2024-03-01", price: 48000 },
  { date: "2024-04-01", price: 50000 },
  { date: "2024-05-01", price: 52000 },
]

export default function EvangelistDashboard() {
  const router = useRouter()
  const [copySuccess, setCopySuccess] = useState("")

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopySuccess("Copied!")
        setTimeout(() => setCopySuccess(""), 2000)
      },
      () => {
        setCopySuccess("Failed to copy")
      },
    )
  }

  const handleNextAction = () => {
    router.push("/demo-end")
  }

  const downloadCSV = () => {
    const csvContent = [
      ["Date", "Username", "Fiat Amount", "Sats Amount", "Status"],
      ...transactionHistory.map((t) => [t.date, t.username, t.fiatAmount, t.satsAmount, t.status]),
    ]
      .map((row) => row.join(","))
      .join("\n")

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute("href", url)
      link.setAttribute("download", "transaction_history.csv")
      link.style.visibility = "hidden"
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Evangelist Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Invite Buttons */}
          <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#FFA500]">Grow Your Network</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button asChild className="w-full bg-green-600 hover:bg-green-700 text-white">
                <Link href="/stacker-landing?ref=evangelist123">
                  <Users className="mr-2 h-4 w-4" />
                  Invite a Stacker
                </Link>
              </Button>
              <Button
                onClick={() => copyToClipboard(`${window.location.origin}/evangelist-signup?ref=evangelist123`)}
                className="w-full bg-[#FFA500] hover:bg-[#FF9000] text-black"
              >
                <Copy className="mr-2 h-4 w-4" />
                Invite an Evangelist
              </Button>
              {copySuccess && <p className="text-center text-green-500 text-sm">{copySuccess}</p>}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#FFA500]">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Trades</span>
                <span className="text-2xl font-bold">18</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Total Volume</span>
                <span className="text-2xl font-bold">$350</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-400">Active Stackers</span>
                <span className="text-2xl font-bold">3</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* BinkPriceChart */}
        <Card className="w-full mx-auto bg-[#1E1E1E] border-gray-700 shadow-lg mb-8">
          <CardHeader className="pt-6">
            <CardTitle className="text-2xl md:text-3xl text-[#FFA500]">Bink Price Chart</CardTitle>
            <CardDescription className="text-sm md:text-base text-gray-400">
              Compare BTC, Bink, and Local P2P prices
            </CardDescription>
          </CardHeader>
          <CardContent>
            <BinkPriceChart
              priceData={mockPriceData}
              mobileOptimized={true}
              abbreviateYAxis={true}
              flagDecimalPlaces={0}
            />
          </CardContent>
        </Card>

        {/* Orderbook Display */}
        <Card className="mb-8 bg-[#1E1E1E] border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#FFA500]">
              <TrendingUp className="inline-block mr-2 h-6 w-6" />
              Orderbook
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-400">Username</TableHead>
                    <TableHead className="text-gray-400">Trades Done</TableHead>
                    <TableHead className="text-gray-400">Fiat Amount</TableHead>
                    <TableHead className="text-gray-400">Sats Amount</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                    <TableHead className="text-gray-400">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {orderbookData.map((order) => (
                    <TableRow key={order.username}>
                      <TableCell>{order.username}</TableCell>
                      <TableCell>{order.tradesDone}</TableCell>
                      <TableCell>${order.fiatAmount}</TableCell>
                      <TableCell>{order.satsAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            order.status === "scheduled"
                              ? "bg-blue-500"
                              : order.status === "pending fiat"
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }`}
                        >
                          {order.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Button onClick={handleNextAction} size="sm">
                          Next Action
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Transaction History */}
        <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl text-[#FFA500]">
              <History className="inline-block mr-2 h-6 w-6" />
              Transaction History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-gray-400">Date</TableHead>
                    <TableHead className="text-gray-400">Username</TableHead>
                    <TableHead className="text-gray-400">Fiat Amount</TableHead>
                    <TableHead className="text-gray-400">Sats Amount</TableHead>
                    <TableHead className="text-gray-400">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactionHistory.map((transaction, index) => (
                    <TableRow key={index}>
                      <TableCell>{transaction.date}</TableCell>
                      <TableCell>{transaction.username}</TableCell>
                      <TableCell>${transaction.fiatAmount}</TableCell>
                      <TableCell>{transaction.satsAmount.toLocaleString()}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${
                            transaction.status === "successful" ? "bg-green-500" : "bg-red-500"
                          }`}
                        >
                          {transaction.status}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <Button onClick={downloadCSV} className="mt-4 bg-[#FFA500] hover:bg-[#FF9000] text-black">
              Download CSV
            </Button>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

