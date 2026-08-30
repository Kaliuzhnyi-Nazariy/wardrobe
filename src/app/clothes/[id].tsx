import { styles } from "@/app/styles/global";
import Form from "@/components/clothes/ClothesForm/Form";
import Header from "@/components/header/Header";
import { getClothesById } from "@/features/clothes/request";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

export default function ClothingItemScreen() {
  const { id } = useLocalSearchParams();

  const param = typeof id === "string" ? id : id[0];

  const { data, isFetching } = useQuery({
    queryKey: ["getClothesData", id],
    queryFn: () => getClothesById(param),
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
      <Form data={data} />
    </View>
  );
}
