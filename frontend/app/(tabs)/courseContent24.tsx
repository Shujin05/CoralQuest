import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import { Modal } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';

export default function CourseContent24() {
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
      question: 'What is a key function of digitate corals?',
      answers: ['nursery areas for juvenile reef fishes', 'To create deep-sea habitats', 'To regulate water temperature', 'To create sandy beaches'],
      correctAnswer: 'nursery areas for juvenile reef fishes',
    },
    {
      question: 'How does the size of a digitate coral colony change over time?',
      answers: ['It grows taller', 'Its height remains the same', 'It expands horizontally', 'It shrinks in size'],
      correctAnswer: 'Its height remains the same',
    },
    {
      question: 'How do digitate corals extend their colony?',
      answers: ['By producing more branches', 'By increasing their height', 'By spreading horizontally', 'By growing deeper into the ocean floor'],
      correctAnswer: 'By producing more branches',
    },
    {
      question: 'Where are digitate corals typically found?',
      answers: ['Shallow reef environments sheltered from strong wave currents', 'Deep-sea zones', 'Open ocean', 'In areas with high tidal changes'],
      correctAnswer: 'Shallow reef environments sheltered from strong wave currents',
    },
    {
      question: 'What is a characteristic feature of digitate corals?',
      answers: ['Small, un-splitting branches resembling fingers', 'Large, bushy-like structures', 'Flattened, disc-shaped colonies', 'Long, tree-like branches'],
      correctAnswer: 'Small, un-splitting branches resembling fingers',
    },
    {
      question: 'Which coral species is an example of a digitate coral?',
      answers: ['Acropora Digitifera', 'Lobophyllia Corymbosa', 'Pocillopora Damicornis', 'Montipora Capricornis'],
      correctAnswer: 'Acropora Digitifera',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Digitate Corals</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• provide important <b>nursery areas for juvenile reef fishes</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• height of the colony generally <b>does not change</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• coral extends the colony size through <b>adding more branches</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• typically found in <b>shallow reef environments</b>, sheltered from <b>strong wave currents</b></Text>
        </View>
        </View>
      </View>
      
      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>🔎 Identification Tips: </ThemedText>
        <View style={styles.keyPoint}>
              <Text style={styles.keyPointText}>• <b>Small, unsplitting branches</b>, resembling fingers</Text>
        </View>
        <Image 
          source={require("../../assets/images/courses/course24/id_tip1.png")}
          style={styles.image}
          />   
      </View>

      <View style={styles.keyPointsList}>
      <ThemedText type="font_md" style={styles.subHeading}>Examples: </ThemedText>
      <Image 
        source={require("../../assets/images/courses/course24/staghorn.png")}
        style={styles.image}
        />            
      <Text style={styles.imageText}>Staghorn Coral <i>(Acropora Digitifera)</i></Text>

      <Image 
        source={require("../../assets/images/courses/course24/montipora.png")}
        style={styles.image}
        />            
      <Text style={styles.imageText}>Pillar Coral <i>(Montipora digitata)</i></Text>
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
