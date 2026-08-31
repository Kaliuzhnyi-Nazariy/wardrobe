import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import OutfitForm from "@/components/outfit/outfitForm/Form";
import { getWishlistitem } from "@/features/wishlist/requests";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/global";

const WishlistItemData = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useQuery({
    queryKey: ["getWishlistItem", id],
    queryFn: () => getWishlistitem({ id }),
  });

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text>Item not found</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <Header link="/wishlist" title={data.name} />
      {data.type == "clothes" ? (
        <Form data={data} />
      ) : (
        <OutfitForm data={data} />
      )}
    </View>
  );
};

export default WishlistItemData;
