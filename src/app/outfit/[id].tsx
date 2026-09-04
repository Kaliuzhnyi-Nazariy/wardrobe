import Header from "@/components/header/Header";
import Form from "@/components/outfit/outfitForm/Form";
import {
  deleteOutfirById,
  getOutfitById,
  updateOutfit,
} from "@/features/outfit/requests";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { styles } from "../styles/global";

const OutfitById = () => {
  const { id } = useLocalSearchParams();

  const param = typeof id === "string" ? id : id[0];

  const { data: outfit, isFetching } = useQuery({
    queryKey: ["getOutfitById", param],
    queryFn: () => getOutfitById(param),
  });

  const client = useQueryClient();

  const { mutate: updateOutfitFn } = useMutation({
    mutationFn: (newData: FormData) =>
      updateOutfit({ data: newData, id: param }),

    onSuccess() {
      client.invalidateQueries({ queryKey: ["getOutfitById", param] });
    },
  });

  const {
    outfit_season: searchSeason,
    outfit_name: searchName,
    clothes: searchClothes,
  } = useLocalSearchParams<{
    outfit_season?: string;
    outfit_name?: string;
    clothes?: string;
  }>();

  const { mutate: deleteOutfit } = useMutation({
    mutationFn: () => deleteOutfirById(param),
    onSuccess() {
      router.replace("/(tabs)/fits");
      client.invalidateQueries({
        queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
      });
    },
  });

  if (isFetching) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { width: "100%" }]}>
      <Header title={outfit.name} link="/(tabs)/fits" />
      {/* <View style={styles.container}>
        <Text>{id}</Text>
      </View> */}
      <Form
        deleteOutfit={deleteOutfit}
        updateOutfitFn={updateOutfitFn}
        data={outfit}
      />
    </View>
  );
};

export default OutfitById;
