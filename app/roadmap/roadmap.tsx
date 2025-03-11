"use client"

import { SiteHeader } from "@/components/site-header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Circle } from "lucide-react"
import { cn } from "@/lib/utils"

const roadmapItems = [
  {
    title: "Build demo website",
    status: "completed",
    date: "Q1 2025",
    items: [
      "DCA Calculator with historical price data",
      "Basic Bitcoin education content and resources",
      "Sign up flow for Stackers & Evangelists",
      "Stacker & Evangelist Dashboard mockups",
      "Bilingual support (English/Spanish)",
      "Mobile responsive design",
      "Interactive price charts",
    ],
  },
  {
    title: "Build production Club platform",
    status: "in-progress",
    date: "Q1 2025",
    items: [
      "WhatsApp bot integration for notifications",
      "User authentication and authorization via Whatsapp",
      "Secure database implementation",
      "Live price feeds integration (CEX/P2P)",
      "Club creation and management",
      "Multi-currency support",
      "Transaction tracking system",
      "User profile management",
      "Initial P2P market integrations (US/Colombia)",
    ],
  },
  {
    title: "Add LNp2p style LN escrow",
    subtitle: "(anchored to club creator)",
    status: "planned",
    date: "Q2 2025",
    items: [
      "LNp2p / Robosats escrow fork integration",
      "Dispute resolution system anchored to Club creator",
      "Wallet threat model & recomendation page",
    ],
  },
  {
    title: "Integrate nostr encrypted database",
    status: "planned",
    date: "Q2 2025",
    items: [
      "Nostr DMs protocol integration",
      "End-to-end encryption implementation",
      "Nostr only comms mode, optional to turn off whatsapp bot",
      "Payment info encrypted E2E",
      "Performance optimization",
    ],
  },
  {
    title: "Nostr cosigning web of trust",
    subtitle: "Including social recovery",
    status: "planned",
    date: "Q2 2025",
    items: [
      "Nostr Web of trust protocol design",
      "WOT Nostr Cosigning implementation",
      "Trust score by user input",
      "Social recovery mechanism",
      "Recovery phrase flow",
    ],
  },
  {
    title: "Web of trust orderbook expansion",
    subtitle: "(localized per club)",
    status: "planned",
    date: "Q3 2025",
    items: [
      "Ordebook sharing between Evangelists",
      "Trust-based matching algorithm",
      "Local market analytics",
      "Community reputation system",
      "Market maker incentives",
      "Liquidity monitoring tools",
    ],
  },
  {
    title: "Build OSS fully self hosted version",
    subtitle: "minimize depenencies",
    status: "planned",
    date: "Q3 2025",
    items: [
      "Core functionality isolation",
      "Dependency audit and reduction",
      "Self-hosting documentation",
      "Docker container setup",
      "Easy deployment scripts",
      "Backup/restore utilities",
      "Performance monitoring tools",
      "Security hardening guide",
    ],
  },
  {
    title: "Deploy Bink Nostr Smart Card",
    subtitle: "Partnership with Satochip",
    status: "planned",
    date: "Q4 2025",
    items: [
      "Smart card hardware nostr integration",
      "Nostr signing, DM encrption & decryption",
      "NFC web implementation",
      "Card interface setup page",
      "Social recovery integration",
      "Recovery procedures",
      "User documentation",
    ],
  },
  {
    title: "Explore extended WOT orderbook expansion",
    subtitle: "(cross club orderbooks)",
    status: "planned",
    date: "Q4 2025",
    items: [
      "Cross-club Web of Trust analytics",
      "Global orderbook implementation",
      "Cross Club Escrow Resolution System",
      "Liquidity sharing mechanism",
    ],
  },
]

export default function Roadmap() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-16">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-[#FFA500]">Club Bink Roadmap</h1>

        <div className="max-w-4xl mx-auto space-y-8">
          {roadmapItems.map((item, index) => (
            <Card
              key={index}
              className={cn(
                "bg-[#1E1E1E] border-gray-700 transition-all duration-300 hover:border-[#FFA500]/50",
                item.status === "completed" && "border-green-500/20",
                item.status === "in-progress" && "border-blue-500/20",
              )}
            >
              <CardHeader className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="status-icon">
                      {item.status === "completed" ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : item.status === "in-progress" ? (
                        <Circle className="h-5 w-5 text-blue-500 animate-pulse" />
                      ) : (
                        <Circle className="h-5 w-5 text-gray-500" />
                      )}
                    </div>
                    <span className="text-sm text-gray-400">{item.date}</span>
                  </div>
                  <div className="text-xs px-2 py-1 rounded-full bg-[#2A2A2A] text-gray-400">
                    {item.status === "completed"
                      ? "Completed"
                      : item.status === "in-progress"
                        ? "In Progress"
                        : "Planned"}
                  </div>
                </div>
                <CardTitle className="text-xl md:text-2xl text-[#FFA500]">
                  {item.title}
                  {item.subtitle && <div className="text-sm text-gray-400 font-normal mt-1">{item.subtitle}</div>}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <ul className="space-y-3">
                  {item.items.map((subItem, subIndex) => (
                    <li
                      key={subIndex}
                      className="flex items-start gap-2 text-gray-300 hover:text-white transition-colors"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FFA500] mt-2 flex-shrink-0" />
                      <span>{subItem}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Bitcoin Heaven destination */}
          <div className="flex justify-center pt-8">
            <div className="bg-[#FFA500] rounded-full px-8 py-3 text-black font-bold text-lg shadow-lg">
              Bitcoin Heaven
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

