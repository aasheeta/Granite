# Mobile App Setup Guide

## Moving to Separate Repository

### Step 1: Create New Repository
1. Go to GitHub/GitLab and create a new repository named `inventory-mobile-app`
2. Don't initialize with README, .gitignore, or license (we'll copy existing ones)

### Step 2: Copy Mobile App Files
```bash
# Outside your current project directory
git clone https://github.com/yourusername/inventory-mobile-app.git
cd inventory-mobile-app

# Copy the mobile app files from your current project
cp -r /path/to/current/project/InventoryMobileApp/* .
```

### Step 3: Update Configuration

#### Update API Base URL
Edit `src/services/api.js`:
```javascript
// Change this to your deployed server URL
const BASE_URL = 'https://your-server-domain.com'; // Production
// const BASE_URL = 'http://your-local-ip:3001'; // Development
```

#### Update package.json
```json
{
  "name": "inventory-mobile-app",
  "version": "1.0.0",
  "description": "Mobile app for inventory management system",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/inventory-mobile-app.git"
  }
}
```

### Step 4: Set Up Environment Variables
Create `.env` file:
```
API_BASE_URL=https://your-server-domain.com
APP_NAME=Inventory Manager
APP_VERSION=1.0.0
```

### Step 5: Development Setup
```bash
npm install
npm start
```

### Step 6: Testing with Your Backend
1. Make sure your backend server is running
2. Update the API_BASE_URL to point to your server
3. Test login and API calls

## Repository Structure

```
inventory-mobile-app/
├── src/
│   ├── screens/          # All app screens
│   ├── components/       # Reusable components
│   ├── navigation/       # Navigation setup
│   ├── services/         # API calls
│   ├── contexts/         # React contexts
│   └── styles/           # Global styles
├── assets/               # Images, fonts, etc.
├── app.json             # Expo configuration
├── package.json
└── README.md
```

## Benefits of Separate Repo

✅ **Independent Deployments**: Deploy mobile updates without affecting web
✅ **App Store Releases**: Manage mobile app versions separately  
✅ **Team Organization**: Mobile and web teams can work independently
✅ **Platform-specific CI/CD**: Separate build pipelines
✅ **Cleaner Git History**: Mobile commits don't clutter web history

## Shared Backend Strategy

Both web and mobile apps will connect to the same backend server:
- **Web App Repository**: Contains React web app + Node.js backend
- **Mobile App Repository**: Contains React Native app only
- **API Endpoints**: Shared between both platforms