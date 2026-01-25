import React from "react";
import { View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import AppText from "../components/AppText";
import AppButton from "../components/AppButton";
import Screen from "../components/Screen";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <Screen>
      <AppText style={styles.title}>Welcome to Frosty Gear!</AppText>
      <AppText style={styles.subtitle}>
        Your one-stop shop for all things **winter sports** and **cozy clothing**. Whether you're hitting the slopes or staying warm by the fire, we’ve got you covered!
      </AppText>
      <View style={styles.buttons}>
        <AppButton
          title="Fill Out Preferences"
          onPress={() => router.push("/form")}
        />
        <AppButton
          title="Browse Winter Essentials"
          onPress={() => router.push("/items")}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 24,
    color: "#555",
    textAlign: "center",
  },
  buttons: {
    marginTop: 16,
    width: "100%",
    alignItems: "center",
  },
});