// CourseContent.tsx

import React from 'react';
import { View, Text, StyleSheet, Image, ImageSourcePropType } from 'react-native';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';

interface CourseContentProps {
  title: string;
  content: { subHeading: string; keyPoints: string[]; imageSrc?: ImageSourcePropType }[];
  quizComponent: JSX.Element;
}

const CourseContent: React.FC<CourseContentProps> = ({ title, content, quizComponent }) => {

  return (
    <View style={styles.contentContainer}>
      <ThemedText type="font_md" style={styles.heading}>{title}</ThemedText>

      {content.map((section, index) => (
        <View key={index}>
          <ThemedText type="font_md" style={styles.subHeading}>{section.subHeading}</ThemedText>
          <View style={styles.keyPointsList}>
            {section.keyPoints.map((point, idx) => (
              <View key={idx} style={styles.keyPoint}>
                {/* Here, apply the formatting method */}
                <Text style={styles.keyPointText}>• {point}</Text>
              </View>
            ))}
          </View>
          {section.imageSrc && (
            <Image
              source={section.imageSrc}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
      ))}
      <View><ThemedText type="font_md" style={styles.quizText}>🚀 Test Your Knowledge  </ThemedText></View>
      {quizComponent}
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingBottom: 20,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center',
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
  boldText: {
    fontWeight: 'bold',
  },
  italicText: {
    fontStyle: 'italic',
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
});

export default CourseContent;