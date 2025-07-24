import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import supabase from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';

export default function ProfileScreen() {
  const router = useRouter();
  const {session, loading} = useAuth()
  const [username, setUsername ] = useState('') 


    async function getUsername(
    ) {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('username')
          .eq('id', session?.user.id)
          .single(); // Fetch only one record

        if (error) {
          console.error('Error fetching username:', error);
          Alert.alert('Error fetching username', error.message);
          return null;
        }

        return {
          username: data.username
        };
      } catch (error) {
        console.error('Unexpected error:', error);
        return null;
      }
    }

    useEffect(() => {
      if (!session) {
        return;
      }

      const fetchUserStats = async () => {
        const userInfo = await getUsername();
        if (userInfo) {
          setUsername(userInfo.username)
        }
      };

      fetchUserStats();
    }, [session]); 

  const badges = [
    { id: '1', name: 'Beginner Diver', icon: require('../../assets/images/badges/beginner_diver.png') },
    { id: '2', name: 'Species Specialist', icon: require('../../assets/images/badges/species_specialist.png') },
    { id: '3', name: 'One Week Warrior', icon: require('../../assets/images/badges/one_week_warrior.png') },
  ];

  async function handleLogout() {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Logout failed', error.message);
    } else {
      router.replace('/login'); // Navigate to login screen after logout
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => router.push('./')}>
        <Image
          source={require('../../assets/images/back.png')}
          style={styles.closeButton}
        />
      </TouchableOpacity>

      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{username}</Text>
      </View>

      <View style={styles.achievementsContainer}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <FlatList
          data={badges}
          keyExtractor={(item) => item.id}
          numColumns={3}
          contentContainerStyle={styles.badgeGrid}
          renderItem={({ item }) => (
            <View style={styles.badgeItem}>
              <Image source={item.icon} style={styles.badgeIcon} />
              <Text style={styles.badgeName}>{item.name}</Text>
            </View>
          )}
        />
      </View>

      <Button
        title="Logout"
        onPress={handleLogout}
        buttonStyle={styles.logoutButton}
        containerStyle={styles.logoutButtonContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    padding: 20,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#f88379',
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#f88379',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  achievementsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flex: 1,
    elevation: 2,
  },
  badgeGrid: {
    marginTop: 12,
    justifyContent: 'space-between',
  },
  badgeItem: {
    alignItems: 'center',
    flex: 1,
    marginBottom: 16,
  },
  badgeIcon: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  badgeName: {
    fontSize: 12,
    textAlign: 'center',
    color: '#333',
  },
  logoutButtonContainer: {
    marginTop: 20,
  },
  logoutButton: {
    backgroundColor: '#f88379',
    borderRadius: 8,
    paddingVertical: 12,
  },
});
