import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Modal } from 'react-native';

interface Coral {
  id: string;
  name: string;
  common_name: string;
  main_image: any; 
  genus: string;
  growth_form: string;
  regions: string[];
  habitat: string;
  id_tips: string[];
  id_tips_images: any[]; 
  gallery: any[];
  fun_facts: string[];
}

const coralData = [
  {
    id: '1',
    name: 'Acropora Cervicornis',
    common_name: 'Staghorn Coral',
    main_image: require('../../assets/images/coral_library/acropora_cervicornis/main.webp'),
    genus: 'Acropora',
    growth_form: "Branching",
    regions: ["Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam", "Brunei", "Singapore", "Timor-Leste", "Myanmar"],
    habitat: "Shallow, warm waters such as reef crests and reef slopes",
    id_tips: ["Pale brown or tan", "White axial corallites"],
    id_tips_images: [require('../../assets/images/coral_library/acropora_cervicornis/id_tip1.jpg'), require('../../assets/images/coral_library/acropora_cervicornis/id_tip2.jpg')],
    gallery: [require('../../assets/images/coral_library/acropora_cervicornis/gallery_1.webp'), require('../../assets/images/coral_library/acropora_cervicornis/gallery_2.webp'), require('../../assets/images/coral_library/acropora_cervicornis/gallery_3.png'), require('../../assets/images/coral_library/acropora_cervicornis/gallery_4.webp')],
    fun_facts: [
      "Grows rapidly, with an addition of up to 5 cm of new skeleton per year.",
    ]
  },
  {
    id: '2',
    name: 'Acropora Muricata',
    common_name: 'Staghorn Coral',
    main_image: require('../../assets/images/coral_library/acropora_muricata/main.webp'),
    genus: 'Acropora',
    growth_form: "Branching",
    regions: ["Malaysia", "Indonesia", "Philippines", "Thailand", "Vietnam", "Brunei", "Singapore", "Timor-Leste", "Myanmar"],
    habitat: "Reef slopes and lagoons",
    id_tips: ["Blue, brown or cream", "Pale branch ends"],
    id_tips_images: [require('../../assets/images/coral_library/acropora_muricata/id_tip1.webp'), require('../../assets/images/coral_library/acropora_muricata/id_tip2.webp')],
    gallery: [require('../../assets/images/coral_library/acropora_muricata/gallery_1.webp'), require('../../assets/images/coral_library/acropora_muricata/gallery_2.jpg'), require('../../assets/images/coral_library/acropora_muricata/gallery_3.webp'), require('../../assets/images/coral_library/acropora_muricata/gallery_4.webp')],
    fun_facts: [
      "Branches vary in length depending on sea depth (shorter in shallower waters)",
    ]
  },
  {
    id: '3',
    name: 'Porites Lobata',
    common_name: 'Lobed Porites',
    main_image: require('../../assets/images/coral_library/porites_lobata/main.png'),
    genus: 'Porites',
    growth_form: "Submassive",
    regions: ["Indonesia", "Philippines", "Malaysia", "Thailand"],
    habitat: "Typically found in back reef margins, lagoons and some fringing reefs",
    id_tips: ["Grey to yellow-brown", "Smooth surface, usually compact, hemispherical or helmet-shaped"],
    id_tips_images: [require('../../assets/images/coral_library/porites_lobata/id_tip1.png'), require('../../assets/images/coral_library/porites_lobata/id_tip2.png')],
    gallery: [require('../../assets/images/coral_library/porites_lobata/gallery1.png'), require('../../assets/images/coral_library/porites_lobata/gallery2.png'), require('../../assets/images/coral_library/porites_lobata/gallery3.png')],
    fun_facts: [
      "Commonly form ‘micro-atolls’ in intertidal habitats",
      "One of the most common porites"
    ]
  },
  {
    id: '4',
    name: 'Seriatopora Hystrix',
    common_name: 'Birdsnest Coral',
    main_image: require('../../assets/images/coral_library/seriatopora_hystrix/main.png'),
    genus: 'Seriatopora',
    growth_form: "Branching",
    regions: ["Indonesia", "Malaysia", "Philippines", "Vietnam"],
    habitat: "Shallow reef environments, especially intertidal reef flats.",
    id_tips: ["Thin, finger-like branches", "Pink, less commonly cream, blue or green"],
    id_tips_images: [require('../../assets/images/coral_library/seriatopora_hystrix/id_tip1.png'), require('../../assets/images/coral_library/seriatopora_hystrix/id_tip2.png')],
    gallery: [require('../../assets/images/coral_library/seriatopora_hystrix/gallery1.png'), require('../../assets/images/coral_library/seriatopora_hystrix/gallery2.png'), require('../../assets/images/coral_library/seriatopora_hystrix/gallery3.png')],
    fun_facts: [
      "Recognized for its delicate, bushy branching form resembling a bird’s nest.",
      "Colonies with short thick branches are normally found in habitats exposed to wave action."
    ]
  },
  {
    id: '5',
    name: 'Favia Speciosa',
    common_name: 'Brain Coral, Pinneaple Coral, Moon Coral',
    main_image: require('../../assets/images/coral_library/favia_speciosa/main.png'),
    genus: 'Favia',
    growth_form: "Massive",
    regions: ["Indonesia", "Thailand", "Philippines"],
    habitat: "Commonly found in deeper reef environments.",
    id_tips: ["Pale grey, green or brown, usually with calices of contrasting colours", "Corallites are circular, giving distinctive, brain-like ridges on the surface"],
    id_tips_images: [require('../../assets/images/coral_library/favia_speciosa/id_tip1.png'), require('../../assets/images/coral_library/favia_speciosa/id_tip2.png')],
    gallery: [require('../../assets/images/coral_library/favia_speciosa/gallery1.png'), require('../../assets/images/coral_library/favia_speciosa/gallery2.png'), require('../../assets/images/coral_library/favia_speciosa/gallery3.png')],
    fun_facts: [
      "Corallites are closely compacted in shallow water, and more widely spaced in deeper waters."
    ]
  },
  {
    id: '6',
    name: 'Montipora Digitata',
    common_name: 'Digitata Coral',
    main_image: require('../../assets/images/coral_library/montipora_digitata/main.png'),
    genus: 'Montipora',
    growth_form: "Digitate",
    regions: ["Malaysia", "Indonesia"],
    habitat: "Found in shallow, reef-associated environments, often on exposed reef flats.",
    id_tips: ["Pale cream or brown, sometimes pink or blue.", "Upright branches"],
    id_tips_images: [require('../../assets/images/coral_library/montipora_digitata/id_tip1.png'), require('../../assets/images/coral_library/montipora_digitata/id_tip2.png')],
    gallery: [require('../../assets/images/coral_library/montipora_digitata/gallery2.png'), require('../../assets/images/coral_library/montipora_digitata/gallery3.png'), require('../../assets/images/coral_library/montipora_digitata/gallery4.png'), require('../../assets/images/coral_library/montipora_digitata/gallery1.png')],
    fun_facts: [
      "Colonies in shallow waters often have flattened branches.",
      "May be a dominant species of shallow mud flats."
    ]
  },
  {
  id: '7',
  name: 'Lobophyllia Corymbosa',
  common_name: 'Brain Coral',
  main_image: require('../../assets/images/coral_library/lobophyllia_corymbosa/main.png'),
  genus: 'Lobophyllia',
  growth_form: "Corymbose",
  regions: ["Indonesia", "Malaysia", "Philippines", "Australia"],
  habitat: "Commonly found in reef slopes and deeper reef environments.",
  id_tips: ["Grey to green, with thick, rounded ridges", "Forms large, bulbous colonies"],
  id_tips_images: [
    require('../../assets/images/coral_library/lobophyllia_corymbosa/id_tip1.png'),
    require('../../assets/images/coral_library/lobophyllia_corymbosa/id_tip2.png')
  ],
  gallery: [
    require('../../assets/images/coral_library/lobophyllia_corymbosa/gallery1.png'),
    require('../../assets/images/coral_library/lobophyllia_corymbosa/gallery2.png'),
    require('../../assets/images/coral_library/lobophyllia_corymbosa/gallery3.png')
  ],
  fun_facts: [
    "Sensitive to changes in water temperature and quality."
  ]
},
{
  id: '8',
  name: 'Montipora Aquituberculata',
  common_name: 'Tuberculate Montipora',
  main_image: require('../../assets/images/coral_library/montipora_aquituberculata/main.png'),
  genus: 'Montipora',
  growth_form: "Encrusting",
  regions: ["Indonesia", "Philippines", "Malaysia"],
  habitat: "Commonly found in shallow, reef-associated environments, often on reef flats and slopes.",
  id_tips: ["Brown to green color", "Tuberculate surface with raised bumps"],
  id_tips_images: [
    require('../../assets/images/coral_library/montipora_aquituberculata/id_tip1.png'),
    require('../../assets/images/coral_library/montipora_aquituberculata/id_tip2.png')
  ],
  gallery: [
    require('../../assets/images/coral_library/montipora_aquituberculata/gallery1.png'),
    require('../../assets/images/coral_library/montipora_aquituberculata/gallery2.png'),
    require('../../assets/images/coral_library/montipora_aquituberculata/gallery3.png')
  ],
  fun_facts: [
    "This species exhibits a distinctive tuberculate surface with raised bumps.",
    "Can grow into large encrusting colonies that cover large areas of substrate."
  ]
},
{
  id: '9',
  name: 'Leptoseris Foliosa',
  common_name: 'Leaf Coral',
  main_image: require('../../assets/images/coral_library/leptoseris_foliosa/main.png'),
  genus: 'Leptoseris',
  growth_form: "Foliose",
  regions: ["Indonesia", "Philippines", "Australia", "Papua New Guinea"],
  habitat: "Found in shallow to deep waters, typically on reef slopes or deeper areas of the reef.",
  id_tips: ["Flat, leathery plates", "Green to brown coloration, often with white edges"],
  id_tips_images: [
    require('../../assets/images/coral_library/leptoseris_foliosa/id_tip1.png'),
    require('../../assets/images/coral_library/leptoseris_foliosa/id_tip2.png')
  ],
  gallery: [
    require('../../assets/images/coral_library/leptoseris_foliosa/gallery1.png'),
    require('../../assets/images/coral_library/leptoseris_foliosa/gallery2.png'),
    require('../../assets/images/coral_library/leptoseris_foliosa/gallery3.png')
  ],
  fun_facts: [
    "Distinctly flat, leathery plates with irregular shapes.",
    "Thrives in deep water where light is low, giving it a unique leaf-like appearance."
  ]
  }
];

const growthFormList = ["All", "Branching", "Corymbose", "Digitate", "Encrusting", "Foliose", "Massive", "Submassive"] 

export default function CoralLibrary() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCoral, setSelectedCoral] = useState<Coral | null>(null); 
  const [selectedGrowth, setSelectedGrowth] = useState<string>('All')
  const router = useRouter()

  const filteredCorals = coralData.filter((coral) => {
    const matchesSearch = coral.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrowth = selectedGrowth === 'All' || coral.growth_form === selectedGrowth;
    return matchesSearch && matchesGrowth;
});

 const CoralDetailsPage: React.FC<{ coral: Coral }> = ({ coral }) => {
    const [isGalleryModalVisible, setGalleryModalVisible] = useState(false);

    const toggleGalleryModal = () => {
      setGalleryModalVisible(!isGalleryModalVisible);
    };

  return(
    <ScrollView style={styles.container}>
    <TouchableOpacity onPress={()=> setSelectedCoral(null)}>
            <Image
            source={require("../../assets/images/back.png")}
            style={styles.closeButton}
            />
      </TouchableOpacity>
      {/* Coral Main Image */}
      <Image source={coral.main_image} style={styles.mainImage} />

      {/* Coral Name and Common Name */}
      <View style={styles.textContainer}>
        <ThemedText type="font_lg" style={styles.name}><i>{coral.name}</i></ThemedText>
        <ThemedText type="font_lg" style={styles.commonName}>({coral.common_name})</ThemedText>
      </View>

      {/* Coral Basic Information */}
      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Genus: <Text style={styles.infoText}>{coral.genus}</Text></Text>
        <Text style={styles.infoTitle}>Growth Form: <Text style={styles.infoText}>{coral.growth_form}</Text></Text>
        <Text style={styles.infoTitle}>Habitat: <Text style={styles.infoText}>{coral.habitat}</Text></Text>
        <Text style={styles.infoTitle}>Regions: <Text style={styles.infoText}>{coral.regions.join(', ')}</Text></Text>
      </View>

      {/* Identification Tips with Images */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Identification Tips</Text>
        {coral.id_tips.map((tip, index) => (
          <View key={index} style={styles.tipContainer}>
            {/* Tip Text */}
            <Text style={styles.text}>💡{tip}</Text>
            {/* Tip Image */}
            <Image source={coral.id_tips_images[index]} style={styles.tipImage} />
          </View>
        ))}
      </View>

      {/* Fun Facts */}
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Fun Facts</Text>
        {coral.fun_facts.map((fact, index) => (
          <Text key={index} style={styles.text}>🚀{fact}</Text>
        ))}
      </View>

      {/* Gallery Button */}
      <TouchableOpacity onPress={toggleGalleryModal} style={styles.galleryButton}>
        <Text style={styles.galleryButtonText}>View Gallery</Text>
      </TouchableOpacity>

      {/* Gallery Modal */}
      <Modal
        visible={isGalleryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={toggleGalleryModal}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <ThemedText type="font_md" style={styles.coralName}>Scroll for more photos!</ThemedText>
            <ScrollView contentContainerStyle={styles.galleryContainer}>
              {coral.gallery.map((image, index) => (
                <Image key={index} source={image} style={styles.galleryImage} />
              ))}
            </ScrollView>
            <TouchableOpacity onPress={toggleGalleryModal} style={styles.closeModalButton}>
              <Text style={styles.closeModalText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </ScrollView>
  )};

  return (
    <View style={styles.container}>
      {!selectedCoral ? (
        <>
        <TouchableOpacity onPress={()=> {router.push("./")}}>
          <Image
          source={require("../../assets/images/back.png")}
          style={styles.closeButton}
          />
        </TouchableOpacity>
          <TextInput
            placeholder="Search coral..."
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          <View style={styles.filterButtons}>
          {growthFormList.map((growth) => (
            <TouchableOpacity
              key={growth}
              style={[
                styles.filterButton,
                selectedGrowth === growth && styles.activeFilter,
              ]}
              onPress={() => setSelectedGrowth(growth)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedGrowth === growth && styles.activeFilterText,
                ]}
              >
                {growth}
              </Text>
            </TouchableOpacity>))}
          </View>

          <FlatList
            data={filteredCorals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.card}>
                <Image source={item.main_image} style={styles.coralImage} />
                <Text style={styles.coralName}><i>{item.name}</i></Text>
                <Text style={styles.coralCommonName}>{item.common_name}</Text>
                <TouchableOpacity
                  style={styles.learnMoreButton}
                  onPress={() => setSelectedCoral(item)}
                >
                  <Text style={styles.learnMoreText}>Learn More</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </>
      ) : (
        <CoralDetailsPage coral={selectedCoral} /> 
      )}
    </View>
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
    padding: 16,
    backgroundColor: '#FFF8E7',
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  coralImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginBottom: 10,
  },
  coralName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f88379',
    textAlign: 'center',
  },
  learnMoreButton: {
    backgroundColor: '#f88379',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  learnMoreText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  mainImage: {
    width: '100%',
    height: 250,
    borderRadius: 12,
    marginBottom: 16,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f88379',
  },
  commonName: {
    fontSize: 18,
    color: '#555',
  },
  coralCommonName:{
    fontSize: 11,
    color: '#555',
  },
  infoContainer: {
    marginBottom: 16,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: '#555',
    fontWeight: "normal"
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f88379',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
   tipContainer: {
    marginBottom: 10,
  },
  tipImage: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 8,
  },
  filterButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  filterButton: {
    backgroundColor: '#fff',
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
  galleryButton: {
    backgroundColor: '#f88379',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  galleryButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    height: '85%', 
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
  }, 
  galleryContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap', 
    justifyContent: 'center', 
  },
  galleryImage: {
    width: 200,  
    height: 150,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 8,
  },
  closeModalButton: {
    backgroundColor: '#f88379',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  closeModalText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
