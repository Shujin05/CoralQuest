import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function CourseContent20() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Introduction to Growth Forms</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>

          <ThemedText type="font_md" style={styles.subHeading}>What are growth forms?</ThemedText>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>the physical shapes and structures that corals can take as they grow, which include:</Text>
        </View>
        
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Branching</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Columnar</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Corymbose</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Digitate</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Encrusting</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Foliose</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Laminar</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Massive</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Tabulate</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Solitary</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Submassive</Text>
        </View>
        </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    padding: 16,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center'
  },
  contentContainer: {
    paddingBottom: 20,
  },
  description: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    lineHeight: 24,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  keyPointsList: {
    paddingLeft: 15,
  },
  keyPoint: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    lineHeight: 22,
  },
  keyPointText: {
    color: '#555',
    fontSize: 16, 
  }, 
  keyPointIndented: {
    paddingLeft: 35, 
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop: 20, 
    borderRadius: 10,
  },
  quizButton: {
    marginTop: 20, 
    backgroundColor: Colors.primary, 
    borderRadius: 10, 
    alignItems: 'center', 
  }, 
  quizText: {
    color: Colors.primary, 
    fontSize: 20, 
    marginTop: 20, 
    marginBottom: 5, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }, 
   modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalPoints: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
