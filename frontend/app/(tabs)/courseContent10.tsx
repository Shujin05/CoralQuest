import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';
import { Modal } from 'react-native';

export default function CourseContent10() {
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
      question: 'Corals are....',
      answers: ['Animals', 'Plants'],
      correctAnswer: 'Animals',
    }, 
    {
      question: 'The building block of coral reefs is...',
      answers: ['Tentacles', 'Polyp', "Nematocysts", "Algae"],
      correctAnswer: 'Polyp',
    }, 
    {
      question: 'Which of the following is not a function of a coral polyp?',
      answers: ['To reproduce', 'To hunt for food', 'To clear away debris', 'To defend against predators'],
      correctAnswer: 'To reproduce',
    },
    {
      question: 'What are the tentacles of corals used for?',
      answers: ['To produce oxygen', 'To capture plankton', 'To build coral reefs', 'To regulate water temperature'],
      correctAnswer: 'To capture plankton',
    },
    {
      question: 'What is the role of nematocysts in corals?',
      answers: ['To help with digestion', 'To paralyse prey', 'To secrete calcium carbonate', 'To protect the coral'],
      correctAnswer: 'To paralyse prey',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
              <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>What is a Coral?</ThemedText>
      
      <View style={styles.contentContainer}>

        <View style={styles.keyPointsList}>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Corals are <b>invetebrate animals</b>, not plants</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Corals are made up of <b>tiny polyps</b> that cluster together to form coral colonies</Text>

          <Image
            source={require("../../assets/images/courses/course10/coral_polyp.webp")}
            style={styles.image}
            resizeMode="contain"
          />

          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• The polyp's mouth is surrounded by a <b>circle of tentacles</b>, which help to gather food</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• The tentacles perform several essential functions:</Text>
          </View>
          <View style={styles.keyPointIndented}>
         <View style={styles.keyPoint}>
           <Text style={styles.keyPointText}>• <b>defence</b>: protects the coral from predators</Text>
         </View>
         <View style={styles.keyPoint}>
           <Text style={styles.keyPointText}> • <b>hunt for food</b>: helps corals capture plankton and small marine organisms</Text>
         </View>
         <View style={styles.keyPoint}>
           <Text style={styles.keyPointText}>• <b>clear away debris</b></Text>
         </View>
        </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Each tentacle is armed with <b>nematocysts</b>, stinging cells that paralyse prey</Text>
          </View>
        </View>
        <ThemedText type="font_md" style={styles.quizText}>🚀 Test Your Knowledge  </ThemedText>
        <QuizTemplate questions={questions} onQuizCompleted={handleQuizCompletion} />
      </View>

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
    height: 350,
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
