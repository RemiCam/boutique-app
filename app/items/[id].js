import { useLocalSearchParams } from 'expo-router';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../context/ThemeContext';
import { items } from '../../features/items/items.data';

const { width, height } = Dimensions.get('window');

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const item = items.find((item) => item.id === id);
  const { theme } = useTheme();

  if (!item) {
    return (
      <Screen style={{ backgroundColor: theme.background }}>
        <Text style={[styles.notFoundText, { color: theme.error }]}>
          Oops! Item not found.
        </Text>
      </Screen>
    );
  }

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <Image
        source={item.image}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.infoContainer}>
        <Text style={[styles.title, { color: theme.text }]}>{item.name}</Text>
        <Text style={[styles.price, { color: theme.primary }]}>{item.price}</Text>
        <Text style={[styles.description, { color: theme.textSecondary }]}>
          {item.description}
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: width * 0.9,
    height: height * 0.4,
    marginBottom: 16,
  },
  infoContainer: {
    width: '100%',
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
  notFoundText: {
    fontSize: 18,
    textAlign: 'center',
  },
});