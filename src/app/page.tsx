"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'
import { useUser } from '@/firebase'

export default function HomePage() {
  const router = useRouter()
  const { user, isLoading } = useUser()

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/auth')
      }
    }
  }, [user, isLoading, router])

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="text-center space-y-4">
        <Loader className="w-8 h-8 animate-spin mx-auto text-primary" />
        <p className="text-muted-foreground text-sm font-sans">Loading RiseForge...</p>
      </div>
    </div>
  )
}
