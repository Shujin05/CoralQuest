import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';
import QuizTemplate from '@/components/QuizTemplate';
import { useState } from 'react';
import { Modal } from 'react-native';

export default function CourseContent14() {
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
      question: 'What is a major threat to coral reefs caused by human activities?',
      answers: [
        'Overfishing',
        'Coral harvesting',
        'Coastal development',
        'All of the above',
      ],
      correctAnswer: 'All of the above',
    },
    {
      question: 'How does global warming impact coral reefs?',
      answers: [
        'Increases coral growth rates',
        'Causes coral bleaching due to zooxanthellae expulsion',
        'Improves coral reproduction',
        'Decreases sea temperatures',
      ],
      correctAnswer: 'Causes coral bleaching due to zooxanthellae expulsion',
    },
    {
      question: 'What is the impact of ocean acidification on corals?',
      answers: [
        'It enhances calcium carbonate formation for coral skeletons',
        'It reduces the availability of dissolved salts needed for calcium carbonate structure',
        'It helps coral grow faster',
        'It has no impact on corals',
      ],
      correctAnswer: 'It reduces the availability of dissolved salts needed for calcium carbonate structure',
    },
    {
      question: 'Which of the following is a form of physical damage to coral reefs?',
      answers: [
        'Destructive fishing practices',
        'Rising sea temperatures',
        'Ocean acidification',
        'Overfishing',
      ],
      correctAnswer: 'Destructive fishing practices',
    },
    {
      question: 'What effect does pollution have on coral reefs?',
      answers: [
        'Improves water quality for coral growth',
        'Increases algal growth on corals',
        'Reduces coral bio-diversity',
        'Has no effect on coral reefs',
      ],
      correctAnswer: 'Increases algal growth on corals',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
              <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Threats to Corals</ThemedText>
      <Image
            source={require("../../assets/images/courses/course14/percentage.png")}
            style={styles.image}
            resizeMode="contain"
        />
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>It is estimated that <b>88%</b> of Southeast Asia’s coral reefs are <b>threatened by human activities</b></Text>
        </View>
        <ThemedText type="font_md" style={styles.subHeading}>Threats</ThemedText>
        
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Physical damage or destruction: </b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• coastal development</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• destructive fishing practices</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• boat anchors</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• tourists touching or removing corals</Text>
        </View>
        </View>

        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Global Warming: </b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Rising sea temperatures places stress on corals, causing corals to expel zooxanthellae</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Without zooxanthellae, corals lose their coloration, a condition known as coral bleaching</Text>
        </View>
        </View>

        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Ocean Acidification: </b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• reduces the availability of dissolved salts and ions to form the coral's calcium carbonate structure</Text>
        </View>
        </View>

        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Pollution:</b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Sedimentation from coastal development</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Toxic substances from industrial discharges</Text>
        </View>
        <View style={styles.keyPoint}>
          <Text style={styles.keyPointText}>• Trash and micro-plastics from improper disposal</Text>
        </View>
        </View>

        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Overfishing:</b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Alters food-web structure</Text>
        </View>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Example: Overfishing reduces the numbers of grazing fish that keep corals clean of algal overgrowth</Text>
        </View>
        </View>

        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• <b>Coral harvesting:</b></Text>
        </View>
        <View style={styles.keyPointIndented}>
        <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• The over-harvesting of specific species reduces coral bio-diversity</Text>
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
