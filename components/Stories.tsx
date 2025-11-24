'use client'

import { useState } from 'react'
import StoryViewer from './StoryViewer'

interface StoryData {
  username: string
  avatar: string
  stories: Array<{
    id: number
    image: string
    timestamp: string
  }>
}

export default function Stories() {
  const [selectedStory, setSelectedStory] = useState<number | null>(null)

  const storiesData: StoryData[] = [
    {
      username: 'Your story',
      avatar: 'https://i.pravatar.cc/150?img=1',
      stories: [
        { id: 1, image: 'https://picsum.photos/1080/1920?random=101', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 2, image: 'https://picsum.photos/1080/1920?random=102', timestamp: new Date(Date.now() - 7200000).toISOString() },
      ]
    },
    {
      username: 'john_doe',
      avatar: 'https://i.pravatar.cc/150?img=2',
      stories: [
        { id: 3, image: 'https://picsum.photos/1080/1920?random=103', timestamp: new Date(Date.now() - 1800000).toISOString() },
        { id: 4, image: 'https://picsum.photos/1080/1920?random=104', timestamp: new Date(Date.now() - 3600000).toISOString() },
        { id: 5, image: 'https://picsum.photos/1080/1920?random=105', timestamp: new Date(Date.now() - 5400000).toISOString() },
      ]
    },
    {
      username: 'jane_smith',
      avatar: 'https://i.pravatar.cc/150?img=3',
      stories: [
        { id: 6, image: 'https://picsum.photos/1080/1920?random=106', timestamp: new Date(Date.now() - 900000).toISOString() },
      ]
    },
    {
      username: 'mike_wilson',
      avatar: 'https://i.pravatar.cc/150?img=4',
      stories: [
        { id: 7, image: 'https://picsum.photos/1080/1920?random=107', timestamp: new Date(Date.now() - 10800000).toISOString() },
        { id: 8, image: 'https://picsum.photos/1080/1920?random=108', timestamp: new Date(Date.now() - 14400000).toISOString() },
      ]
    },
    {
      username: 'sarah_jones',
      avatar: 'https://i.pravatar.cc/150?img=5',
      stories: [
        { id: 9, image: 'https://picsum.photos/1080/1920?random=109', timestamp: new Date(Date.now() - 7200000).toISOString() },
      ]
    },
    {
      username: 'tom_brown',
      avatar: 'https://i.pravatar.cc/150?img=6',
      stories: [
        { id: 10, image: 'https://picsum.photos/1080/1920?random=110', timestamp: new Date(Date.now() - 21600000).toISOString() },
      ]
    },
    {
      username: 'emma_davis',
      avatar: 'https://i.pravatar.cc/150?img=7',
      stories: [
        { id: 11, image: 'https://picsum.photos/1080/1920?random=111', timestamp: new Date(Date.now() - 5400000).toISOString() },
        { id: 12, image: 'https://picsum.photos/1080/1920?random=112', timestamp: new Date(Date.now() - 9000000).toISOString() },
      ]
    },
    {
      username: 'alex_miller',
      avatar: 'https://i.pravatar.cc/150?img=8',
      stories: [
        { id: 13, image: 'https://picsum.photos/1080/1920?random=113', timestamp: new Date(Date.now() - 1800000).toISOString() },
      ]
    },
  ]

  const handleStoryClick = (index: number) => {
    setSelectedStory(index)
  }

  const handleNext = () => {
    if (selectedStory !== null && selectedStory < storiesData.length - 1) {
      setSelectedStory(selectedStory + 1)
    } else {
      setSelectedStory(null)
    }
  }

  const handlePrevious = () => {
    if (selectedStory !== null && selectedStory > 0) {
      setSelectedStory(selectedStory - 1)
    }
  }

  return (
    <>
      <div className="bg-white border border-ig-border rounded-lg p-4 overflow-hidden">
        <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
          {storiesData.map((story, index) => (
            <button
              key={index}
              onClick={() => handleStoryClick(index)}
              className="flex flex-col items-center space-y-1 flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-pink-600">
                <div className="w-full h-full bg-white rounded-full p-0.5">
                  <img
                    src={story.avatar}
                    alt={story.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              </div>
              <span className="text-xs max-w-[64px] truncate">{story.username}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Story Viewer */}
      {selectedStory !== null && (
        <StoryViewer
          storyData={storiesData[selectedStory]}
          onClose={() => setSelectedStory(null)}
          onNext={selectedStory < storiesData.length - 1 ? handleNext : undefined}
          onPrevious={selectedStory > 0 ? handlePrevious : undefined}
        />
      )}
    </>
  )
}

