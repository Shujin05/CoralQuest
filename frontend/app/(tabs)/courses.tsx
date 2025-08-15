import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';

interface Course {
  id: string;
  title: string;
  units: string[]; 
}

const courses: Course[] = [
  {
    id: '1',
    title: '📖 Introduction to Coral',
    units: [
      'What is a Coral?',
      'Corals and Zooxanthellae',
      'Coral Taxonomy', 
      'Soft vs Hard Corals',
      'Threats to Coral Reefs',
    ],
  },
  {
    id: '2',
    title: '🪸 Coral Growth Forms',
    units: [
      'Introduction to Growth Forms',
      'Branching Corals',
      'Columnar Corals',
      'Corymbose Corals',
      'Digitate Corals',
      'Encrusting Corals',
      'Foliose Corals',
      'Laminar Corals',
      'Massive Corals',
      'Tabulate Corals',
      'Solitary Corals',
      'Submassive Corals',
      'Identification Quiz 1',
      'Identification Quiz 2',
    ],
  },
  {
    id: '3',
    title: '🔍 Coral Genus and Species Identification',
    units: [
      'Introduction to Genus',
      'Acropora Genus',
      'Porites Genus',
      'Favia Genus',
      'Pocillopora Genus',
      'Montipora Genus',
      'Mussa Genus',
      'Goniopora Genus',
    ],
  },
  {
    id: '4',
    title: '🌊 Coral Conservation and Restoration',
    units: [
      'Why Protect Corals?', 
      'Coral Ecosystems',
      'Conservation Methods',
      'Marine Protected Areas',
      'Coral Restoration Techniques',
      'Climate Change and Resilience',
    ],
  },
];

export default function CourseList(): JSX.Element {
  const router = useRouter();
  const [expandedCourseId, setExpandedCourseId] = useState<string | null>(null); 

  const handleCoursePress = (courseId: string) => {
    setExpandedCourseId(prev => (prev === courseId ? null : courseId));
  };

  const handleUnitPress = (courseId: string, index: number) => {
    router.push(`/courseContent${courseId}${index}`);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("./"); }}>
        <Image
          source={require("../../assets/images/back.png")}
          style={styles.closeButton}
        />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Coral Courses</ThemedText>
      <FlatList
        data={courses}
        keyExtractor={(item) => item.id}
        renderItem={({ item }: { item: Course }) => (
          <View>
            <TouchableOpacity
              style={styles.courseCard}
              onPress={() => handleCoursePress(item.id)}
            >
              <ThemedText style={styles.courseTitle}>{item.title}</ThemedText>
            </TouchableOpacity>
            {expandedCourseId === item.id && (
              <View style={styles.dropdownContainer}>
                {item.units.map((unit, index) => (
                  <TouchableOpacity 
                    key={index} 
                    style={styles.unitItem}
                    onPress={() => handleUnitPress(item.id, index)} 
                  >
                    <ThemedText type="font_sm" style={styles.unitText}>  • {unit}</ThemedText>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: Colors.lightBg,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: Colors.primary,
  },
  courseCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  courseTitle: {
    fontSize: 18,
    color: Colors.primary,
    fontWeight: 'bold',
  },
  dropdownContainer: {
    paddingLeft: 20,
    paddingTop: 10,
    backgroundColor: Colors.lightBg,
    marginBottom: 20,
  },
  unitItem: {
    paddingVertical: 5,
    backgroundColor: Colors.primary,
    borderRadius: 15,
    margin: 5,
  },
  unitText: {
    fontSize: 16,
    color: '#ffffff',
  },
});
