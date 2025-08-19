import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import QuizTemplate from '@/components/QuizTemplate';

export default function CourseContent33() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(0);

  const questions = [
    {
      question: 'What distinctive structures give Hydnophora corals their rough, spiky texture?',
      answers: ['Septa', 'Hydnophores', 'Corallites', 'Polyps'],
      correctAnswer: 'Hydnophores',
    },
    {
      question: 'Which growth forms are most typical for Hydnophora?',
      answers: ['Branching and encrusting', 'Massive domes only', 'Delicate fans', 'Columnar spikes'],
      correctAnswer: 'Branching and encrusting',
    },
    {
      question: 'What color patterns are common in Hydnophora corals?',
      answers: [
        'Bright red with blue tips',
        'Green, brown, or yellowish often with contrasting ridge tips',
        'Transparent with no pigmentation',
        'Black and white stripes',
      ],
      correctAnswer: 'Green, brown, or yellowish often with contrasting ridge tips',
    },
    {
      question: 'Where are Hydnophora corals most commonly found?',
      answers: [
        'Shallow, well-lit reef environments',
        'Deep-sea hydrothermal vents',
        'Polar waters',
        'Freshwater rivers',
      ],
      correctAnswer: 'Shallow, well-lit reef environments',
    },
    {
      question: 'What is a common nickname for Hydnophora corals?',
      answers: ['Horn coral', 'Brain coral', 'Leaf coral', 'Cup coral'],
      correctAnswer: 'Horn coral',
    },
  ];

  const handleQuizCompletion = (correctAnswers: number) => {
    const points = 100 * (correctAnswers / questions.length);
    setPointsAwarded(points);
    setScore(correctAnswers);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
    router.push('/(tabs)/courses');
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>

      <ThemedText type="font_md" style={styles.heading}>Hydronopora Genus</ThemedText>

      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
          <ThemedText type="font_md" style={styles.subHeading}>Key Features: </ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <Text style={{fontWeight:'bold'}}>Growth Form:</Text> usually branching or encrusting growth forms.</Text>
          </View> 
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <Text style={{fontWeight:'bold'}}>Texture:</Text> rough due to presence of triangular or conical-shaped protrusions called “hydnophores“</Text>
          </View>
           <Image 
            source={require("../../assets/images/courses/course33/id_tip1.png")}
            style={styles.image}
            />            
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <Text style={{fontWeight:'bold'}}>Color:</Text> colors range from green, brown, to yellowish, often with contrasting ridge tips</Text>
          </View>
          <Image 
            source={require("../../assets/images/courses/course33/id_tip2.png")}
            style={styles.image}
            />            
        </View>
      </View>

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Common Species: </ThemedText>
        <Image 
          source={require("../../assets/images/courses/course33/rigida.png")}
          style={styles.image}
        />            
        <Text style={styles.imageText}>Horn Coral <Text style={{fontStyle:'italic'}}>(Hydnophora Rigida)</Text></Text>
      </View>

      <ThemedText type="font_md" style={styles.quizText}>🚀 Test Your Knowledge</ThemedText>
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
    marginBottom: 5,
    lineHeight: 22,
  }, 
  imageText: {
    textAlign: 'center', 
    color: '#555',
    fontSize: 16, 
    marginBottom: 10,
  }, 
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
    marginTop: 20, 
    borderRadius: 10,
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
