import {
  Github,
  Twitter,
  Linkedin,
  Users,
  Repeat,
  ShieldCheck,
  DollarSign,
  MessageSquare,
  BarChart,
  TrendingUp,
  Clock,
  BarChartIcon as ChartBar,
  Brain,
  Handshake,
  Shield,
  Eye,
  Wallet,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { BitcoinIcon } from "@/components/BitcoinIcon"

export default function Home() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="mb-16 md:mb-24 text-center">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Welcome to <span className="text-[#FFA500]">Club Bink</span>
          </h1>
          <p className="mb-6 text-lg text-gray-300 sm:text-xl md:text-2xl">
            Better privacy, better prices, better Bitcoin
          </p>
          <p className="mb-8 mx-auto max-w-2xl text-base sm:text-lg text-gray-400">
            An open source toolkit for Bitcoin Evangelists to help friends and family stack and hodl sats through
            regular peer-to-peer DCA trades.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-[#FFA500] text-black hover:bg-[#FF9000] w-full sm:w-auto" asChild>
              <Link href="/evangelist-sign-up">Get Started</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/stacker-landing">Learn More</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="mb-8 md:mb-12 text-center text-2xl sm:text-3xl font-bold">Built for Bitcoin Evangelists</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { text: "Low Risk", icon: Shield, description: "Minimize your exposure" },
              { text: "High Trust", icon: Users, description: "Build on existing relationships" },
              { text: "Non-KYC", icon: Eye, description: "No escrow, no exchange, no privacy leak." },
              { text: "Commission Free", icon: Wallet, description: "Keep more of your Bitcoin" },
            ].map((feature, index) => (
              <div key={index} className="rounded-lg bg-[#2A2A2A] p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFA50033]">
                    <feature.icon className="h-8 w-8 text-[#FFA500]" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-semibold">{feature.text}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* DCA Strategy Section */}
        <section className="mb-16 md:mb-24 bg-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">Help Your Network Become Bitcoin Stackers</h2>
              <p className="mb-6 text-lg sm:text-xl text-gray-300">
                As an Evangelist, you can help new Bitcoiners (we call them "Stackers") build their Bitcoin positions
                through Dollar Cost Averaging (DCA).
              </p>
              <div className="space-y-6">
                {[
                  {
                    icon: TrendingUp,
                    title: "Ideal for Bitcoin's Volatility",
                    description:
                      "DCA is well-suited for Bitcoin's inherent volatility. By consistently investing fixed amounts at regular intervals, investors can potentially reduce the impact of short-term market swings.",
                  },
                  {
                    icon: Clock,
                    title: "Long-term Growth Focus",
                    description:
                      "DCA allows investors to capitalize on Bitcoin's long-term growth potential without the stress of timing the market perfectly.",
                  },
                  {
                    icon: ChartBar,
                    title: "Steady Accumulation",
                    description:
                      "This strategy enables investors to accumulate Bitcoin steadily over time, building their position gradually and consistently.",
                  },
                  {
                    icon: Brain,
                    title: "Disciplined Approach",
                    description:
                      "DCA provides a disciplined approach that can help overcome emotional decision-making, making it ideal for both newcomers and experienced Bitcoin enthusiasts.",
                  },
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <item.icon className="mr-4 h-6 w-6 text-[#FFA500] mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                      <p className="text-gray-400">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-[#1A1A1A] flex items-center justify-center p-6 md:p-8">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-10k28dv2Q86SXMuQwfqjnLYF9fDHED.png"
                alt="Bitcoin Dollar Cost Average Calculator"
                className="rounded-lg border border-gray-700 shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-16 md:mb-24 bg-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 md:p-8 lg:p-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-6">How Club Bink Empowers Bitcoin Evangelists</h2>
              <p className="text-lg sm:text-xl text-gray-300 mb-4">
                As an Evangelist, you've already built trust within your community. Club Bink helps you leverage these
                existing relationships to maximize the value of your Bitcoin network.
              </p>
              <p className="text-lg sm:text-xl text-gray-300 mb-4">
                If you already own Bitcoin and get paid in Bitcoin, Club Bink provides the tools to engage with your
                network of potential buyers and stackers directly, in a safe, private, and reliable fashion.
              </p>
              <ul className="list-none space-y-4 text-gray-400 mb-6">
                {[
                  { icon: Users, text: "Leverage your existing network of trusted relationships" },
                  { icon: BitcoinIcon, text: "Facilitate direct sat sales within your local community" },
                  { icon: Repeat, text: "Establish long-term DCA plans with your trusted contacts" },
                  { icon: DollarSign, text: "Eliminate exchange fees and P2P commissions" },
                  { icon: ShieldCheck, text: "Enhance privacy and security in your Bitcoin transactions" },
                ].map((item, index) => (
                  <li key={index} className="flex items-start">
                    <item.icon className="mr-2 h-5 w-5 text-[#FFA500] mt-1 flex-shrink-0" />
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>
              <p className="text-gray-400">
                Club Bink doesn't create your network - it helps you unlock the full potential of your existing
                relationships. Our secure, commission-free environment for P2P Bitcoin transactions, combined with
                tailored educational content, makes it easy to introduce Bitcoin to your trusted circle and nurture your
                organically growing local Bitcoin community.
              </p>
            </div>
            <div className="bg-[#1A1A1A] flex items-center justify-center p-6 md:p-8">
              <div className="relative w-full max-w-md aspect-square">
                <div className="absolute inset-0 bg-gradient-to-br from-[#FFA500] to-[#FF4500] rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute inset-4 bg-[#2A2A2A] rounded-full flex items-center justify-center">
                  <Handshake className="h-24 w-24 sm:h-32 sm:w-32 text-[#FFA500]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* For Newbies Section */}
        <section className="mb-16 md:mb-24 bg-[#1A1A1A] rounded-lg overflow-hidden">
          <div className="container mx-auto px-4 py-8 md:py-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
              Guide Your Network's Journey from Curious to Stacker
            </h2>
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-semibold mb-6 text-[#FFA500]">
                  Your Role as a Bitcoin Evangelist
                </h3>
                <ul className="space-y-6">
                  {[
                    {
                      icon: Repeat,
                      title: "Set Up Long-term DCA Plans",
                      description:
                        "Help your network establish personalized plans to regularly invest in Bitcoin. Club Bink streamlines the process by scheduling trades, notifying both parties, calculating prices and amounts per trade relationship, and tracking progress over time. It prioritizes high privacy and decentralization by not handling Bitcoin or fiat payment information directly.",
                    },
                    {
                      icon: MessageSquare,
                      title: "Facilitate Easy Communication",
                      description:
                        "Leverage WhatsApp integration to reach potential Stackers where they already are, keeping them well-informed with a Bitcoin-only content strategy. Help them stay updated on their stacking progress and assist in defining sustainable DCA amounts for long-term commitment. We plan to integrate Nostr in the future, expanding our communication options while maintaining our focus on decentralization.",
                    },
                    {
                      icon: BarChart,
                      title: "Track Stacking Progress Together",
                      description:
                        "Stackers get a dedicated dashboard to monitor their DCA progress over time. This intuitive interface allows them to track their Bitcoin accumulation, investment history, and performance metrics, reinforcing their commitment to the stacking journey.",
                    },
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-4 mt-1">
                        <item.icon className="h-6 w-6 text-[#FFA500]" />
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-2">{item.title}</h4>
                        <p className="text-gray-400">{item.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative mt-8 md:mt-0">
                <img
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bink_landing_background01-ZDJzSO6B7VrTGn4mhjwfKxkwlNrY0o.webp"
                  alt="Bitcoin DCA Progress Visualization"
                  className="rounded-lg border border-gray-700 shadow-lg relative z-10"
                />
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="mb-16 md:mb-24 text-center">
          <h2 className="mb-6 text-2xl sm:text-3xl font-bold">Ready to Become a Club Bink Evangelist?</h2>
          <p className="mb-8 text-lg sm:text-xl text-gray-300">
            Start helping your network stack sats and grow the Bitcoin community.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button size="lg" className="bg-[#FFA500] text-black hover:bg-[#FF9000] w-full sm:w-auto" asChild>
              <Link href="/evangelist-sign-up">Try It Now</Link>
            </Button>
            <Button variant="outline" size="lg" className="w-full sm:w-auto" asChild>
              <Link href="/evangelist-sign-up">Create a Club</Link>
            </Button>
          </div>
        </section>

        {/* Team Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="mb-8 md:mb-12 text-center text-2xl sm:text-3xl font-bold">Our Team</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { name: "Juan Galt", position: "Project lead", image: 1 },
              { name: "Brenda Reyes", position: "Graphic Design", image: 2 },
              { name: "Ivan Robles", position: "UI Advisor", image: 3 },
              { name: "Robert Allen", position: "Back End Advisor", image: 4 },
            ].map((member, i) => (
              <div key={i} className="text-center">
                <div className="mx-auto mb-4 h-32 w-32 sm:h-40 sm:w-40 overflow-hidden rounded-full bg-[#2A2A2A]">
                  <img
                    src={`https://robohash.org/${member.image}?set=set4&size=500x500`}
                    alt={member.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mb-2 text-lg sm:text-xl font-semibold">{member.name}</h3>
                <p className="mb-4 text-sm sm:text-base text-gray-400">{member.position}</p>
                <div className="flex justify-center space-x-4">
                  {i === 1 ? (
                    <a
                      href="https://www.linkedin.com/in/brenn-design"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-[#FFA500] transition-colors"
                      aria-label="Brenda Reyes LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  ) : i === 2 ? (
                    <>
                      <a
                        href="https://github.com/Sharmaz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FFA500] transition-colors"
                        aria-label="Ivan Robles GitHub"
                      >
                        <Github className="h-5 w-5" />
                      </a>
                      <a
                        href="https://x.com/elSharmaz"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FFA500] transition-colors"
                        aria-label="Ivan Robles Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/ivanroblesalonso/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[#FFA500] transition-colors"
                        aria-label="Ivan Robles LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </>
                  ) : (
                    <>
                      <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-colors">
                        <Github className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-colors">
                        <Twitter className="h-5 w-5" />
                      </a>
                      <a href="#" className="text-gray-400 hover:text-[#FFA500] transition-colors">
                        <Linkedin className="h-5 w-5" />
                      </a>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
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
                <Link href="https://github.com" className="text-gray-400 hover:text-white">
                  <Github className="h-6 w-6" />
                </Link>
                <Link href="https://twitter.com" className="text-gray-400 hover:text-white">
                  <Twitter className="h-6 w-6" />
                </Link>
                <Link href="https://linkedin.com" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-6 w-6" />
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

