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
  'howToBuy',
  'buyFromFriend'
]

export default function BitcoinEducation() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
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
                  <div className="flex flex-col md:flex-row gap-12 p-6 md:p-12 min-h-[60vh]">
                    <div className="flex-1 flex flex-col justify-center">
                      <h2 className="text-4xl font-bold text-neutral-100 mb-6">{t(card)}</h2>
                      <p className="text-neutral-300 text-xl leading-relaxed">{t(`${card}Content`)}</p>
                      {index === educationCards.length - 1 && (
                        <form onSubmit={handleSubmit} className="mt-6">
                          <div className="flex flex-col sm:flex-row gap-4">
                            <Input
                              type="email"
                              placeholder={t('enterEmail')}
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="bg-neutral-700 border-gray-700 text-neutral-100 flex-grow"
                              required
                            />
                            <Button 
                              type="submit" 
                              className="bg-primary-300 hover:bg-primary-400 text-neutral-100 w-full sm:w-auto"
                            >
                              {t('signUp')}
                            </Button>
                          </div>
                        </form>
                      )}
                    </div>
                    <div className="w-full md:w-2/5 bg-neutral-700 rounded-lg p-6 flex items-center justify-center">
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

