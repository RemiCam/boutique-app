import React from "react";
import { Text, StyleSheet } from "react-native";

const Title = ({ children, style }) => {
  return <Text style={[styles.title, style]}>{children}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
  },
});

export default Title;