import { useRouter } from 'expo-router';
import { StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { useTheme } from '../context/ThemeContext';

export default function HomeScreen() {
  const router = useRouter();
  const { theme, isDark, toggleTheme } = useTheme();

  return (
    <Screen style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <AppText style={[styles.title, { color: theme.text }]}>
          Welcome to {'\n'}Glacier Gear
        </AppText>
        <AppText style={[styles.subtitle, { color: theme.textSecondary }]}>
          Gear up for your next adventure on the slopes. From premium jackets to cozy
          base layers, Glacier Gear has everything you need to stay warm and stylish.
        </AppText>
      </View>
      
      <AppButton
        title={isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}
        onPress={toggleTheme}
        style={[styles.themeButton, { backgroundColor: theme.secondary }]}
      />

      <View style={styles.navButtons}>
        <AppButton
          title="Fill Out Preferences"
          onPress={() => router.push('/form')}
          style={{ backgroundColor: theme.primary }}
        />
        <AppButton
          title="Browse Essentials"
          onPress={() => router.push('/items')}
          style={{ backgroundColor: theme.secondary }}
        />
        <AppButton
          title="Check Weather"
          onPress={() => router.push('/weather')}
          style={{ backgroundColor: theme.secondary }}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  content: {
    marginVertical: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginVertical: 16,
    lineHeight: 24,
  },
  navButtons: {
    marginTop: 32,
    width: '100%',
    alignItems: 'center',
  },
  themeButton: {
    marginBottom: 16,
  },
});