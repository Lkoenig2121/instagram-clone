'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (token) {
      router.push('/feed')
    } else {
      router.push('/login')
    }
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">Instagram</div>
          <div className="text-gray-500">Loading...</div>
        </div>
      </div>
    )
  }

  return null
}

