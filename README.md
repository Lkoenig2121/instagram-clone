# Instagram Clone

A beautiful, fully-functional Instagram clone built with modern web technologies.

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Node.js, Express
- **Authentication**: JWT tokens

## ✨ Features

- 🔐 User authentication with default demo account
- 📸 Instagram-like feed with posts
- ❤️ Like and comment on posts
- ➕ Create new posts
- 👤 User profiles
- 📱 Stories section
- 💡 User suggestions
- 🎨 Beautiful, responsive UI matching Instagram's design

## 🎯 Demo Credentials

The app comes with a pre-configured demo account:

- **Username**: `demo`
- **Password**: `demo123`

These credentials are displayed on the login screen for easy access.

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/Lkoenig2121/instagram-clone.git
cd instagram-clone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Then edit `.env` and change `JWT_SECRET` to a secure random string:
```
JWT_SECRET=your-secure-random-string-here
```

**⚠️ IMPORTANT:** Never commit the `.env` file to Git! It contains sensitive secrets.

## 🏃‍♂️ Running the Application

Start both the Next.js frontend and Express backend simultaneously:

```bash
npm run dev
```

This will start:
- Frontend on `http://localhost:3000`
- Backend on `http://localhost:3001`

Alternatively, run them separately:

```bash
# Terminal 1 - Frontend
npm run dev:next

# Terminal 2 - Backend
npm run dev:server
```

## 🌐 Usage

1. Open your browser and navigate to `http://localhost:3000`
2. You'll be redirected to the login page
3. Use the demo credentials or click "Use Demo Account" button
4. Explore the feed, create posts, like, comment, and visit profiles!

## 📁 Project Structure

```
instagram/
├── app/                    # Next.js app directory
│   ├── feed/              # Main feed page
│   ├── login/             # Login page
│   ├── profile/           # Profile pages
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx     # Top navigation bar
│   ├── Post.tsx          # Post component
│   ├── Stories.tsx       # Stories component
│   └── Suggestions.tsx   # Suggestions sidebar
├── server/               # Express backend
│   └── index.ts         # API routes and server
└── package.json         # Dependencies
```

## 🎨 Features in Detail

### Authentication
- JWT-based authentication
- Persistent login with localStorage
- Protected routes

### Feed
- Scrollable post feed
- Stories bar
- Suggestions sidebar
- Like/unlike posts
- Comment on posts
- Create new posts with custom images and captions

### Profile
- View user profiles
- Display user stats (posts, followers, following)
- Grid view of user posts
- Saved posts section

### Post Creation
- Create posts with custom image URLs
- Add captions
- Posts appear immediately in feed

## 🔧 Customization

### Adding More Users

Edit `server/index.ts` and add users to the `users` array:

```typescript
const users = [
  {
    id: 2,
    username: 'newuser',
    password: bcrypt.hashSync('password', 10),
    fullName: 'New User',
    bio: 'Your bio here',
    avatar: 'https://i.pravatar.cc/150?img=2',
    followers: 100,
    following: 50,
  }
]
```

### Adding More Posts

Edit `server/index.ts` and add posts to the `posts` array.

## 🔒 Security

### Environment Variables

This project uses environment variables to store sensitive information like JWT secrets. **Never commit your `.env` file to Git!**

The `.env` file is already in `.gitignore` to prevent accidental commits.

**To generate a secure JWT secret:**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Or using OpenSSL
openssl rand -hex 32
```

Then update your `.env` file with the generated secret.

### Production Considerations

Before deploying to production:
1. Change `JWT_SECRET` to a strong, random value
2. Use a real database instead of in-memory data
3. Add password hashing for new user registrations
4. Implement proper session management
5. Add rate limiting to prevent brute force attacks
6. Use HTTPS for all connections
7. Implement CSRF protection
8. Add input validation and sanitization

## 📝 API Endpoints

- `POST /api/auth/login` - User login
- `GET /api/posts` - Get all posts
- `POST /api/posts` - Create a new post
- `POST /api/posts/:id/like` - Like/unlike a post
- `POST /api/posts/:id/comment` - Comment on a post
- `GET /api/user/:username` - Get user profile

## 🎯 Future Enhancements

- Direct messaging
- Real-time notifications
- Image upload functionality
- Video posts
- Reels
- Search functionality
- Explore page
- Database integration (MongoDB/PostgreSQL)
- Real authentication system
- Deploy to production

## 📄 License

This is a demo project for educational purposes.

## 🤝 Contributing

Feel free to fork this project and customize it to your needs!

---

Enjoy your Instagram clone! 📸✨

