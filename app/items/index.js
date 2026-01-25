import React from "react";
import { FlatList, Text, StyleSheet, View } from "react-native";
import { useRouter } from "expo-router";
import Screen from "../../components/Screen";

const items = [
  { id: "1", name: "Item 1", price: "$100" },
  { id: "2", name: "Item 2", price: "$200" },
  { id: "3", name: "Item 3", price: "$300" },
];

export default function ItemsListScreen() {
  const router = useRouter();

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text
            onPress={() => router.push(`/items/${item.id}`)}
            style={styles.item}
          >
            {item.name} - {item.price}
          </Text>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  item: {
    fontSize: 18,
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
});