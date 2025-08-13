import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, Image, StyleSheet, Modal, Text } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import QuizTemplate from '@/components/QuizTemplate';
import Colors from '@/constants/Colors';

const CourseContent = ({ title, content, questions, image }) => {
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

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>{title}</ThemedText>

      <View style={styles.contentContainer}>
        {content.map((section, index) => (
          <View key={index} style={styles.keyPointsList}>
            {section.image && <Image source={section.image} style={styles.image} resizeMode="contain" />}
            <ThemedText type="font_md" style={styles.subHeading}>{section.heading}</ThemedText>
            {section.points.map((point, index) => (
              <Text key={index} style={styles.keyPointText}>{point}</Text>
            ))}
          </View>
        ))}
        <ThemedText type="font_md" style={styles.quizText}>🚀 Test Your Knowledge</ThemedText>
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
};

const CourseContent10 = () => {
  const questions = [
    {
      question: 'Corals belong to which phylum?',
      answers: ['Cnidaria', 'Mollusca', 'Annelida', 'Arthropoda'],
      correctAnswer: 'Cnidaria',
    },
    {
      question: 'Which class of corals is known for reef-building abilities?',
      answers: ['Class Anthozoa', 'Class Hydrozoa', 'Class Scyphozoa', 'Class Cubozoa'],
      correctAnswer: 'Class Anthozoa',
    },
    {
      question: 'Which order includes hard corals?',
      answers: ['Order Scleractinia', 'Order Actiniaria', 'Order Alcyonacea', 'Order Hydrozoa'],
      correctAnswer: 'Order Scleractinia',
    },
    {
      question: 'What is a key characteristic of corals in the class Hydrozoa?',
      answers: ['They do not build reefs', 'They form hard skeletons', 'They are solitary', 'They are soft corals'],
      correctAnswer: 'They do not build reefs',
    },
    {
      question: 'What type of corals belong to Order Actiniaria?',
      answers: ['Solitary corals resembling anemones', 'Soft corals', 'Reef-building corals', 'Colonial corals'],
      correctAnswer: 'Solitary corals resembling anemones',
    },
  ];

  const content = [
    {
      heading: 'Phylum',
      points: ['Corals are classified under the phylum Cnidaria'],
      image: require('../../assets/images/courses/course12/classification.png'),
    },
    {
      heading: 'Class',
      points: [
        'Class Anthozoa: includes most reef-building corals, characterised by their ability to produce hard skeletons',
        'Class Hydrozoa: Includes some corals that don’t build reefs',
      ],
    },
    {
      heading: 'Order',
      points: [
        'Order Actiniaria: solitary corals resembling anemones',
        'Order Alcyonacea: soft corals',
        'Order Scleractinia: hard corals',
      ],
    },
  ];

  return <CourseContent title="Coral Taxonomy" content={content} questions={questions} />;
};

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
    textAlign: 'center',
  },
  contentContainer: {
    paddingBottom: 20,
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
  keyPointText: {
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

export default CourseContent10;
