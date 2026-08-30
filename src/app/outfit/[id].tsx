import Header from "@/components/header/Header";
import Form from "@/components/outfit/outfitForm/Form";
import { getOutfitById } from "@/features/outfit/requests";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
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
      <Form data={outfit} />
    </View>
  );
};

export default OutfitById;
