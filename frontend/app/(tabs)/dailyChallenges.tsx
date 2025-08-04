import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/context/authContext';
import { Alert } from 'react-native';

interface Challenge {
  id: string;
  name: string;
  points: number;
  route: string;
}

const DailyChallenges: React.FC = () => {
  const {session, loading} = useAuth(); 
  const router = useRouter();
  const [challenges, setChallenges] = useState<Challenge[] | null>(null)
  
  async function getChallenges(): Promise<Challenge[] | null> {
    try {
      const { data, error } = await supabase
        .from('daily_challenge')
        .select('*')
        .limit(3); 

      if (error) {
        console.error('Error fetching challenges:', error);
        Alert.alert('Error fetching challenges', error.message);
        return null;
      }

      return data; 
    } catch (error) {
      console.error('Unexpected error:', error);
      return null;
    }
  }

  useEffect(() => {
      if (!session) {
        return;
      }
  
      const fetchAccessories = async () => {
        const challenge_data = await getChallenges();
        if (challenge_data) {
          console.log(challenge_data);
          setChallenges(challenge_data);
        }
      };
  
      fetchAccessories();
    }, [session]); 

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("./"); }}>
        <Image
          source={require("../../assets/images/back.png")}
          style={styles.closeButton}
        />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.header}>Daily Challenges</ThemedText>
      <FlatList
        data={challenges}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Challenge }) => (
          <View style={styles.challengeItem}>
            <Text style={styles.challengeName}>{item.name}</Text>
            <View style={styles.challengeDetails}>
              <Text style={styles.challengePoints}>+{item.points} pts</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => router.push(item.route)}>
              <Text style={styles.buttonText}>Start Challenge</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default DailyChallenges;

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
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