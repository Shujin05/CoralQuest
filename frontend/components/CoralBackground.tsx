import { View, StyleSheet, Dimensions, LayoutChangeEvent } from 'react-native';
import React, { forwardRef, useState, useImperativeHandle } from 'react';
import { Image as ExpoImage } from 'expo-image';

const { width, height } = Dimensions.get('window');

type Props = {
  children?: React.ReactNode;
};

export type CoralBackgroundRef = {
  getLayout: () => { y: number; height: number };
};

const CoralBackground = forwardRef<CoralBackgroundRef, Props>(({ children }, ref) => {
  const [rugPos, setRugPos] = useState({ y: 0, height: 0 });

  const handleLayout = (event: LayoutChangeEvent) => {
    const { y, height } = event.nativeEvent.layout;
    setRugPos({ y, height });
    console.log('Image position:', { y, height });
  };

  useImperativeHandle(ref, () => ({
    getLayout: () => rugPos,
  }));

  return (
    <View style={styles.container}>
      {/* Sand / Bottom (in front of the coral reef) */}
      <View style={styles.sand}></View>

      {/* Coral Reef (in front of the background but behind the sand) */}
      <ExpoImage
        source={require('../assets/images/coral_garden/background/coral_reef.png')} 
        style={styles.coralReef}
        contentFit="contain"
      />

      {/* Sky (Background Color) */}
      <View style={styles.sky}></View>

      {children}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  sky: {
    backgroundColor: '#3d81a8',
    width: '100%',
    height: '100%', 
    position: 'absolute',
    top: 0,
    zIndex: 0, 
  },
  sand: {
    backgroundColor: '#F1E0B6', 
    width: '100%',
    height: '10%',
    position: 'absolute',
    bottom: 0,
    zIndex: 2, 
  },
  coralReef: {
    width: '100%',
    height: 250, 
    position: 'absolute',
    bottom: '-2%', 
    alignSelf: 'center',
    zIndex: 1, 
  },
});

export default CoralBackground;
