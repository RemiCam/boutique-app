import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../context/ThemeContext';
import { store } from '../store';

export default function RootLayout() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="items/index" options={{ title: 'Shop Items' }} />
          <Stack.Screen name="items/[id]" options={{ title: 'Item Details' }} />
        </Stack>
      </ThemeProvider>
    </Provider>
  );
}