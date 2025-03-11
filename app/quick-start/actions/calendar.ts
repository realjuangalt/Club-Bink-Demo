"use server"

import { scheduleBitcoinDCATrade } from "@/lib/google-calendar"

export async function scheduleTradeAgreement(formData: FormData) {
  try {
    // Extract form data
    const yourEmail = formData.get("yourEmail") as string
    const friendEmail = formData.get("friendEmail") as string
    const amount = formData.get("amount") as string
    const frequency = formData.get("frequency") as string
    const tradeType = formData.get("tradeType") as string

    // Validate data
    if (!yourEmail || !friendEmail || !amount || !frequency || !tradeType) {
      return {
        success: false,
        message: "All fields are required",
      }
    }

    // Schedule the trade with Google Calendar integration
    const result = await scheduleBitcoinDCATrade({
      yourEmail,
      friendEmail,
      amount: Number.parseFloat(amount),
      frequency,
      tradeType,
    })

    // Return success response with calendar event details
    return {
      success: true,
      message: `Successfully scheduled ${frequency} ${tradeType} trade of $${amount} with ${friendEmail}`,
      details: {
        yourEmail,
        friendEmail,
        amount,
        frequency,
        tradeType,
        calendarEventId: result.calendarEvent.id,
        calendarEventLink: result.calendarEvent.htmlLink,
      },
    }
  } catch (error) {
    console.error("Error scheduling trade:", error)
    return {
      success: false,
      message: "Failed to schedule trade. Please try again later.",
    }
  }
}

