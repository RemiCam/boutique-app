import React from "react";
import { Text, View, StyleSheet, Image, Dimensions } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Screen from "../../components/Screen";
import { items } from "../../features/items/items.data";

// Get screen width for dynamic responsiveness
const { width, height } = Dimensions.get("window");

export default function ItemDetailsScreen() {
  const { id } = useLocalSearchParams();
  const item = items.find((item) => item.id === id);

  if (!item) {
    return (
      <Screen style={styles.container}>
        <Text style={styles.notFoundText}>Oops! Item not found.</Text>
      </Screen>
    );
  }

  return (
    <Screen style={styles.container}>
      <Image
        source={item.image}
        style={styles.image} // Style for dynamic resizing
        resizeMode="contain" // Ensure the entire image is shown without cropping
      />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.price}>{item.price}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9ff", // Frosty, cold blue background
    paddingHorizontal: 16,
    paddingVertical: 32,
    alignItems: "center", // Center all content horizontally
  },
  image: {
    width: width * 0.9, // 90% of screen width for responsiveness
    height: height * 0.4, // Take 40% of the screen height for the image
    marginBottom: 16, // Space below the image for other content
  },
  infoContainer: {
    width: "100%", // Full width container for text
    paddingHorizontal: 12,
    alignItems: "center", // Center-align the text
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#003366", // Deep navy
    textAlign: "center",
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: "600",
    color: "#004580", // A lighter navy
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: "#555", // Neutral dark gray
    textAlign: "center",
    lineHeight: 24,
  },
  notFoundText: {
    fontSize: 18,
    color: "red",
    textAlign: "center",
  },
});