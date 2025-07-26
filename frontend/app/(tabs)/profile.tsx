import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Button } from '@rneui/themed';
import supabase from '@/lib/supabaseClient';
import { useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { Modal } from 'react-native';

export default function ProfileScreen() {
  const router = useRouter();
  const {session, loading} = useAuth()
  const [username, setUsername ] = useState('') 
  const [isBadgeModalVisible, setBadgeModalVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState(null);

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
    { id: '1', name: 'Beginner Diver', icon: require('../../assets/images/badges/beginner_diver.png'), description: 'Welcome to the diving club! You completed your first coral identification challenge.'}, 
    { id: '2', name: 'Species Specialist', icon: require('../../assets/images/badges/species_specialist.png'), description: 'For your deep expertise, you deserve this title. Awarded after completing all units of one species' },
    { id: '3', name: 'One Week Warrior', icon: require('../../assets/images/badges/one_week_warrior.png'), description: 'Consistent is key! Kuddos for maintaining a streak of 7 days'},
    { id: '4', name: 'Coral Champion', icon: require('../../assets/images/badges/coral_champion.png'), description: 'Awarded after completing all the daily challenges for 3 days consecutively'},
    { id: '5', name: 'Garden Guardian', icon: require('../../assets/images/badges/garden_guardian.png'), description: 'Awarded after planting 10 corals in your coral garden.'},
    { id: '6', name: 'Treasure Maniac', icon: require('../../assets/images/badges/treasure_maniac.png'), description: 'Awarded after purchasing 5 decorative elements.'},
    { id: '7', name: 'Growth Form Guru', icon: require('../../assets/images/badges/growth_form_guru.png'), description: 'Awarded after identifying 10 different growth forms of corals.' }
  ];

  const showBadgeModal = (badge) => {
    setSelectedBadge(badge);
    setBadgeModalVisible(true);
  };

  // Function to close badge modal
  const closeBadgeModal = () => {
    setBadgeModalVisible(false);
    setSelectedBadge(null);
  };

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
            <TouchableOpacity onPress={() => showBadgeModal(item)}>
              <View style={styles.badgeItem}>
                <Image source={item.icon} style={styles.badgeIcon} />
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
      <Button
        title="Logout"
        onPress={handleLogout}
        buttonStyle={styles.logoutButton}
        containerStyle={styles.logoutButtonContainer}
      />
      {/* Badge Modal */}
      {selectedBadge && (
        <Modal
          visible={isBadgeModalVisible}
          animationType="slide"
          transparent={true}
          onRequestClose={closeBadgeModal}
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{selectedBadge.name}</Text>
               <View style={styles.badgeItem}>
                <Image source={selectedBadge.icon} style={styles.badgeIcon} />
                <Text style={styles.badgeName}>{selectedBadge.name}</Text>
              </View>
              <Text style={styles.modalDescription}>{selectedBadge.description}</Text>
              <TouchableOpacity onPress={closeBadgeModal} style={styles.closeModalButton}>
                <Text style={styles.closeModalText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
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
    justifyContent: 'center',
    alignItems: 'center', 
  },
  badgeItem: {
    alignItems: 'center',
    flex: 1,
    margin: 16,
    justifyContent: 'center', 
  },
  badgeIcon: {
    width: 80,
    height: 80,
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
   modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#f88379',
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  closeModalButton: {
    backgroundColor: '#f88379',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
