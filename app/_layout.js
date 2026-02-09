import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from '../context/ThemeContext';

export default function Layout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ title: 'Glacier Gear' }} />
          <Stack.Screen name="form" options={{ title: 'Form' }} />
          <Stack.Screen name="items/index" options={{ title: 'Items' }} />
          <Stack.Screen name="items/[id]" options={{ title: 'Details' }} />
          <Stack.Screen name="weather" options={{ title: 'Weather' }} />
        </Stack>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}