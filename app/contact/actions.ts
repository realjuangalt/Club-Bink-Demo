"use server"

import { z } from "zod"

const contactFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters long"),
})

export async function submitContactForm(prevState: any, formData: FormData) {
  const rawFormData = Object.fromEntries(formData.entries())

  try {
    const validatedData = contactFormSchema.parse(rawFormData)

    // Here you would typically send the data to your backend or API
    // For this example, we'll just simulate a successful submission
    console.log("Form submitted:", validatedData)

    // Simulate an API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return { success: true, message: "Thank you for your message. We'll get back to you soon!" }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: error.errors[0].message }
    }
    return { success: false, message: "An unexpected error occurred. Please try again." }
  }
}

