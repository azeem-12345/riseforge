"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

/**
 * Homepage - Redirects directly to dashboard
 * Login system has been completely removed
 */
export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    // Direct redirect to dashboard, no authentication required
    router.push('/dashboard')
  }, [router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground">Loading RiseForge...</p>
      </div>
    </div>
  )
}
