import Header from "@/components/header/Header";
import Loading from "@/components/Loading/Loading";
import Form from "@/components/outfit/outfitForm/Form";
import {
  deleteOutfirById,
  getOutfitById,
  updateOutfit,
} from "@/features/outfit/requests";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import React, { useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../styles/global";

const OutfitById = () => {
  const { id } = useLocalSearchParams();

  const param = typeof id === "string" ? id : id[0];

  const { clearErrors, messages, setError } = useErrorHandler();

  const { data: outfit, isFetching } = useQuery({
    queryKey: ["getOutfitById", param],
    queryFn: () => getOutfitById(param),
  });

  const client = useQueryClient();

  const { mutate: updateOutfitFn, isPending } = useMutation({
    mutationFn: (newData: FormData) =>
      updateOutfit({ data: newData, id: param }),

    onSuccess() {
      Toast.show({
        type: "success",
        text1: t("outfit_updated"),
        position: "top",
        visibilityTime: 3000,
      });
      client.invalidateQueries({ queryKey: ["getOutfitById", param] });
      updateMode();
    },
    onError(err) {
      setError(err);
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
      Toast.show({
        type: "success",
        text1: t("outfit_removed"),
        position: "top",
        visibilityTime: 3000,
      });

      router.replace("/(tabs)/fits");
      client.invalidateQueries({
        queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
      });
    },
  });

  const [mode, setMode] = useState<"review" | "edit">("review");

  const updateMode = () => {
    if (mode === "review") {
      setMode("edit");
    } else {
      setMode("review");
    }
  };

  if (isFetching) {
    return (
      // <View style={styles.container}>
      //   <Text>Loading...</Text>
      // </View>
      <Loading />
    );
  }

  return (
    <View style={[styles.container, { width: "100%" }]}>
      <Header title={outfit.name} link="/(tabs)/fits" />
      {/* <View style={styles.container}>
        <Text>{id}</Text>
      </View> */}
      <Form
        loadingState={isPending}
        deleteOutfit={deleteOutfit}
        updateOutfitFn={updateOutfitFn}
        data={outfit}
        mode={mode}
        clearErrors={clearErrors}
        messages={messages}
        handleModeChange={updateMode}
      />
    </View>
  );
};

export default OutfitById;
