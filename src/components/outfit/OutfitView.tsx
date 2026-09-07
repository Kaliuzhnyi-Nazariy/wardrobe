import { styles } from "@/app/styles/global";
import { Season } from "@/features/clothes/interface";
import { Link } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { clothesStyles } from "../clothes/style";
import { ClothesItem } from "./interface";
import OutfitItem from "./OutfitItem";
import { outfitViewStyles } from "./style";

export interface IOutfit {
  _id: string;
  name: string;
  season: Season[];
  clothes: ClothesItem[];
  image?: string;
  isOwned: boolean;
}

const OutfitView = ({
  outfits,
  loading,
}: {
  outfits: IOutfit[];
  loading: boolean;
}) => {
  if (loading) {
    return (
      <View style={outfitViewStyles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={clothesStyles.container}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          flex: 1,
        }}
      >
        {outfits.length > 0 ? (
          <>
            {outfits.map((o) => (
              <Link key={o._id} href={("/outfit/" + o._id) as any}>
                <OutfitItem
                  clothes={o.clothes}
                  name={o.name}
                  season={o.season}
                  image={o.image}
                  key={o._id}
                />
              </Link>
            ))}
          </>
        ) : (
          <View style={styles.container}>
            <Text>No data</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default OutfitView;
