import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import { useTheme } from '../../context/ThemeContext';
import { deleteItem, fetchItems } from '../../features/items/itemsSlice';
import { getImage } from '../../utils/imageMapper';

export default function ItemsScreen() {
  const router = useRouter();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  
  const { items, loading, error } = useSelector((state) => state.items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  const handleDelete = (id, name) => {
    Alert.alert(
      'Delete Item',
      `Are you sure you want to delete "${name}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => dispatch(deleteItem(id)),
        },
      ]
    );
  };

  if (loading && items.length === 0) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
        <Text style={[styles.loadingText, { color: theme.text }]}>Loading items...</Text>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: 'red' }]}>Error: {error}</Text>
        <TouchableOpacity 
          style={[styles.retryButton, { backgroundColor: theme.primary }]}
          onPress={() => dispatch(fetchItems())}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  if (items.length === 0) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.emptyText, { color: theme.textSecondary }]}>No items found</Text>
        <TouchableOpacity 
          style={[styles.createButton, { backgroundColor: theme.primary }]}
          onPress={() => router.push('/items/create')}
        >
          <Text style={styles.createButtonText}>+ Create First Item</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  const renderItem = ({ item }) => (
    <View style={[styles.card, { backgroundColor: theme.card }]}>
      <TouchableOpacity
        style={styles.cardContent}
        onPress={() => router.push(`/items/${item._id}`)}
      >
        <Image 
          source={getImage(item.image)} 
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.info}>
          <Text style={[styles.name, { color: theme.text }]} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={[styles.price, { color: theme.primary }]}>${item.price}</Text>
          {item.category && (
            <Text style={[styles.category, { color: theme.textSecondary }]} numberOfLines={1}>
              {item.category}
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.deleteIconButton}
        onPress={() => handleDelete(item._id, item.name)}
      >
        <Text style={styles.deleteIcon}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <TouchableOpacity 
            style={[styles.createButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push('/items/create')}
          >
            <Text style={styles.createButtonText}>+ Create New Item</Text>
          </TouchableOpacity>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 16,
  },
  retryButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  emptyText: {
    fontSize: 16,
    marginBottom: 16,
  },
  list: {
    padding: 16,
  },
  createButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  card: {
    flexDirection: 'row',
    marginBottom: 16,
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  cardContent: {
    flexDirection: 'row',
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
  },
  info: {
    marginLeft: 12,
    justifyContent: 'center',
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 16,
    marginTop: 4,
    fontWeight: '600',
  },
  category: {
    fontSize: 14,
    marginTop: 4,
  },
  deleteIconButton: {
    padding: 8,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 24,
  },
});