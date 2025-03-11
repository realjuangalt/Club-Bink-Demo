import type { Metadata } from "next"
import { SiteHeader } from "@/components/site-header"
import ContactForm from "./components/ContactForm"
import { submitContactForm } from "./actions"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Twitter, Github } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "Contact Us | Club Bink",
  description: "Get in touch with Club Bink for any inquiries or support.",
  openGraph: {
    title: "Contact Club Bink",
    description: "Reach out to us for any questions or assistance.",
    images: [{ url: "/images/contact-og.jpg" }],
  },
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <SiteHeader />
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 text-[#FFA500]">Contact Us</h1>
          <p className="text-xl text-center mb-12 text-gray-300 max-w-2xl mx-auto">
            Have questions or feedback? We'd love to hear from you.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#FFA500]">Connect With Us</CardTitle>
                <CardDescription className="text-gray-400">
                  Follow us on social media or send us a message directly.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center justify-center space-y-4">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#FFA500]">
                    <img
                      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tQL3V18kWbU9LNhc0oUD8NaNWmVtcM.png"
                      alt="Juan Galt Twitter Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="text-center">
                    <h3 className="text-xl font-semibold text-gray-200">Juan Galt</h3>
                    <p className="text-gray-400">Project Lead</p>
                  </div>

                  <div className="flex space-x-4">
                    <Link href="https://x.com/juansgalt" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
                      >
                        <Twitter className="h-5 w-5" />
                        <span className="sr-only">Twitter</span>
                      </Button>
                    </Link>
                    <Link href="https://github.com/realjuangalt" target="_blank" rel="noopener noreferrer">
                      <Button
                        variant="outline"
                        size="icon"
                        className="rounded-full border-[#FFA500] text-[#FFA500] hover:bg-[#FFA500] hover:text-black"
                      >
                        <Github className="h-5 w-5" />
                        <span className="sr-only">GitHub</span>
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="bg-[#2A2A2A] p-4 rounded-lg">
                  <p className="text-center text-gray-300">
                    For direct inquiries, you can also reach out via the contact form or follow Juan on Twitter.
                  </p>
                  <div className="mt-4 flex justify-center">
                    <Link href="https://x.com/juansgalt" target="_blank" rel="noopener noreferrer">
                      <Button className="bg-[#FFA500] text-black hover:bg-[#FF9000]">
                        <Twitter className="mr-2 h-4 w-4" />
                        Follow @juansgalt
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl text-[#FFA500]">Send Us a Message</CardTitle>
                <CardDescription className="text-gray-400">
                  Fill out the form below and we'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm submitAction={submitContactForm} />
              </CardContent>
            </Card>
          </div>

          <div className="mt-16">
            <Card className="bg-[#1E1E1E] border-gray-700 shadow-lg overflow-hidden">
              <CardHeader>
                <CardTitle className="text-2xl text-[#FFA500]">Frequently Asked Questions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  {
                    question: "What is Club Bink?",
                    answer:
                      "Club Bink is an open-source toolkit for Bitcoin Evangelists to help friends and family stack and hodl sats through regular peer-to-peer DCA trades.",
                  },
                  {
                    question: "How do I get started with Club Bink?",
                    answer:
                      "You can get started by signing up as a Stacker or creating your own Bink Club as an Evangelist. Check out our Quick Start guide on the home page.",
                  },
                  {
                    question: "Is Club Bink free to use?",
                    answer:
                      "Yes, Club Bink is completely free to use. We don't charge any fees or commissions on trades.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="border-b border-gray-700 pb-4 last:border-0 last:pb-0">
                    <h3 className="text-lg font-medium text-gray-200 mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}

