'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

interface Comment {
  id: number
  username: string
  text: string
  avatar: string
}

interface PostProps {
  post: {
    id: number
    username: string
    avatar: string
    image: string
    caption: string
    likes: number
    comments: Comment[]
    timestamp: string
    liked: boolean
  }
  onLike: () => void
  onComment: (text: string) => void
}

export default function Post({ post, onLike, onComment }: PostProps) {
  const router = useRouter()
  const [commentText, setCommentText] = useState('')
  const [showComments, setShowComments] = useState(false)

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (commentText.trim()) {
      onComment(commentText)
      setCommentText('')
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
    <div className="bg-white border border-ig-border rounded-lg">
      {/* Post header */}
      <div className="flex items-center justify-between p-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => router.push(`/profile/${post.username}`)}
            className="w-8 h-8 rounded-full overflow-hidden"
          >
            <img
              src={post.avatar}
              alt={post.username}
              className="w-full h-full object-cover"
            />
          </button>
          <button
            onClick={() => router.push(`/profile/${post.username}`)}
            className="font-semibold text-sm hover:text-gray-600"
          >
            {post.username}
          </button>
        </div>
        <button className="text-lg">•••</button>
      </div>

      {/* Post image */}
      <div className="relative w-full aspect-square">
        <img
          src={post.image}
          alt="Post"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Post actions */}
      <div className="p-3">
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
            <button>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </button>
            <button>
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
          <button>
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
          </button>
        </div>

        {/* Likes */}
        <div className="font-semibold text-sm mb-2">
          {post.likes.toLocaleString()} {post.likes === 1 ? 'like' : 'likes'}
        </div>

        {/* Caption */}
        <div className="text-sm mb-1">
          <button
            onClick={() => router.push(`/profile/${post.username}`)}
            className="font-semibold mr-2 hover:text-gray-600"
          >
            {post.username}
          </button>
          <span>{post.caption}</span>
        </div>

        {/* View comments */}
        {post.comments.length > 0 && (
          <button
            onClick={() => setShowComments(!showComments)}
            className="text-ig-gray text-sm mb-2"
          >
            View all {post.comments.length} comments
          </button>
        )}

        {/* Comments */}
        {showComments && (
          <div className="space-y-2 mb-2">
            {post.comments.map(comment => (
              <div key={comment.id} className="text-sm">
                <button
                  onClick={() => router.push(`/profile/${comment.username}`)}
                  className="font-semibold mr-2 hover:text-gray-600"
                >
                  {comment.username}
                </button>
                <span>{comment.text}</span>
              </div>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <div className="text-xs text-ig-gray mb-2">
          {formatTimestamp(post.timestamp)}
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
  )
}

