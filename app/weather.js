import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, View } from 'react-native';
import AppButton from '../components/AppButton';
import AppText from '../components/AppText';
import Screen from '../components/Screen';
import { useTheme } from '../context/ThemeContext';
import { getForecast, getWeatherByCity } from '../services/weatherApi';

export default function WeatherScreen() {
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const fetchWeatherData = async () => {
    setLoading(true);
    setError(null);

    const weatherResult = await getWeatherByCity('Montreal');
    if (!weatherResult.success) {
      setError(weatherResult.error);
      setLoading(false);
      return;
    }
    setWeather(weatherResult.data);

    const forecastResult = await getForecast('Montreal');
    if (!forecastResult.success) {
      setError(forecastResult.error);
      setLoading(false);
      return;
    }
    setForecast(forecastResult.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  if (loading) {
    return (
      <Screen style={{ backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator size="large" color={theme.primary} />
        <AppText style={[styles.loadingText, { color: theme.text }]}>
          Loading weather data...
        </AppText>
      </Screen>
    );
  }

  if (error) {
    return (
      <Screen style={{ backgroundColor: theme.background, alignItems: 'center', justifyContent: 'center' }}>
        <AppText style={[styles.errorText, { color: theme.error }]}>
          Error: {error}
        </AppText>
        <AppButton 
          title="Retry" 
          onPress={fetchWeatherData}
          style={{ backgroundColor: theme.primary }}
        />
      </Screen>
    );
  }

  return (
    <Screen style={{ backgroundColor: theme.background }}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <AppText style={[styles.title, { color: theme.text }]}>
          Ski Resort Weather
        </AppText>
        
        {weather && (
          <View style={[styles.weatherCard, { backgroundColor: theme.cardBackground }]}>
            <AppText 
              style={[styles.cityName, { color: theme.text }]}
              numberOfLines={1}
              adjustsFontSizeToFit
            >
              {weather.name}
            </AppText>
            <AppText 
              style={[styles.temp, { color: theme.primary }]}
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.5}
            >
              {Math.round(weather.main.temp)}°C
            </AppText>
            <AppText 
              style={[styles.description, { color: theme.textSecondary }]}
              numberOfLines={2}
            >
              {weather.weather[0].description}
            </AppText>
          </View>
        )}

        {forecast && (
          <View style={styles.forecastContainer}>
            <AppText style={[styles.subtitle, { color: theme.text }]}>
              5-Day Forecast
            </AppText>
            {forecast.list.slice(0, 5).map((item) => (
              <View 
                key={item.dt.toString()} 
                style={[styles.forecastItem, { backgroundColor: theme.cardBackground }]}
              >
                <AppText style={{ color: theme.text }}>
                  {new Date(item.dt * 1000).toLocaleDateString()}
                </AppText>
                <AppText style={{ color: theme.primary }}>
                  {Math.round(item.main.temp)}°C
                </AppText>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  weatherCard: {
    padding: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    width: '100%',
    minHeight: 220,
  },
  cityName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    width: '100%',
    textAlign: 'center',
  },
  temp: {
    fontSize: 72,
    fontWeight: 'bold',
    marginVertical: 12,
    width: '100%',
    textAlign: 'center',
    lineHeight: 80, // Important: gives text vertical space
  },
  description: {
    fontSize: 18,
    marginTop: 12,
    textAlign: 'center',
    width: '100%',
  },
  forecastContainer: {
    width: '100%',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  forecastItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  loadingText: {
    marginTop: 16,
  },
  errorText: {
    fontSize: 16,
    marginBottom: 16,
    textAlign: 'center',
  },
});