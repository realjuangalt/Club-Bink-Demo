"use client"

import type React from "react"
import { useState } from "react"
import { useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"

interface ContactFormProps {
  submitAction: (prevState: any, formData: FormData) => Promise<{ success: boolean; message: string }>
}

export default function ContactForm({ submitAction }: ContactFormProps) {
  const [state, formAction] = useActionState(submitAction, { success: false, message: "" })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true)
    // The form submission is handled by the formAction
  }

  return (
    <form action={formAction} onSubmit={handleSubmit} className="space-y-6">
      <div>
        <Label htmlFor="name" className="text-gray-300">
          Name
        </Label>
        <Input type="text" id="name" name="name" required className="bg-[#2A2A2A] border-gray-600 text-white mt-1" />
      </div>
      <div>
        <Label htmlFor="email" className="text-gray-300">
          Email
        </Label>
        <Input type="email" id="email" name="email" required className="bg-[#2A2A2A] border-gray-600 text-white mt-1" />
      </div>
      <div>
        <Label htmlFor="message" className="text-gray-300">
          Message
        </Label>
        <textarea
          id="message"
          name="message"
          required
          rows={4}
          className="w-full px-3 py-2 mt-1 bg-[#2A2A2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-[#FFA500] focus:border-transparent"
        ></textarea>
      </div>
      <Button type="submit" disabled={isSubmitting} className="w-full bg-[#FFA500] text-black hover:bg-[#FF9000]">
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          "Send Message"
        )}
      </Button>
      {state.message && (
        <div
          className={`p-4 rounded-md ${state.success ? "bg-green-900/30 border border-green-500" : "bg-red-900/30 border border-red-500"}`}
        >
          <p className={`${state.success ? "text-green-500" : "text-red-500"}`}>{state.message}</p>
        </div>
      )}
    </form>
  )
}

