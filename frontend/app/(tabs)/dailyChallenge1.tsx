import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Alert, Dimensions, Modal } from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import { useAuth } from '@/context/authContext';
import supabase from '@/lib/supabaseClient';

interface Coral {
  id: string;
  name: string;
  image: any; 
}

const router = useRouter();
const coralData: Coral[] = [
  { id: '1', name: 'Acropora', image: require('@/assets/images/dailyChallenge1/acropora.png') },
  { id: '2', name: 'Montipora', image: require('@/assets/images/dailyChallenge1/montipora.png') },
  { id: '3', name: 'Porites', image: require('@/assets/images/dailyChallenge1/porites.png') },
  { id: '4', name: 'Favia', image: require('@/assets/images/dailyChallenge1/favia.png') },
];

function buildDeck(corals: Coral[]) {
  const cards = corals.flatMap((coral) => [
    {
      id: `${coral.id}-img`,
      coralId: coral.id,
      type: 'image',
      content: coral.image,
    },
    {
      id: `${coral.id}-name`,
      coralId: coral.id,
      type: 'name',
      content: coral.name,
    },
  ]);
  return shuffle(cards);
}

function shuffle<T>(array: T[]): T[] {
  return array.sort(() => Math.random() - 0.5);
}

export default function CoralMemoryGame() {
  const {session, loading} = useAuth();
  const [deck, setDeck] = useState<any[]>([]);
  const [flippedCards, setFlippedCards] = useState<any[]>([]);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [pointsAwarded, setPointsAwarded] = useState<number>(100); 

  const [timeLeft, setTimeLeft] = useState<number>(60); // 60 seconds
  const [timerActive, setTimerActive] = useState<boolean>(true);
  const [showFailureModal, setShowFailureModal] = useState<boolean>(false);

  const windowWidth = Dimensions.get('window').width;

  useEffect(() => {
    const newDeck = buildDeck(coralData);
    setDeck(newDeck);
  }, []);

  const handleCardPress = (card: any) => {
    if (
      flippedCards.length === 2 ||
      flippedCards.find((c) => c.id === card.id) ||
      matchedIds.includes(card.coralId)
    ) {
      return;
    }

    const newFlipped = [...flippedCards, card];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;

      const isMatch = first.coralId === second.coralId && first.type !== second.type;

      if (isMatch) {
        setMatchedIds((prev) => [...prev, first.coralId]);
        setTimeout(() => setFlippedCards([]), 500);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

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
  const newPoints = currentPoints + pointsAwarded;

  const { error: updateError } = await supabase
    .from('users')
    .update({ points: newPoints })
    .eq('id', userId);

  if (updateError) {
    console.error('Error updating user points:', updateError);
  }
};

  useEffect(() => {
    if (!timerActive || matchedIds.length === coralData.length) return;

    if (timeLeft <= 0) {
      setTimerActive(false);
      setShowFailureModal(true);
      return;
    }

    const timer = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive, matchedIds]);

    useEffect(() => {
    if (matchedIds.length === coralData.length && timerActive) {
      setTimerActive(false);
      setShowSuccessModal(true);
      awardPointsToUser();
    }
  }, [matchedIds]);

  const renderItem = ({ item }: { item: any }) => {
    const isFlipped =
      flippedCards.find((c) => c.id === item.id) || matchedIds.includes(item.coralId);

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleCardPress(item)}
        disabled={isFlipped}
      >
        {isFlipped ? (
          item.type === 'image' ? (
            <Image source={item.content} style={styles.image} contentFit="cover" />
          ) : (
            <ThemedText type="font_md" style={styles.nameText}>{item.content}</ThemedText>
          )
        ) : (
          <View style={styles.cardBack} />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/dailyChallenges"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_lg" style={styles.header}>Coral Memory Game</ThemedText>
      <ThemedText type="font_md" style={styles.subtext}>Match each coral's name with its photo!</ThemedText>
      <ThemedText style={[styles.time, timeLeft <= 10 && { color: 'red' }]}>
        Time Left: {timeLeft}s
      </ThemedText>
      <FlatList
        data={deck}
        numColumns={Math.floor(windowWidth / 100)} 
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />

      <Modal
        visible={showSuccessModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowSuccessModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Challenge Completed!</ThemedText>
            <ThemedText style={styles.modalMessage}>
              You matched all the corals!
            </ThemedText>
            <ThemedText style={styles.modalText}>+100 points</ThemedText>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  router.push('/(tabs)/dailyChallenges');
                  setShowSuccessModal(false);
                }}
              >
                <ThemedText style={styles.modalButtonText}>Return</ThemedText>
              </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showFailureModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowFailureModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ThemedText style={styles.modalTitle}>Time's Up!</ThemedText>
            <ThemedText style={styles.modalMessage}>
              You didn’t finish matching all the corals in time.
            </ThemedText>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => {
                router.push('/(tabs)/dailyChallenges');
                setShowFailureModal(false);
              }}
            >
              <ThemedText style={styles.modalButtonText}>Return</ThemedText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  container: {
    flex: 1,
    paddingTop: 30,
    paddingHorizontal: 16,
    backgroundColor: Colors.lightBg,
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: Colors.primary,
    marginBottom: 8,
  },
  subtext: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 6,
    color: '#333',
  },
  time: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  grid: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: 80,
    height: 100,
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  cardBack: {
    width: '100%',
    height: '100%',
    backgroundColor: Colors.primary,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  nameText: {
    fontSize: 14,
    textAlign: 'center',
    padding: 5,
    color: Colors.primary,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalText:{
    color: "green", 
    marginBottom: 20, 
  }
});