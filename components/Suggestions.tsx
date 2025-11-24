'use client'

import { useRouter } from 'next/navigation'

export default function Suggestions() {
  const router = useRouter()
  
  const suggestions = [
    { id: 1, username: 'john_doe', name: 'John Doe', avatar: 'https://i.pravatar.cc/150?img=2', mutual: 'Followed by demo + 2 more' },
    { id: 2, username: 'jane_smith', name: 'Jane Smith', avatar: 'https://i.pravatar.cc/150?img=3', mutual: 'Followed by sarah_jones' },
    { id: 3, username: 'tom_brown', name: 'Tom Brown', avatar: 'https://i.pravatar.cc/150?img=6', mutual: 'Followed by mike_wilson + 5 more' },
    { id: 4, username: 'emma_davis', name: 'Emma Davis', avatar: 'https://i.pravatar.cc/150?img=7', mutual: 'Popular' },
    { id: 5, username: 'alex_miller', name: 'Alex Miller', avatar: 'https://i.pravatar.cc/150?img=8', mutual: 'Followed by jane_smith' },
  ]

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-semibold text-ig-gray">Suggestions For You</span>
        <button className="text-xs font-semibold">See All</button>
      </div>

      <div className="space-y-3">
        {suggestions.map((user) => (
          <div key={user.id} className="flex items-center justify-between">
            <button 
              onClick={() => router.push(`/profile/${user.username}`)}
              className="flex items-center space-x-3 hover:opacity-70"
            >
              <img
                src={user.avatar}
                alt={user.username}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="text-sm text-left">
                <div className="font-semibold">{user.username}</div>
                <div className="text-xs text-ig-gray">{user.mutual}</div>
              </div>
            </button>
            <button className="text-xs font-semibold text-ig-primary hover:text-blue-800">
              Follow
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-xs text-ig-gray space-y-2">
        <div className="flex flex-wrap gap-2">
          <a href="#" className="hover:underline">About</a>
          <span>•</span>
          <a href="#" className="hover:underline">Help</a>
          <span>•</span>
          <a href="#" className="hover:underline">Press</a>
          <span>•</span>
          <a href="#" className="hover:underline">API</a>
          <span>•</span>
          <a href="#" className="hover:underline">Jobs</a>
          <span>•</span>
          <a href="#" className="hover:underline">Privacy</a>
          <span>•</span>
          <a href="#" className="hover:underline">Terms</a>
        </div>
        <div>© 2024 INSTAGRAM CLONE</div>
      </div>
    </div>
  )
}

