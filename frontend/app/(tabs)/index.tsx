import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/components/text/ThemedText';
import AnimatedButton from '@/components/buttons/AnimatedButton';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';
import { useState } from 'react';
import { useAuth } from '@/context/authContext';
import supabase from '@/lib/supabaseClient';
import { Alert } from 'react-native';
import { Modal, Pressable } from 'react-native';
import { useEffect } from 'react';
import { View, Image } from 'react-native';
import {  Circle, Text as SvgText, TextPath, TSpan, G, Svg } from 'react-native-svg';
import React, { Component } from 'react';

interface UserStats {
  daily_streak: number;
  points: number;
}

interface Coral {
  id: string;
  name: string;
  image: any;
  description: string;
}

export default function HomeScreen() {
  const router = useRouter();
  const [streak, setStreak] = useState<number>(0);
  const [points, setPoints] = useState<number>(0);
  const { session, loading } = useAuth();
  const [dailyCoral, setDailyCoral] = useState<Coral | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    if (!session) {
      return;
    }

    const fetchUserStats = async () => {
      const userStats = await getUserStats(session.user.id);
      if (userStats) {
        setStreak(userStats.daily_streak);
        setPoints(userStats.points);
      }
    };

    fetchUserStats();
  }, [session]); 

  async function getUserStats(userId: string): Promise<UserStats | null> {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('daily_streak, points')
        .eq('id', userId)
        .single(); // Fetch only one record

      if (error) {
        console.error('Error fetching user data:', error);
        Alert.alert('Error fetching user data', error.message);
        return null;
      }

      return {
        daily_streak: data.daily_streak,
        points: data.points,
      };
    } catch (error) {
      console.error('Unexpected error:', error);
      return null;
    }
  }

  //hardcoded coral list 
  const coralList = [
    {
      id: '1',
      name: 'Acropora humilis',
      image: require('../../assets/images/dailyChallenge1/acropora.png'),
      description: 'A branching coral found in shallow reefs...',
    },
    {
      id: '2',
      name: 'Montipora digitata',
      image: require('../../assets/images/dailyChallenge1/montipora.png'),
      description: 'A finger-like coral that thrives in high-light areas...',
    },
  ];

  // get a random coral each day 
  const getDailyCoral = () => {
    const today = new Date();
    const dayOfYear = Math.floor(
      (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    );
    return coralList[dayOfYear % coralList.length];
  };

  useEffect(() => {
    const coral = getDailyCoral();
    setDailyCoral(coral);
  }, []);

  return (
    <SafeAreaView style={styles.uiContainer}>
      <ScrollView>
      <View style={styles.iconContainer}>
        <TouchableOpacity onPress={()=> router.push("/profile")}>
          <Image source={require("../../assets/images/logo.png")} style={styles.profileIcon}/>
        </TouchableOpacity>
      </View>
        {dailyCoral && (
      <View style={styles.coralContainer}>
          <ThemedText type="font_lg" style={styles.coralTitle}>Coral of the Day</ThemedText>
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.coralCard}>
            <Image source={dailyCoral.image} style={styles.coralImage} />
          </TouchableOpacity>
          <ThemedText type="font_md" style={styles.coralName}>{dailyCoral.name}</ThemedText>
        </View>
        )}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText style={styles.largerText}>{points}</ThemedText>
          <ThemedText style={styles.smallerText}>points</ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText style={styles.largerText}>{streak}</ThemedText>
          <ThemedText style={styles.smallerText}>day streak</ThemedText>
        </View>
      </View>
      <View>
          <TouchableOpacity onPress={() => router.push('/(tabs)/coralGarden')}>
            <Image
              source={require('../../assets/images/homepage/garden_button.png')}
              style={styles.gardenButtonImage}
            />
          </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <AnimatedButton label="Courses" 
        onPress={()=> router.push("/courses")}
        color="#f88379"
        imageSource={require('../../assets/images/homepage/courses.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="Daily Challenges" 
        onPress={()=> router.push("/dailyChallenges")}
        color="#f88379"
        imageSource={require('../../assets/images/homepage/daily_challenges.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="Coral Library" 
        onPress={()=> router.push("/coralLibrary")} 
        color="#f88379"
        imageSource={require('../../assets/images/homepage/coral_library.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="LeaderBoard" 
        onPress={()=> router.push("/leaderboard")}
        color="#f88379"
        imageSource={require('../../assets/images/homepage/leaderboard.png')}
        imageSize={52}
        style={styles.button}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Image source={dailyCoral?.image} style={styles.modalImage} />
            <ThemedText style={styles.modalTitle}>{dailyCoral?.name}</ThemedText>
            <ThemedText style={styles.modalDescription}>{dailyCoral?.description}</ThemedText>
            <Pressable onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <ThemedText style={{ color: 'white' }}>Close</ThemedText>
            </Pressable>
          </View>
        </View>
      </Modal>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.lightBg,
  },
  iconContainer: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 16,
    right: 16,
    zIndex: 10,
  }, 
  coralContainer: {
    marginBottom: 20,
    alignItems: 'center'
  },
  profileIcon: {
    width: 45, 
    height: 45, 
    borderRadius: 12,
  }, 
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 40,
  },
  buttonContainer: {
    flexDirection: 'row', 
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 20,
    paddingVertical: 5,
  },
  statItem: {
    alignItems: 'center',
  },
  largerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  smallerText: {
    fontSize: 16,
    textTransform: 'lowercase',
  },
  button: {
    width: 140,
    height: 140, 
    justifyContent: 'center',
    alignItems: 'center',
  }, 
  coralCard: {
    alignItems: 'center',
    justifyContent: 'center',  
    marginBottom: 20,
    width: 180,  
    height: 180,
    borderRadius: 90,
    backgroundColor: Colors.primary,
    padding: 5,
  },
  gardenButtonImage: {
    width: '90%',  
    height: 120, 
    resizeMode: 'contain', 
    alignSelf:'center'
  },
  coralImage: {
    width: 120,
    height: 120,
    borderRadius: 60,  
    resizeMode: 'cover', 
  },

coralName: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
},
coralTitle: {
  fontSize: 24,
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 5,
},


modalOverlay: {
  flex: 1,
  backgroundColor: 'rgba(0,0,0,0.5)',
  justifyContent: 'center',
  alignItems: 'center',
},

modalContent: {
  width: '85%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 20,
  alignItems: 'center',
},

modalImage: {
  width: 220,
  height: 150,
  borderRadius: 12,
  marginBottom: 16,
},

modalTitle: {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 10,
  color: Colors.primary
},

modalDescription: {
  fontSize: 16,
  textAlign: 'center',
  marginBottom: 20,
},

closeButton: {
  backgroundColor: Colors.primary,
  paddingHorizontal: 20,
  paddingVertical: 10,
  borderRadius: 10,
},
});
