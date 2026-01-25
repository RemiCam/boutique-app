import React from "react";
import { Text, StyleSheet } from "react-native";

const AppText = ({ children, style, ...otherProps }) => {
  return (
    <Text style={[styles.text, style]} {...otherProps}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: "#333",
    lineHeight: 22, // Improves readability
  },
});

export default AppText;