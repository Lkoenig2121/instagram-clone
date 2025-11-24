import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001
const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret-change-me'

// Security check
if (JWT_SECRET === 'fallback-secret-change-me') {
  console.warn('⚠️  WARNING: Using fallback JWT secret. Set JWT_SECRET in .env file!')
}

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Mock database - In production, use a real database
const users = [
  {
    id: 1,
    username: 'demo',
    password: bcrypt.hashSync('demo123', 10),
    fullName: 'Demo User',
    bio: 'Welcome to my Instagram clone! 📸',
    avatar: 'https://i.pravatar.cc/150?img=1',
    followers: 1234,
    following: 567,
  },
  {
    id: 2,
    username: 'john_doe',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'John Doe',
    bio: 'Travel photographer 📷 | Adventure seeker 🌍',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: 2456,
    following: 432,
  },
  {
    id: 3,
    username: 'jane_smith',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Jane Smith',
    bio: 'Coffee enthusiast ☕ | Lifestyle blogger',
    avatar: 'https://i.pravatar.cc/150?img=3',
    followers: 1876,
    following: 321,
  },
  {
    id: 4,
    username: 'mike_wilson',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Mike Wilson',
    bio: 'Fitness coach 💪 | Nutrition expert | DM for coaching',
    avatar: 'https://i.pravatar.cc/150?img=4',
    followers: 3421,
    following: 234,
  },
  {
    id: 5,
    username: 'sarah_jones',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Sarah Jones',
    bio: 'Beach lover 🏖️ | Yoga instructor 🧘‍♀️',
    avatar: 'https://i.pravatar.cc/150?img=5',
    followers: 2891,
    following: 456,
  },
  {
    id: 6,
    username: 'tom_brown',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Tom Brown',
    bio: 'Software Developer 💻 | Tech enthusiast',
    avatar: 'https://i.pravatar.cc/150?img=6',
    followers: 1543,
    following: 678,
  },
  {
    id: 7,
    username: 'emma_davis',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Emma Davis',
    bio: 'Artist 🎨 | Creative soul | Commissions open',
    avatar: 'https://i.pravatar.cc/150?img=7',
    followers: 4123,
    following: 289,
  },
  {
    id: 8,
    username: 'alex_miller',
    password: bcrypt.hashSync('password123', 10),
    fullName: 'Alex Miller',
    bio: 'Food lover 🍝 | Home chef | Recipe creator',
    avatar: 'https://i.pravatar.cc/150?img=8',
    followers: 2167,
    following: 543,
  }
]

const posts = [
  {
    id: 1,
    userId: 1,
    username: 'demo',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/600/600?random=1',
    caption: 'Beautiful sunset today! 🌅',
    likes: 245,
    comments: [
      { id: 1, username: 'john_doe', text: 'Amazing photo!', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 2, username: 'jane_smith', text: 'Love this! 😍', avatar: 'https://i.pravatar.cc/150?img=3' }
    ],
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    liked: false
  },
  {
    id: 2,
    userId: 2,
    username: 'john_doe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://picsum.photos/600/600?random=10',
    caption: 'Exploring new places 🗺️ #travel #adventure',
    likes: 892,
    comments: [
      { id: 3, username: 'demo', text: 'Where is this?', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 4, username: 'sarah_jones', text: 'Stunning view!', avatar: 'https://i.pravatar.cc/150?img=5' },
      { id: 5, username: 'mike_wilson', text: 'Need to visit here!', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    timestamp: new Date(Date.now() - 5400000).toISOString(),
    liked: false
  },
  {
    id: 3,
    userId: 3,
    username: 'jane_smith',
    avatar: 'https://i.pravatar.cc/150?img=3',
    image: 'https://picsum.photos/600/600?random=11',
    caption: 'Morning coffee rituals ☕✨',
    likes: 456,
    comments: [
      { id: 6, username: 'demo', text: 'Looks delicious!', avatar: 'https://i.pravatar.cc/150?img=1' }
    ],
    timestamp: new Date(Date.now() - 7200000).toISOString(),
    liked: false
  },
  {
    id: 4,
    userId: 1,
    username: 'demo',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/600/600?random=2',
    caption: 'Coffee time ☕️',
    likes: 189,
    comments: [
      { id: 7, username: 'coffee_lover', text: 'Perfect cup!', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    timestamp: new Date(Date.now() - 10800000).toISOString(),
    liked: false
  },
  {
    id: 5,
    userId: 4,
    username: 'mike_wilson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    image: 'https://picsum.photos/600/600?random=12',
    caption: 'Gym gains 💪 #fitness #motivation',
    likes: 723,
    comments: [
      { id: 8, username: 'john_doe', text: 'Beast mode! 🔥', avatar: 'https://i.pravatar.cc/150?img=2' },
      { id: 9, username: 'demo', text: 'Keep it up!', avatar: 'https://i.pravatar.cc/150?img=1' }
    ],
    timestamp: new Date(Date.now() - 14400000).toISOString(),
    liked: false
  },
  {
    id: 6,
    userId: 5,
    username: 'sarah_jones',
    avatar: 'https://i.pravatar.cc/150?img=5',
    image: 'https://picsum.photos/600/600?random=13',
    caption: 'Beach days are the best days 🏖️🌊',
    likes: 1204,
    comments: [
      { id: 10, username: 'jane_smith', text: 'So jealous!', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 11, username: 'tom_brown', text: 'Paradise! 🌴', avatar: 'https://i.pravatar.cc/150?img=6' }
    ],
    timestamp: new Date(Date.now() - 18000000).toISOString(),
    liked: false
  },
  {
    id: 7,
    userId: 6,
    username: 'tom_brown',
    avatar: 'https://i.pravatar.cc/150?img=6',
    image: 'https://picsum.photos/600/600?random=14',
    caption: 'Late night coding session 💻 #developer #code',
    likes: 567,
    comments: [
      { id: 12, username: 'demo', text: 'What are you building?', avatar: 'https://i.pravatar.cc/150?img=1' }
    ],
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    liked: false
  },
  {
    id: 8,
    userId: 1,
    username: 'demo',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: 'https://picsum.photos/600/600?random=3',
    caption: 'Weekend vibes 🎉',
    likes: 532,
    comments: [],
    timestamp: new Date(Date.now() - 25200000).toISOString(),
    liked: false
  },
  {
    id: 9,
    userId: 7,
    username: 'emma_davis',
    avatar: 'https://i.pravatar.cc/150?img=7',
    image: 'https://picsum.photos/600/600?random=15',
    caption: 'Art in progress 🎨 Creating something beautiful today',
    likes: 945,
    comments: [
      { id: 13, username: 'jane_smith', text: 'Your art is incredible!', avatar: 'https://i.pravatar.cc/150?img=3' },
      { id: 14, username: 'sarah_jones', text: 'Love your style! 😍', avatar: 'https://i.pravatar.cc/150?img=5' }
    ],
    timestamp: new Date(Date.now() - 28800000).toISOString(),
    liked: false
  },
  {
    id: 10,
    userId: 8,
    username: 'alex_miller',
    avatar: 'https://i.pravatar.cc/150?img=8',
    image: 'https://picsum.photos/600/600?random=16',
    caption: 'New recipe attempt! Turned out amazing 🍝👨‍🍳',
    likes: 612,
    comments: [
      { id: 15, username: 'mike_wilson', text: 'Recipe please! 🙏', avatar: 'https://i.pravatar.cc/150?img=4' }
    ],
    timestamp: new Date(Date.now() - 32400000).toISOString(),
    liked: false
  },
  {
    id: 11,
    userId: 2,
    username: 'john_doe',
    avatar: 'https://i.pravatar.cc/150?img=2',
    image: 'https://picsum.photos/600/600?random=17',
    caption: 'Golden hour magic ✨📸',
    likes: 1567,
    comments: [
      { id: 16, username: 'demo', text: 'Great shot!', avatar: 'https://i.pravatar.cc/150?img=1' },
      { id: 17, username: 'emma_davis', text: 'The lighting is perfect!', avatar: 'https://i.pravatar.cc/150?img=7' }
    ],
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    liked: false
  },
  {
    id: 12,
    userId: 5,
    username: 'sarah_jones',
    avatar: 'https://i.pravatar.cc/150?img=5',
    image: 'https://picsum.photos/600/600?random=18',
    caption: 'Yoga and meditation 🧘‍♀️ Finding my zen',
    likes: 823,
    comments: [],
    timestamp: new Date(Date.now() - 50400000).toISOString(),
    liked: false
  }
]

// Routes
// Health check endpoint
app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', message: 'Server is running!' })
})

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    console.log('Login attempt:', req.body)
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' })
    }

    const user = users.find(u => u.username === username)
    if (!user) {
      console.log('User not found:', username)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const isValidPassword = await bcrypt.compare(password, user.password)
    console.log('Password valid:', isValidPassword)
    
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET, {
      expiresIn: '7d'
    })

    console.log('Login successful for user:', username)
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        avatar: user.avatar,
        bio: user.bio,
        followers: user.followers,
        following: user.following
      }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error', error: String(error) })
  }
})

app.get('/api/posts', (req: Request, res: Response) => {
  res.json(posts)
})

app.post('/api/posts', (req: Request, res: Response) => {
  const { caption, image } = req.body
  const newPost = {
    id: posts.length + 1,
    userId: 1,
    username: 'demo',
    avatar: 'https://i.pravatar.cc/150?img=1',
    image: image || `https://picsum.photos/600/600?random=${posts.length + 1}`,
    caption,
    likes: 0,
    comments: [],
    timestamp: new Date().toISOString(),
    liked: false
  }
  posts.unshift(newPost)
  res.json(newPost)
})

app.post('/api/posts/:id/like', (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  const post = posts.find(p => p.id === postId)
  
  if (post) {
    post.liked = !post.liked
    post.likes += post.liked ? 1 : -1
    res.json(post)
  } else {
    res.status(404).json({ message: 'Post not found' })
  }
})

app.post('/api/posts/:id/comment', (req: Request, res: Response) => {
  const postId = parseInt(req.params.id)
  const { text } = req.body
  const post = posts.find(p => p.id === postId)
  
  if (post) {
    const newComment = {
      id: post.comments.length + 1,
      username: 'demo',
      text,
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
    post.comments.push(newComment)
    res.json(newComment)
  } else {
    res.status(404).json({ message: 'Post not found' })
  }
})

app.get('/api/user/:username', (req: Request, res: Response) => {
  const username = req.params.username
  const user = users.find(u => u.username === username)
  
  if (user) {
    const userPosts = posts.filter(p => p.userId === user.id)
    res.json({
      user: {
        id: user.id,
        username: user.username,
        fullName: user.fullName,
        bio: user.bio,
        avatar: user.avatar,
        followers: user.followers,
        following: user.following
      },
      posts: userPosts
    })
  } else {
    res.status(404).json({ message: 'User not found' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
})

