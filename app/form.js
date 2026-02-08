import { useState } from 'react';
import { StyleSheet } from 'react-native';
import AppButton from '../components/AppButton';
import AppInput from '../components/AppInput';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { useTheme } from '../context/ThemeContext';
import { validateForm } from '../utils/validation';

export default function FormScreen() {
  const { theme } = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({ name: '', email: '' });

  const handleSubmit = () => {
    const result = validateForm({ name, email });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors({
        name: fieldErrors.name?.[0] || '',
        email: fieldErrors.email?.[0] || '',
      });
      return;
    }

    setErrors({ name: '', email: '' });
    alert(`Submitted: \nName: ${name}\nEmail: ${email}`);
  };

  const handleNameChange = (text) => {
    setName(text);
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: '' }));
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: '' }));
    }
  };

  const isFormValid = () => {
    const result = validateForm({ name, email });
    return result.success;
  };

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <AppText style={[styles.title, { color: theme.text }]}>
        Please Fill Out the Form
      </AppText>

      <AppInput
        placeholder="Enter your name"
        value={name}
        onChangeText={handleNameChange}
        style={{ backgroundColor: theme.cardBackground, color: theme.text }}
      />
      {errors.name ? (
        <AppText style={[styles.errorText, { color: theme.error }]}>
          {errors.name}
        </AppText>
      ) : null}

      <AppInput
        placeholder="Enter your email"
        value={email}
        onChangeText={handleEmailChange}
        style={{ backgroundColor: theme.cardBackground, color: theme.text }}
      />
      {errors.email ? (
        <AppText style={[styles.errorText, { color: theme.error }]}>
          {errors.email}
        </AppText>
      ) : null}

      <AppButton
        title="Submit"
        onPress={handleSubmit}
        disabled={!isFormValid()}
        style={{ backgroundColor: theme.primary }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16,
  },
  errorText: {
    fontSize: 14,
    marginBottom: 8,
  },
});