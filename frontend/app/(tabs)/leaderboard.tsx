import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import React from 'react';
import { FlatList, StyleSheet, View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';

const leaderboardData = [
  { id: '1', name: 'CoralQueen42', points: 2450 },
  { id: '2', name: 'ReefSaver', points: 2000 },
  { id: '3', name: 'OceanGuardian', points: 1800 },
  { id: '4', name: 'CoralLover', points: 1600 },
  { id: '5', name: 'DiverDude', points: 1400 },
  { id: '6', name: 'SnorkelGal', points: 1200 },
];

const medalEmoji = ['🥇', '🥈', '🥉'];

const router = useRouter(); 

export default function LeaderboardScreen() {
  return (
    <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={()=> {router.push("./")}}>
            <Image
            source={require("../../assets/images/logo.png")}
            style={styles.closeButton}
            />
        </TouchableOpacity>
      <ThemedText type='font_md' style={styles.header}>Leaderboard</ThemedText>
      <FlatList
        data={leaderboardData}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.rank}>
              {index < 3 ? medalEmoji[index] : index + 1}
            </Text>
            <View style={styles.userInfo}>
              <Text style={styles.name}>{item.name}</Text>
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
