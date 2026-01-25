import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import Title from "../components/Title";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <Title>Welcome to Boutique App!</Title>
      <View style={styles.presentation}>
        <Title style={styles.subtitle}>Explore the boutique items:</Title>
      </View>
      <AppButton title="Go to Form" onPress={() => router.push("/form")} />
      <AppButton title="Go to Items List" onPress={() => router.push("/items")} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  presentation: {
    marginVertical: 16,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
  },
});