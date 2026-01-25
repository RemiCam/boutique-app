import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen style={styles.container}>
      <View style={styles.content}>
        <AppText style={styles.title}>Welcome to {"\n"}Everest Gear</AppText>
        <AppText style={styles.subtitle}>
          Gear up for your next adventure on the slopes. From premium jackets to cozy
          base layers, Everest Gear has everything you need to stay warm and stylish in the freezing outdoors.
        </AppText>
      </View>
      <View style={styles.navButtons}>
        <AppButton
          title="Subscribe"
          onPress={() => router.push("/form")}
          style={styles.button}
        />
        <AppButton
          title="Browse Essentials"
          onPress={() => router.push("/items")}
          style={styles.buttonAlt}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 32,
    backgroundColor: "#e9f5f9", // Cold, light blue background
  },
  content: {
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#003366", // Deep navy blue
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555", // Cool gray color
    textAlign: "center",
    marginVertical: 16,
    lineHeight: 24,
  },
  navButtons: {
    marginTop: 32,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#003366", // Deep navy
    marginBottom: 16,
  },
  buttonAlt: {
    backgroundColor: "#005580", // Lighter navy for alternative button
  },
});