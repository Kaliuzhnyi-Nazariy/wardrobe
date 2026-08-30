import { Season, Size } from "@/features/clothes/interface";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import { clothesStyles } from "./style";

const ClothesItem = ({
  name,
  image,
  season,
  size,
  brand,
  color,
}: {
  name: string;
  image?: string;
  season: Season[];
  size: Size;
  brand?: string;
  color: string[];
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
          {brand && (
            <View style={clothesStyles.dataBlock}>
              <Text style={clothesStyles.data}>Brand: </Text>
              <Text style={clothesStyles.data}>{brand}</Text>
            </View>
          )}
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
        <View style={clothesStyles.dataBlock}>
          <Text style={clothesStyles.data}>Size: </Text>
          <Text style={[clothesStyles.data, clothesStyles.size]}>{size}</Text>
        </View>

        <View>
          <Text style={clothesStyles.data}>Colors: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={clothesStyles.chirpList}
          >
            {color.map((c) => (
              <Text style={clothesStyles.chirp} key={c}>
                {c}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
};

export default ClothesItem;
