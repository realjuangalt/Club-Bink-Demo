"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { usePathname } from "next/navigation"

const getMenuItems = (currentPath: string) => {
  const allItems = [
    { href: "/", label: "Home" },
    { href: "/stacker-landing", label: "Stacker Demo" },
    { href: "/evangelist-dashboard", label: "Evangelist Demo" },
    { href: "/evangelist-sign-up", label: "Create a Club" },
  ]
  return allItems.filter((item) => item.href !== currentPath)
}

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const menuItems = getMenuItems(pathname)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-[#121212]/95 backdrop-blur supports-[backdrop-filter]:bg-[#121212]/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 pl-4">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bink_logo-QKKUxKCfntVUsNeqrqkGv1jipBV2er.webp"
            alt="Club Bink Logo"
            className="h-10 w-auto"
          />
          <span className="text-sm font-semibold text-gray-400">DEMO</span>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-4 pr-6">
          {menuItems.map((item) => (
            <Button
              key={item.href}
              variant={item.href === "/evangelist-sign-up" ? "default" : "ghost"}
              className={item.href === "/evangelist-sign-up" ? "bg-[#FFA500] text-black hover:bg-[#FF9000]" : ""}
              asChild
            >
              <Link href={item.href}>{item.label}</Link>
            </Button>
          ))}
        </nav>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[240px] bg-[#121212] text-white">
            <nav className="flex flex-col space-y-4 mt-8">
              {menuItems.map((item) => (
                <Button
                  key={item.href}
                  variant={item.href === "/evangelist-sign-up" ? "default" : "ghost"}
                  className={item.href === "/evangelist-sign-up" ? "bg-[#FFA500] text-black hover:bg-[#FF9000]" : ""}
                  asChild
                >
                  <Link href={item.href}>{item.label}</Link>
                </Button>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

