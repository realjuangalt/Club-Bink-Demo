'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useMockDataService } from '../../services/mockDataService';

export default function CompleteSignup() {
  const [username, setUsername] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()
  const { saveUserProfile } = useMockDataService();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!username || !phoneNumber) {
      setError('Please fill in both username and phone number.');
      return;
    }

    saveUserProfile({
      username,
      phoneNumber,
      email: 'user@example.com', // You might want to add an email field to the form
    });

    // Redirect to a success page or the main app page
    router.push('/dashboard');
  }

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-neutral-800 border-neutral-700">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-neutral-100">Complete Your Sign Up</CardTitle>
          <CardDescription className="text-neutral-400">Please provide a username and your WhatsApp number to complete the registration.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-neutral-200">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-neutral-700 border-neutral-600 text-neutral-100"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber" className="text-neutral-200">WhatsApp Number</Label>
              <Input
                id="phoneNumber"
                type="tel"
                placeholder="Enter your WhatsApp number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-neutral-700 border-neutral-600 text-neutral-100"
              />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-neutral-100">
              Complete Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

