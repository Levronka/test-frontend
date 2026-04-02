#!/bin/bash
# Quick Start Script for AI Placement Test Application

echo "🚀 AI Placement Test - Quick Start"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

echo "✅ Node.js version: $(node --version)"
echo "✅ npm version: $(npm --version)"
echo ""

# Navigate to project directory
cd /Users/a/Documents/my-app

echo "📦 Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

echo "🏗️  Building project..."
npm run build
if [ $? -ne 0 ]; then
    echo "❌ Build failed"
    exit 1
fi
echo "✅ Build successful"
echo ""

echo "✨ Setup complete! You can now:"
echo ""
echo "1. Run development server:"
echo "   npm run dev"
echo "   Then open: http://localhost:3000"
echo ""
echo "2. Run tests:"
echo "   npm test"
echo ""
echo "3. Run production server:"
echo "   npm start"
echo ""
echo "4. Deploy to Vercel:"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial commit'"
echo "   vercel"
echo ""
echo "📚 For more info, see README.md or DEPLOYMENT.md"
echo ""
