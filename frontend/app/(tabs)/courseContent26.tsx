import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';

export default function CourseContent26() {
  const router = useRouter();
  const [score, setScore] = useState<number | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [pointsAwarded, setPointsAwarded] = useState<number | null>(0);

  const handleQuizCompletion = (correctAnswers: number) => {
    const points = 100*(correctAnswers/questions.length);
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
      question: 'What is a key characteristic of foliose corals?',
      answers: ['They have thin, leaf-like structures', 'They grow along or over the substrate', 'They form tall, tree-like branches', 'They live in deep-sea habitats'],
      correctAnswer: 'They have thin, leaf-like structures',
    },
    {
      question: 'Where are foliose corals typically found?',
      answers: ['In shallow, sheltered reef environments', 'In deep ocean trenches', 'In open ocean waters', 'In mangrove ecosystems'],
      correctAnswer: 'In shallow, sheltered reef environments',
    },
    {
      question: 'How do foliose corals extend their colony?',
      answers: ['By spreading out in a flat, plate-like manner', 'By developing vertical branches', 'By forming large bush-like structures', 'By growing along the substrate'],
      correctAnswer: 'By spreading out in a flat, plate-like manner',
    },
    {
      question: 'Why are foliose corals more vulnerable to storm damage compared to encrusting corals?',
      answers: ['They have large, flat surfaces that can be easily torn by strong currents', 'They grow deeper into the substrate', 'They are smaller in size', 'They form dense colonies'],
      correctAnswer: 'They have large, flat surfaces that can be easily torn by strong currents',
    },
    {
      question: 'What is a common feature of foliose corals when viewed under the microscope?',
      answers: ['Thin, leaf-like structures with a soft, flexible texture', 'Thick, bushy formations', 'Long, tree-like branches', 'A smooth, disk-shaped surface'],
      correctAnswer: 'Thin, leaf-like structures with a soft, flexible texture',
    },
    {
      question: 'Which coral species is an example of a foliose coral?',
      answers: ['Favia Speciosa', 'Acropora Digitifera', 'Pocillopora Damicornis', 'Montipora Capricornis'],
      correctAnswer: 'Favia Speciosa',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Foliose Corals</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• have <b>thin, leaf-like structures</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• grow <b>in a flat, plate-like manner</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• typically found in <b>shallow, sheltered reef environments</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• more <b>vulnerable to storm damage</b> compared to encrusting corals</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• often <b>flexible</b> and <b>soft</b> in texture</Text>
          </View>
        </View>
      </View>

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>🔎 Identification Tips: </ThemedText>
        <View style={styles.keyPoint}>
          <Text style={styles.keyPointText}>• <b>Thin, plate-like</b> corals with soft, flexible structures</Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course26/id_tip1.png")}
          style={styles.image}
        />   
      </View>

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Examples: </ThemedText>
        <Image 
          source={require("../../assets/images/courses/course26/whorled.png")}
          style={styles.image}
        />            
        <Text style={styles.imageText}>Whorled Leptoseris <i>(Leptoseris Foliosa)</i></Text>
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
