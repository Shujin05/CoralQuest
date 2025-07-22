import React from 'react';
import { StyleSheet, View, Text, Image, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

const stats = {
  courses: {
    Acropora: 3,
    Montipora: 2,
    Porites: 4,
  },
  dailyChallenges: 18,
};

const badges = [
  { id: '1', name: 'Beginner Diver', icon: require('../../assets/images/logo.png') },
  { id: '2', name: 'Species Specialist', icon: require('../../assets/images/logo.png') },
  { id: '3', name: 'Challenge Champ', icon: require('../../assets/images/logo.png') },
];

const router = useRouter(); 

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=> {router.push("./")}}>
            <Image
            source={require("../../assets/images/back.png")}
            style={styles.closeButton}
            />
        </TouchableOpacity>
      <View style={styles.profileContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>CoralExplorer99</Text>
      </View>

      <View style={styles.statsContainer}>
        <Text style={styles.sectionTitle}>Completed Courses:</Text>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Acropora:</Text>
          <Text style={styles.statValue}>{stats.courses.Acropora}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Montipora:</Text>
          <Text style={styles.statValue}>{stats.courses.Montipora}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Porites:</Text>
          <Text style={styles.statValue}>{stats.courses.Porites}</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Daily Challenges Completed:</Text>
          <Text style={styles.statValue}>{stats.dailyChallenges}</Text>
        </View>
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
    marginTop: 10
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
});
