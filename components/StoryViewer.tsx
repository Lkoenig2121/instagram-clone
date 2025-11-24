'use client'

import { useEffect, useState } from 'react'

interface Story {
  id: number
  image: string
  timestamp: string
}

interface StoryData {
  username: string
  avatar: string
  stories: Story[]
}

interface StoryViewerProps {
  storyData: StoryData
  onClose: () => void
  onNext?: () => void
  onPrevious?: () => void
}

export default function StoryViewer({ storyData, onClose, onNext, onPrevious }: StoryViewerProps) {
  const [currentStoryIndex, setCurrentStoryIndex] = useState(0)
  const [progress, setProgress] = useState(0)
  const STORY_DURATION = 5000 // 5 seconds per story

  useEffect(() => {
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          handleNext()
          return 100
        }
        return prev + (100 / (STORY_DURATION / 100))
      })
    }, 100)

    return () => clearInterval(interval)
  }, [currentStoryIndex])

  const handleNext = () => {
    if (currentStoryIndex < storyData.stories.length - 1) {
      setCurrentStoryIndex(currentStoryIndex + 1)
    } else if (onNext) {
      onNext()
    } else {
      onClose()
    }
  }

  const handlePrevious = () => {
    if (currentStoryIndex > 0) {
      setCurrentStoryIndex(currentStoryIndex - 1)
    } else if (onPrevious) {
      onPrevious()
    }
  }

  const handleSegmentClick = (index: number) => {
    setCurrentStoryIndex(index)
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))

    if (diffHours < 1) return 'Just now'
    if (diffHours < 24) return `${diffHours}h ago`
    return `${Math.floor(diffHours / 24)}d ago`
  }

  const currentStory = storyData.stories[currentStoryIndex]

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white z-50 hover:scale-110 transition-transform"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Previous user button */}
      {onPrevious && (
        <button
          onClick={onPrevious}
          className="absolute left-4 text-white z-50 hover:scale-110 transition-transform"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Next user button */}
      {onNext && (
        <button
          onClick={onNext}
          className="absolute right-4 text-white z-50 hover:scale-110 transition-transform"
        >
          <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Story container */}
      <div className="relative w-full max-w-md h-full md:h-[90vh] bg-ig-secondary">
        {/* Progress bars */}
        <div className="absolute top-0 left-0 right-0 z-10 flex gap-1 p-2">
          {storyData.stories.map((_, index) => (
            <div
              key={index}
              className="flex-1 h-0.5 bg-white bg-opacity-30 rounded-full overflow-hidden cursor-pointer"
              onClick={() => handleSegmentClick(index)}
            >
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width: index < currentStoryIndex ? '100%' : index === currentStoryIndex ? `${progress}%` : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 pt-4 px-4 pb-12 bg-gradient-to-b from-black to-transparent">
          <div className="flex items-center space-x-3">
            <img
              src={storyData.avatar}
              alt={storyData.username}
              className="w-8 h-8 rounded-full object-cover border-2 border-white"
            />
            <span className="text-white font-semibold text-sm">{storyData.username}</span>
            <span className="text-white text-opacity-80 text-xs">
              {formatTimestamp(currentStory.timestamp)}
            </span>
          </div>
        </div>

        {/* Story image */}
        <img
          src={currentStory.image}
          alt="Story"
          className="w-full h-full object-cover"
        />

        {/* Navigation areas */}
        <div className="absolute inset-0 flex">
          <div className="flex-1 cursor-pointer" onClick={handlePrevious} />
          <div className="flex-1 cursor-pointer" onClick={handleNext} />
        </div>

        {/* Story interaction bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              placeholder="Send message"
              className="flex-1 px-4 py-2 rounded-full border border-white border-opacity-50 bg-transparent text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:border-opacity-100"
              onClick={(e) => e.stopPropagation()}
            />
            <button className="text-white hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
            <button className="text-white hover:scale-110 transition-transform">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

