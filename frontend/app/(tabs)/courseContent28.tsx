import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';

export default function CourseContent28() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(0);

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

  const questions = [
    {
      question: 'What is a key characteristic of submassive corals?',
      answers: ['They have thick, low-lying structures', 'They form large, dome-shaped colonies', 'They have tall, branching growth', 'They grow in dense clusters'],
      correctAnswer: 'They have thick, low-lying structures',
    },
    {
      question: 'Where are submassive corals typically found?',
      answers: ['In deep, calm waters', 'In shallow, high-energy reef environments', 'In sheltered lagoons', 'In mangrove ecosystems'],
      correctAnswer: 'In shallow, high-energy reef environments',
    },
    {
      question: 'How do submassive corals extend their colony?',
      answers: ['By growing in low, thick structures', 'By spreading out in plate-like layers', 'By developing vertical branches', 'By growing along the substrate'],
      correctAnswer: 'By growing in low, thick structures',
    },
    {
      question: 'Why are submassive corals adapted to high-energy environments?',
      answers: ['Their thick, low-lying structure provides stability in rough waters', 'Their branches absorb more sunlight', 'Their flat shape reduces wave impact', 'They are better at outcompeting other corals'],
      correctAnswer: 'Their thick, low-lying structure provides stability in rough waters',
    },
    {
      question: 'What is a common feature of submassive corals when viewed under the microscope?',
      answers: ['Dense, compact polyps with thick skeletal structures', 'Thick, bushy formations with long branches', 'Thin, plate-like structures with soft, flexible textures', 'A smooth, rounded surface'],
      correctAnswer: 'Dense, compact polyps with thick skeletal structures',
    },
    {
      question: 'Which coral species is an example of a submassive coral?',
      answers: ['Porites', 'Acropora Digitifera', 'Pocillopora Damicornis', 'Montipora Capricornis'],
      correctAnswer: 'Porites',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Submassive Corals</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• have thick, <b>low-lying structures</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• typically found in <b>shallow waters</b> and <b>rocky substrates</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• known to withstand <b>environmental stressors</b> like sedimentation</Text>
          </View>
        </View>
      </View>

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>🔎 Identification Tips: </ThemedText>
        <View style={styles.keyPoint}>
          <Text style={styles.keyPointText}>• <b>small columns, knobs or wedges</b> potruding from an encrusting base</Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course27/id_tip1.png")}
          style={styles.image}
        />   
      </View>

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Examples: </ThemedText>
        <Image 
          source={require("../../assets/images/courses/course27/bubble.png")}
          style={styles.image}
        />            
        <Text style={styles.imageText}>Bubble Coral <i>(Plerogyra sinuosa)</i></Text>
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
