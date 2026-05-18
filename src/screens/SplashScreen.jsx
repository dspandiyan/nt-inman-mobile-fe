import {useEffect} from 'react';
import {View, Text,Image, StyleSheet, StatusBar} from 'react-native';
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
           <Image
            source={require('../Assets/Group.png')}
            style={{ height: 30, width: 30 }}
            />
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
    borderRadius: 20,
    backgroundColor: '#3b5093c9',
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
    color: '#ffffffff',
    marginTop: 8,
    letterSpacing: 1,
  },
});

export default SplashScreen;
