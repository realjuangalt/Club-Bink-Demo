import type { Metadata } from "next"
import type React from "react"

export const metadata: Metadata = {
  title: "Quick Start | Club Bink",
  description: "Start your Bitcoin journey with Club Bink's quick start guide.",
}

export default function QuickStartLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}

