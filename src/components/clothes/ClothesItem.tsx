import { Season, Size } from "@/features/clothes/interface";
import { Image } from "expo-image";
import { t } from "i18next";
import { ScrollView, Text, View } from "react-native";
import Card from "../card/Card";
import { cardStyles } from "../card/styles";

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
    <Card>
      {image ? (
        <Image
          source={image}
          style={[cardStyles.imageView, cardStyles.image]}
        />
      ) : (
        <View style={[cardStyles.imageView, cardStyles.noImage]}>
          <Text style={[cardStyles.noImageText]}>{t("no_image")}</Text>
        </View>
      )}

      <View style={[cardStyles.dataContainer]}>
        <View style={[cardStyles.dataBlock]}>
          <Text style={cardStyles.name}>{t("name")}: </Text>
          <Text
            style={[cardStyles.name, cardStyles.nameLimit]}
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>

        {/* </View> */}

        {brand && (
          <View style={cardStyles.dataBlock}>
            {/* <Text style={[cardStyles.data, cardStyles.brand]}>Brand: </Text> */}
            <Text style={[cardStyles.data]}>{t("brand")}: </Text>
            <Text style={cardStyles.data}>{brand}</Text>
          </View>
        )}

        <View style={[cardStyles.chirpList]}>
          <Text style={cardStyles.data}>{t("season")}: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {season.map((s) => (
              <Text style={cardStyles.chirp} key={s}>
                {t(s)}
              </Text>
            ))}
          </ScrollView>
        </View>
        <View style={cardStyles.dataBlock}>
          <Text style={cardStyles.data}>{t("size")}: </Text>
          <Text style={[cardStyles.data, cardStyles.size]}>{size}</Text>
        </View>

        <View style={cardStyles.chirpList}>
          <Text style={cardStyles.data}>{t("colors")}: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {color.map((c) => (
              <Text style={cardStyles.chirp} key={c}>
                {c}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </Card>
  );
};

export default ClothesItem;
