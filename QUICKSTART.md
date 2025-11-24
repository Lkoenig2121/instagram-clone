# Quick Start Guide 🚀

## The Login Error Fix

If you're getting "Login failed" errors, it's because the backend server crashed due to port conflicts. Follow these steps:

## Step-by-Step Setup

### 1. Set Up Environment Variables
```bash
cp .env.example .env
```

Edit `.env` and change the `JWT_SECRET` to something secure!

### 2. Install Dependencies
```bash
npm install
```

### 3. Kill Processes on Ports 3000 & 3001
```bash
npx kill-port 3000 3001
```

Or use the restart script:
```bash
./restart.sh
```

### 4. Start the Application
```bash
npm run dev
```

This single command starts BOTH:
- Frontend (Next.js) on `http://localhost:3000`
- Backend (Express) on `http://localhost:3001`

### 5. Wait for Both Servers to Start

You should see output like:
```
[0] ▲ Next.js 14.0.4
[0] - Local:        http://localhost:3000
[1] 🚀 Server running on http://localhost:3001
```

### 6. Open Your Browser

Go to: `http://localhost:3000`

### 7. Login

The login page will show a green "✅ Server is running" message when the backend is connected.

Use the demo credentials:
- **Username:** `demo`
- **Password:** `demo123`

## Troubleshooting

### Error: "Cannot use import statement outside a module" (FIXED!)

This was causing the backend to crash. It's now fixed with proper TypeScript configuration.

### Error: "Backend server is not running"

**Solution:** Make sure you ran `npm run dev` and both servers started successfully.

Check terminal output for:
- ✅ Next.js running on port 3000
- ✅ Express server running on port 3001
- ✅ "🚀 Server running on http://localhost:3001"

### Error: "Port already in use"

**Solution:** Use the restart script or kill ports manually

```bash
# Easy way - Use the restart script
./restart.sh

# Manual way - Kill both ports
npx kill-port 3000 3001

# Then restart
npm run dev
```

### Still Having Issues?

Run servers separately in two terminals:

**Terminal 1 - Backend:**
```bash
npm run dev:server
```

**Terminal 2 - Frontend:**
```bash
npm run dev:next
```

## ✅ Success Checklist

- [ ] Environment variables set up (`.env` file created)
- [ ] JWT_SECRET changed to something secure
- [ ] Dependencies installed (`npm install`)
- [ ] Backend server running (port 3001)
- [ ] Frontend server running (port 3000)
- [ ] Green "Server is running" message on login page
- [ ] Can login with demo/demo123

---

**Happy Instagram cloning! 📸✨**

