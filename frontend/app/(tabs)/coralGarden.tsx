import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Image } from 'expo-image';
import CoralBackground from '@/components/CoralBackground';
import { useRouter } from 'expo-router';
import supabase from '@/lib/supabaseClient';
import IconMap from '@/constants/Icon';
import Colors from '@/constants/Colors';
import ThemedText from '@/components/text/ThemedText';
import { useAuth } from '@/context/authContext';
import DraggableAccessory from '@/components/DraggableAccessory';

interface Accessory {
  id: number;
  name: string;
  type: string;
  price: number;
  imageFile: string;
}

interface AccessoryData {
  item_id: number;
}

interface PlacedAccessory extends Accessory {
  x: number;
  y: number;
}

export default function CoralGarden() {
  const {session, loading} = useAuth(); 
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(false);
  const [accessories, setAccessories] = useState<Accessory[]>([]);
  const [selectedAccessories, setSelectedAccessories] = useState<PlacedAccessory[]>([]);

  async function fetchOwnedAccessories(userId: string): Promise<void> {
    try {
      const { data: transactions, error: transactionError } = await supabase
        .from("item_transaction")
        .select("item_id")
        .eq("user_id", userId);

      if (transactionError) {
        console.error("Error fetching item transactions:", transactionError);
        return;
      }

      const ownedItemIds = transactions.map((t: AccessoryData) => t.item_id);
      if (ownedItemIds.length === 0) return;

      const { data: ownedItems, error: itemsError } = await supabase
        .from("shop_items")
        .select("*")
        .in("id", ownedItemIds);

      if (itemsError) {
        console.error("Error fetching owned item details:", itemsError);
        return;
      }

      setAccessories(ownedItems);
    } catch (error) {
      console.error("Unexpected error fetching owned accessories:", error);
    }
  }

  const handleDecoratePress = async () => {
    if (!session?.user.id) {
      console.error("log in first")
      return null 
    }
    const userId = session.user.id
    await fetchOwnedAccessories(userId);
    setShowSidebar(true);
  };

  return (
    <CoralBackground>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => router.push("./")}>
          <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
        </TouchableOpacity>

        {selectedAccessories.map((acc, index) => (
          <DraggableAccessory
            key={index}
            accessory={acc}
            index={index}
            onUpdatePosition={(i, x, y) => {
              const updated = [...selectedAccessories];
              updated[i].x = x;
              updated[i].y = y;
              setSelectedAccessories(updated);
            }}
          />
        ))}

        {!showSidebar && (
          <View style={styles.iconGroup}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/shop")}>
              <Image
                source={require("../../assets/images/coral_garden/background/shop.png")}
                style={styles.shopButton}
              />
            </TouchableOpacity>

            <TouchableOpacity onPress={handleDecoratePress}>
              <Image
                source={require("../../assets/images/coral_garden/background/decorate.png")}
                style={styles.decorateButton}
              />
            </TouchableOpacity>
          </View>
        )}
      </View>

      {showSidebar && (
        <View style={styles.sidebar}>
          <TouchableOpacity onPress={() => setShowSidebar(false)}>
            <Image source={require("../../assets/images/back.png")} style={styles.closeButton} />
          </TouchableOpacity>
          <ThemedText type="font_sm" style={styles.sidebarTitle}>Your Accessories</ThemedText>
          <ScrollView contentContainerStyle={styles.accessoryList}>
            {accessories.map((acc) => (
              <TouchableOpacity key={acc.id} style={styles.accessoryItem} onPress={() => {
              setSelectedAccessories((prev) => [
                ...prev,
                {
                  ...acc,
                  x: 100, 
                  y: 100, 
                },
              ]);
            }}>
                <Image
                  source={IconMap[acc.imageFile]}
                  style={styles.accessoryImage}
                />
                <Text style={styles.accessoryName}>{acc.name}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </CoralBackground>
  );
}

const styles = StyleSheet.create({
  content: {
    position: 'absolute',
    zIndex: 1,
    top: 10,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  iconGroup: {
    alignItems: 'center',
    gap: 8,
  },
  placedAccessory: {
    position: 'absolute',
    width: 50,
    height: 50,
    zIndex: 0,
  },
  decorateButton: {
    width: 40,
    height: 40,
  },
  closeButton: {
    width: 20,
    height: 20,
  },
  shopButton: {
    width: 40,
    height: 40,
  },
  sidebar: {
    position: 'absolute',
    top: 60,
    right: 10,
    bottom: 10,
    width: 100,
    backgroundColor: '#Add8e6',
    borderRadius: 12,
    padding: 10,
    zIndex: 2,
  },
  sidebarTitle: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    color: "#023b65",
    lineHeight: 20,
    marginBottom: 10,
  },
  accessoryList: {
    gap: 10,
  },
  accessoryItem: {
    alignItems: 'center',
  },
  accessoryImage: {
    width: 50,
    height: 50,
    marginBottom: 4,
  },
  accessoryName: {
    fontSize: 12,
    textAlign: 'center',
    color: "#023b65",
    fontWeight: 'bold', 
  },
});
