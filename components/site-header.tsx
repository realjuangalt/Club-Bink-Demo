"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"

export function SiteHeader() {
  const pathname = usePathname()

  // Define all main navigation routes
  const routes = [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/about",
      label: "About",
    },
    {
      href: "/roadmap",
      label: "Roadmap",
    },
    {
      href: "/contact",
      label: "Contact",
    },
  ]

  // Filter out the current page from navigation
  const filteredRoutes = routes.filter((route) => route.href !== pathname)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-800 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bink_logo-s47zQMH4G75Ss1dvRBTfAWyWLJRxCI.svg"
              alt="Bink Logo"
              className="h-8 w-auto"
            />
            <span className="text-xl font-bold tracking-tight text-white">Club Bink</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex gap-6">
          {filteredRoutes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className="text-lg font-medium text-gray-300 transition-colors hover:text-white"
            >
              {route.label}
            </Link>
          ))}
          <Link href="/stacker-sign-up">
            <Button variant="outline" className="border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black">
              Sign Up
            </Button>
          </Link>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" className="md:hidden" size="icon">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-gray-950 text-white">
            <nav className="flex flex-col gap-4 mt-8">
              {routes
                .filter((route) => route.href !== pathname)
                .map((route) => (
                  <Link
                    key={route.href}
                    href={route.href}
                    className="text-xl font-medium text-gray-300 transition-colors hover:text-white"
                  >
                    {route.label}
                  </Link>
                ))}
              {pathname !== "/stacker-sign-up" && (
                <Link href="/stacker-sign-up">
                  <Button
                    variant="outline"
                    className="w-full mt-4 border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
                  >
                    Sign Up
                  </Button>
                </Link>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

