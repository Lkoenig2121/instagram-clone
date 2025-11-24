#!/bin/bash

echo "🔄 Restarting Instagram Clone..."
echo ""

# Kill processes on ports 3000 and 3001
echo "🛑 Stopping any processes on ports 3000 and 3001..."
npx kill-port 3000 3001 2>/dev/null || true

echo ""
echo "✅ Ports cleared!"
echo ""
echo "🚀 Starting servers..."
echo ""

# Start the application
npm run dev

