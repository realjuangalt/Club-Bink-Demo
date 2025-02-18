import { Inter } from "next/font/google"
import "./globals.css"
import type React from "react" // Import React

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Club Bink - Better Bitcoin P2P Trading",
  description: "An open source tool kit for local Bitcoin DCA markets completely peer to peer",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        {/* Favicon from /media/yarvis/WD_Elements/repos/bink/graphic-assets/bink logo.png */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}



import './globals.css'