'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { API_ENDPOINTS } from '@/lib/api'

interface NavigationProps {
  user: any
}

export default function Navigation({ user }: NavigationProps) {
  const router = useRouter()
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/login')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-ig-border z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="text-2xl cursor-pointer select-none" 
            style={{ fontFamily: 'Grand Hotel, cursive' }}
            onClick={() => router.push('/feed')}
          >
            Instagram
          </div>

          {/* Search bar */}
          <div className="hidden md:block flex-1 max-w-xs mx-8">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-1.5 bg-gray-100 rounded-lg text-sm focus:outline-none"
            />
          </div>

          {/* Navigation icons */}
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => router.push('/feed')}
              className="hover:text-gray-500"
              title="Home"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </button>

            <button 
              onClick={() => router.push('/explore')}
              className="hover:text-gray-500"
              title="Explore"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button 
              onClick={() => setShowCreateModal(true)}
              className="hover:text-gray-500"
              title="Create"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </button>

            <button 
              onClick={() => router.push('/profile/' + user?.username)}
              className="w-7 h-7 rounded-full overflow-hidden border-2 border-transparent hover:border-ig-secondary"
            >
              <img src={user?.avatar} alt="Profile" className="w-full h-full object-cover" />
            </button>

            <button 
              onClick={handleLogout}
              className="hover:text-gray-500"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Create Post Modal */}
      {showCreateModal && (
        <CreatePostModal onClose={() => setShowCreateModal(false)} />
      )}
    </>
  )
}

function CreatePostModal({ onClose }: { onClose: () => void }) {
  const [caption, setCaption] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await fetch(API_ENDPOINTS.posts, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, image: imageUrl })
      })
      
      window.location.reload()
    } catch (error) {
      console.error('Failed to create post:', error)
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-lg w-full">
        <div className="border-b border-ig-border p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Create new post</h2>
          <button onClick={onClose} className="text-2xl">&times;</button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Image URL</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-ig-border rounded focus:outline-none focus:border-gray-400"
              />
              <p className="text-xs text-ig-gray mt-1">Leave empty for random image</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Caption</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Write a caption..."
                className="w-full px-3 py-2 border border-ig-border rounded focus:outline-none focus:border-gray-400 h-32 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-ig-primary text-white py-2 rounded-lg font-semibold hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Posting...' : 'Share'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

