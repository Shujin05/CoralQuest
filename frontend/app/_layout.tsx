// app/_layout.tsx
import { useFonts } from 'expo-font';
import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider, useAuth } from "@/context/authContext";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

function RootLayoutNav() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // Protect all routes except `/login`
  useEffect(() => {
    if (!loading) {
      const inAuthGroup = ['login', 'register'].includes(segments[0] ?? '');

      if (!session && !inAuthGroup) {
        router.replace('/login');
      } else if (session && inAuthGroup) {
        router.replace('/');
      }
    }
  }, [session, loading, segments]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen name="register" options={{ headerShown: false }} />
    </Stack>
  );
}

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    Fredoka: require("../assets/fonts/Fredoka-Regular.ttf")
  });

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
          <RootLayoutNav />
          <StatusBar style="auto" />
      </AuthProvider>
    </SafeAreaProvider>
  );
}
