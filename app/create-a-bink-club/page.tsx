"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { SiteHeader } from "@/components/site-header"

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Chinese",
  "Japanese",
  "Arabic",
  "Hindi",
  "Portuguese",
  "Russian",
]

const currencies = [
  "USD",
  "EUR",
  "GBP",
  "JPY",
  "AUD",
  "CAD",
  "CHF",
  "CNY",
  "HKD",
  "NZD",
  "COP",
  "ARS",
  "BRL",
  "CLP",
  "MXN",
  "PEN",
  "UYU",
  "VES",
  "BOB",
  "PYG",
]

const demoProfile = {
  clubName: "Medellin Bitcoin Club",
  preferredLanguages: ["English"],
  localFiatCurrency: "COP",
}

export default function CreateBinkClub() {
  const [clubName, setClubName] = useState("")
  const [preferredLanguages, setPreferredLanguages] = useState<string[]>([])
  const [localFiatCurrency, setLocalFiatCurrency] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const loadDemoProfile = () => {
    setClubName(demoProfile.clubName)
    setPreferredLanguages(demoProfile.preferredLanguages)
    setLocalFiatCurrency(demoProfile.localFiatCurrency)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (!clubName || preferredLanguages.length === 0 || !localFiatCurrency) {
      setError("Please fill in all required fields.")
      return
    }

    try {
      // Simulating club creation without a database
      console.log("Club created:", { clubName, preferredLanguages, localFiatCurrency })
      router.push("/evangelist-dashboard")
    } catch (err) {
      console.error("Error creating club:", err)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Your Bink Club</h1>
          <p className="text-gray-400 mb-8 text-center">
            Set up your club details to start empowering your network with Bitcoin.
          </p>
          <Button onClick={loadDemoProfile} variant="outline" className="w-full mb-4">
            Load Demo Profile
          </Button>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="clubName">Club Name</Label>
              <Input
                id="clubName"
                type="text"
                placeholder="My Awesome Bitcoin Club"
                value={clubName}
                onChange={(e) => setClubName(e.target.value)}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="languages">Preferred Languages</Label>
              <Select
                value={preferredLanguages.join(",")}
                onValueChange={(value) => setPreferredLanguages(value.split(","))}
              >
                <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                  <SelectValue placeholder="Select languages" />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang} value={lang}>
                      {lang}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="currency">Local Fiat Currency</Label>
              <Select value={localFiatCurrency} onValueChange={(value) => setLocalFiatCurrency(value)}>
                <SelectTrigger className="bg-[#2A2A2A] border-gray-600 text-white">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency} value={currency}>
                      {currency}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-[#FFA500] text-black hover:bg-[#FF9000]">
              Create Club
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

