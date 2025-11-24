'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import Navigation from '@/components/Navigation'
import { API_ENDPOINTS } from '@/lib/api'

interface UserProfile {
  user: {
    id: number
    username: string
    fullName: string
    bio: string
    avatar: string
    followers: number
    following: number
  }
  posts: Array<{
    id: number
    image: string
    likes: number
    comments: any[]
  }>
}

export default function Profile() {
  const params = useParams()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'posts' | 'saved'>('posts')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setCurrentUser(JSON.parse(userData))
    fetchProfile()
  }, [params.username, router])

  const fetchProfile = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.user(params.username as string))
      setProfile(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch profile:', error)
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading profile...</div>
        </div>
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">User not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={currentUser} />
      
      <div className="max-w-4xl mx-auto pt-20 pb-8 px-4">
        {/* Profile header */}
        <div className="bg-white border border-ig-border rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <img
                src={profile.user.avatar}
                alt={profile.user.username}
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover"
              />
            </div>

            {/* Profile info */}
            <div className="flex-1 w-full text-center md:text-left">
              <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
                <h1 className="text-2xl font-light">{profile.user.username}</h1>
                <div className="flex gap-2">
                  <button className="px-6 py-1.5 bg-ig-primary text-white rounded-lg font-semibold text-sm hover:bg-blue-600">
                    Follow
                  </button>
                  <button className="px-6 py-1.5 border border-ig-border rounded-lg font-semibold text-sm hover:bg-gray-50">
                    Message
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-center md:justify-start gap-8 mb-6">
                <div className="text-center md:text-left">
                  <span className="font-semibold">{profile.posts.length}</span>
                  <span className="text-ig-gray ml-1">posts</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold">{profile.user.followers.toLocaleString()}</span>
                  <span className="text-ig-gray ml-1">followers</span>
                </div>
                <div className="text-center md:text-left">
                  <span className="font-semibold">{profile.user.following}</span>
                  <span className="text-ig-gray ml-1">following</span>
                </div>
              </div>

              {/* Bio */}
              <div>
                <div className="font-semibold mb-1">{profile.user.fullName}</div>
                <div className="text-sm whitespace-pre-line">{profile.user.bio}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-ig-border rounded-t-lg">
          <div className="flex border-b border-ig-border">
            <button
              onClick={() => setActiveTab('posts')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 font-semibold text-sm ${
                activeTab === 'posts'
                  ? 'border-t-2 border-ig-secondary text-ig-secondary'
                  : 'text-ig-gray'
              }`}
            >
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="13" y="3" width="7" height="7" />
                <rect x="3" y="13" width="7" height="7" />
                <rect x="13" y="13" width="7" height="7" />
              </svg>
              POSTS
            </button>
            <button
              onClick={() => setActiveTab('saved')}
              className={`flex-1 py-3 flex items-center justify-center gap-2 font-semibold text-sm ${
                activeTab === 'saved'
                  ? 'border-t-2 border-ig-secondary text-ig-secondary'
                  : 'text-ig-gray'
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              SAVED
            </button>
          </div>
        </div>

        {/* Posts grid */}
        {activeTab === 'posts' && (
          <div className="bg-white border-x border-b border-ig-border rounded-b-lg p-1">
            {profile.posts.length === 0 ? (
              <div className="py-20 text-center text-ig-gray">
                <div className="text-4xl mb-4">📷</div>
                <div className="text-2xl font-light mb-2">No Posts Yet</div>
                <div className="text-sm">When {profile.user.username} shares photos, they'll appear here.</div>
              </div>
            ) : (
              <div className="grid grid-cols-3 gap-1">
                {profile.posts.map((post) => (
                  <div key={post.id} className="relative aspect-square group cursor-pointer">
                    <img
                      src={post.image}
                      alt="Post"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <div className="flex items-center gap-6 text-white font-semibold">
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                          </svg>
                          {post.likes}
                        </div>
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                            <path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                          </svg>
                          {post.comments.length}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'saved' && (
          <div className="bg-white border-x border-b border-ig-border rounded-b-lg py-20 text-center text-ig-gray">
            <div className="text-4xl mb-4">🔖</div>
            <div className="text-2xl font-light mb-2">Only you can see what you've saved</div>
            <div className="text-sm">Save photos and videos that you want to see again.</div>
          </div>
        )}
      </div>
    </div>
  )
}

