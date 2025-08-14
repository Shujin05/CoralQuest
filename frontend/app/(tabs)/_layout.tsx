import { Tabs, Slot } from 'expo-router';
import React, {useEffect} from 'react';
import { Platform, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Redirect, Stack} from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import {useAuth} from "@/context/authContext"
import { useRouter } from 'expo-router';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const {loading, session} = useAuth();

  const router = useRouter()

  useEffect(() => {
    if (!loading && !session) {
      router.replace('/login');
    }
  }, [loading, session]);

  if (loading || !session) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
      <Stack>
          <Stack.Screen name="index" options={{headerShown: false}} />
          <Stack.Screen name="profile" options={{headerShown: false}} />
          <Stack.Screen name="leaderboard" options={{headerShown: false}} />
          <Stack.Screen name="coralLibrary" options={{headerShown: false}} />
          <Stack.Screen name="dailyChallenges" options={{headerShown: false}} />
          <Stack.Screen name="dailyChallenge1" options={{ headerShown: false }} />
          <Stack.Screen name="dailyChallenge2" options={{ headerShown: false }} />
          <Stack.Screen name="dailyChallenge3" options={{ headerShown: false }} />
          <Stack.Screen name="courses" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent10" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent11" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent12" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent13" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent14" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent20" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent21" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent22" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent23" options={{ headerShown: false }} />
          <Stack.Screen name="courseContent24" options={{ headerShown: false }} />
          <Stack.Screen name="coralGarden" options={{ headerShown: false }} />
          <Stack.Screen name="shop" options={{ headerShown: false }} />
      </Stack>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up full screen
  },
});

