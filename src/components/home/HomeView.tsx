import { styles } from "@/app/styles/global";
import { Link } from "expo-router";
import { Text, View } from "react-native";
import { homeStyles } from "./styles";

const HomeView = (data: {
  userData: { name: string; email: string };
  clothesCount: number;
  outfitCount: number;
}) => {
  return (
    <View style={[styles.container, styles.bg]}>
      <View style={[homeStyles.container]}>
        <Text
          style={[
            styles.h1,
            { textTransform: "uppercase", fontSize: 60, textAlign: "center" },
          ]}
        >
          Wardrobe
        </Text>
        <View style={[homeStyles.dataContainer, homeStyles.userData]}>
          <Text style={homeStyles.text}>Name: {data.userData.name}</Text>
          <Text style={homeStyles.text}>Email: {data.userData.email}</Text>
        </View>

        <View style={homeStyles.data}>
          <Link href={"/(tabs)/clothes"} style={homeStyles.dataClothContainer}>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={homeStyles.text}>Clothes</Text>
              <Text style={homeStyles.text}>{data.clothesCount}</Text>
            </View>
          </Link>

          <Link href={"/(tabs)/fits"} style={homeStyles.dataClothContainer}>
            <View style={{ flexDirection: "column", gap: 8 }}>
              <Text style={homeStyles.text}>Outfits</Text>
              <Text style={homeStyles.text}>{data.outfitCount}</Text>
            </View>
          </Link>
        </View>
      </View>
    </View>
  );
};

export default HomeView;
