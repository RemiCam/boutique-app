import React, { useState } from "react";
import { StyleSheet } from "react-native";
import Screen from "../components/Screen";
import AppButton from "../components/AppButton";
import AppInput from "../components/AppInput"; // Use reusable AppInput component
import AppText from "../components/AppText"; // Use reusable AppText component

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
      <AppText style={styles.title}>Formulaire</AppText>
      <AppInput
        placeholder="Enter your name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <AppInput
        placeholder="Enter your email"
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      {error ? <AppText style={styles.errorText}>{error}</AppText> : null}
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
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 8,
    textAlign: "center",
  },
});