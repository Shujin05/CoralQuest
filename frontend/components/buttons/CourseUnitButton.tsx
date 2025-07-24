import React from 'react';
import { TouchableOpacity, Text, View, StyleSheet } from 'react-native';

interface Props {
  title: string;
  icon: string;
  unlocked: boolean;
  completed: boolean;
  onPress: () => void;
}

export const CourseUnitButton = ({ title, icon, unlocked, completed, onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.circle, !unlocked && styles.locked]}
      disabled={!unlocked}
    >
      <Text style={styles.icon}>{icon}</Text>
      {completed && <Text style={styles.checkmark}>✓</Text>}
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#a0e9f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  locked: {
    backgroundColor: '#ccc',
  },
  icon: {
    fontSize: 24,
  },
  title: {
    fontSize: 10,
    textAlign: 'center',
    marginTop: 4,
  },
  checkmark: {
    position: 'absolute',
    top: 4,
    right: 6,
    fontSize: 14,
    color: 'green',
  },
});