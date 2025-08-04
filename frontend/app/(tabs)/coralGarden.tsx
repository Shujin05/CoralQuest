import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Image } from 'expo-image';
import CoralBackground from '@/components/CoralBackground';
import { useRouter } from 'expo-router';

export default function CoralGarden() {
  const router = useRouter();

  return (
    <CoralBackground>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => { router.push("./"); }}>
          <Image
            source={require("../../assets/images/back.png")}
            style={styles.closeButton}
          />
        </TouchableOpacity>
        
        <TouchableOpacity onPress={() => { router.push("/(tabs)/shop"); }}>
          <Image
            source={require("../../assets/images/coral_garden/background/shop.png")}
            style={styles.shopButton}
          />
        </TouchableOpacity>
      </View>
    </CoralBackground>
  );
};

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    zIndex: 1,
    top: 10, 
    left: 0,
    right: 0,
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    paddingHorizontal: 10, 
  },
  closeButton: {
    width: 20,
    height: 20,
  },
  shopButton: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
