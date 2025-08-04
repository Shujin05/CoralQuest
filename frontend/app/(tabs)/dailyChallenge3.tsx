import Colors from '@/constants/Colors';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, PanResponder, Animated, Modal, TouchableOpacity } from 'react-native';
import ThemedText from '@/components/text/ThemedText';
import { useRouter } from 'expo-router';
import supabase from '@/lib/supabaseClient';
import { useAuth } from '@/context/authContext';

const { width, height } = Dimensions.get('window');

const LANE_COUNT = 3;
const PLAYER_SIZE = 60;
const OBJECT_SIZE = 50;
const FALL_SPEED = 4;

const lanes = [width * 0.2, width * 0.5, width * 0.8];

type GameObject = {
  id: number;
  type: 'coral' | 'threat';
  lane: number;
  y: number;
  hit?: boolean;
  image: any; 
};

const playerImage = require("../../assets/images/dailyChallenge3/player.png");

const coralImages = [
  require("../../assets/images/dailyChallenge3/corals/clownfish.png"),
  require("../../assets/images/dailyChallenge3/corals/shark.png"),
  require("../../assets/images/dailyChallenge3/corals/turtle.png"),
];

const threatImages = [
  require("../../assets/images/dailyChallenge3/threats/acid.png"),
  require("../../assets/images/dailyChallenge3/threats/anchor.png"),
  require("../../assets/images/dailyChallenge3/threats/bottle.png"),
  require("../../assets/images/dailyChallenge3/threats/fire.png"),
  require("../../assets/images/dailyChallenge3/threats/fishnet.png"),
  require("../../assets/images/dailyChallenge3/threats/plastic.png"),
];

const router = useRouter(); 

export default function ReefRescueRun() {
  const {session, loading} = useAuth(); 
  const [objects, setObjects] = useState<GameObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [health, setHealth] = useState<number>(3);
  const gameLoopRef = useRef<NodeJS.Timeout | null>(null);
  const [pointsAwarded, setPointsAwarded] = useState<number>(200)

  const playerY = height - PLAYER_SIZE - 20;
  const playerX = useRef(new Animated.Value(lanes[1] - PLAYER_SIZE / 2)).current;
  const [playerXVal, setPlayerXVal] = useState<number>(lanes[1] - PLAYER_SIZE / 2);

  const [timer, setTimer] = useState<number>(60);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [gameResult, setGameResult] = useState<'win' | 'lose' | null>(null);
  

  useEffect(() => {
    const listenerId = playerX.addListener(({ value }) => {
      setPlayerXVal(value);
    });
    return () => {
      playerX.removeListener(listenerId);
    };
  }, [playerX]);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          if (gameLoopRef.current) clearInterval(gameLoopRef.current);
          if (health > 0) {
            setShowModal(true);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (health <= 0) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      if (timerRef.current) clearInterval(timerRef.current);
      setGameResult('lose');
      setShowModal(true);
    }
  }, [health]);

  useEffect(() => {
    if (timer <= 0 && health > 0) {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      setGameResult('win');
      awardPointsToUser();
      setShowModal(true);
    }
  }, [timer]);

   const awardPointsToUser = async () => {
    if (!session?.user) return;

    const userId = session.user.id;

    const { data: userData, error: fetchError } = await supabase
      .from('users')
      .select('points')
      .eq('id', userId)
      .single();

    if (fetchError) {
      console.error('Error fetching user points:', fetchError);
      return;
    }

    const currentPoints = userData?.points || 0;
    const newPoints = currentPoints + pointsAwarded + score;

    const { error: updateError } = await supabase
      .from('users')
      .update({ points: newPoints })
      .eq('id', userId);

    if (updateError) {
      console.error('Error updating user points:', updateError);
    }
  };

  const spawnObject = (): GameObject => {
    const type = Math.random() < 0.7 ? 'coral' : 'threat';
    const lane = Math.floor(Math.random() * LANE_COUNT);
    const image =
        type === 'coral'
        ? coralImages[Math.floor(Math.random() * coralImages.length)]
        : threatImages[Math.floor(Math.random() * threatImages.length)];

    return {
        id: Date.now() + Math.random(),
        type,
        lane,
        y: -OBJECT_SIZE,
        image,
    };
    };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (e, gestureState) => {
        let newX = playerXVal + gestureState.dx;
        newX = Math.max(0, Math.min(newX, width - PLAYER_SIZE));
        playerX.setValue(newX);
      },
      onPanResponderRelease: () => {
        // to add inertia / snapping 
      },
    })
  ).current;

  const handleCollision = (obj: GameObject) => {
    if (obj.type === 'coral') {
      setScore((prev) => prev + 1);
    } else {
      setHealth((prev) => prev - 1);
    }
  };

  function isColliding(playerX: number, playerY: number, objectX: number, objectY: number): boolean {
    return (
      playerX < objectX + OBJECT_SIZE &&
      playerX + PLAYER_SIZE > objectX &&
      playerY < objectY + OBJECT_SIZE &&
      playerY + PLAYER_SIZE > objectY
    );
  }

  const checkCollision = (obj: GameObject): boolean => {
    const objectX = lanes[obj.lane] - OBJECT_SIZE / 2;
    return isColliding(playerXVal, playerY, objectX, obj.y);
  };

  const lastSpawnTimeRef = useRef<number>(0); // NEW

  useEffect(() => {
    gameLoopRef.current = setInterval(() => {
      const now = Date.now();

      setObjects((prev) => {
        let newObjects = prev
          .map((obj) => ({ ...obj, y: obj.y + FALL_SPEED }))
          .filter((obj) => obj.y < height);

        newObjects.forEach((obj) => {
          if (checkCollision(obj)) {
            handleCollision(obj);
            obj.hit = true;
          }
        });

        return newObjects.filter((obj) => !obj.hit);
      });

      // Spawn new object only if 800ms has passed
      if (now - lastSpawnTimeRef.current > 800) {
        setObjects((prev) => [...prev, spawnObject()]);
        lastSpawnTimeRef.current = now;
      }
    }, 1000 / 60);

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [playerXVal]);

  return (
    <View style={styles.container}>

      <Modal visible={showModal} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {gameResult === 'win' ? '🎉 Challenge Completed!' : '💀 Game Over'}
            </Text>
            <Text style={styles.modalText}>Final Score: {score}</Text>
            <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  router.push('/(tabs)/dailyChallenges');
                  setShowModal(false);
                }}
              >
                <ThemedText style={styles.modalButtonText}>Return</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      
      <Text style={styles.score}>
        Score: {score}
      </Text>
      <Text style={styles.score}>
        ❤️: {health}
      </Text>
      <Text style={styles.score}>
        ⏱: {timer}s
      </Text>

      {objects.map((obj) => (
        <Animated.Image
            key={obj.id}
            source={obj.image}
            style={[
            styles.objectImage,
            {
                left: lanes[obj.lane] - OBJECT_SIZE / 2,
                top: obj.y,
            },
            ]}
            resizeMode="contain"
        />
        ))}

      <Animated.Image
        {...panResponder.panHandlers}
        source={playerImage}
        style={[
          styles.playerImage,
          {
            top: playerY,
            left: playerX,
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a3d5ff',
  },
  score: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    padding: 10,
  },
  playerImage: {
    position: 'absolute',
    width: PLAYER_SIZE,
    height: PLAYER_SIZE,
  },
  object: {
    position: 'absolute',
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    borderRadius: OBJECT_SIZE / 2,
  },
  objectImage: {
    position: 'absolute',
    width: OBJECT_SIZE,
    height: OBJECT_SIZE,
    },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary, 
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});