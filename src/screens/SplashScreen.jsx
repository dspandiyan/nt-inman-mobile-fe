import {useEffect} from 'react';
import {View, Text, StyleSheet, StatusBar} from 'react-native';
import {useNavigation} from '@react-navigation/native';

function SplashScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />

      {/* Logo icon box */}
      <View style={styles.iconBox}>
        <Text style={styles.logoIcon}>📦</Text>
      </View>

      {/* App name */}
      <View style={styles.logoContainer}>
        <Text style={styles.logoText}>InMan</Text>
        <Text style={styles.tagline}>ORDER MANAGEMENT</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A237E',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
  },
  iconBox: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    fontSize: 48,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logoText: {
    fontSize: 48,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 6,
  },
  tagline: {
    fontSize: 16,
    color: '#90CAF9',
    marginTop: 8,
    letterSpacing: 1,
  },
});

export default SplashScreen;
