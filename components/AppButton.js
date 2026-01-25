import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

const AppButton = ({ title, onPress, disabled }) => {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.button, disabled && styles.disabled]}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#6200ee",
    borderRadius: 5,
    padding: 12,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 8,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
});

export default AppButton;