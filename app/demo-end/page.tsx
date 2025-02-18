"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { Mail, ArrowLeft } from "lucide-react"
import { useState } from "react"

export default function DemoEndPage() {
  const [copySuccess, setCopySuccess] = useState("")

  const copyToClipboard = () => {
    navigator.clipboard.writeText("juan@juangalt.com").then(
      () => {
        setCopySuccess("Email copied!")
        setTimeout(() => setCopySuccess(""), 2000)
      },
      () => {
        setCopySuccess("Failed to copy")
      },
    )
  }

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl font-bold mb-6 text-[#FFA500]">Wow! You've Reached the End of the Demo</h1>
        <p className="text-xl mb-8">
          We hope you enjoyed exploring Club Bink. If you like where this is going, please help us make it a reality.
        </p>
        <div className="flex justify-center space-x-4">
          <Button className="bg-[#FFA500] text-black hover:bg-[#FF9000]" onClick={copyToClipboard}>
            <Mail className="mr-2 h-4 w-4" />
            {copySuccess || "Copy Email"}
          </Button>
          <Button variant="outline">
            <Link href="/" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

