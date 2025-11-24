'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Navigation from '@/components/Navigation'
import { API_ENDPOINTS } from '@/lib/api'

interface Post {
  id: number
  userId: number
  username: string
  avatar: string
  image: string
  caption: string
  likes: number
  comments: Array<any>
  timestamp: string
  liked: boolean
}

export default function Explore() {
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<Post | null>(null)

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
      // Shuffle posts for explore page variety
      const shuffled = [...response.data].sort(() => Math.random() - 0.5)
      setPosts(shuffled)
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
      if (selectedPost && selectedPost.id === postId) {
        setSelectedPost(response.data)
      }
    } catch (error) {
      console.error('Failed to like post:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-2xl font-bold mb-2">Loading explore...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation user={user} />
      
      <div className="max-w-6xl mx-auto pt-20 pb-8 px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-semibold mb-4">Explore</h1>
          
          {/* Search bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search posts, users, or hashtags..."
              className="w-full px-4 py-3 bg-white border border-ig-border rounded-lg text-sm focus:outline-none focus:border-gray-400"
            />
            <svg 
              className="w-5 h-5 absolute right-4 top-3.5 text-ig-gray"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-3 gap-1">
          {posts.map((post) => (
            <button
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="relative aspect-square group cursor-pointer overflow-hidden"
            >
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
            </button>
          ))}
        </div>
      </div>

      {/* Post detail modal */}
      {selectedPost && (
        <PostDetailModal
          post={selectedPost}
          onClose={() => setSelectedPost(null)}
          onLike={() => handleLike(selectedPost.id)}
        />
      )}
    </div>
  )
}

interface PostDetailModalProps {
  post: Post
  onClose: () => void
  onLike: () => void
}

function PostDetailModal({ post, onClose, onLike }: PostDetailModalProps) {
  const router = useRouter()
  const [commentText, setCommentText] = useState('')

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      try {
        await axios.post(API_ENDPOINTS.postComment(post.id), { text: commentText })
        setCommentText('')
        window.location.reload()
      } catch (error) {
        console.error('Failed to comment:', error)
      }
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    if (diffDays < 7) return `${diffDays}d ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white max-w-5xl w-full max-h-[90vh] flex rounded-lg overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Image section */}
        <div className="flex-1 bg-black flex items-center justify-center">
          <img
            src={post.image}
            alt="Post"
            className="max-w-full max-h-[90vh] object-contain"
          />
        </div>

        {/* Details section */}
        <div className="w-96 flex flex-col">
          {/* Header */}
          <div className="p-4 border-b border-ig-border flex items-center justify-between">
            <button 
              onClick={() => router.push(`/profile/${post.username}`)}
              className="flex items-center space-x-3 hover:opacity-70"
            >
              <img
                src={post.avatar}
                alt={post.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <span className="font-semibold text-sm">{post.username}</span>
            </button>
            <button onClick={onClose} className="text-2xl">&times;</button>
          </div>

          {/* Comments section */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Caption */}
            <div className="flex space-x-3">
              <img
                src={post.avatar}
                alt={post.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <button
                  onClick={() => router.push(`/profile/${post.username}`)}
                  className="font-semibold text-sm mr-2 hover:text-gray-600"
                >
                  {post.username}
                </button>
                <span className="text-sm">{post.caption}</span>
                <div className="text-xs text-ig-gray mt-1">
                  {formatTimestamp(post.timestamp)}
                </div>
              </div>
            </div>

            {/* Comments */}
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex space-x-3">
                <img
                  src={comment.avatar}
                  alt={comment.username}
                  className="w-8 h-8 rounded-full object-cover"
                />
                <div>
                  <button
                    onClick={() => router.push(`/profile/${comment.username}`)}
                    className="font-semibold text-sm mr-2 hover:text-gray-600"
                  >
                    {comment.username}
                  </button>
                  <span className="text-sm">{comment.text}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="border-t border-ig-border p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-4">
                <button onClick={onLike}>
                  {post.liked ? (
                    <svg className="w-7 h-7 text-red-500 fill-current" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                    </svg>
                  ) : (
                    <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="font-semibold text-sm mb-2">
              {post.likes.toLocaleString()} {post.likes === 1 ? 'like' : 'likes'}
            </div>

            {/* Add comment */}
            <form onSubmit={handleCommentSubmit} className="flex items-center border-t border-ig-border pt-3">
              <input
                type="text"
                placeholder="Add a comment..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="flex-1 text-sm focus:outline-none"
              />
              {commentText && (
                <button type="submit" className="text-ig-primary font-semibold text-sm">
                  Post
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

