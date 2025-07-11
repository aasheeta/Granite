import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

const { width } = Dimensions.get('window');

const DashboardScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [stats, setStats] = useState({
    totalVisits: 12000,
    ordersPerMonth: 350,
    newCustomers: 120,
    newOrders: 90,
  });
  const [bundles, setBundles] = useState({
    available: 542,
    onHold: 132,
    sold: 93,
    reserved: 18,
    returned: 15,
  });
  const { user, logout } = useAuth();

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    // Fetch updated data
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const StatCard = ({ icon, label, value, color, gradientColors }) => (
    <TouchableOpacity style={styles.statCard}>
      <LinearGradient colors={gradientColors} style={styles.statGradient}>
        <View style={styles.statIconContainer}>
          <Ionicons name={icon} size={24} color="#fff" />
        </View>
        <Text style={styles.statValue}>{value.toLocaleString()}</Text>
        <Text style={styles.statLabel}>{label}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  const BundleCard = ({ status, count, color }) => (
    <View style={[styles.bundleCard, { borderLeftColor: color }]}>
      <Text style={styles.bundleCount}>{count}</Text>
      <Text style={styles.bundleStatus}>{status}</Text>
    </View>
  );

  const QuickActionButton = ({ icon, label, onPress, color }) => (
    <TouchableOpacity style={styles.quickAction} onPress={onPress}>
      <View style={[styles.quickActionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={24} color="#fff" />
      </View>
      <Text style={styles.quickActionLabel}>{label}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        <StatCard
          icon="trending-up"
          label="Total Visits"
          value={stats.totalVisits}
          gradientColors={['#667eea', '#764ba2']}
        />
        <StatCard
          icon="bag"
          label="Orders"
          value={stats.ordersPerMonth}
          gradientColors={['#f093fb', '#f5576c']}
        />
        <StatCard
          icon="person-add"
          label="New Customers"
          value={stats.newCustomers}
          gradientColors={['#4facfe', '#00f2fe']}
        />
        <StatCard
          icon="receipt"
          label="New Orders"
          value={stats.newOrders}
          gradientColors={['#43e97b', '#38f9d7']}
        />
      </View>

      {/* Bundles Panel */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inventory Overview</Text>
        <View style={styles.bundleGrid}>
          <BundleCard status="Available" count={bundles.available} color="#22c55e" />
          <BundleCard status="On Hold" count={bundles.onHold} color="#f59e0b" />
          <BundleCard status="Sold" count={bundles.sold} color="#3b82f6" />
          <BundleCard status="Reserved" count={bundles.reserved} color="#8b5cf6" />
          <BundleCard status="Returned" count={bundles.returned} color="#ef4444" />
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          <QuickActionButton
            icon="cube"
            label="Add Bundle"
            color="#667eea"
            onPress={() => navigation.navigate('Inventory', { 
              screen: 'BundleRegister' 
            })}
          />
          <QuickActionButton
            icon="grid"
            label="Add Block"
            color="#f093fb"
            onPress={() => navigation.navigate('Blocks', { 
              screen: 'BlockRegister' 
            })}
          />
          <QuickActionButton
            icon="business"
            label="Add Supplier"
            color="#4facfe"
            onPress={() => navigation.navigate('Suppliers', { 
              screen: 'SupplierRegister' 
            })}
          />
          <QuickActionButton
            icon="construct"
            label="Add Material"
            color="#43e97b"
            onPress={() => navigation.navigate('Materials', { 
              screen: 'MaterialRegister' 
            })}
          />
        </View>
      </View>

      {/* Best Sellers */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Best Sellers</Text>
        <View style={styles.bestSellersContainer}>
          {['Material A', 'Material B', 'Material C'].map((material, index) => (
            <View key={index} style={styles.bestSellerItem}>
              <Text style={styles.bestSellerText}>{material}</Text>
              <View style={styles.bestSellerBadge}>
                <Text style={styles.bestSellerRank}>#{index + 1}</Text>
              </View>
            </View>
          ))}
        </View>
      </View>

      {/* Top Materials in Stock */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Top Materials in Stock</Text>
        <View style={styles.materialsContainer}>
          {['Granite X', 'Quartz Y', 'Marble Z'].map((material, index) => (
            <View key={index} style={styles.materialItem}>
              <View style={styles.materialIcon}>
                <Ionicons name="construct" size={20} color="#667eea" />
              </View>
              <Text style={styles.materialName}>{material}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Messages */}
      <View style={[styles.section, styles.lastSection]}>
        <View style={styles.messagesHeader}>
          <Text style={styles.sectionTitle}>Messages</Text>
          <View style={styles.messageBadge}>
            <Text style={styles.messageBadgeText}>3</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.messagesButton}>
          <Ionicons name="mail" size={20} color="#667eea" />
          <Text style={styles.messagesButtonText}>You have 3 new messages</Text>
          <Ionicons name="chevron-forward" size={20} color="#ccc" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 16,
    color: '#64748b',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 2,
  },
  logoutButton: {
    padding: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 15,
    marginBottom: 20,
  },
  statCard: {
    width: (width - 45) / 2,
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statGradient: {
    padding: 20,
    alignItems: 'center',
  },
  statIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 15,
    borderRadius: 15,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  lastSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 15,
  },
  bundleGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bundleCard: {
    width: (width - 70) / 2,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    alignItems: 'center',
  },
  bundleCount: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 5,
  },
  bundleStatus: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 70) / 2,
    alignItems: 'center',
    marginBottom: 20,
  },
  quickActionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  quickActionLabel: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
  },
  bestSellersContainer: {
    gap: 10,
  },
  bestSellerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
  },
  bestSellerText: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  bestSellerBadge: {
    backgroundColor: '#667eea',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestSellerRank: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  materialsContainer: {
    gap: 10,
  },
  materialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
  },
  materialIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e0e7ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  materialName: {
    fontSize: 16,
    color: '#1e293b',
    fontWeight: '500',
  },
  messagesHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  messageBadge: {
    backgroundColor: '#ef4444',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  messageBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  messagesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f8fafc',
    borderRadius: 10,
  },
  messagesButtonText: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 15,
  },
});

export default DashboardScreen;