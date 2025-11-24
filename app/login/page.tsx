'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { API_ENDPOINTS } from '@/lib/api'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [serverStatus, setServerStatus] = useState<'checking' | 'online' | 'offline'>('checking')

  useEffect(() => {
    // Check if backend server is running
    checkServerStatus()
  }, [])

  const checkServerStatus = async () => {
    try {
      await axios.get(API_ENDPOINTS.health, { timeout: 3000 })
      setServerStatus('online')
    } catch (err) {
      setServerStatus('offline')
      setError('⚠️ Backend server is not running. Please run "npm run dev" to start both servers.')
    }
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Check server status before attempting login
    if (serverStatus === 'offline') {
      await checkServerStatus()
      if (serverStatus === 'offline') {
        setError('Backend server is not running. Please start it with "npm run dev"')
        setLoading(false)
        return
      }
    }

    try {
      const response = await axios.post(API_ENDPOINTS.login, {
        username,
        password
      }, {
        timeout: 5000
      })

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('user', JSON.stringify(response.data.user))
      router.push('/feed')
    } catch (err: any) {
      console.error('Login error:', err)
      
      if (err.code === 'ECONNREFUSED' || err.message.includes('Network Error')) {
        setError('Cannot connect to server. Make sure the backend is running on port 3001.')
        setServerStatus('offline')
      } else if (err.response?.status === 401) {
        setError('Invalid username or password. Use: demo / demo123')
      } else {
        setError(err.response?.data?.message || 'Login failed. Please try again.')
      }
      setLoading(false)
    }
  }

  const fillDemoCredentials = () => {
    setUsername('demo')
    setPassword('demo123')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-4">
        {/* Server status indicator */}
        {serverStatus === 'offline' && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg text-sm">
            <strong>⚠️ Server Offline:</strong> Run <code className="bg-red-100 px-2 py-0.5 rounded">npm run dev</code> in terminal
          </div>
        )}
        {serverStatus === 'online' && (
          <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg text-sm text-center">
            ✅ Server is running
          </div>
        )}
        
        {/* Main login card */}
        <div className="bg-white border border-ig-border p-10 flex flex-col items-center">
          {/* Instagram logo */}
          <h1 className="text-5xl mb-8 select-none" style={{ fontFamily: 'Grand Hotel, cursive' }}>
            Instagram
          </h1>

          {/* Login form */}
          <form onSubmit={handleLogin} className="w-full space-y-2">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-2 py-2 border border-ig-border rounded text-xs bg-gray-50 focus:outline-none focus:border-gray-400"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-2 py-2 border border-ig-border rounded text-xs bg-gray-50 focus:outline-none focus:border-gray-400"
              required
            />
            
            {error && (
              <div className="text-red-500 text-xs text-center py-2">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ig-primary text-white py-2 rounded-lg font-semibold text-sm hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center w-full my-4">
            <div className="flex-1 border-t border-ig-border"></div>
            <div className="px-4 text-ig-gray text-xs font-semibold">OR</div>
            <div className="flex-1 border-t border-ig-border"></div>
          </div>

          {/* Demo credentials button */}
          <button
            onClick={fillDemoCredentials}
            className="text-ig-primary font-semibold text-sm hover:text-blue-800"
          >
            Use Demo Account
          </button>

          <div className="text-xs text-center text-ig-gray mt-4">
            Forgot password?
          </div>
        </div>

        {/* Demo credentials info card */}
        <div className="bg-white border border-ig-border p-6 text-center">
          <div className="text-sm text-ig-gray mb-3">
            <strong className="text-ig-secondary">Demo Credentials:</strong>
          </div>
          <div className="space-y-1 text-sm font-mono bg-gray-50 p-3 rounded">
            <div><span className="text-ig-gray">Username:</span> <span className="font-semibold">demo</span></div>
            <div><span className="text-ig-gray">Password:</span> <span className="font-semibold">demo123</span></div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center text-xs text-ig-gray">
          Instagram Clone © 2024
        </div>
      </div>
    </div>
  )
}

