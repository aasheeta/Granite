import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  RefreshControl,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { inventoryAPI, materialAPI } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

const BundleListScreen = ({ navigation }) => {
  const [bundles, setBundles] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    material: '',
    block: '',
    bundle: '',
    status: '',
  });
  const { logout } = useAuth();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [bundlesResponse, materialsResponse] = await Promise.all([
        inventoryAPI.getBundles(),
        materialAPI.getMaterials(),
      ]);
      setBundles(bundlesResponse.data);
      setMaterials(materialsResponse.data);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      Alert.alert('Error', 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  const filteredBundles = bundles.filter(bundle => {
    const matchesSearch = !searchQuery || 
      bundle.material?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.block?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bundle.bundle?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilters = 
      (!filters.material || bundle.material === filters.material) &&
      (!filters.block || bundle.block?.includes(filters.block)) &&
      (!filters.bundle || bundle.bundle?.includes(filters.bundle)) &&
      (!filters.status || bundle.status === filters.status);

    return matchesSearch && matchesFilters;
  });

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'available': return '#22c55e';
      case 'on hold': return '#f59e0b';
      case 'sold': return '#3b82f6';
      case 'reserved': return '#8b5cf6';
      case 'returned': return '#ef4444';
      default: return '#64748b';
    }
  };

  const clearFilters = () => {
    setFilters({
      material: '',
      block: '',
      bundle: '',
      status: '',
    });
    setSearchQuery('');
  };

  const BundleCard = ({ item }) => (
    <TouchableOpacity style={styles.bundleCard}>
      <View style={styles.cardHeader}>
        <View style={styles.cardTitleContainer}>
          <Ionicons name="cube-outline" size={20} color="#667eea" />
          <Text style={styles.cardTitle}>{item.material}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) }]}>
          <Text style={styles.statusText}>{item.status || 'Available'}</Text>
        </View>
      </View>
      
      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Block:</Text>
          <Text style={styles.infoValue}>{item.block || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Bundle:</Text>
          <Text style={styles.infoValue}>{item.bundle || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Quality:</Text>
          <Text style={styles.infoValue}>{item.quality || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Thickness:</Text>
          <Text style={styles.infoValue}>{item.thickness || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Finish:</Text>
          <Text style={styles.infoValue}>{item.finish || 'N/A'}</Text>
        </View>
        {item.priceSqMt && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price:</Text>
            <Text style={styles.priceValue}>₹{item.priceSqMt}/Sq.Mt</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );

  const FilterModal = () => (
    <Modal
      visible={showFilters}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>Filters</Text>
          <TouchableOpacity onPress={() => setShowFilters(false)}>
            <Ionicons name="close" size={24} color="#64748b" />
          </TouchableOpacity>
        </View>

        <View style={styles.filterForm}>
          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Material</Text>
            <View style={styles.pickerContainer}>
              <TouchableOpacity style={styles.picker}>
                <Text style={styles.pickerText}>
                  {filters.material || 'Select Material'}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#64748b" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Block</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="Enter block number"
              value={filters.block}
              onChangeText={(text) => setFilters({ ...filters, block: text })}
            />
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Bundle</Text>
            <TextInput
              style={styles.filterInput}
              placeholder="Enter bundle number"
              value={filters.bundle}
              onChangeText={(text) => setFilters({ ...filters, bundle: text })}
            />
          </View>

          <View style={styles.filterGroup}>
            <Text style={styles.filterLabel}>Status</Text>
            <View style={styles.statusFilter}>
              {['Available', 'On Hold', 'Sold', 'Reserved', 'Returned'].map((status) => (
                <TouchableOpacity
                  key={status}
                  style={[
                    styles.statusFilterButton,
                    filters.status === status && styles.statusFilterButtonActive
                  ]}
                  onPress={() => setFilters({ ...filters, status: status === filters.status ? '' : status })}
                >
                  <Text style={[
                    styles.statusFilterText,
                    filters.status === status && styles.statusFilterTextActive
                  ]}>
                    {status}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        <View style={styles.filterActions}>
          <TouchableOpacity style={styles.clearButton} onPress={clearFilters}>
            <Text style={styles.clearButtonText}>Clear All</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.applyButton} 
            onPress={() => setShowFilters(false)}
          >
            <Text style={styles.applyButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bundle List</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('BundleRegister')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search and Filter */}
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#64748b" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search bundles..."
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>
        <TouchableOpacity 
          style={styles.filterButton}
          onPress={() => setShowFilters(true)}
        >
          <Ionicons name="filter" size={20} color="#667eea" />
        </TouchableOpacity>
      </View>

      {/* Results Count */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredBundles.length} bundle{filteredBundles.length !== 1 ? 's' : ''} found
        </Text>
        {(searchQuery || Object.values(filters).some(f => f)) && (
          <TouchableOpacity onPress={clearFilters}>
            <Text style={styles.clearFiltersText}>Clear filters</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Bundle List */}
      <FlatList
        data={filteredBundles}
        keyExtractor={(item) => item._id || item.id}
        renderItem={({ item }) => <BundleCard item={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="cube-outline" size={64} color="#cbd5e1" />
            <Text style={styles.emptyTitle}>No bundles found</Text>
            <Text style={styles.emptyMessage}>
              {bundles.length === 0 
                ? "Start by adding your first bundle"
                : "Try adjusting your search or filters"
              }
            </Text>
            {bundles.length === 0 && (
              <TouchableOpacity
                style={styles.emptyButton}
                onPress={() => navigation.navigate('BundleRegister')}
              >
                <Text style={styles.emptyButtonText}>Add Bundle</Text>
              </TouchableOpacity>
            )}
          </View>
        }
      />

      <FilterModal />
    </View>
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
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#667eea',
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1e293b',
    marginLeft: 10,
    height: 44,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: '#f1f5f9',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#64748b',
  },
  clearFiltersText: {
    fontSize: 14,
    color: '#667eea',
    fontWeight: '500',
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  bundleCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 15,
  },
  cardTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e293b',
    marginLeft: 10,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  cardBody: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#1e293b',
    fontWeight: '500',
    flex: 2,
    textAlign: 'right',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  priceLabel: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  priceValue: {
    fontSize: 18,
    color: '#667eea',
    fontWeight: 'bold',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginTop: 20,
    marginBottom: 10,
  },
  emptyMessage: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 30,
  },
  emptyButton: {
    backgroundColor: '#667eea',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  emptyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  filterForm: {
    flex: 1,
    padding: 20,
  },
  filterGroup: {
    marginBottom: 25,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 10,
  },
  filterInput: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    color: '#1e293b',
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
  },
  picker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
  },
  pickerText: {
    fontSize: 16,
    color: '#64748b',
  },
  statusFilter: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  statusFilterButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statusFilterButtonActive: {
    backgroundColor: '#667eea',
    borderColor: '#667eea',
  },
  statusFilterText: {
    fontSize: 14,
    color: '#64748b',
  },
  statusFilterTextActive: {
    color: '#fff',
  },
  filterActions: {
    flexDirection: 'row',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    gap: 15,
  },
  clearButton: {
    flex: 1,
    backgroundColor: '#f1f5f9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  clearButtonText: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '600',
  },
  applyButton: {
    flex: 1,
    backgroundColor: '#667eea',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  applyButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
});

export default BundleListScreen;