#!/bin/bash

# Setup script to create separate mobile app repository
# This ensures complete separation from the existing web app

echo "🚀 Setting up separate mobile app repository..."

# Step 1: Navigate to parent directory (outside current project)
cd ..

# Step 2: Create new directory for mobile app
echo "📁 Creating mobile app directory..."
mkdir slab-inventory-mobile
cd slab-inventory-mobile

# Step 3: Initialize new git repository
echo "🔄 Initializing git repository..."
git init

# Step 4: Copy mobile app files from the original location
echo "📋 Copying mobile app files..."
cp -r ../workspace/SlabInventoryMobile/* .

# Step 5: Create .gitignore for React Native
cat > .gitignore << 'EOF'
# React Native

# OSX
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

# node.js
node_modules/
npm-debug.log
yarn-error.log

# BUCK
buck-out/
\.buckd/
*.keystore
!debug.keystore

# Bundle artifacts
*.jsbundle

# Ruby
/vendor/bundle/

# CocoaPods
/ios/Pods/

# Expo
.expo/
web-build/

# Metro
.metro-health-check*

# Flipper
ios/Flipper

# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Temporary files
*.tmp
*.temp

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo

# OS generated files
Thumbs.db
EOF

# Step 6: Create initial commit
echo "💾 Creating initial commit..."
git add .
git commit -m "🎉 Initial commit: React Native mobile app for slab inventory management

✨ Features:
- Beautiful gradient-based UI design
- Touch-optimized interface
- Dashboard with real-time stats
- Bundle/Slab inventory management
- Search and filtering capabilities
- JWT authentication
- API integration ready
- Modern React Native architecture

🔧 Tech Stack:
- React Native 0.80+
- React Navigation
- Linear Gradients
- Async Storage
- Modern UI components"

# Step 7: Add remote repository (replace with your actual GitHub repo URL)
echo "🔗 Adding remote repository..."
echo ""
echo "⚠️  IMPORTANT: Replace 'YOUR_USERNAME' with your actual GitHub username"
echo "Run this command manually:"
echo "git remote add origin https://github.com/YOUR_USERNAME/slab-inventory-mobile.git"
echo ""

# Step 8: Create development setup instructions
cat > SETUP.md << 'EOF'
# 🚀 Mobile App Setup Instructions

## Prerequisites

1. **Node.js** (14 or later)
2. **React Native Development Environment**
   - Android Studio (for Android)
   - Xcode (for iOS, macOS only)

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. iOS Setup (iOS only)
```bash
cd ios && pod install && cd ..
```

### 3. Configure Backend Connection
Edit `src/services/api.js`:
```javascript
const BASE_URL = 'http://YOUR_SERVER_IP:5000/api';
```

### 4. Run the App
```bash
# Android
npx react-native run-android

# iOS  
npx react-native run-ios
```

## 🔧 Configuration

### Backend Integration
Update the API base URL in `src/services/api.js` to point to your existing server:
- Local development: `http://localhost:5000/api`
- Production: `https://your-domain.com/api`

### Environment Variables
Create a `.env` file:
```
API_BASE_URL=http://your-server-ip:5000/api
```

## 📱 Project Structure
```
src/
├── components/     # Reusable UI components
├── screens/        # App screens
├── navigation/     # Navigation setup
├── contexts/       # State management
├── services/       # API integration
└── styles/         # Design system
```

## 🎨 Customization
- Colors: `src/styles/theme.js`
- Components: `src/components/`
- Screens: `src/screens/`

Your mobile app is ready! 🎉
EOF

echo "✅ Mobile app repository setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Replace 'YOUR_USERNAME' in the git remote command with your GitHub username"
echo "2. Run: git remote add origin https://github.com/YOUR_USERNAME/slab-inventory-mobile.git"
echo "3. Run: git push -u origin main"
echo "4. Navigate to the mobile app directory and run: npm install"
echo ""
echo "🎉 Your mobile app is now in a separate repository!"