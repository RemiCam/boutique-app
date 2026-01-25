import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Screen from "../components/Screen";

export default function FormScreen() {
  return (
    <Screen>
      <Text style={styles.text}>Form Screen</Text>
    </Screen>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
});