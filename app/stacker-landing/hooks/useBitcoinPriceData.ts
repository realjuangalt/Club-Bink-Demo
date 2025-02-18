"use client"

import { useState, useEffect } from "react"
import bitcoinPriceData from "@/data/btcusd-weekly-price-historical.json"

interface PriceData {
  date: string
  price: number
}

export function useBitcoinPriceData() {
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    try {
      setPriceData(bitcoinPriceData)
      setIsLoading(false)
    } catch (err) {
      setError("Failed to load Bitcoin price data")
      setIsLoading(false)
    }
  }, [])

  return { priceData, isLoading, error }
}

