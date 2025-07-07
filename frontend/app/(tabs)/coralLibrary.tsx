import AnimatedButton from '@/components/buttons/AnimatedButton';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// hard coded coral data
const coralData = [
  {
    id: '1',
    name: 'Acropora',
    image: require('../../assets/images/logo.png'),
    species: 'Acropora',
    description: 'Acropora is a genus of small polyp stony coral found within the phylum Cnidaria.',
  },
  {
    id: '2',
    name: 'Montipora',
    image: require('../../assets/images/logo.png'),
    species: 'Montipora',
    description: 'Montipora corals are encrusting, plating or branching corals that grow quickly.',
  },
  {
    id: '3',
    name: 'Porites',
    image: require('../../assets/images/logo.png'),
    species: 'Porites',
    description: 'Porites corals are important reef-builders, often forming large domes or branches.',
  },
  {
    id: '4',
    name: 'Acropora Millepora',
    image: require('../../assets/images/logo.png'),
    species: 'Acropora',
    description: 'Acropora millepora is a fast-growing branching coral found in the Indo-Pacific.',
  },
];

const speciesList = ['All', 'Acropora', 'Montipora', 'Porites'];

export default function CoralLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('All');
  const [selectedCoral, setSelectedCoral] = useState(null);

  const filteredCorals = coralData.filter((coral) => {
    const matchesSearch = coral.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSpecies = selectedSpecies === 'All' || coral.species === selectedSpecies;
    return matchesSearch && matchesSpecies;
  });

  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.topBar}>
        <TextInput
          placeholder="Search coral..."
          placeholderTextColor="#aaa"
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filterButtons}>
          {speciesList.map((species) => (
            <TouchableOpacity
              key={species}
              style={[
                styles.filterButton,
                selectedSpecies === species && styles.activeFilter,
              ]}
              onPress={() => setSelectedSpecies(species)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedSpecies === species && styles.activeFilterText,
                ]}
              >
                {species}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filteredCorals}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={item.image} style={styles.coralImage} />
            <AnimatedButton
              label={item.name}
              color="#f88379"
              style={styles.closeButton}
              onPress={() => setSelectedCoral(item)}
            >
            </AnimatedButton>
          </View>
        )}
      />

      <Modal
        visible={selectedCoral !== null}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedCoral(null)}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{selectedCoral?.name}</Text>
            <Image source={selectedCoral?.image} style={styles.modalImage} />
            <Text style={styles.modalDescription}>{selectedCoral?.description}</Text>
            <AnimatedButton
              label="close"
              color="#f88379"
              style={styles.closeButton}
              onPress={() => setSelectedCoral(null)}
            >
            </AnimatedButton>
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
        marginBottom: 32,
        marginTop: 10
  }, 
    container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
    padding: 16,
  },
  topBar: {
    flexDirection: 'column',
    marginBottom: 12,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#eee',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  filterText: {
    color: '#333',
  },
  activeFilter: {
    backgroundColor: '#f88379',
  },
  activeFilterText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    padding: 10,
    alignItems: 'center',
    elevation: 2,
  },
  coralImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  coralName: {
    fontSize: 18,
    color: '#f88379',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: Colors.primary, 
  },
  modalImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 10,
  },
  modalDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#f88379',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
