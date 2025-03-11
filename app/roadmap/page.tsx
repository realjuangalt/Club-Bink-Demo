import type { Metadata } from "next"
import Roadmap from "./roadmap"

export const metadata: Metadata = {
  title: "Roadmap | Club Bink",
  description: "Explore the future development plans for Club Bink",
}

export default function RoadmapPage() {
  return <Roadmap />
}

