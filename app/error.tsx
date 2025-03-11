"use client"

import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log any errors to console
    console.error("Root Error Boundary:", error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Something went wrong!</h2>
        <p className="mb-4 text-gray-600">{error.message}</p>
        <button onClick={() => reset()} className="bg-blue-500 text-white px-4 py-2 rounded">
          Try again
        </button>
      </div>
    </div>
  )
}

