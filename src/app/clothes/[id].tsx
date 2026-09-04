import { styles } from "@/app/styles/global";
import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import {
  deleteClothes,
  getClothesById,
  updateClothes,
} from "@/features/clothes/request";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ClothingItemScreen() {
  const { id } = useLocalSearchParams();

  const param = typeof id === "string" ? id : id[0];

  const { data, isFetching } = useQuery({
    queryKey: ["getClothesData", id],
    queryFn: () => getClothesById(param),
  });

  const {
    season: searchSeason,
    name: search,
    color: searchColor,
    size: searchSize,
  } = useLocalSearchParams<{
    season?: string;
    name?: string;
    color?: string;
    size?: string;
  }>();

  const client = useQueryClient();

  const { mutate: updateClothesItem, isPending } = useMutation({
    mutationFn: (clothesData: FormData) =>
      updateClothes({
        id: data._id,
        data: clothesData,
      }),

    onSuccess() {
      client.invalidateQueries({
        queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
      });
    },
    onError(err) {
      console.log(err);
      return;
    },
  });

  const { mutate: deleteClothesById } = useMutation({
    mutationFn: () => deleteClothes({ id: data._id }),
    onSuccess() {
      router.replace("/(tabs)/clothes");
    },
    onError(err) {
      console.log(err);
      return;
    },
  });

  if (isFetching) {
    return (
      <View style={[styles.container, styles.bg]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, styles.bg]}>
      <Header title={data.name} link="/(tabs)/clothes" />
      <Form
        deleteClothesById={deleteClothesById}
        updateClothesItem={updateClothesItem}
        data={data}
      />
    </View>
  );
}
