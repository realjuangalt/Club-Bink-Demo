"use client"

import type React from "react"

import { useState } from "react"
import { z } from "zod"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { scheduleTradeAgreement } from "../actions/calendar"
import { Check, Loader2, Calendar } from "lucide-react"
import Link from "next/link"

const formSchema = z.object({
  yourEmail: z.string().email("Please enter a valid email"),
  friendEmail: z.string().email("Please enter a valid email"),
  amount: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Amount must be a positive number",
  }),
  frequency: z.enum(["weekly", "biweekly", "monthly"]),
  tradeType: z.enum(["buy", "sell"]),
})

export function OneClickScheduler() {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [message, setMessage] = useState("")
  const [calendarEventLink, setCalendarEventLink] = useState("")

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setIsSubmitting(true)
    setErrors({})
    setSuccess(false)
    setMessage("")
    setCalendarEventLink("")

    const formData = new FormData(event.currentTarget)

    try {
      // Client-side validation
      const data = {
        yourEmail: formData.get("yourEmail") as string,
        friendEmail: formData.get("friendEmail") as string,
        amount: formData.get("amount") as string,
        frequency: formData.get("frequency") as string,
        tradeType: formData.get("tradeType") as string,
      }

      formSchema.parse(data)

      // Submit form if validation passes
      const result = await scheduleTradeAgreement(formData)

      if (result.success) {
        setSuccess(true)
        setMessage(result.message)
        if (result.details?.calendarEventLink) {
          setCalendarEventLink(result.details.calendarEventLink)
        }
        event.currentTarget.reset()
      } else {
        setMessage(result.message)
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {}
        error.errors.forEach((err) => {
          if (err.path) {
            fieldErrors[err.path[0]] = err.message
          }
        })
        setErrors(fieldErrors)
      } else {
        setMessage("An unexpected error occurred. Please try again.")
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-2xl mx-auto bg-[#1E1E1E] border-gray-700 shadow-lg">
      <CardHeader className="bg-[#FFA500] text-black rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-center">Schedule Regular Trades</CardTitle>
        <CardDescription className="text-black/80 text-center">
          Set up recurring trades with a trusted friend
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-6 space-y-4">
        {success ? (
          <div className="bg-green-900/30 border border-green-500 rounded-lg p-4 flex items-start">
            <Check className="text-green-500 mr-2 h-5 w-5 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-500">Trade Scheduled!</p>
              <p className="text-gray-300 text-sm mt-1">{message}</p>

              {calendarEventLink && (
                <div className="mt-4">
                  <Link
                    href={calendarEventLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-[#FFA500] hover:underline"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    View in Google Calendar
                  </Link>
                </div>
              )}

              <Button className="mt-4 bg-[#FFA500] text-black hover:bg-[#FF9000]" onClick={() => setSuccess(false)}>
                Schedule Another Trade
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="yourEmail">Your Email</Label>
                <Input
                  id="yourEmail"
                  name="yourEmail"
                  type="email"
                  placeholder="you@example.com"
                  className={`bg-[#2A2A2A] border-gray-600 text-white ${errors.yourEmail ? "border-red-500" : ""}`}
                />
                {errors.yourEmail && <p className="text-red-500 text-sm mt-1">{errors.yourEmail}</p>}
              </div>

              <div>
                <Label htmlFor="friendEmail">Friend's Email</Label>
                <Input
                  id="friendEmail"
                  name="friendEmail"
                  type="email"
                  placeholder="friend@example.com"
                  className={`bg-[#2A2A2A] border-gray-600 text-white ${errors.friendEmail ? "border-red-500" : ""}`}
                />
                {errors.friendEmail && <p className="text-red-500 text-sm mt-1">{errors.friendEmail}</p>}
              </div>

              <div>
                <Label htmlFor="amount">Amount (USD)</Label>
                <Input
                  id="amount"
                  name="amount"
                  type="number"
                  min="1"
                  step="1"
                  placeholder="100"
                  className={`bg-[#2A2A2A] border-gray-600 text-white ${errors.amount ? "border-red-500" : ""}`}
                />
                {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
              </div>

              <div>
                <Label>Frequency</Label>
                <RadioGroup defaultValue="weekly" name="frequency" className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="weekly" id="weekly" />
                    <Label htmlFor="weekly" className="cursor-pointer">
                      Weekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="biweekly" id="biweekly" />
                    <Label htmlFor="biweekly" className="cursor-pointer">
                      Biweekly
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="monthly" id="monthly" />
                    <Label htmlFor="monthly" className="cursor-pointer">
                      Monthly
                    </Label>
                  </div>
                </RadioGroup>
                {errors.frequency && <p className="text-red-500 text-sm mt-1">{errors.frequency}</p>}
              </div>

              <div>
                <Label>I want to</Label>
                <RadioGroup defaultValue="buy" name="tradeType" className="flex space-x-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="buy" id="buy" />
                    <Label htmlFor="buy" className="cursor-pointer">
                      Buy Bitcoin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="sell" id="sell" />
                    <Label htmlFor="sell" className="cursor-pointer">
                      Sell Bitcoin
                    </Label>
                  </div>
                </RadioGroup>
                {errors.tradeType && <p className="text-red-500 text-sm mt-1">{errors.tradeType}</p>}
              </div>
            </div>

            {message && !success && (
              <div className="bg-red-900/30 border border-red-500 rounded-lg p-3">
                <p className="text-red-500 text-sm">{message}</p>
              </div>
            )}

            <Button type="submit" className="w-full bg-[#FFA500] text-black hover:bg-[#FF9000]" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Scheduling...
                </>
              ) : (
                "Schedule Trade"
              )}
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  )
}

