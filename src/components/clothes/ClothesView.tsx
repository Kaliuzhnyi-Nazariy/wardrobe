import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { Link } from "expo-router";
import { t } from "i18next";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../Loading/Loading";
import ClothesItem from "./ClothesItem";
import { clothesStyles } from "./style";

export interface IClothesItem {
  _id: string;
  name: string;
  image?: string;
  brand?: string;
  season: Season[];
  color: string[];
  size: Size;
}

function ClothesView({
  isFetching,
  data,
}: {
  isFetching: boolean;
  data: IClothesItem[];
}) {
  if (isFetching) {
    return (
      // <View style={[styles.container, styles.bg]}>
      //   <Text>Loading...</Text>
      // </View>
      <Loading />
    );
  }

  if (!data || data.length === 0) {
    return (
      <View style={[styles.container, styles.bg]}>
        <Text style={styles.noDataMesssage}>{t("no_clothes_added")}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={clothesStyles.container}>
      <ScrollView
        contentContainerStyle={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
        }}
      >
        {data.map((ci) => (
          <Link href={("/clothes/" + ci._id) as any} key={ci._id}>
            <ClothesItem
              name={ci.name}
              color={ci.color}
              season={ci.season}
              size={ci.size}
              brand={ci.brand}
              image={ci.image}
            />
          </Link>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

export default ClothesView;
