import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { Image } from 'expo-image';
import { SafeAreaView } from 'react-native-safe-area-context';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';

// Sample coral data
const router = useRouter()
const coralData = [
  {
    id: '1',
    name: 'Acropora',
    image: require('@/assets/images/dailyChallenge1/acropora.png'),
  },
  {
    id: '2',
    name: 'Montipora',
    image: require('@/assets/images/dailyChallenge1/montipora.png'),
  },
  {
    id: '3',
    name: 'Porites',
    image: require('@/assets/images/dailyChallenge1/porites.png'),
  },
  {
    id: '4',
    name: 'Favia',
    image: require('@/assets/images/dailyChallenge1/favia.png'),
  },
];

// Create a shuffled deck with pairs: image and name
function buildDeck(corals) {
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

function shuffle(array: []) {
  return array.sort(() => Math.random() - 0.5);
}

export default function CoralMemoryGame() {
  const [deck, setDeck] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedIds, setMatchedIds] = useState([]);
  const [moves, setMoves] = useState(0);

  useEffect(() => {
    const newDeck = buildDeck(coralData);
    setDeck(newDeck);
  }, []);

  const handleCardPress = (card) => {
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
      setMoves((prev) => prev + 1);
      const [first, second] = newFlipped;

      const isMatch =
        first.coralId === second.coralId && first.type !== second.type;

      if (isMatch) {
        setMatchedIds((prev) => [...prev, first.coralId]);
        setTimeout(() => setFlippedCards([]), 500);
      } else {
        setTimeout(() => setFlippedCards([]), 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedIds.length === coralData.length) {
      setTimeout(() => {
        Alert.alert('You win!', `You matched all corals in ${moves} moves.`, [
          {
            text: 'Play Again',
            onPress: () => {
              setDeck(buildDeck(coralData));
              setFlippedCards([]);
              setMatchedIds([]);
              setMoves(0);
            },
          },
        ]);
      }, 500);
    }
  }, [matchedIds]);

  useEffect(() => {
  const totalCorals = coralData.length;
  if (matchedIds.length === totalCorals) {
    // Give time for the last cards to visually flip
    setTimeout(() => {
      Alert.alert('Challenge Completed', `You matched all corals in ${moves} moves.`, [
        {
          text: 'Play Again',
          onPress: () => {
            const newDeck = buildDeck(coralData);
            setDeck(newDeck);
            setFlippedCards([]);
            setMatchedIds([]);
            setMoves(0);
          },
        },
      ]);
    }, 700); // slightly longer to allow animations to finish
  }
}, [matchedIds, moves]);


  const renderItem = ({ item }) => {
    const isFlipped =
      flippedCards.find((c) => c.id === item.id) ||
      matchedIds.includes(item.coralId);

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
      <TouchableOpacity onPress={()=> {router.push("/(tabs)/dailyChallenges")}}>
              <Image
              source={require("../../assets/images/back.png")}
              style={styles.closeButton}
              />
      </TouchableOpacity>
      <ThemedText type='font_lg' style={styles.header}>Coral Memory Game</ThemedText>
      <ThemedText type='font_md' style={styles.subtext} >Match each coral's name with its photo!</ThemedText>
      <ThemedText style={styles.moves}>Total Moves: {moves}</ThemedText>
      <FlatList
        data={deck}
        numColumns={4}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.grid}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10, 
    marginTop: 10
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
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  moves: {
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
});
