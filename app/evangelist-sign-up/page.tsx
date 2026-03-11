import type { Metadata } from "next"
import EvangelistSignUpForm from "./EvangelistSignUpForm"

export const metadata: Metadata = {
  title: "Become a Bink Evangelist | Club Bink",
  description: "Join our community and start empowering your network with Bitcoin.",
}

export default function EvangelistSignUpPage() {
  return <EvangelistSignUpForm />
}

