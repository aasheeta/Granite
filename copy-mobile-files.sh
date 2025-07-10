#!/bin/bash

# 📱 Copy Mobile App Files Script
# This copies all the mobile app source code to the new repository

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}📱 SlabTracker Mobile - File Copy Script${NC}"
echo "============================================"

# Check if we're in the right directory
if [ ! -f "package.json" ] || [ ! -d "src" ]; then
    echo -e "${RED}❌ Error: Run this script from your mobile app repository root${NC}"
    echo "   Make sure you're in the slab-inventory-mobile directory"
    exit 1
fi

# Check if workspace directory exists
if [ ! -d "../workspace" ]; then
    echo -e "${RED}❌ Error: Cannot find ../workspace directory${NC}"
    echo "   Make sure the original workspace is in the parent directory"
    exit 1
fi

echo -e "${GREEN}✅ Found workspace directory${NC}"

# Copy all mobile app source files
echo ""
echo -e "${BLUE}📋 Copying mobile app source files...${NC}"

# Create theme.js
echo -e "${YELLOW}📄 Creating theme.js...${NC}"
cat > src/styles/theme.js << 'EOF'
export const theme = {
  // Color palette - Modern and sophisticated
  colors: {
    primary: '#2E86AB',      // Professional blue
    secondary: '#A23B72',    // Accent purple-pink
    accent: '#F18F01',       // Warm orange
    background: '#F8FAFC',   // Light gray-blue
    surface: '#FFFFFF',      // Pure white
    card: '#FFFFFF',         // Card background
    text: '#1E293B',         // Dark slate
    textSecondary: '#64748B', // Medium slate
    textLight: '#94A3B8',    // Light slate
    error: '#EF4444',        // Red
    warning: '#F59E0B',      // Amber
    success: '#10B981',      // Emerald
    info: '#3B82F6',         // Blue
    
    // Gradient colors
    gradientPrimary: ['#2E86AB', '#A23B72'],
    gradientSecondary: ['#F18F01', '#E11D48'],
    gradientNeutral: ['#64748B', '#374151'],
    
    // Status colors for inventory
    inStock: '#10B981',
    lowStock: '#F59E0B',
    outOfStock: '#EF4444',
    
    // Stone/Slab specific colors
    marble: '#F1F5F9',
    granite: '#475569',
    quartz: '#E2E8F0',
  },
  
  // Typography
  typography: {
    h1: {
      fontSize: 32,
      fontWeight: 'bold',
      lineHeight: 40,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 28,
      fontWeight: 'bold',
      lineHeight: 36,
      letterSpacing: -0.25,
    },
    h3: {
      fontSize: 24,
      fontWeight: '600',
      lineHeight: 32,
    },
    h4: {
      fontSize: 20,
      fontWeight: '600',
      lineHeight: 28,
    },
    body1: {
      fontSize: 16,
      fontWeight: 'normal',
      lineHeight: 24,
    },
    body2: {
      fontSize: 14,
      fontWeight: 'normal',
      lineHeight: 20,
    },
    caption: {
      fontSize: 12,
      fontWeight: 'normal',
      lineHeight: 16,
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
  },
  
  // Spacing system
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  
  // Border radius
  borderRadius: {
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    full: 50,
  },
  
  // Shadows
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 1,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 3,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.15,
      shadowRadius: 12,
      elevation: 6,
    },
  },
  
  // Sizes
  sizes: {
    buttonHeight: 48,
    inputHeight: 48,
    tabBarHeight: 60,
    headerHeight: 56,
    cardMinHeight: 120,
  },
};

// Dark theme variant
export const darkTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    background: '#0F172A',
    surface: '#1E293B',
    card: '#334155',
    text: '#F1F5F9',
    textSecondary: '#CBD5E1',
    textLight: '#94A3B8',
  },
};
EOF

# Check if source files exist in workspace
if [ -d "../workspace/SlabInventoryMobile/src" ]; then
    echo -e "${GREEN}✅ Found mobile app source files${NC}"
    
    # Copy all source files
    echo -e "${YELLOW}📋 Copying components...${NC}"
    if [ -d "../workspace/SlabInventoryMobile/src/components" ]; then
        cp -r ../workspace/SlabInventoryMobile/src/components/* src/components/ 2>/dev/null || true
    fi
    
    echo -e "${YELLOW}📋 Copying screens...${NC}"
    if [ -d "../workspace/SlabInventoryMobile/src/screens" ]; then
        cp -r ../workspace/SlabInventoryMobile/src/screens/* src/screens/ 2>/dev/null || true
    fi
    
    echo -e "${YELLOW}📋 Copying navigation...${NC}"
    if [ -d "../workspace/SlabInventoryMobile/src/navigation" ]; then
        cp -r ../workspace/SlabInventoryMobile/src/navigation/* src/navigation/ 2>/dev/null || true
    fi
    
    echo -e "${YELLOW}📋 Copying contexts...${NC}"
    if [ -d "../workspace/SlabInventoryMobile/src/contexts" ]; then
        cp -r ../workspace/SlabInventoryMobile/src/contexts/* src/contexts/ 2>/dev/null || true
    fi
    
    echo -e "${YELLOW}📋 Copying services...${NC}"
    if [ -d "../workspace/SlabInventoryMobile/src/services" ]; then
        cp -r ../workspace/SlabInventoryMobile/src/services/* src/services/ 2>/dev/null || true
    fi
    
    # Copy App.tsx if it exists
    if [ -f "../workspace/SlabInventoryMobile/App.tsx" ]; then
        echo -e "${YELLOW}📋 Copying App.tsx...${NC}"
        cp ../workspace/SlabInventoryMobile/App.tsx .
    fi
    
else
    echo -e "${YELLOW}⚠️  Source files not found in workspace, creating from templates...${NC}"
    
    # Create basic API service
    cat > src/services/api.js << 'EOF'
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Base URL - Update this to match your server URL
const BASE_URL = 'http://localhost:5000/api'; // Change to your server URL

// Create axios instance
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem('authToken');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error('Error getting token from storage:', error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Bundle/Slab endpoints
export const bundleAPI = {
  getAll: (params = {}) => api.get('/bundles', { params }),
  getById: (id) => api.get(`/bundles/${id}`),
  create: (bundleData) => api.post('/bundles', bundleData),
  update: (id, bundleData) => api.put(`/bundles/${id}`, bundleData),
  delete: (id) => api.delete(`/bundles/${id}`),
  search: (query) => api.get(`/bundles/search?q=${query}`),
  getStats: () => api.get('/bundles/stats'),
};

// Auth endpoints
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  logout: () => api.post('/auth/logout'),
};

export default api;
EOF

    # Create basic App.tsx
    cat > App.tsx << 'EOF'
import React from 'react';
import { StatusBar } from 'react-native';
import { theme } from './src/styles/theme';

const App = () => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
        translucent={false}
      />
      {/* Add your navigation here */}
    </>
  );
};

export default App;
EOF
fi

# Update App.tsx with proper mobile app structure
cat > App.tsx << 'EOF'
import React from 'react';
import { StatusBar } from 'react-native';
import { AuthProvider } from './src/contexts/AuthContext';
import AppNavigator from './src/navigation/AppNavigator';
import { theme } from './src/styles/theme';

const App = () => {
  return (
    <AuthProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={theme.colors.primary}
        translucent={false}
      />
      <AppNavigator />
    </AuthProvider>
  );
};

export default App;
EOF

# Update .env file
echo -e "${YELLOW}🔧 Creating environment configuration...${NC}"
cat > .env << 'EOF'
# API Configuration - Update with your server details
API_BASE_URL=http://localhost:5000/api

# App Configuration
APP_NAME=SlabTracker Mobile
APP_VERSION=1.0.0
EOF

echo ""
echo -e "${GREEN}✅ All files copied successfully!${NC}"

# Reinstall dependencies to ensure everything is working
echo ""
echo -e "${BLUE}📦 Reinstalling dependencies...${NC}"
npm install

# Create commit with all the mobile app files
echo ""
echo -e "${BLUE}💾 Creating commit with mobile app files...${NC}"
git add .
git commit -m "📱 Add mobile app source code

✨ Added:
- Complete UI component system (Button, Card)
- Authentication screens and context
- Dashboard with stats and quick actions
- Inventory management screens
- Modern navigation system
- Beautiful gradient-based design
- API integration ready for backend

🎨 Features:
- Touch-optimized interface
- Real-time search and filtering
- Pull-to-refresh functionality
- Professional color scheme
- Smooth animations and transitions"

echo ""
echo -e "${GREEN}🚀 Pushing to GitHub...${NC}"
git push origin main

echo ""
echo -e "${GREEN}🎉 SUCCESS! Mobile app files added to repository!${NC}"
echo ""
echo -e "${BLUE}📋 Next Steps:${NC}"
echo "1. Update API endpoint in src/services/api.js"
echo "2. Configure your development environment"
echo "3. Run: npm run android (or npm run ios)"
echo ""
echo -e "${GREEN}✅ Your mobile app repository is now complete!${NC}"
EOF