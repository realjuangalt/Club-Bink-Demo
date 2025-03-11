import { google } from "googleapis"

// Initialize the Google OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_REDIRECT_URI,
)

// Set credentials if available (for server-side operations)
if (process.env.GOOGLE_CLIENT_EMAIL && process.env.GOOGLE_PRIVATE_KEY) {
  const jwtClient = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    ["https://www.googleapis.com/auth/calendar"],
  )

  // Use JWT client for server-side operations
  oauth2Client.setCredentials({
    access_token: jwtClient.access_token,
  })
}

// Create a Calendar API client
const calendar = google.calendar({ version: "v3", auth: oauth2Client })

/**
 * Generate the Google OAuth URL for user authentication
 * @returns {string} The authorization URL
 */
export function getAuthUrl() {
  const scopes = ["https://www.googleapis.com/auth/calendar"]

  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes,
    prompt: "consent", // Force to get refresh token
  })
}

/**
 * Exchange authorization code for tokens
 * @param {string} code - The authorization code
 * @returns {Promise<Object>} The tokens
 */
export async function getTokens(code) {
  const { tokens } = await oauth2Client.getToken(code)
  oauth2Client.setCredentials(tokens)
  return tokens
}

/**
 * Create a recurring calendar event for Bitcoin DCA trades
 * @param {Object} params - Event parameters
 * @param {string} params.summary - Event title
 * @param {string} params.description - Event description
 * @param {string} params.startDateTime - Start date and time (ISO format)
 * @param {string} params.endDateTime - End date and time (ISO format)
 * @param {string} params.frequency - Recurrence frequency (weekly, biweekly, monthly)
 * @param {number} params.count - Number of occurrences
 * @param {string} params.timeZone - Time zone
 * @returns {Promise<Object>} The created event
 */
export async function createRecurringEvent({
  summary,
  description,
  startDateTime,
  endDateTime,
  frequency = "weekly",
  count = 52, // Default to 1 year of weekly events
  timeZone = "UTC",
}) {
  // Define recurrence rule based on frequency
  let recurrenceRule
  switch (frequency) {
    case "weekly":
      recurrenceRule = `RRULE:FREQ=WEEKLY;COUNT=${count}`
      break
    case "biweekly":
      recurrenceRule = `RRULE:FREQ=WEEKLY;INTERVAL=2;COUNT=${count}`
      break
    case "monthly":
      recurrenceRule = `RRULE:FREQ=MONTHLY;COUNT=${count}`
      break
    default:
      recurrenceRule = `RRULE:FREQ=WEEKLY;COUNT=${count}`
  }

  const event = {
    summary,
    description,
    start: {
      dateTime: startDateTime,
      timeZone,
    },
    end: {
      dateTime: endDateTime,
      timeZone,
    },
    recurrence: [recurrenceRule],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 }, // 1 day before
        { method: "popup", minutes: 30 }, // 30 minutes before
      ],
    },
  }

  try {
    const response = await calendar.events.insert({
      calendarId: "primary",
      resource: event,
    })

    return response.data
  } catch (error) {
    console.error("Error creating calendar event:", error)
    throw error
  }
}

/**
 * Schedule a Bitcoin DCA trade with calendar integration
 * @param {Object} tradeDetails - Trade details
 * @param {string} tradeDetails.yourEmail - User's email
 * @param {string} tradeDetails.friendEmail - Friend's email
 * @param {number} tradeDetails.amount - Trade amount in USD
 * @param {string} tradeDetails.frequency - Trade frequency (weekly, biweekly, monthly)
 * @param {string} tradeDetails.tradeType - Type of trade (buy, sell)
 * @returns {Promise<Object>} The scheduled trade with calendar event
 */
export async function scheduleBitcoinDCATrade({ yourEmail, friendEmail, amount, frequency, tradeType }) {
  // Calculate the first trade date (start with tomorrow)
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  tomorrow.setHours(12, 0, 0, 0) // Set to noon

  const startDateTime = tomorrow.toISOString()

  // End time is 30 minutes after start
  const endDateTime = new Date(tomorrow.getTime() + 30 * 60000).toISOString()

  // Create event title and description
  const summary = `Bitcoin ${tradeType.toUpperCase()} - $${amount}`
  const description = `
    Bitcoin ${tradeType} trade of $${amount}
    
    Participants:
    - You (${yourEmail})
    - ${friendEmail}
    
    This is a recurring ${frequency} trade scheduled through Club Bink.
    
    Please ensure you have the necessary funds ready before the scheduled time.
  `

  // Determine count based on frequency
  let count
  switch (frequency) {
    case "weekly":
      count = 52 // 1 year
      break
    case "biweekly":
      count = 26 // 1 year
      break
    case "monthly":
      count = 12 // 1 year
      break
    default:
      count = 52
  }

  try {
    // Create the calendar event
    const calendarEvent = await createRecurringEvent({
      summary,
      description,
      startDateTime,
      endDateTime,
      frequency,
      count,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // Use client's timezone
    })

    // Return the trade details with the calendar event
    return {
      tradeDetails: {
        yourEmail,
        friendEmail,
        amount,
        frequency,
        tradeType,
      },
      calendarEvent,
    }
  } catch (error) {
    console.error("Error scheduling Bitcoin DCA trade:", error)
    throw error
  }
}

/**
 * Add attendees to an existing calendar event
 * @param {string} eventId - The calendar event ID
 * @param {Array<string>} emails - List of attendee emails
 * @returns {Promise<Object>} The updated event
 */
export async function addAttendeesToEvent(eventId, emails) {
  try {
    // First get the event
    const event = await calendar.events.get({
      calendarId: "primary",
      eventId,
    })

    // Add attendees
    const updatedEvent = {
      ...event.data,
      attendees: emails.map((email) => ({ email })),
    }

    // Update the event
    const response = await calendar.events.update({
      calendarId: "primary",
      eventId,
      resource: updatedEvent,
    })

    return response.data
  } catch (error) {
    console.error("Error adding attendees to event:", error)
    throw error
  }
}

