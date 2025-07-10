#!/bin/bash

# 🚀 Automated Mobile Repository Setup Script
# This script creates a completely separate mobile app repository

set -e  # Exit on any error

echo "🎉 SlabTracker Mobile Repository Setup"
echo "======================================="

# Check if GitHub CLI is installed
if ! command -v gh &> /dev/null; then
    echo "❌ GitHub CLI not found. Please install it first:"
    echo "   Mac: brew install gh"
    echo "   Ubuntu: sudo apt install gh"
    echo "   Windows: winget install GitHub.cli"
    exit 1
fi

# Check if user is logged into GitHub CLI
if ! gh auth status &> /dev/null; then
    echo "🔑 Please login to GitHub CLI first:"
    echo "   gh auth login"
    exit 1
fi

# Get GitHub username
GITHUB_USER=$(gh api user --jq '.login')
echo "👤 GitHub user: $GITHUB_USER"

# Repository settings
REPO_NAME="slab-inventory-mobile"
REPO_DESCRIPTION="Mobile app for stone slab inventory management"

echo ""
echo "📝 Repository Details:"
echo "   Name: $REPO_NAME"
echo "   Description: $REPO_DESCRIPTION"
echo "   URL: https://github.com/$GITHUB_USER/$REPO_NAME"

read -p "🤔 Continue with repository creation? (y/N): " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "❌ Setup cancelled."
    exit 1
fi

echo ""
echo "🚀 Creating GitHub repository..."

# Create GitHub repository
gh repo create $REPO_NAME \
    --description "$REPO_DESCRIPTION" \
    --private \
    --clone

cd $REPO_NAME

echo "✅ Repository created and cloned!"

# Initialize React Native project
echo ""
echo "📱 Setting up React Native project..."
npx @react-native-community/cli@latest init TempMobile --version 0.72.6

# Move React Native files to root
echo "📁 Organizing project structure..."
mv TempMobile/* . 2>/dev/null || true
mv TempMobile/.* . 2>/dev/null || true
rmdir TempMobile 2>/dev/null || true

# Install mobile-specific dependencies
echo ""
echo "📦 Installing mobile dependencies..."
npm install \
    @react-navigation/native \
    @react-navigation/bottom-tabs \
    @react-navigation/stack \
    @react-navigation/drawer \
    react-native-screens \
    react-native-safe-area-context \
    react-native-vector-icons \
    react-native-linear-gradient \
    @react-native-async-storage/async-storage \
    react-native-reanimated \
    react-native-gesture-handler \
    axios \
    react-native-paper \
    react-native-elements \
    lottie-react-native

echo "✅ Dependencies installed!"

# Create source directory structure
echo ""
echo "📂 Creating project structure..."
mkdir -p src/{components,screens,navigation,contexts,services,styles}

# Create .gitignore for React Native
cat > .gitignore << 'EOF'
# React Native
node_modules/
.expo/
dist/
npm-debug.*
*.jks
*.p8
*.p12
*.key
*.mobileprovision
*.orig.*
web-build/

# macOS
.DS_Store

# Xcode
build/
*.pbxuser
!default.pbxuser
*.mode1v3
!default.mode1v3
*.mode2v3
!default.mode2v3
*.perspectivev3
!default.perspectivev3
xcuserdata
*.xccheckout
*.moved-aside
DerivedData
*.hmap
*.ipa
*.xcuserstate
ios/.xcode.env.local

# Android/IntelliJ
build/
.idea
.gradle
local.properties
*.iml
*.hprof
.cxx/

# BUCK
buck-out/
\.buckd/
*.keystore
!debug.keystore

# Bundle artifacts
*.jsbundle

# CocoaPods
/ios/Pods/

# Environment
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Temporary files
*.tmp
*.temp

# Metro
.metro-health-check*
EOF

# Update package.json with mobile-specific info
cat > package.json << EOF
{
  "name": "slab-inventory-mobile",
  "version": "1.0.0",
  "private": true,
  "description": "Mobile app for stone slab inventory management",
  "scripts": {
    "android": "react-native run-android",
    "ios": "react-native run-ios", 
    "start": "react-native start",
    "test": "jest",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx"
  },
  "dependencies": {
    "@react-navigation/bottom-tabs": "^6.5.11",
    "@react-navigation/drawer": "^6.6.6", 
    "@react-navigation/native": "^6.1.9",
    "@react-navigation/stack": "^6.3.20",
    "@react-native-async-storage/async-storage": "^1.21.0",
    "axios": "^1.6.0",
    "lottie-react-native": "^6.4.1",
    "react": "18.2.0",
    "react-native": "0.72.6",
    "react-native-elements": "^3.4.3",
    "react-native-gesture-handler": "^2.14.0",
    "react-native-linear-gradient": "^2.8.3",
    "react-native-paper": "^5.11.6", 
    "react-native-reanimated": "^3.6.2",
    "react-native-safe-area-context": "^4.7.4",
    "react-native-screens": "^3.27.0",
    "react-native-vector-icons": "^10.0.2"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "@babel/preset-env": "^7.20.0", 
    "@babel/runtime": "^7.20.0",
    "@react-native/eslint-config": "^0.72.2",
    "@react-native/metro-config": "^0.72.11",
    "@tsconfig/react-native": "^3.0.0",
    "@types/react": "^18.0.24",
    "@types/react-test-renderer": "^18.0.0",
    "babel-jest": "^29.2.1",
    "eslint": "^8.19.0",
    "jest": "^29.2.1", 
    "metro-react-native-babel-preset": "0.76.8",
    "prettier": "^2.4.1",
    "react-test-renderer": "18.2.0",
    "typescript": "4.8.4"
  },
  "jest": {
    "preset": "react-native"
  }
}
EOF

echo "✅ Project structure created!"

# Create README
cat > README.md << 'EOF'
# 📱 SlabTracker Mobile

Beautiful mobile app for stone slab inventory management built with React Native.

## ✨ Features

- 🎨 Modern gradient-based UI design
- 📱 Touch-optimized interface  
- 📊 Real-time dashboard with inventory stats
- 🔍 Advanced search and filtering
- 📦 Bundle/Slab management
- 👤 JWT authentication
- 🔄 Pull-to-refresh functionality

## 🚀 Quick Start

### Prerequisites
- Node.js 14+
- React Native development environment
- Android Studio (Android) or Xcode (iOS)

### Installation

```bash
# Install dependencies
npm install

# iOS setup (iOS only)
cd ios && pod install && cd ..

# Run the app
npm run android  # For Android
npm run ios      # For iOS
```

### Configuration

Update API endpoint in `src/services/api.js`:
```javascript
const BASE_URL = 'http://your-server-ip:5000/api';
```

## 📱 Screenshots

Coming soon...

## 🏗️ Architecture

- **React Native 0.72+**
- **React Navigation** - Tab and stack navigation
- **Async Storage** - Local data persistence
- **Axios** - API communication
- **Linear Gradient** - Beautiful UI effects

## 🎨 Design System

Modern design with:
- Professional color palette
- Consistent spacing system
- Touch-friendly components
- Smooth animations

Built with ❤️ for inventory management
EOF

# Create environment example
cat > .env.example << 'EOF'
# API Configuration
API_BASE_URL=http://localhost:5000/api

# App Configuration  
APP_NAME=SlabTracker Mobile
APP_VERSION=1.0.0
EOF

# First commit
echo ""
echo "💾 Creating initial commit..."
git add .
git commit -m "🎉 Initial commit: React Native mobile app setup

✨ Features:
- React Native 0.72+ foundation
- Modern navigation setup
- Professional project structure
- Mobile-optimized dependencies
- Ready for slab inventory integration

🔧 Tech Stack:
- React Native
- React Navigation
- Linear Gradients
- Async Storage
- Axios for API calls"

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push -u origin main

echo ""
echo "🎉 SUCCESS! Mobile repository created!"
echo ""
echo "📋 Next Steps:"
echo "1. Copy mobile app source files to src/ directory"
echo "2. Update API endpoint in src/services/api.js"
echo "3. Run: npm install"
echo "4. Run: npm run android (or npm run ios)"
echo ""
echo "🔗 Repository: https://github.com/$GITHUB_USER/$REPO_NAME"
echo ""
echo "✅ Your mobile app repository is ready!"
EOF