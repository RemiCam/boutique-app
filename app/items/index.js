import React from "react";
import { FlatList, Text, StyleSheet, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";
import { items } from "../../features/items/items.data"; // Import the updated items data

export default function ItemsListScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Text style={styles.title}>Winter Essentials</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => router.push(`/items/${item.id}`)} // Navigate to details with item id
            style={styles.itemContainer}
          >
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
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
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  itemPrice: {
    fontSize: 16,
    color: "#6200ee",
    marginTop: 4,
  },
});