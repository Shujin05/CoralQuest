import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';
import ThemedText from '@/components/text/ThemedText';
import AnimatedButton from '@/components/buttons/AnimatedButton';
import { useRouter } from 'expo-router';
import Colors from '@/constants/Colors';

export default function HomeScreen() {

  const router = useRouter();

  return (
    <SafeAreaView style={styles.uiContainer}>
      <TouchableOpacity onPress={()=> router.push("/profile")}>
      <Image source={require("../../assets/images/logo.png")} style={styles.profileIcon}/>
      </TouchableOpacity>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../assets/images/logo.png')}
          style={styles.logo}
        />
      </View>
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <ThemedText style={styles.largerText}>1250</ThemedText>
          <ThemedText style={styles.smallerText}>points</ThemedText>
        </View>

        <View style={styles.statItem}>
          <ThemedText style={styles.largerText}>7</ThemedText>
          <ThemedText style={styles.smallerText}>day streak</ThemedText>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <AnimatedButton label="Courses" 
        onPress={()=> router.push("/courses")}
        color="#f88379"
        imageSource={require('../../assets/images/logo.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="Daily Challenges" 
        onPress={()=> router.push("/dailyChallenges")}
        color="#f88379"
        imageSource={require('../../assets/images/logo.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="Coral Library" 
        onPress={()=> router.push("/coralLibrary")} 
        color="#f88379"
        imageSource={require('../../assets/images/logo.png')}
        imageSize={52}
        style={styles.button}
        />
        <AnimatedButton label="LeaderBoard" 
        onPress={()=> router.push("/leaderboard")}
        color="#f88379"
        imageSource={require('../../assets/images/logo.png')}
        imageSize={52}
        style={styles.button}
        />
      </View>
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
  logoContainer: {
    marginBottom: 20,
  },
  profileIcon: {
    position: 'absolute', 
    top: 8,
    right: 16,
    width: 30, 
    height: 30, 
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
    paddingVertical: 20,
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
  }
});
