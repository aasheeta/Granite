import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

// Screens
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import InventoryScreen from '../screens/InventoryScreen';
import BundleListScreen from '../screens/BundleListScreen';
import BundleRegisterScreen from '../screens/BundleRegisterScreen';
import BlockScreen from '../screens/BlockScreen';
import BlockListScreen from '../screens/BlockListScreen';
import BlockRegisterScreen from '../screens/BlockRegisterScreen';
import SupplierScreen from '../screens/SupplierScreen';
import SupplierListScreen from '../screens/SupplierListScreen';
import SupplierRegisterScreen from '../screens/SupplierRegisterScreen';
import MaterialScreen from '../screens/MaterialScreen';
import MaterialListScreen from '../screens/MaterialListScreen';
import MaterialRegisterScreen from '../screens/MaterialRegisterScreen';
import OrderScreen from '../screens/OrderScreen';
import OrderListScreen from '../screens/OrderListScreen';
import OrderRegisterScreen from '../screens/OrderRegisterScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Inventory Stack
const InventoryStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="InventoryMain" component={InventoryScreen} options={{ title: 'Inventory' }} />
    <Stack.Screen name="BundleList" component={BundleListScreen} options={{ title: 'Bundle List' }} />
    <Stack.Screen name="BundleRegister" component={BundleRegisterScreen} options={{ title: 'Add Bundle' }} />
  </Stack.Navigator>
);

// Block Stack
const BlockStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="BlockMain" component={BlockScreen} options={{ title: 'Blocks' }} />
    <Stack.Screen name="BlockList" component={BlockListScreen} options={{ title: 'Block List' }} />
    <Stack.Screen name="BlockRegister" component={BlockRegisterScreen} options={{ title: 'Add Block' }} />
  </Stack.Navigator>
);

// Supplier Stack
const SupplierStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="SupplierMain" component={SupplierScreen} options={{ title: 'Suppliers' }} />
    <Stack.Screen name="SupplierList" component={SupplierListScreen} options={{ title: 'Supplier List' }} />
    <Stack.Screen name="SupplierRegister" component={SupplierRegisterScreen} options={{ title: 'Add Supplier' }} />
  </Stack.Navigator>
);

// Material Stack
const MaterialStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MaterialMain" component={MaterialScreen} options={{ title: 'Materials' }} />
    <Stack.Screen name="MaterialList" component={MaterialListScreen} options={{ title: 'Material List' }} />
    <Stack.Screen name="MaterialRegister" component={MaterialRegisterScreen} options={{ title: 'Add Material' }} />
  </Stack.Navigator>
);

// Order Stack
const OrderStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="OrderMain" component={OrderScreen} options={{ title: 'Orders' }} />
    <Stack.Screen name="OrderList" component={OrderListScreen} options={{ title: 'Order List' }} />
    <Stack.Screen name="OrderRegister" component={OrderRegisterScreen} options={{ title: 'Create Order' }} />
  </Stack.Navigator>
);

// Main Tab Navigator
const MainTabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'Dashboard') {
          iconName = focused ? 'home' : 'home-outline';
        } else if (route.name === 'Inventory') {
          iconName = focused ? 'cube' : 'cube-outline';
        } else if (route.name === 'Blocks') {
          iconName = focused ? 'grid' : 'grid-outline';
        } else if (route.name === 'Suppliers') {
          iconName = focused ? 'business' : 'business-outline';
        } else if (route.name === 'Materials') {
          iconName = focused ? 'construct' : 'construct-outline';
        } else if (route.name === 'Orders') {
          iconName = focused ? 'receipt' : 'receipt-outline';
        }

        return <Ionicons name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#007AFF',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Dashboard" component={DashboardScreen} />
    <Tab.Screen name="Inventory" component={InventoryStack} />
    <Tab.Screen name="Blocks" component={BlockStack} />
    <Tab.Screen name="Suppliers" component={SupplierStack} />
    <Tab.Screen name="Materials" component={MaterialStack} />
    <Tab.Screen name="Orders" component={OrderStack} />
  </Tab.Navigator>
);

// Auth Stack
const AuthStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Login" component={LoginScreen} />
  </Stack.Navigator>
);

// Main App Navigator
const AppNavigator = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return null; // Or loading screen
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigator;