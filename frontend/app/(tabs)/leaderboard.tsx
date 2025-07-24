import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/context/authContext';

export default function LeaderboardScreen() {
  const medalEmoji = ['🥇', '🥈', '🥉'];
  const [leaderboardData, setLeaderboardData] = useState([])
  const {session, loading} = useAuth()
  const router = useRouter(); 

useEffect(() => {
  const fetchLeaderboardData = async () => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('id, username, points')
        .order('points', { ascending: false }) // Sort by descending order
        .limit(5); // top 5 users

      if (error) {
        console.error('Error fetching leaderboard data:', error);
        return;
      }

      setLeaderboardData(data);
      console.log(data)
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };
  fetchLeaderboardData();
}, []);

  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=> {router.push("./")}}>
            <Image
            source={require("../../assets/images/back.png")}
            style={styles.closeButton}
            />
        </TouchableOpacity>
      <ThemedText type='font_md' style={styles.header}>Leaderboard</ThemedText>
      <FlatList
        data={leaderboardData}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>
              {index < 3 ? medalEmoji[index] : index + 1}
            </Text>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.username}</Text>
              <Text style={styles.points}>{item.points} pts</Text>
            </View>
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
    marginBottom: 10,
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
  listContent: {
    paddingBottom: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  rank: {
    fontSize: 22,
    fontWeight: 'bold',
    width: 40,
    textAlign: 'center',
    color: Colors.primary, 
  },
  userInfo: {
    marginLeft: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.primary,
  },
  points: {
    fontSize: 10,
    color: Colors.primary,
  },
});
