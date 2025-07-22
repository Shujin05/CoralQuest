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
import { Router } from 'expo-router';

AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh();
  } else {
    supabase.auth.stopAutoRefresh();
  }
});

export default function login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter()

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert(error.message);
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
            Welcome Back to CoralQuest!
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

          <View style={styles.buttonGroup}>
            <Button
              title="Sign In"
              disabled={loading}
              onPress={signInWithEmail}
              buttonStyle={styles.button}
            />
            <ThemedText type="subtitle">Don't have an account? <Link href="/register" style={{textDecorationLine: 'underline', fontWeight: "bold"}}>Register now</Link></ThemedText>
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
  outlineButton: {
    backgroundColor: 'transparent',
    borderColor: '#f88379',
    borderWidth: 1,
  },
});
