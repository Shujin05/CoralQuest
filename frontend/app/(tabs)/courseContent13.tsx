import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';
import { Modal } from 'react-native';

export default function CourseContent13() {
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
      question: 'What is a key characteristic of soft corals?',
      answers: [
        'Tentacles in multiples of 6',
        'No calcium carbonate structure, soft-bodied',
        'Form large reef structures',
        'Contain small polyps with hard skeletons',
      ],
      correctAnswer: 'No calcium carbonate structure, soft-bodied',
    },
    {
      question: 'Which of the following is true about hard corals?',
      answers: [
        'Tentacles in multiples of 8',
        'They do not produce calcium carbonate',
        'Polyps can retract for protection',
        'They only grow in deep waters',
      ],
      correctAnswer: 'Polyps can retract for protection',
    },
    {
      question: 'What is the primary component of the skeleton in hard corals?',
      answers: [
        'Calcium carbonate',
        'Chitin',
        'Sodium chloride',
        'Calcium phosphate',
      ],
      correctAnswer: 'Calcium carbonate',
    },
    {
      question: 'Which group of corals is known for having larger polyps?',
      answers: [
        'Large Polyp Stony Coral (LPS)',
        'Small Polyp Stony Coral (SPS)',
        'Soft corals',
        'All of the above',
      ],
      correctAnswer: 'Large Polyp Stony Coral (LPS)',
    },
    {
      question: 'Which of the following is NOT a characteristic of soft corals?',
      answers: [
        'Tentacles in multiples of 8',
        'Soft-bodied with no external skeleton',
        'Contain calcium carbonate skeletons',
        'Can produce chemical defenses',
      ],
      correctAnswer: 'Contain calcium carbonate skeletons',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
              <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Soft vs Hard Corals</ThemedText>
      
      <View style={styles.contentContainer}>
        <ThemedText type="font_md" style={styles.subHeading}>Soft Corals</ThemedText>

        <Image
            source={require("../../assets/images/courses/course13/soft_corals.png")}
            style={styles.image}
            resizeMode="contain"
        />

        <View style={styles.keyPointsList}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• tentacles in <b>multiples of 8</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• no calcium carbonate structure, <b>soft-bodied</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• contains <b>small calcareous sclerites</b> in their body instead of a hard external skeleton</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• do not always have <b>symbiotic zooxanthellae</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• do <b>not</b> form reefs</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• deter predators using <b>chemical defence</b></Text>
        </View>
        <View style={styles.keyPoint}>

        </View>
        <ThemedText type="font_md" style={styles.subHeading}>Hard Corals</ThemedText>
        <Image
            source={require("../../assets/images/courses/course13/hard_corals.png")}
            style={styles.image}
            resizeMode="contain"
        />
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• tentacles in <b>multiples of 6</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• produces a skeleton-like structure made up of <b>calcium carbonate</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• coral polyps can <b>retreat for protection</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>dead skeletons</b> become anchoring points for new corals, forming the basis of coral reefs</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• further separated into 2 groups: </Text>
        </View>

        <View style={styles.keyPointIndented}>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Large Polyp Stony Coral (LPS)</b></Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Small Polyp Stony Coral (SPS)</b></Text>
        </View>
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
