import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, Button } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";

export default function FormScreen() {
  const [name, setName] = useState(""); // Controlled input for Name
  const [email, setEmail] = useState(""); // Controlled input for Email
  const [error, setError] = useState(""); // Error message state

  // Validation logic
  const isFormValid = () => name.trim() !== "" && email.includes("@");

  const handleSubmit = () => {
    // If validation fails, set error
    if (!isFormValid()) {
      setError("Please enter a valid name and email.");
      return;
    }
    // If validation passes, clear error and submit
    setError("");
    alert(`Submitted: \nName: ${name}\nEmail: ${email}`);
  };

  return (
    <Screen>
      <Text style={styles.title}>Formulaire</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <AppButton
        title="Submit"
        onPress={handleSubmit}
        disabled={!isFormValid()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
});