import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function AppButton({ title, onPress, disabled }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled ? styles.disabled : styles.enabled]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
    marginTop: 16,
  },
  enabled: {
    backgroundColor: "#6200ee",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  text: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});