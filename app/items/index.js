import { useRouter } from 'expo-router';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import Screen from '../../components/Screen';
import { useTheme } from '../../context/ThemeContext';
import { items } from '../../features/items/items.data';

export default function ItemsListScreen() {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <Text style={[styles.title, { color: theme.text }]}>Winter Essentials</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/items/${item.id}`)}
            style={[styles.itemContainer, { backgroundColor: theme.cardBackground }]}
          >
            <View>
              <Text style={[styles.itemName, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.itemPrice, { color: theme.primary }]}>
                {item.price}
              </Text>
            </View>
          </Pressable>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 8,
    borderRadius: 8,
  },
  itemName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemPrice: {
    fontSize: 16,
    marginTop: 4,
  },
});