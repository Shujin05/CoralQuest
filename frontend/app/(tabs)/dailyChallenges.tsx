import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';

// Hardcoded (for now)
const Challenges = [
  { id: '1', name: 'Coral Identification', points: 200, timeLimit: '30 minutes' },
  { id: '2', name: 'Underwater Cleanup', points: 150, timeLimit: '1 hour' },
  { id: '3', name: 'Coral Growth Tracking', points: 250, timeLimit: '45 minutes' },
];

const router = useRouter()

export default function dailyChallenges() {
  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={()=> {router.push("./")}}>
        <Image
        source={require("../../assets/images/logo.png")}
        style={styles.closeButton}
        />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.header}>Daily Challenges</ThemedText>
      <FlatList
        data={Challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.challengeItem}>
            <Text style={styles.challengeName}>{item.name}</Text>
            <View style={styles.challengeDetails}>
              <Text style={styles.challengePoints}>+{item.points} pts</Text>
              <Text style={styles.challengeTime}>Time Limit: {item.timeLimit}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => console.log(`Starting challenge: ${item.name}`)}>
              <Text style={styles.buttonText}>Start Challenge</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
        width: 20,
        height: 20,
        marginBottom: 32,
        marginTop: 10
  }, 
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    alignSelf: 'center',
    color: Colors.primary,
  },
  challengeItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  challengeName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: Colors.primary,
  },
  challengeDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  challengePoints: {
    fontSize: 16,
    color: '#4caf50', 
  },
  challengeTime: {
    fontSize: 16,
    color: '#888',
  },
  button: {
    backgroundColor: '#f88379',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
