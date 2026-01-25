import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../components/Screen";
import { items } from "../../features/items/items.data"; // Import updated item data

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams(); // Get the dynamic id from the route
  const item = items.find((item) => item.id === id);

  if (!item) {
    return (
      <Screen>
        <Text style={styles.notFoundText}>Oops! The item was not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    color: "#6200ee",
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    lineHeight: 22,
    color: "#555",
  },
  notFoundText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
    marginTop: 32,
  },
});