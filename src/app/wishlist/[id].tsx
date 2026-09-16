import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import OutfitForm from "@/components/outfit/outfitForm/Form";
import { deleteClothes, updateClothes } from "@/features/clothes/request";
import { deleteOutfirById, updateOutfit } from "@/features/outfit/requests";
import {
  getWishlistitem,
  updateItemOwnership,
} from "@/features/wishlist/requests";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../styles/global";
import Loading from "@/components/Loading/Loading";

const WishlistItemData = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const client = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["getWishlistItem", id],
    queryFn: () => getWishlistitem({ id: id! }),
    enabled: !!id,
  });

  const param = data?._id;

  const {
    messages: outfitErrorMessages,
    setError: setOutfitError,
    clearErrors: clearOutfitError,
  } = useErrorHandler();

  const {
    messages: clothesErrorMessages,
    setError: setClothesError,
    clearErrors: clearClothesError,
  } = useErrorHandler();

  const [mode, setMode] = useState<"review" | "edit">("review");

  const handleMode = () => {
    setMode(mode === "review" ? "edit" : "review");
  };

  const { mutate: updateOutfitFn, isPending: outfitPending } = useMutation({
    mutationFn: (newData: FormData) =>
      updateOutfit({ data: newData, id: param! }),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Outfit updated!",
        position: "top",
        visibilityTime: 3000,
      });

      if (param) {
        client.invalidateQueries({ queryKey: ["getOutfitById", param] });
      }
      router.replace("/(tabs)/wishlist");
    },
    onError(err) {
      console.log(err);
      setOutfitError(err);
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
      Toast.show({
        type: "success",
        text1: "Outfit removed!",
        position: "top",
        visibilityTime: 3000,
      });

      router.replace("/(tabs)/wishlist");
      client.invalidateQueries({
        queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
      });
    },
    onError(err) {
      setOutfitError(err);
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

  const { mutate: updateClothesItem, isPending: clothesUpdate } = useMutation({
    mutationFn: (clothesData: FormData) =>
      updateClothes({
        id: param!,
        data: clothesData,
      }),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Clothes item updated!",
        position: "top",
        visibilityTime: 3000,
      });

      client.invalidateQueries({
        queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
      });
    },
    onError(err) {
      console.log(err);
      setClothesError(err);
    },
  });

  const { mutate: deleteClothesById } = useMutation({
    mutationFn: () => deleteClothes({ id: param! }),
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
      setClothesError(err);
    },
  });

  // console.log({ id });
  // console.log({ param });

  const { mutate: updateOwnershipFn } = useMutation({
    mutationFn: () => updateItemOwnership({ id: param! }),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Successfully moveds!",
        position: "top",
        visibilityTime: 3000,
      });

      if (param) {
        client.invalidateQueries({ queryKey: ["getOutfitById", param] });
        client.invalidateQueries({ queryKey: ["getClothesById", param] });
        client.invalidateQueries({ queryKey: ["getWishlistItem", id] });
      }

      client.invalidateQueries({
        predicate: (query) => {
          const queryName = query.queryKey[0] as string;
          return [
            "getClothes",
            "getOutfits",
            "getClothesById",
            "getOutfitById",
          ].includes(queryName);
        },
      });
    },
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
      // <View style={styles.container}>
      //   <Text>Loading...</Text>
      // </View>
      <Loading />
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

  return (
    <View style={{ flex: 1 }}>
      <Header link="/wishlist" title={data.name} />
      {data.type == "clothes" ? (
        <Form
          loadingState={clothesUpdate}
          deleteClothesById={deleteClothesById}
          updateClothesItem={updateClothesItem}
          data={data}
          updateStatus
          updateStatusFn={updateOwnershipFn}
          messages={clothesErrorMessages}
          clearErrrors={clearClothesError}
          mode={mode}
          handleModeChange={handleMode}
        />
      ) : (
        <OutfitForm
          loadingState={outfitPending}
          updateOutfitFn={updateOutfitFn}
          deleteOutfit={deleteOutfit}
          data={data}
          moveDisabled={isNotAbleToMoveToWardrobe}
          updateStatus
          updateStatusFn={updateOwnershipFn}
          messages={outfitErrorMessages}
          clearErrors={clearOutfitError}
          mode={mode}
          handleModeChange={handleMode}
        />
      )}
    </View>
  );
};

export default WishlistItemData;
