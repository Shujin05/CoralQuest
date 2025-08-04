import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import colors from "@/constants/Colors";
import ThemedModal from "@/components/general/ThemedModal";
import TextButton from "@/components/buttons/TextButton";
import ThemedText from "@/components/text/ThemedText";
import Colors from "@/constants/Colors";
import IconMap from "@/constants/Icon";
import supabase from "@/lib/supabaseClient";
import { useAuth } from "@/context/authContext";
import { Alert } from "react-native";

interface Accessory {
  id: number;
  name: string;
  type: string;
  price: number;
  imageFile: string;
}

interface OwnedAccessory {
  id: number;
  name: string;
  type: string;
  price: number;
  imageFile: string;
}

const Shop = () => {
  const router = useRouter();

  const {session, loading} = useAuth(); 
  const [error, setError] = useState<string>("");
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [points, setpoints] = useState<number>(150); 
  const [selectedCategory, setSelectedCategory] = useState<string>("animals");
  const [selectedItem, setSelectedItem] = useState<Accessory | null>(null); 
  const [showConfirm, setShowConfirm] = useState<boolean>(false); 
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [ownedAccessories, setOwnedAccessories] = useState<OwnedAccessory[]>([]);

  const categories = [ "Corals", "Fish", "Invertebrates", "Mammals", "Reptiles"]

  async function getAccessories(): Promise<Accessory[] | null> {
    try {
      const { data, error } = await supabase
        .from('shop_items')
        .select('*');

      if (error) {
        console.error('Error fetching accessories:', error);
        Alert.alert('Error fetching accessories', error.message);
        return null;
      }

      return data; 
    } catch (error) {
      console.error('Unexpected error:', error);
      return null;
    }
  }

  useEffect(() => {
      if (!session) {
        return;
      }
  
      const fetchAccessories = async () => {
        const accessory_data = await getAccessories();
        if (accessory_data) {
          console.log(accessory_data);
          setAccessories(accessory_data);
        }
      };
  
      fetchAccessories();
    }, [session]); 

  async function makeTransaction(itemId: number): Promise<string | null> {
    try {
      const { data, error } = await supabase
        .from('item_transaction')
        .insert([
          {
            user_id: session.user.id,
            item_id: itemId,
          },
        ])
        .select() 

      if (error) {
        console.error('Error inserting transaction:', error);
        Alert.alert('Transaction Error', error.message);
        return null;
      }

      if (data && data.length > 0) {
        return data[0].id; 
      } else {
        console.warn('Transaction insert succeeded but no data returned');
        return null;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      Alert.alert('Unexpected Error', String(error));
      return null;
    }
  }

  return (
    <SafeAreaView style={styles.uiContainer}>
    <View style={styles.topContainer}>
      <TouchableOpacity onPress={() => router.push("/(tabs)/coralGarden")}>
        <Image
          source={require("../../assets/images/back.png")}
          style={styles.closeButton}
        />
      </TouchableOpacity>
      <View>
        <ThemedText type="font_md" style={styles.pointText}>{points} points</ThemedText>
      </View>
      </View>
      <View style={styles.headerContainer}>
      <ThemedText type="font_md" style={styles.header}>
        Shop
      </ThemedText>
      </View>

      <View style={styles.containers}>
        <View style={styles.categoryContainer}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category}
              style={[
                styles.categoryButton,
                selectedCategory === category && styles.categoryButtonSelected,
              ]}
              onPress={() => setSelectedCategory(category)}
            >
              <ThemedText type="font_md"
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </ThemedText>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.itemContainer}>
          {accessories
            .filter((acc) => acc.type === selectedCategory)
            .filter((acc) => !ownedAccessories.some((owned) => owned.id === acc.id))
            .map((acc) => (
              <TouchableOpacity
                key={acc.id}
                style={styles.itemCard}
                onPress={() => {
                  setSelectedItem(acc);
                  setShowConfirm(true);
                }}
              >
                <View style={styles.itemDisplay}>
                  <Image
                    source={IconMap[acc.imageFile]}
                    style={styles.itemImage}
                  />
                  <Text style={styles.itemText}> {acc.name}</Text>
                  <Text style={styles.itemPrice}> {acc.price}</Text>
                </View>
              </TouchableOpacity>
            ))}

          {selectedItem && (
            <ThemedModal isVisible={showConfirm} style={{ marginHorizontal: 16 }} onDismiss={()=>{}}>
              <View style={{ alignItems: "center", padding: 16 }}>
                <ThemedText style={styles.modalHeader} type="font_md">Confirm Purchase?</ThemedText>
                <View>
                  <Image
                    source={IconMap[selectedItem.imageFile]}
                    style={styles.itemImage}
                  />
                  <Text style={styles.modalText}> {selectedItem.price} points</Text>
                </View>
                <View style={styles.modalButtons}>
                  <TextButton style={styles.modalButton}>
                    <ThemedText type="font_md"  
                    style={styles.modalButtonText} 
                    onPress={() => {makeTransaction(selectedItem.id); setShowConfirm(false)}}>Yes</ThemedText>
                  </TextButton>
                  <TextButton style={styles.modalButton} onPress={() => { setShowConfirm(false); }}>
                    <ThemedText type="font_md" style={styles.modalButtonText}>No</ThemedText>
                  </TextButton>
                </View>
              </View>
            </ThemedModal>
          )}
        </ScrollView>

        {showFeedback && (
          <ThemedModal isVisible={showFeedback} style={{ marginHorizontal: 16 }}>
            <View style={{ padding: 16, alignItems: "center" }}>
              <ThemedText type="font_md" style={{ marginBottom: 16, textAlign: "center" }}>
                {feedbackMessage}
              </ThemedText>
              <TextButton onPress={() => setShowFeedback(false)}>
                <ThemedText type="font_md">Return</ThemedText>
              </TextButton>
            </View>
          </ThemedModal>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
  uiContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.lightBg,
    width:'100%', 
    height:'100%', 
  },
  topContainer: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  headerContainer: {
    alignItems: 'center',
    paddingTop: 25,
  }, 
  closeButton: {
    width: 20,
    height: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  background: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: colors.bg,
    zIndex: -1,
  },
  pointText: {
    color: Colors.primary, 
    fontSize: 18, 
    marginRight: 20, 
  }, 
  header: {
    textAlign: 'center', 
    color: Colors.primary, 
    marginBottom: 10, 
    marginTop: 10, 
  }, 
  containers: {
    flexDirection: 'row',
    flex: 1,
    paddingHorizontal: 12,
    paddingBottom: 12,
  },
  categoryContainer: {
    flexDirection: "column",
    justifyContent: 'flex-start',
    backgroundColor: "#F6E5CB",
    paddingVertical: 20,
    width: "auto",
  },
  categoryButton: {
    paddingHorizontal: 8,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 12,
    marginLeft: 12,
    marginRight: 12,
    alignItems: "center",
    alignSelf: 'flex-start',
  },
  categoryButtonSelected: {
    backgroundColor: colors.primary,
  },
  categoryText: {
    fontSize: 15,
    color: colors.primary,
  },
  categoryTextSelected: {
    fontWeight: "bold",
    color: "white",
  },
  itemContainer: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F6E5CB",
    marginLeft: 12,
    marginRight: 12,
    gap: 12,
  },
  itemCard: {
    width: 80,
    height: 100,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    margin: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemImage: {
    width: 48,
    height: 48,
    marginBottom: 6,
    alignSelf: 'center',
  },
  itemText: {
    fontSize: 14,
    fontFamily: "font_md",
    color: colors.primary,
    fontWeight: "bold",
    textAlign: 'center',
  },
  itemPrice: {
    fontSize: 12, 
    color: colors.accent,
    textAlign: 'center', 
  },
  itemDisplay: {
    
  }, 
  itemImageModal: {
    width: 80,
    height: 80,
    marginBottom: 6,
  },
  itemPriceModal: {
    fontSize: 20,
    fontFamily: "font_md",
    color: colors.primary,
    fontWeight: "bold",
  },
  priceDisplay: {
    flexDirection: "row",
  },
  modalButtons: {
    marginTop: 12,
    flexDirection: "row",
  },
  modalButton: {
    marginRight: 12,
    backgroundColor: colors.primary, 
    borderColor: "white",
  },
  modalHeader: {
    color: colors.primary, 
    fontSize: 25, 
  },
  modalText: {
    color: colors.accent,
    fontSize: 15,
  }, 
  modalButtonText: {
    color: 'white',
    fontSize: 20,
  }
});
