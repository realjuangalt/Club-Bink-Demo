"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SiteHeader } from "@/components/site-header"

const demoProfile = {
  username: "demo_evangelist",
  phoneNumber: "+1234567890",
}

export default function EvangelistSignUp() {
  const [phoneNumber, setPhoneNumber] = useState("")
  const [username, setUsername] = useState("")
  const [error, setError] = useState("")
  const [isDemoProfile, setIsDemoProfile] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    try {
      // Simulating user creation without a database
      console.log("User created:", { username, phoneNumber })
      // Redirect to the next page
      router.push("/create-a-bink-club")
    } catch (err) {
      console.error("Error creating user:", err)
      setError("An unexpected error occurred. Please try again.")
    }
  }

  const loadDemoProfile = () => {
    setUsername(demoProfile.username)
    setPhoneNumber(demoProfile.phoneNumber)
    setIsDemoProfile(true)
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-6 text-center">Become a Bink Evangelist</h1>
          <p className="text-gray-400 mb-8 text-center">
            Join our community and start empowering your network with Bitcoin.
          </p>
          <p className="text-gray-400 mb-8 text-center">
            We use WhatsApp-enabled phone numbers to deliver notifications to our users. It's one of the most used apps
            in the global south, our target market. We will enable Nostr as an alternative communication path in the
            near future.
          </p>
          <Button onClick={loadDemoProfile} variant="outline" className="w-full mb-4">
            Load Demo Profile
          </Button>
          {isDemoProfile && (
            <p className="text-yellow-500 mb-4 text-center">Demo profile loaded. You can edit the fields if needed.</p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="phone">WhatsApp-Enabled Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 123-4567"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="satoshi"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className="bg-[#2A2A2A] border-gray-600 text-white"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-[#FFA500] text-black hover:bg-[#FF9000]">
              Create Bink Profile
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}

