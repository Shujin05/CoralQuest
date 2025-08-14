import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';
import { Modal } from 'react-native';

export default function CourseContent11() {
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
      question: 'Where do zooxanthellae live?',
      answers: ['Inside coral polyps', 'In the water column', 'On the ocean floor', 'Inside fish'],
      correctAnswer: 'Inside coral polyps',
    },
    {
      question: 'What process do zooxanthellae use to provide energy to corals?',
      answers: ['Respiration', 'Digestion', 'Photosynthesis', 'Fermentation'],
      correctAnswer: 'Photosynthesis',
    },
    {
      question: 'What are the products from photsynthesis?',
      answers: ['Oxygen', 'Minerals', 'Sugars and Proteins', 'Nitrogen'],
      correctAnswer: 'Sugars and Proteins',
    },
    {
      question: 'What is the benefit for corals in the relationship with zooxanthellae?',
      answers: ['Protection', 'Nutrients for growth', 'Increased sunlight', 'Increased reproduction'],
      correctAnswer: 'Nutrients for growth',
    },
    {
      question: 'What do corals provide to zooxanthellae?',
      answers: ['Shelter and protection', 'Oxygen', 'Carbon dioxide', 'Food'],
      correctAnswer: 'Shelter and protection',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
              <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Corals & Zooxanthellae</ThemedText>
      
      <View style={styles.contentContainer}>

        <View style={styles.keyPointsList}>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Zooxanthellae live inside <b>coral polyps</b></Text>
        </View>
        <View style={styles.keyPoint}>

        <Image
            source={require("../../assets/images/courses/course11/diagram.png")}
            style={styles.image}
            resizeMode="contain"
        />

        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>•Corals and zooxanthellae have a <b>mutualistic relationship</b>, where both parties benefit</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• The polyp's mouth is surrounded by a <b>circle of tentacles</b>, which help to gather food</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Zooxanthellae undergoes <b>photosynthesis</b> to supply corals with <b>sugars and protein building blocks</b></Text>
        </View>
                <View style={styles.keyPoint}>

        <Image
            source={require("../../assets/images/courses/course11/photosynthesis.png")}
            style={styles.image}
            resizeMode="contain"
        />

        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Corals use these products to build their <b>calcium carbonate skeletons</b></Text>
        </View>
        <View style={styles.keyPoint}>
           <Text style={styles.keyPointText}>• In return, Zooxanthellae receive <b>protection</b> within the coral</Text>
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
