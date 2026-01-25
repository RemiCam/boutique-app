import React from "react";
import { TextInput, StyleSheet } from "react-native";

const AppInput = ({ value, onChangeText, placeholder, style, ...otherProps }) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      style={[styles.input, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    width: "100%", // Responsive width
  },
});

export default AppInput;