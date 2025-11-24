'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Navigation from '@/components/Navigation'
import Post from '@/components/Post'
import Stories from '@/components/Stories'
import Suggestions from '@/components/Suggestions'
import { API_ENDPOINTS } from '@/lib/api'

interface PostType {
  id: number
  userId: number
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: Array<{ id: number; username: string; text: string; avatar: string }>
  timestamp: string
  liked: boolean
}

export default function Feed() {
  const router = useRouter()
  const [posts, setPosts] = useState<PostType[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      router.push('/login')
      return
    }

    setUser(JSON.parse(userData))
    fetchPosts()
  }, [router])

  const fetchPosts = async () => {
    try {
      const response = await axios.get(API_ENDPOINTS.posts)
      setPosts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Failed to fetch posts:', error)
      setLoading(false)
    }
  }

  const handleLike = async (postId: number) => {
    try {
      const response = await axios.post(API_ENDPOINTS.postLike(postId))
      setPosts(posts.map(post => post.id === postId ? response.data : post))
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  const handleComment = async (postId: number, text: string) => {
    try {
      await axios.post(API_ENDPOINTS.postComment(postId), { text })
      fetchPosts()
    } catch (error) {
      console.error('Failed to comment:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading feed...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />
      
      <div className="max-w-6xl mx-auto pt-20 pb-8 px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main feed */}
        <div className="lg:col-span-2">
          <Stories />
          
          <div className="space-y-6 mt-6">
            {posts.map(post => (
              <Post
                key={post.id}
                post={post}
                onLike={() => handleLike(post.id)}
                onComment={(text) => handleComment(post.id, text)}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <div className="hidden lg:block">
          <div className="sticky top-24">
            {/* User profile summary */}
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.avatar}
                alt={user?.username}
                className="w-14 h-14 rounded-full object-cover"
              />
              <div>
                <div className="font-semibold text-sm">{user?.username}</div>
                <div className="text-ig-gray text-xs">{user?.fullName}</div>
              </div>
            </div>

            <Suggestions />
          </div>
        </div>
      </div>
    </div>
  )
}

