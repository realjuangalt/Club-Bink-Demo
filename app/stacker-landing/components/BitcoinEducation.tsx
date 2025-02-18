"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { Bitcoin, Zap, Scale, Coins, Wallet, GlobeLock, TrendingUp, Store, Users } from "lucide-react"

const educationCards = [
  {
    title: "What is Bitcoin?",
    content:
      "Bitcoin is a decentralized digital currency created in 2009. It operates on a peer-to-peer network without the need for intermediaries like banks. Bitcoin transactions are verified by network nodes through cryptography and recorded on a public distributed ledger called a blockchain.",
    icon: Bitcoin,
  },
  {
    title: "Why Bitcoin?",
    content:
      "Bitcoin offers several advantages: it enables fast, low-cost international transfers; it's not controlled by any government or institution, potentially protecting against inflation and financial censorship; it provides financial services to the unbanked; and it offers a high degree of privacy in transactions.",
    icon: Zap,
  },
  {
    title: "How many Bitcoins are there?",
    content:
      "There will only ever be 21 million Bitcoins. This scarcity is built into the Bitcoin protocol. As of 2023, about 19 million Bitcoins have been mined. The last Bitcoin is expected to be mined around the year 2140.",
    icon: Scale,
  },
  {
    title: "Can I buy less than one Bitcoin?",
    content:
      "Yes, you can buy a fraction of a Bitcoin. The smallest unit of Bitcoin is called a Satoshi, which is 0.00000001 BTC. This allows people to invest in Bitcoin with small amounts of money, making it accessible to a wide range of investors.",
    icon: Coins,
  },
  {
    title: "How do I store Bitcoin securely?",
    content:
      "To store Bitcoin securely, use a wallet. Options include hardware wallets (physical devices), software wallets (apps on your computer or phone), or paper wallets. For large amounts, hardware wallets are recommended as they keep your Bitcoin offline and safe from hacking. Always backup your wallet and never share your private keys.",
    icon: Wallet,
  },
  {
    title: "Is Bitcoin legal?",
    content:
      "Bitcoin's legal status varies by country. In many countries, including the US, EU nations, and Japan, Bitcoin is legal. However, some countries have restricted or banned its use. Always check your local laws before buying or using Bitcoin.",
    icon: GlobeLock,
  },
  {
    title: "How volatile is Bitcoin?",
    content:
      "Bitcoin is known for its price volatility. Its value can fluctuate significantly over short periods. This volatility is due to factors like its relatively small market size, lack of central authority, and sensitivity to news and regulatory changes. Potential investors should be aware of these risks.",
    icon: TrendingUp,
  },
  {
    title: "How do people typically buy Bitcoin?",
    content:
      "Many people buy Bitcoin through centralized exchanges or peer-to-peer (P2P) markets. However, these methods often come with significant drawbacks. Centralized exchanges usually require extensive personal information, compromising privacy. They also tend to charge high fees for transactions. P2P markets, while potentially more private, can be riskier and less user-friendly for newcomers. Both methods may also involve lengthy verification processes and potential account freezes.",
    icon: Store,
  },
  {
    title: "A better way to buy Bitcoin",
    content:
      "Instead of using exchanges or P2P markets, consider buying Bitcoin from a trusted Bitcoiner friend. This method offers several advantages: it's often more private, can have lower fees, and provides a personal touch to your Bitcoin journey. Plus, you'll have someone to guide you through the process and answer your questions. Ready to get started? Sign up below, and we'll connect you with a Bitcoin-savvy friend who can help you make your first purchase!",
    icon: Users,
  },
]

export default function BitcoinEducation() {
  const router = useRouter()

  return (
    <div className="space-y-24 py-16 bg-[#121212] max-w-[95%] sm:max-w-[90%] md:max-w-[80%] lg:max-w-[75%] xl:max-w-[70%] mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-[#FFA500]">Learn About Bitcoin</h2>
      <div className="space-y-24">
        {educationCards.map((card, index) => (
          <Card
            key={index}
            className="bg-[#1E1E1E] border-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full"
          >
            <div className={`flex flex-col md:flex-row ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}>
              <div className="md:w-1/2 relative h-64 md:h-auto flex items-center justify-center bg-[#2A2A2A]">
                <card.icon className="w-32 h-32 text-[#FFA500]" />
              </div>
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <CardHeader className="p-0 mb-6">
                  <CardTitle className="text-3xl md:text-4xl font-bold text-[#FFA500] mb-4">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed">
                    {card.content}{" "}
                    {card.title === "Can I buy less than one Bitcoin?" && "(We call Satoshis 'sats' for short!)"}
                  </p>
                </CardContent>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg w-full mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl md:text-4xl font-bold text-[#FFA500] text-center">
            Ready to start your Bitcoin journey?
          </CardTitle>
        </CardHeader>
        <CardContent className="p-8">
          <Button
            onClick={() => router.push("/stacker-sign-up")}
            className="w-full bg-[#FFA500] text-black hover:bg-[#FF9000] text-xl py-6"
          >
            Sign Up <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}

