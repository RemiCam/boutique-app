import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../components/Screen';
import { useTheme } from '../../context/ThemeContext';
import { deleteItem, fetchItems } from '../../features/items/itemsSlice';
import { getImage } from '../../utils/imageMapper';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const IMAGE_WIDTH = SCREEN_WIDTH - 32;

export default function ItemDetailScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { items, loading, error } = useSelector((state) => state.items);
  const item = items.find((item) => item._id === id);
  
  const [imageHeight, setImageHeight] = useState(300);

  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  useEffect(() => {
    if (item?.image) {
      const imageSource = getImage(item.image);
      
      if (typeof imageSource === 'number') {
        const { width, height } = Image.resolveAssetSource(imageSource);
        const aspectRatio = width / height;
        const calculatedHeight = IMAGE_WIDTH / aspectRatio;
        setImageHeight(Math.min(calculatedHeight, 400));
      }
    }
  }, [item]);

  const handleDelete = () => {
    Alert.alert(
      'Delete Item',
      'Are you sure you want to delete this item?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await dispatch(deleteItem(id));
            router.back();
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
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

  if (!item) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <Text style={[styles.errorText, { color: theme.text }]}>Item not found</Text>
        <TouchableOpacity 
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={() => router.back()}
        >
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </Screen>
    );
  }

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          <Image 
            source={getImage(item.image)} 
            style={[styles.image, { height: imageHeight }]}
            resizeMode="contain"
          />
        </View>
        
        <View style={styles.content}>
          <Text style={[styles.name, { color: theme.text }]}>{item.name}</Text>
          <Text style={[styles.price, { color: theme.primary }]}>${item.price}</Text>
          
          {item.category && (
            <View style={[styles.categoryBadge, { backgroundColor: theme.primary + '20' }]}>
              <Text style={[styles.category, { color: theme.primary }]}>
                {item.category}
              </Text>
            </View>
          )}
          
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {item.description}
          </Text>
          
          {item.inStock !== undefined && (
            <View style={styles.stockContainer}>
              <View style={[
                styles.stockBadge, 
                { backgroundColor: item.inStock ? '#dcfce7' : '#fee2e2' }
              ]}>
                <Text style={[styles.stock, { color: item.inStock ? '#16a34a' : '#dc2626' }]}>
                  {item.inStock ? '✓ In Stock' : '✗ Out of Stock'}
                </Text>
              </View>
            </View>
          )}

          {/* Edit Button */}
          <TouchableOpacity 
            style={[styles.editButton, { backgroundColor: theme.primary }]}
            onPress={() => router.push(`/items/edit/${item._id}`)}
          >
            <Text style={styles.buttonText}>✏️ Edit Item</Text>
          </TouchableOpacity>

          {/* Delete Button */}
          <TouchableOpacity 
            style={[styles.deleteButton, { backgroundColor: '#dc2626' }]}
            onPress={handleDelete}
          >
            <Text style={styles.buttonText}>🗑️ Delete Item</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingBottom: 32,
  },
  imageContainer: {
    width: '100%',
    backgroundColor: '#f9fafb',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    borderRadius: 12,
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 12,
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 16,
  },
  category: {
    fontSize: 14,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 16,
  },
  stockContainer: {
    marginBottom: 24,
  },
  stockBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  stock: {
    fontSize: 16,
    fontWeight: '600',
  },
  errorText: {
    fontSize: 16,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  button: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButton: {
    marginTop: 16,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  editButton: {
    marginTop: 16,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  deleteButton: {
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});