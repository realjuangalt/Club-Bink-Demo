"use client"

import { useEffect, useRef, useState } from 'react'
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from 'next/image'
import { useLanguage } from '../contexts/LanguageContext'
import { useTranslation } from '../hooks/useTranslation'

const educationCards = [
  'whatIsBitcoin',
  'whyBitcoin',
  'howManyBitcoins',
  'canIBuyLessThanOne',
  'howToStore',
  'isBitcoinLegal',
  'howVolatile',
  'howToBuy'
]

export default function BitcoinEducation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [email, setEmail] = useState("")
  const { language } = useLanguage()
  const { t } = useTranslation()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Email submitted:", email)
    setEmail("")
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
        const cardHeight = windowHeight
        const newIndex = Math.min(
          Math.max(Math.floor(adjustedScroll / cardHeight), 0),
          educationCards.length - 1
        )
        setActiveIndex(newIndex)
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
        height: `${educationCards.length * 100}vh`,
      }}
    >
      <div className="sticky top-0 h-screen flex items-start justify-center overflow-hidden pt-6">
        <div className="relative w-full max-w-6xl mx-auto">
          {educationCards.map((card, index) => {
            const isActive = index === activeIndex
            const isPast = index < activeIndex
            const isFuture = index > activeIndex
            
            return (
              <div
                key={index}
                className="absolute w-full transition-all duration-700 ease-out"
                style={{
                  opacity: isPast ? 0 : 1,
                  transform: `perspective(1000px) translateY(${
                    isActive ? '0px' : 
                    isFuture ? '100vh' : 
                    '20px'
                  }) scale(${
                    isActive ? 1 :
                    isFuture ? 1 : 
                    0.9
                  })`,
                  zIndex: educationCards.length - index,
                  pointerEvents: isActive ? 'auto' : 'none',
                  visibility: isPast ? 'hidden' : 'visible',
                }}
              >
                <Card className="bg-[#242424] border-gray-800 overflow-hidden shadow-lg max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-12 p-6 md:p-12 min-h-[60vh]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-4xl font-bold text-white mb-6">{t(card)}</h2>
                      <p className="text-gray-400 text-xl leading-relaxed">{t(`${card}Content`)}</p>
                      {index === educationCards.length - 1 && (
                        <form onSubmit={handleSubmit} className="mt-6">
                          <div className="flex gap-4">
                            <Input
                              type="email"
                              placeholder={t('enterEmail')}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-[#2A2A2A] border-gray-700 text-white"
                              required
                            />
                            <Button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white">
                              {t('signUp')}
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                    <div className="w-full md:w-2/5 bg-[#2A2A2A] rounded-lg p-6 flex items-center justify-center">
                      <Image
                        src={`/bitcoin-education-${index + 1}.png`}
                        alt={`Illustration for ${t(card)}`}
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

