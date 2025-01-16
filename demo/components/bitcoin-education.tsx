"use client"

import { useEffect, useRef, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const educationCards = [
  'What is Bitcoin?',
  'Why Bitcoin?',
  'How many Bitcoins are there?',
  'Can I buy less than one Bitcoin?',
  'How do I store Bitcoin securely?',
  'Is Bitcoin legal?',
  'How volatile is Bitcoin?',
  'How do people typically buy Bitcoin?',
  'A better way to buy Bitcoin'
]

export default function BitcoinEducation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [email, setEmail] = useState("")
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    router.push('/complete-signup')
  }

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const handleScroll = () => {
      const containerTop = container.getBoundingClientRect().top
      const windowHeight = window.innerHeight
      const scrollPosition = window.scrollY

      if (containerTop <= windowHeight) {
        const adjustedScroll = Math.max(0, scrollPosition - (container.offsetTop - windowHeight))
        const totalScrollHeight = container.scrollHeight - windowHeight
        const progress = Math.min(adjustedScroll / totalScrollHeight, 1)
        setScrollProgress(progress)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      ref={containerRef}
      className="relative mt-0 px-6"
      style={{ 
        height: `${(educationCards.length) * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen flex items-start justify-center overflow-hidden pt-6">
        <div className="relative w-full max-w-6xl mx-auto">
          {educationCards.map((card, index) => {
            const cardProgress = (scrollProgress * educationCards.length) - index
            const yOffset = Math.max(0, Math.min(1, cardProgress)) * 100
            
            return (
              <div
                key={index}
                className="absolute w-full transition-transform duration-300 ease-out"
                style={{
                  transform: `translateY(${100 - yOffset}vh)`,
                  zIndex: index,
                }}
              >
                <Card className="bg-neutral-800 border-neutral-700 overflow-hidden shadow-lg max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-6 p-4 md:p-8 min-h-[550px]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-4xl font-bold text-neutral-100 mb-6">{card}</h2>
                      <p className="text-neutral-300 text-xl leading-relaxed">
                        {getCardContent(card)}
                      </p>
                      {index === educationCards.length - 1 && (
                        <form onSubmit={handleSubmit} className="mt-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-neutral-700 border-gray-700 text-neutral-100 flex-grow"
                              required
                            />
                            <Button 
                              type="submit" 
                              className="bg-green-500 hover:bg-green-600 text-neutral-100 w-full sm:w-auto"
                            >
                              Sign Up
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                    <div className="w-full md:w-2/5 bg-neutral-700 rounded-lg p-6 flex items-center justify-center">
                      <Image
                        src={`/bitcoin-education-${index + 1}.png`}
                        alt={`Illustration for ${card}`}
                        width={400}
                        height={400}
                        className="w-full h-auto"
                      />
                    </div>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

function getCardContent(card: string): string {
  switch (card) {
    case 'What is Bitcoin?':
      return "Bitcoin is a decentralized digital currency created in 2009. It operates on a peer-to-peer network without the need for intermediaries like banks. Bitcoin transactions are verified by network nodes through cryptography and recorded on a public distributed ledger called a blockchain.";
    case 'Why Bitcoin?':
      return "Bitcoin offers several advantages: it enables fast, low-cost international transfers; it's not controlled by any government or institution, potentially protecting against inflation and financial censorship; it provides financial services to the unbanked; and it offers a high degree of privacy in transactions.";
    case 'How many Bitcoins are there?':
      return "There will only ever be 21 million Bitcoins. This scarcity is built into the Bitcoin protocol. As of 2023, about 19 million Bitcoins have been mined. The last Bitcoin is expected to be mined around the year 2140.";
    case 'Can I buy less than one Bitcoin?':
      return "Yes, you can buy a fraction of a Bitcoin. The smallest unit of Bitcoin is called a Satoshi, which is 0.00000001 BTC. This allows people to invest in Bitcoin with small amounts of money, making it accessible to a wide range of investors.";
    case 'How do I store Bitcoin securely?':
      return "To store Bitcoin securely, use a wallet. Options include hardware wallets (physical devices), software wallets (apps on your computer or phone), or paper wallets. For large amounts, hardware wallets are recommended as they keep your Bitcoin offline and safe from hacking. Always backup your wallet and never share your private keys.";
    case 'Is Bitcoin legal?':
      return "Bitcoin's legal status varies by country. In many countries, including the US, EU nations, and Japan, Bitcoin is legal. However, some countries have restricted or banned its use. Always check your local laws before buying or using Bitcoin.";
    case 'How volatile is Bitcoin?':
      return "Bitcoin is known for its price volatility. Its value can fluctuate significantly over short periods. This volatility is due to factors like its relatively small market size, lack of central authority, and sensitivity to news and regulatory changes. Potential investors should be aware of these risks.";
    case 'How do people typically buy Bitcoin?':
      return "Many people buy Bitcoin through centralized exchanges or peer-to-peer (P2P) markets. However, these methods often come with significant drawbacks. Centralized exchanges usually require extensive personal information, compromising privacy. They also tend to charge high fees for transactions. P2P markets, while potentially more private, can be riskier and less user-friendly for newcomers. Both methods may also involve lengthy verification processes and potential account freezes.";
    case 'A better way to buy Bitcoin':
      return "Instead of using exchanges or P2P markets, consider buying Bitcoin from a trusted Bitcoiner friend. This method offers several advantages: it's often more private, can have lower fees, and provides a personal touch to your Bitcoin journey. Plus, you'll have someone to guide you through the process and answer your questions. Ready to get started? Sign up below, and we'll connect you with a Bitcoin-savvy friend who can help you make your first purchase!";
    default:
      return "";
  }
}

