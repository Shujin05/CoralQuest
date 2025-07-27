import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import React, { useState } from 'react';
import { View, Text, Modal, Pressable, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const coralScenarios = [
  {
    id: 1,
    image: require('../../assets/images/logo.png'),
    clue: 'This coral appears pale and has lost its vibrant colors.',
    correctAnswer: 'Bleaching',
    options: ['Bleaching', 'Disease', 'Pollution'],
    explanation: 'This is coral bleaching, often caused by elevated sea temperatures.'
  },
  {
    id: 2,
    image: require('../../assets/images/logo.png'),
    clue: 'Green algae is covering the surface of the coral.',
    correctAnswer: 'Pollution',
    options: ['Disease', 'Pollution', 'Bleaching'],
    explanation: 'Algae overgrowth can be due to nutrient pollution from human activities.'
  },
];

export default function ReefDetectivePage() {
  const [showIntro, setShowIntro] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [feedback, setFeedback] = useState('');

  const currentScenario = coralScenarios[currentIndex];

  const handleSelect = (option) => {
    setSelected(option);
    if (option === currentScenario.correctAnswer) {
      setFeedback('Correct! ' + currentScenario.explanation);
    } else {
      setFeedback('Oops! Incorrect. ' + currentScenario.explanation);
    }
  };

  const nextScenario = () => {
    setSelected(null);
    setFeedback('');
    if (currentIndex + 1 < coralScenarios.length) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowSuccess(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Intro Modal */}
      <Modal visible={showIntro} transparent animationType="slide">
        <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <ThemedText type="font_lg" style={styles.modalTitle}>Reef Detective</ThemedText>
          <ThemedText type="font_md" style={styles.modalSubtitle}>
            Welcome, Detective. The ocean is calling.
          </ThemedText>
          <ThemedText style={styles.modalText}>🕵️ Your mission: dive into fragile reef ecosystems and uncover the threats endangering the reef. </ThemedText>
          <Pressable style={styles.button} onPress={() => setShowIntro(false)}>
            <Text style={styles.buttonText}>Start Mission</Text>
          </Pressable>
          </View>
        </View>
      </Modal>

      {/* Success Modal */}
      <Modal visible={showSuccess} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>✅ Mission Success!</Text>
          <Text style={styles.modalText}>You’ve successfully identified all coral issues. Great job, Reef Detective!</Text>
          <Pressable style={styles.button} onPress={() => setShowSuccess(false)}>
            <Text style={styles.buttonText}>Finish</Text>
          </Pressable>
        </View>
      </Modal>

      {/* Game Content */}
      <Image source={currentScenario.image} style={styles.image} />
      <Text style={styles.clue}>🔎{currentScenario.clue}</Text>
      <View style={styles.optionsContainer}>
        {currentScenario.options.map((option) => (
          <Pressable
            key={option}
            style={[styles.option, selected === option && styles.selectedOption]}
            onPress={() => handleSelect(option)}
            disabled={!!feedback}
          >
            <Text>{option}</Text>
          </Pressable>
        ))}
      </View>
      {feedback && (
        <>
          <Text style={styles.feedback}>{feedback}</Text>
          <Pressable style={styles.button} onPress={nextScenario}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: Colors.lightBg,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 15,
  },
  clue: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: '600',
  },
  optionsContainer: {
    marginVertical: 10,
  },
  option: {
    padding: 12,
    marginVertical: 5,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  selectedOption: {
    backgroundColor: '#b2dfdb',
  },
  feedback: {
    marginVertical: 15,
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 30,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
    textAlign: 'center',
  },
  modalText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 20,
    textAlign: 'left',
  },
  button: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    }, 
    modalSubtitle: {
        padding:10, 
        textAlign: 'center'
    }
});
