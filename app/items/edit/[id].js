import { useLocalSearchParams, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Screen from '../../../components/Screen';
import { useTheme } from '../../../context/ThemeContext';
import { fetchItems, updateItem } from '../../../features/items/itemsSlice';
import { CreateItemSchema } from '../../../schemas/itemSchemas';

export default function EditItemScreen() {
  const { id } = useLocalSearchParams();
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const router = useRouter();
  const { items, loading } = useSelector((state) => state.items);
  const item = items.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    inStock: true,
  });

  const [errors, setErrors] = useState({});

  // Load item data when component mounts
  useEffect(() => {
    if (items.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, items.length]);

  // Populate form when item is loaded
  useEffect(() => {
    if (item) {
      setFormData({
        name: item.name,
        description: item.description,
        price: item.price.toString(),
        image: item.image,
        category: item.category || '',
        inStock: item.inStock,
      });
    }
  }, [item]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleSubmit = async () => {
    const dataToValidate = {
      ...formData,
      price: parseFloat(formData.price),
    };

    const result = CreateItemSchema.safeParse(dataToValidate);

    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        fieldErrors[err.path[0]] = err.message;
      });
      setErrors(fieldErrors);
      Alert.alert('Validation Error', 'Please fix the errors in the form');
      return;
    }

    try {
      await dispatch(updateItem({ id, updates: result.data })).unwrap();
      Alert.alert('Success', 'Item updated successfully!', [
        { text: 'OK', onPress: () => router.back() },
      ]);
    } catch (error) {
      Alert.alert('Error', error || 'Failed to update item');
    }
  };

  if (!item && loading) {
    return (
      <Screen style={[styles.centerContainer, { backgroundColor: theme.background }]}>
        <ActivityIndicator size="large" color={theme.primary} />
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
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <Text style={[styles.title, { color: theme.text }]}>Edit Item</Text>

          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Name *</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.name ? '#dc2626' : theme.border || '#ddd',
                },
              ]}
              placeholder="Enter item name"
              placeholderTextColor={theme.textSecondary}
              value={formData.name}
              onChangeText={(value) => handleChange('name', value)}
              returnKeyType="next"
            />
            {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
          </View>

          {/* Description Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Description *</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.description ? '#dc2626' : theme.border || '#ddd',
                },
              ]}
              placeholder="Enter item description"
              placeholderTextColor={theme.textSecondary}
              value={formData.description}
              onChangeText={(value) => handleChange('description', value)}
              multiline
              numberOfLines={4}
              returnKeyType="next"
            />
            {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
          </View>

          {/* Price Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Price ($) *</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.price ? '#dc2626' : theme.border || '#ddd',
                },
              ]}
              placeholder="0.00"
              placeholderTextColor={theme.textSecondary}
              value={formData.price}
              onChangeText={(value) => handleChange('price', value)}
              keyboardType="decimal-pad"
              returnKeyType="next"
            />
            {errors.price && <Text style={styles.errorText}>{errors.price}</Text>}
          </View>

          {/* Image Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Image Filename *</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.image ? '#dc2626' : theme.border || '#ddd',
                },
              ]}
              placeholder="e.g., ski_jacket.jpg"
              placeholderTextColor={theme.textSecondary}
              value={formData.image}
              onChangeText={(value) => handleChange('image', value)}
              returnKeyType="next"
            />
            {errors.image && <Text style={styles.errorText}>{errors.image}</Text>}
            <Text style={[styles.helperText, { color: theme.textSecondary }]}>
              Must match a file in assets/images/items/
            </Text>
          </View>

          {/* Category Input */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, { color: theme.text }]}>Category *</Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderColor: errors.category ? '#dc2626' : theme.border || '#ddd',
                },
              ]}
              placeholder="e.g., Jackets, Accessories"
              placeholderTextColor={theme.textSecondary}
              value={formData.category}
              onChangeText={(value) => handleChange('category', value)}
              returnKeyType="done"
            />
            {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
          </View>

          {/* In Stock Switch */}
          <View style={styles.inputGroup}>
            <View style={styles.switchRow}>
              <Text style={[styles.label, { color: theme.text }]}>In Stock</Text>
              <Switch
                value={formData.inStock}
                onValueChange={(value) => handleChange('inStock', value)}
                trackColor={{ false: '#767577', true: theme.primary }}
                thumbColor={formData.inStock ? '#fff' : '#f4f3f4'}
              />
            </View>
          </View>

          {/* Buttons */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton, { backgroundColor: '#6b7280' }]}
              onPress={() => router.back()}
              disabled={loading}
            >
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.submitButton, { backgroundColor: theme.primary }]}
              onPress={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Save Changes</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* Extra padding at bottom */}
          <View style={{ height: 100 }} />
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  errorText: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 4,
  },
  helperText: {
    fontSize: 12,
    marginTop: 4,
    fontStyle: 'italic',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
    gap: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#6b7280',
  },
  submitButton: {
    backgroundColor: '#3b82f6',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});