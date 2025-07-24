import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import { CourseUnitButton } from '@/components/buttons/CourseUnitButton';

export default function CoursePage() {
  const [progress, setProgress] = useState<{ [unitId: string]: boolean }>({});
    // hard-coded courses 
  const courseUnits = [
    {
        id: 'unit1',
        title: 'Coral Shapes',
        icon: '🌿',
    },
    {
        id: 'unit2',
        title: 'Color Variants',
        icon: '🎨',
    },
    {
        id: 'unit3',
        title: 'Acropora Basics',
        icon: '🔬',
    },
    ];

  useEffect(() => {
    // Replace with fetch from Supabase
    setProgress({
      unit1: true,   // completed
      unit2: false,  // unlocked but not completed
      // unit3 and beyond remain locked
    });
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Learn Coral ID 🌊</Text>
      {courseUnits.map((unit, index) => {
        const unlocked = index === 0 || progress[courseUnits[index - 1].id];
        const completed = !!progress[unit.id];

        return (
          <CourseUnitButton
            key={unit.id}
            title={unit.title}
            icon={unit.icon}
            unlocked={unlocked}
            completed={completed}
            onPress={() => {
              // navigate to unit lesson page
              console.log(`Start ${unit.title}`);
            }}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});