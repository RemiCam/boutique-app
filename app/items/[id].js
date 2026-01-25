import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../components/Screen";

const items = [
  { id: "1", name: "Item 1", price: "$100", description: "High-quality item" },
  { id: "2", name: "Item 2", price: "$200", description: "Exclusive product" },
  { id: "3", name: "Item 3", price: "$300", description: "Best seller" },
];

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const item = items.find((item) => item.id === id);

  if (!item) {
    return (
      <Screen>
        <Text style={styles.errorText}>Item not found!</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.text}>Price: {item.price}</Text>
      <Text style={styles.text}>Description: {item.description}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
  },
  text: {
    fontSize: 18,
    marginBottom: 8,
  },
  errorText: {
    fontSize: 18,
    color: "red",
  },
});