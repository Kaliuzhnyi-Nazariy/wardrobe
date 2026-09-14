import { styles } from "@/app/styles/global";
import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import {
  deleteClothes,
  getClothesById,
  updateClothes,
} from "@/features/clothes/request";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";

export default function ClothingItemScreen() {
  const { id } = useLocalSearchParams();

  const param = typeof id === "string" ? id : id[0];

  const { data, isFetching } = useQuery({
    queryKey: ["getClothesData", id],
    queryFn: () => getClothesById(param),
  });

  const [mode, setMode] = useState<"review" | "edit">("review");
  const { messages, setError: setApiError, clearErrors } = useErrorHandler();

  const handleModeChange = () => {
    if (mode === "edit") {
      setMode("review");
    } else {
      setMode("edit");
    }
  };

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
      handleModeChange();
      Toast.show({
        type: "success",
        text1: "Clothes item updated!",
        position: "top",
        visibilityTime: 3000,
      });
    },
    onError(err) {
      console.log(err);
      setApiError(err);
      // return;
    },
  });

  const { mutate: deleteClothesById } = useMutation({
    mutationFn: () => deleteClothes({ id: data._id }),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Clothes item removed!",
        position: "top",
        visibilityTime: 3000,
      });

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
        loadingState={isPending}
        deleteClothesById={deleteClothesById}
        updateClothesItem={updateClothesItem}
        data={data}
        mode={mode}
        handleModeChange={handleModeChange}
        messages={messages}
        clearErrrors={clearErrors}
      />
    </View>
  );
}
