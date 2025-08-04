import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';

type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

type QuizTemplateProps = {
  questions: Question[];
  onQuizCompleted: (score: number) => void;
};

const QuizTemplate: React.FC<QuizTemplateProps> = ({ questions, onQuizCompleted }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answerStatus, setAnswerStatus] = useState<'correct' | 'incorrect' | null>(null); // Track answer status

  const currentQuestion = questions[questionIndex];

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer);
  };

  const handleNext = () => {
    if (selectedAnswer === null) {
      Alert.alert('Please select an answer');
      return;
    }

    // Check if the answer is correct
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
      setAnswerStatus('correct');
    } else {
      setAnswerStatus('incorrect');
    }

    if (questionIndex < questions.length - 1) {
      setTimeout(() => {
        setQuestionIndex(questionIndex + 1);
        setSelectedAnswer(null);
        setAnswerStatus(null); 
      }, 500); 
    } else {
      setTimeout(() => {
        onQuizCompleted(score + (isCorrect ? 1 : 0));
      }, 500);
    }
  };

  return (
    <View style={styles.quizContainer}>
      <Text style={styles.questionText}>{currentQuestion.question}</Text>

      {currentQuestion.answers.map((answer, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.answerButton,
            selectedAnswer === answer && styles.selectedAnswer,
            answerStatus === 'correct' && selectedAnswer === answer && styles.correctAnswer,
            answerStatus === 'incorrect' && selectedAnswer === answer && styles.incorrectAnswer,
          ]}
          onPress={() => handleAnswerSelect(answer)}
          disabled={answerStatus !== null} 
        >
          <ThemedText
            type="font_md"
            style={
              selectedAnswer === answer
                ? answerStatus === 'correct'
                  ? styles.correctAnswerText
                  : answerStatus === 'incorrect'
                  ? styles.incorrectAnswerText
                  : styles.selectedAnswerText
                : styles.answerText
            }
          >
            {answer}
          </ThemedText>
        </TouchableOpacity>
      ))}

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <ThemedText type="font_md" style={styles.nextButtonText}>
          {questionIndex < questions.length - 1 ? 'Next' : 'Finish Quiz'}
        </ThemedText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  quizContainer: {
    padding: 20,
    backgroundColor: Colors.lightBg,
    borderRadius: 10,
    marginTop: 20,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.primary,
  },
  answerButton: {
    backgroundColor: "white",
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
  },
  selectedAnswer: {
    backgroundColor: Colors.primary,
  },
  correctAnswer: {
    backgroundColor: 'green',
  },
  incorrectAnswer: {
    backgroundColor: 'red',
  },
  answerText: {
    color: Colors.primary,
    fontSize: 16,
    textAlign: 'center',
  },
  selectedAnswerText: {
    color: "white",
    fontSize: 16,
    textAlign: 'center',
  },
  correctAnswerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  incorrectAnswerText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  nextButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: 'white',
    fontSize: 18,
  },
});

export default QuizTemplate;
