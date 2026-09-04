import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import OutfitForm from "@/components/outfit/outfitForm/Form";
import { deleteClothes, updateClothes } from "@/features/clothes/request";
import { deleteOutfirById, updateOutfit } from "@/features/outfit/requests";
import {
  getWishlistitem,
  updateItemOwnership,
} from "@/features/wishlist/requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/global";

const WishlistItemData = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getWishlistItem", id],
    queryFn: () => getWishlistitem({ id: id! }),
    enabled: !!id,
  });

  const param = data?._id;

  const { mutate: updateOutfitFn } = useMutation({
    mutationFn: (newData: FormData) =>
      updateOutfit({ data: newData, id: param! }),
    onSuccess() {
      if (param) {
        client.invalidateQueries({ queryKey: ["getOutfitById", param] });
      }
      router.replace("/(tabs)/wishlist");
    },
    onError(err) {
      console.log(err);
    },
  });

  const {
    searchSeason,
    outfit_name: searchName,
    clothes: searchClothes,
  } = useLocalSearchParams<{
    searchSeason?: string;
    outfit_name?: string;
    clothes?: string;
  }>();

  const { mutate: deleteOutfit } = useMutation({
    mutationFn: () => deleteOutfirById(param!),
    onSuccess() {
      router.replace("/(tabs)/wishlist");
      client.invalidateQueries({
        queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
      });
    },
  });

  const {
    name: search,
    color: searchColor,
    size: searchSize,
  } = useLocalSearchParams<{
    season?: string;
    name?: string;
    color?: string;
    size?: string;
  }>();

  const { mutate: updateClothesItem, isPending } = useMutation({
    mutationFn: (clothesData: FormData) =>
      updateClothes({
        id: param!,
        data: clothesData,
      }),
    onSuccess() {
      client.invalidateQueries({
        queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
      });
    },
    onError(err) {
      console.log(err);
    },
  });

  const { mutate: deleteClothesById } = useMutation({
    mutationFn: () => deleteClothes({ id: param! }),
    onSuccess() {
      router.replace("/(tabs)/clothes");
    },
    onError(err) {
      console.log(err);
    },
  });

  // console.log({ id });
  // console.log({ param });

  const { mutate: updateOwnershipFn } = useMutation({
    mutationFn: () => updateItemOwnership({ id: param! }),
  });

  if (!id) {
    return (
      <View style={styles.container}>
        <Text>Not found id</Text>
      </View>
    );
  }

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

  const isNotAbleToMoveToWardrobe =
    data.type === "outfit" &&
    data.clothes.some((c: { isOwned: boolean }) => c.isOwned !== true);
  // console.log(data);

  // console.log(data.season);
  return (
    <View style={{ flex: 1 }}>
      <Header link="/wishlist" title={data.name} />
      {data.type == "clothes" ? (
        <Form
          deleteClothesById={deleteClothesById}
          updateClothesItem={updateClothesItem}
          data={data}
          updateStatus
          updateStatusFn={updateOwnershipFn}
        />
      ) : (
        <OutfitForm
          updateOutfitFn={updateOutfitFn}
          deleteOutfit={deleteOutfit}
          data={data}
          moveDisabled={isNotAbleToMoveToWardrobe}
          updateStatus
          updateStatusFn={updateOwnershipFn}
        />
      )}
    </View>
  );
};

export default WishlistItemData;
