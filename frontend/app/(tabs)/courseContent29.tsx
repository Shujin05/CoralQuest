import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { useRouter } from 'expo-router';
import ThemedText from '@/components/text/ThemedText';
import Colors from '@/constants/Colors';
import { TouchableOpacity } from 'react-native';

export default function CourseContent29() {
  const router = useRouter();

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity onPress={() => { router.push("/(tabs)/courses"); }}>
        <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
      </TouchableOpacity>
      <ThemedText type="font_md" style={styles.heading}>Commonly Mistaken</ThemedText>
      <View style={styles.contentContainer}>
        <View style={styles.keyPointsList}>
        
        <ThemedText type="font_md" style={styles.subHeading}>Branching vs Digitate </ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Branching corals form <b>thin or thick branches that split repeatedly</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Digitate corals form thick, finger-like projections that <b>do not branch much</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Digitate Corals look more like upright “fingers” pointing upwards rather than a branching tree</Text>
          </View>
        </View>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/branching.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Branching</Text>
        </View>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/digitate.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Digitate</Text>
        </View>
      </View>
                  

      <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Encrusting vs Massive</ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Encrusting corals grow as a <b>thin layer over rocks or other corals</b>, with little to no vertical growth.</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Massive corals form <b>large, rounded boulders or domes</b>, growing upwards over time</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/encrusting.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Encrusting</Text>
        </View>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/massive.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Massive</Text>
        </View>
      </View>

       <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Foliose vs Tabular</ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Foliose corals form <b>thin, leafy plates</b> that curve and fold like lettuce leaves, which oten overlap</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Tabular corals form <b>broad, flat horizontal plates</b> that spread outward like a tabletop with no overlap, often with a raised rim.</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/foliose.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Foliose</Text>
        </View>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/tabular.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Tabular</Text>
        </View>
      </View>

        <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Columnar vs Digitate</ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Columnar corals form <b>thick, vertical columns or pillars</b> that can be tall and cylindrical.</Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Digitate corals are also finger-like, but are <b>usually shorter, thinner, and more irregular</b> in height and shape.</Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/columnar.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Columnar</Text>
        </View>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/digitate.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Digitate</Text>
        </View>
      </View>

        <View style={styles.keyPointsList}>
        <ThemedText type="font_md" style={styles.subHeading}>Submassive vs Massive</ThemedText>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Submassive corals are lumpy or knob-shaped and surface is <b>irregular with protrusions.</b></Text>
          </View>
          <View style={styles.keyPoint}>
            <Text style={styles.keyPointText}>• Massive corals are <b>more uniform, forming solid, round domes or boulders.</b></Text>
          </View>
        </View>

        <View style={styles.imageContainer}>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/submassive.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Submassive</Text>
        </View>
        <View style={styles.imageWithText}>
        <Image 
        source={require("../../assets/images/courses/course29/massive.png")}
        style={styles.image}
        /> 
        <Text style={styles.imageText}>Massive</Text>
        </View>
      </View>

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightBg,
    padding: 16,
  },
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  heading: {
    fontSize: 35,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    textAlign: 'center'
  },
  contentContainer: {
    paddingBottom: 20,
  },
  subHeading: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
    marginTop: 15,
  },
  keyPointsList: {
    paddingLeft: 15,
  },
  keyPoint: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    lineHeight: 22,
  },
  keyPointText: {
    color: '#555',
    fontSize: 16, 
  }, 
  keyPointIndented: {
    paddingLeft: 35, 
  },
  imageText: {
    textAlign: 'center', 
    color: '#555',
    fontSize: 16, 
  }, 
  image: {
    width: 160,
    height: 200,
    marginBottom: 20,
    marginTop: 20, 
    borderRadius: 10,
    marginHorizontal: 10, 
  },
  imageContainer: {
    flexDirection: 'row', 
    width: '100%',
    justifyContent: 'center',
  }, 
  imageWithText: {
    alignItems: 'center', 
  }, 
  quizText: {
    color: Colors.primary, 
    fontSize: 20, 
    marginTop: 20, 
    marginBottom: 5, 
    fontWeight: 'bold', 
    textAlign: 'center', 
  }, 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.primary,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalPoints: {
    fontSize: 16,
    color: 'green',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
