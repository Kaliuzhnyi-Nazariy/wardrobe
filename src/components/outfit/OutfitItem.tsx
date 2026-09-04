import { Season } from "@/features/clothes/interface";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import Card from "../card/Card";
import { cardStyles } from "../card/styles";
import { ClothesItem } from "./interface";

const OutfitItem = ({
  image,
  name,
  season,
  clothes,
  moveIsAble,
}: {
  image?: string;
  name: string;
  season: Season[];
  clothes: ClothesItem[];
  moveIsAble?: boolean;
}) => {
  console.log({ name, moveIsAble });
  return (
    <Card moveIsAble={moveIsAble}>
      {image ? (
        <Image
          source={image}
          style={[cardStyles.imageView, cardStyles.image]}
        />
      ) : (
        <View style={[cardStyles.imageView, cardStyles.noImage]}>
          <Text style={[cardStyles.noImageText]}>No image</Text>
        </View>
      )}

      <View style={[cardStyles.dataContainer]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={[cardStyles.dataBlock]}>
            <Text style={cardStyles.name}>Name: </Text>
            <Text style={cardStyles.name} numberOfLines={1}>
              {name}
            </Text>
          </View>
        </View>
        <View>
          <Text style={cardStyles.data}>Season: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {season.map((s) => (
              <Text style={cardStyles.chirp} key={s}>
                {s}
              </Text>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={cardStyles.data}>Clothes: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {clothes.map((c) => (
              <Text
                style={[
                  cardStyles.chirp,
                  !c.isOwned && cardStyles.clothesIsNotOwned,
                ]}
                key={c._id}
              >
                {c.name}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </Card>
  );
};

export default OutfitItem;
