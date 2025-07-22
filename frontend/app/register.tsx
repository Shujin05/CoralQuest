import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Button, Input } from '@rneui/themed';
import Colors from '@/constants/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/components/text/ThemedText';
import supabase from '@/lib/supabaseClient';
import { Link, useRouter } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function signUpWithEmail() {
    if (password !== confirmPassword) {
      Alert.alert('Passwords do not match');
      return;
    }

    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
    if (!session) Alert.alert('Please check your inbox for email verification!');
    setLoading(false);
    router.replace("/(tabs)")
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.innerContainer}
      >
        <View style={styles.logoContainer}>
          <ThemedText type="font_lg" style={styles.title}>
            Welcome to Coral Quest!
          </ThemedText>
          <ThemedText style={styles.subtitle}>
            Sign up to start your coral learning journey today
          </ThemedText>
        </View>

        <View style={styles.form}>
          <Input
            label="Email"
            leftIcon={{ type: 'font-awesome', name: 'envelope' }}
            onChangeText={setEmail}
            value={email}
            placeholder="email@address.com"
            autoCapitalize="none"
            inputContainerStyle={styles.input}
          />

          <Input
            label="Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={setPassword}
            value={password}
            secureTextEntry
            placeholder="Password"
            autoCapitalize="none"
            inputContainerStyle={styles.input}
          />

          <Input
            label="Confirm Password"
            leftIcon={{ type: 'font-awesome', name: 'lock' }}
            onChangeText={setConfirmPassword}
            value={confirmPassword}
            secureTextEntry
            placeholder="Confirm Password"
            autoCapitalize="none"
            inputContainerStyle={styles.input}
          />

          <View style={styles.buttonGroup}>
            <Button
              title="Sign Up"
              disabled={loading}
              onPress={signUpWithEmail}
              buttonStyle={styles.button}
            />
            <ThemedText type="subtitle">
              Already have an account?{' '}
              <Link href="/login" style={{ textDecorationLine: 'underline', fontWeight: 'bold' }}>
                Sign in
              </Link>
            </ThemedText>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
  },
  innerContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
  },
  form: {
    gap: 16,
  },
  input: {
    borderBottomColor: '#ccc',
  },
  buttonGroup: {
    marginTop: 24,
    gap: 12,
  },
  button: {
    backgroundColor: '#f88379',
    borderRadius: 8,
    paddingVertical: 12,
  },
});
