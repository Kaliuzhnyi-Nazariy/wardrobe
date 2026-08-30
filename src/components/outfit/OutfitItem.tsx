import { Season } from "@/features/clothes/interface";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { clothesStyles } from "../clothes/style";

const OutfitItem = ({
  image,
  name,
  season,
  clothes,
}: {
  image?: string;
  name: string;
  season: Season[];
  clothes: { _id: string; name: string }[];
}) => {
  return (
    <View style={[clothesStyles.card]}>
      {image ? (
        <Image
          source={image}
          style={[clothesStyles.imageView, clothesStyles.image]}
        />
      ) : (
        <View style={[clothesStyles.imageView, clothesStyles.noImage]}>
          <Text style={[clothesStyles.noImageText]}>No image</Text>
        </View>
      )}

      <View style={[clothesStyles.dataContainer]}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={[clothesStyles.dataBlock]}>
            <Text style={clothesStyles.name}>Name: </Text>
            <Text style={clothesStyles.name}>{name}</Text>
          </View>
        </View>
        <View>
          <Text style={clothesStyles.data}>Season: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={clothesStyles.chirpList}
          >
            {season.map((s) => (
              <Text style={clothesStyles.chirp} key={s}>
                {s}
              </Text>
            ))}
          </ScrollView>
        </View>

        <View>
          <Text style={clothesStyles.data}>Clothes: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={clothesStyles.chirpList}
          >
            {clothes.map((c) => (
              <Text style={clothesStyles.chirp} key={c._id}>
                {c.name}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default OutfitItem;
