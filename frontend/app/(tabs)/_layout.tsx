import { Tabs, Slot } from 'expo-router';
import React, {useEffect} from 'react';
import { Platform, View, StyleSheet, ActivityIndicator} from 'react-native';
import {Redirect, Stack} from 'expo-router'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import { useColorScheme } from '@/hooks/useColorScheme';
import {useAuth} from "@/context/authContext"
import { useRouter } from 'expo-router';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const {loading, isLoggedIn} = useAuth();

  const router = useRouter()

  useEffect(() => {
    if (!loading && !isLoggedIn) {
      router.replace('/login');
    }
  }, [loading, isLoggedIn]);

  if (loading || !isLoggedIn) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}} />
        <Stack.Screen name="leaderboard" options={{headerShown: false}} />
        <Stack.Screen name="coralLibrary" options={{headerShown: false}} />
        <Stack.Screen name="dailyChallenges" options={{headerShown: false}} />
        <Stack.Screen name="profile" options={{headerShown: false}} />
      </Stack>      
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensures the container takes up full screen
  },
});