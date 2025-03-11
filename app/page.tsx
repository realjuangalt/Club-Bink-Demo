"use client"

import { Github } from "lucide-react"
import Link from "next/link"
import { SiteHeader } from "@/components/site-header"
import QuickStartDCACalc from "@/components/QuickStartDCACalc"
import { OneClickScheduler } from "./quick-start/components/one-click-scheduler"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#FFA500]">
          Quick Start Your Bitcoin Journey
        </h1>
        <p className="text-xl text-center mb-12 text-gray-300 max-w-2xl mx-auto">
          Calculate your potential returns and schedule regular Bitcoin trades with trusted friends in minutes.
        </p>

        <div className="space-y-16">
          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">See How DCA Works</h2>
            <QuickStartDCACalc />
          </section>

          <section>
            <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center">Schedule Your First Trade</h2>
            <OneClickScheduler />
          </section>
        </div>
      </main>
      <footer className="bg-[#2A2A2A] py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between">
            <div className="mb-4 w-full sm:w-1/2 md:w-1/3">
              <div className="flex items-center mb-2">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bink_logo-QKKUxKCfntVUsNeqrqkGv1jipBV2er.webp"
                  alt="Club Bink Logo"
                  className="h-8 w-auto mr-2"
                />
                <h3 className="text-lg font-semibold">Club Bink</h3>
              </div>
              <p className="text-sm text-gray-400">Better privacy, better prices, better Bitcoin</p>
            </div>
            <div className="mb-4 w-full sm:w-1/2 md:w-1/3">
              <h3 className="mb-2 text-lg font-semibold">Quick Links</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/stacker-demo">Stacker Demo</Link>
                </li>
                <li>
                  <Link href="/evangelist-demo">Evangelist Demo</Link>
                </li>
                <li>
                  <Link href="/evangelist-sign-up">Create a Club</Link>
                </li>
              </ul>
            </div>
            <div className="mb-4 w-full sm:w-1/2 md:w-1/3">
              <h3 className="mb-2 text-lg font-semibold">Connect</h3>
              <div className="flex space-x-4">
                <Link href="https://github.com/realjuangalt/Club-Bink-Demo" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Club Bink. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}

