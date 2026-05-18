import {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function LoginScreen({navigation}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = () => {
    // TODO: implement authentication
    navigation.replace('Home');
  };

  return (
    <SafeAreaView style={styles.safeArea} edges={['bottom']}>
      <StatusBar barStyle="light-content" backgroundColor="#1A237E" />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          bounces={false}>

          {/* Header gradient */}
          <View
            style={styles.header}>
            <View style={styles.iconBox}>
              <Icon name="clipboard-check-outline" size={36} color="#FFFFFF" />
            </View>
            <Text style={styles.appName}>Inman</Text>
            <Text style={styles.appTagline}>ORDER MANGEMENT</Text>
          </View>

          {/* Form card */}
          <View style={styles.card}>
            <Text style={styles.welcomeTitle}>Welcome back !</Text>
            <Text style={styles.welcomeSubtitle}>Sign in to your account</Text>

            {/* Email field */}
            <Text style={styles.label}>Email Address</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="email-outline"
                size={20}
                color="#9E9E9E"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="ajay@gmail.com"
                placeholderTextColor="#BDBDBD"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>

            {/* Password field */}
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <Icon
                name="lock-outline"
                size={20}
                color="#9E9E9E"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="••••••••••"
                placeholderTextColor="#BDBDBD"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
              />
              <TouchableOpacity
                onPress={() => setShowPassword(prev => !prev)}
                style={styles.eyeIcon}>
                <Icon
                  name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                  size={20}
                  color="#9E9E9E"
                />
              </TouchableOpacity>
            </View>

            {/* Forgot password */}
            <TouchableOpacity style={styles.forgotWrapper}>
              <Text style={styles.forgotText}>Forget password?</Text>
            </TouchableOpacity>

            {/* Sign In button */}
            <TouchableOpacity
              style={styles.signInButton}
              onPress={handleSignIn}
              activeOpacity={0.85}>
              <Text style={styles.signInText}>Sign In  →</Text>
            </TouchableOpacity>

            {/* Register link */}
            <View style={styles.registerRow}>
              <Text style={styles.registerPrompt}>Don't have account? </Text>
              <TouchableOpacity>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },

  // Header
  header: {
    height:'40%',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 40,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    backgroundColor: '#1A237E',
  },
  iconBox: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },
  appName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 1,
  },
  appTagline: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.75)',
    letterSpacing: 3,
    marginTop: 4,
  },

  // Card
  card: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 36,
    paddingBottom: 32,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1A1A1A',
    marginBottom: 6,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: '#9E9E9E',
    marginBottom: 32,
  },

  // Inputs
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 52,
    marginBottom: 20,
    backgroundColor: '#FAFAFA',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#212121',
  },
  eyeIcon: {
    padding: 4,
  },

  // Forgot
  forgotWrapper: {
    alignItems: 'flex-end',
    marginTop: -8,
    marginBottom: 28,
  },
  forgotText: {
    fontSize: 14,
    color: '#1A237E',
    fontWeight: '600',
  },

  // Sign In button
  signInButton: {
    backgroundColor: '#1A237E',
    borderRadius: 12,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 28,
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.5,
  },

  // Register
  registerRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPrompt: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  registerLink: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1A237E',
  },
});

export default LoginScreen;
