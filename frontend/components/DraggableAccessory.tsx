import React, { useRef } from 'react';
import { Animated, PanResponder, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import IconMap from '@/constants/Icon';

interface Accessory {
    id: number;
  name: string;
  type: string;
  price: number;
  imageFile: string;
  x: number;
  y: number; 
}

interface DraggableAccessoryProps {
  accessory: Accessory & { x: number; y: number };
  onUpdatePosition: (index: number, x: number, y: number) => void;
  index: number;
}

export default function DraggableAccessory({ accessory, onUpdatePosition, index }: DraggableAccessoryProps) {
  const pan = useRef(new Animated.ValueXY({ x: accessory.x, y: accessory.y })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pan.setOffset({
          x: pan.x._value,
          y: pan.y._value,
        });
        pan.setValue({ x: 0, y: 0 });
      },
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        pan.flattenOffset();
        const finalX = accessory.x + gesture.dx;
        const finalY = accessory.y + gesture.dy;
        onUpdatePosition(index, finalX, finalY);
        }
    })
  ).current;

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.accessory,
        {
          transform: pan.getTranslateTransform(),
        },
      ]}
    >
      <Image source={IconMap[accessory.imageFile]} style={styles.image} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  accessory: {
    position: 'absolute',
    zIndex: 0,
  },
  image: {
    width: 50,
    height: 50,
  },
});
