import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';

export default function CourseContent25() {
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
        question: 'What is a key characteristic of encrusting corals?',
        answers: ['They grow along or over the existing substrate', 'They grow tall with vertical branches', 'They develop large, bushy structures', 'They live in deep-sea habitats'],
        correctAnswer: 'They grow along or over the existing substrate',
    },
    {
        question: 'Why are encrusting corals less susceptible to breakage compared to branching corals?',
        answers: ['They have a more compact structure', 'They are deeper in the water', 'They grow taller', 'They grow on soft substrates'],
        correctAnswer: 'They have a more compact structure',
    },
    {
        question: 'Where are encrusting corals typically found?',
        answers: ['In hard, rocky surfaces and high wave current environments', 'In shallow sandy beaches', 'In deep, calm waters', 'In mangrove ecosystems'],
        correctAnswer: 'In hard, rocky surfaces and high wave current environments',
    },
    {
        question: 'How do encrusting corals compete with other organisms?',
        answers: ['By outgrowing existing living substrates like sponges and other corals', 'By releasing toxic substances', 'By attracting more fish for protection', 'By forming large colonies'],
        correctAnswer: 'By outgrowing existing living substrates like sponges and other corals',
    },
    {
        question: 'What is a common feature of encrusting corals when viewed under the microscope?',
        answers: ['They have small, un-splitting branches resembling fingers', 'They have large, bushy structures', 'They have long, tree-like branches', 'They are disk-shaped with a smooth surface'],
        correctAnswer: 'They have small, un-splitting branches resembling fingers',
    },
    {
        question: 'Which of the following is an example of an encrusting coral species?',
        answers: ['Pore Coral (Montipora Aquituberculata)', 'Acropora Digitifera', 'Lobophyllia Corymbosa', 'Pocillopora Damicornis'],
        correctAnswer: 'Pore Coral (Montipora Aquituberculata)',
    },
    ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Encrusting Corals</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• grow <b>along or over</b> the existing substrate</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• do not extend <b>vertically</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• effective at <b>out-competing existing living substrate</b> (such as sponges and other corals)</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>less susceptible to breakage</b> due to storm conditions compared to branching</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• typically found in <b>hard rocky surfaces</b> and <b>high wave current environments</b></Text>
        </View>
        </View>
      </View>
      
      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>🔎 Identification Tips: </ThemedText>
        <View style={styles.keyPoint}>
              <Text style={styles.keyPointText}>• <b>Thin, plate-like</b> corals</Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course25/id_tip1.png")}
          style={styles.image}
          />   
      </View>

      <View style={styles.keyPointsList}>
      <ThemedText type="font_md" style={styles.subHeading}>Examples: </ThemedText>
      <Image 
        source={require("../../assets/images/courses/course25/pore_coral.png")}
        style={styles.image}
        />            
      <Text style={styles.imageText}>Pore Coral <i>(Montipora Aquituberculata)</i></Text>
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
