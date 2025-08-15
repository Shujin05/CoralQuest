import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';

export default function CourseContent22() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(0);

  const handleQuizCompletion = (correctAnswers: number) => {
    const points = 100*(correctAnswers/questions.length)
    setPointsAwarded(points)
    setScore(correctAnswers);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    router.push('/(tabs)/courses'); 
  };

  const questions = [
    {
      question: 'What is a key characteristic of columnar corals?',
      answers: ['Fast-growing', 'Dense, slow-growing', 'Small size', 'Shallow habitat'],
      correctAnswer: 'Dense, slow-growing',
    },
    {
      question: 'Columnar corals are commonly found in which type of water?',
      answers: ['Cold water', 'Shallow tropical and subtropical waters', 'Deep-sea trenches', 'Freshwater lakes'],
      correctAnswer: 'Shallow tropical and subtropical waters',
    },
    {
      question: 'What is the primary role of columnar corals in reef ecosystems?',
      answers: ['To create shelter for fish', 'To contribute to the strength of the reef against disturbances', 'To filter water', 'To attract tourists'],
      correctAnswer: 'To contribute to the strength of the reef against disturbances',
    },
    {
      question: 'What is the characteristic shape of columnar corals?',
      answers: ['Dendritic, tree-like shape', 'Pillar, finger-like', 'Round, spherical', 'Flattened discs'],
      correctAnswer: 'Pillar, finger-like',
    },
    {
      question: 'Which coral species is an example of a columnar coral?',
      answers: ['Acropora Palmata', 'Isopora Palifera', 'Pocillopora Damicornis', 'Montipora Capricornis'],
      correctAnswer: 'Isopora Palifera',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Columnar Corals</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• dense, <b>slow-growing</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• can grow to be very <b>large and old</b>, contributes to the <b>strength of the coral reef against disturbances</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>•  more commonly found in <b>shallow tropic an subtropical waters</b></Text>
        </View>
        </View>
      </View>
      
      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>🔎 Identification Tips: </ThemedText>
        <View style={styles.keyPoint}>
              <Text style={styles.keyPointText}>• <b>No secondary branches</b></Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course22/id_tip1.png")}
          style={styles.image}
          />   
        <View style={styles.keyPoint}>
              <Text style={styles.keyPointText}>• <b>Pillar, finger-like</b></Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course22/id_tip2.png")}
          style={styles.image}
          />   
      </View>

      <View style={styles.keyPointsList}>
      <ThemedText type="font_md" style={styles.subHeading}>Examples: </ThemedText>
      <Image 
        source={require("../../assets/images/courses/course22/catch_bowl.png")}
        style={styles.image}
        />            
      <Text style={styles.imageText}>Catch Bowl Coral <i>(Isopora palifera)</i></Text>
      </View>

      <ThemedText type="font_md" style={styles.quizText}>🚀 Test Your Knowledge  </ThemedText>
        <QuizTemplate questions={questions} onQuizCompleted={handleQuizCompletion} />

      <Modal visible={isModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <ThemedText type="font_md" style={styles.modalTitle}>Quiz Completed!</ThemedText>
            <Text style={styles.modalMessage}>You scored {score} out of {questions.length} correct!</Text>
            <Text style={styles.modalPoints}>🎉 + {pointsAwarded} points</Text>

            <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
              <Text style={styles.modalButtonText}>Back to Courses</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
    marginTop: 15,
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
  imageText: {
    textAlign: 'center', 
    color: '#555',
    fontSize: 16, 
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
