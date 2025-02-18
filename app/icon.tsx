import { ImageResponse } from "next/og"

// Route segment config
export const runtime = "edge"

// Image metadata
export const size = {
  width: 32,
  height: 32,
}

export const contentType = "image/x-icon"

// Image generation
export default async function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "transparent",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/bink%20logo-vXRLLRv6ALisKPOcaRg5bZaCSpyWiC.png"
        alt="Bink Logo"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>,
    {
      ...size,
    },
  )
}

