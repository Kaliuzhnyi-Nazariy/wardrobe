import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { Fragment } from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClothesItem from "../clothes/ClothesItem";
import type { ClothesItem as CI } from "../outfit/interface";
import OutfitItem from "../outfit/OutfitItem";

export interface IWishkist {
  _id: string;
  name: string;
  createdAt: Date;
  clothes: CI[];
  image?: string;
  isOwned: boolean;
  season: Season[];
  brand?: string;
  size: Size;
  color: string[];
  type: "clothes" | "outfitS";
}

const WishlistView = ({
  items,
  isFetching,
}: // isClothesOnly,
// isOutfitsOnly,
// clothesUpdate,
// outfitsUpdate,
{
  items: IWishkist[];
  isFetching: boolean;
  // isClothesOnly: boolean;
  // isOutfitsOnly: boolean;
  // outfitsUpdate: () => void;
  // clothesUpdate: () => void;
}) => {
  // const buttonIsShown = items && items.length > 0;

  if (isFetching) {
    return (
      <SafeAreaView style={[styles.container, styles.contentContainer]}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  if (!items || items.length === 0) {
    return (
      <View style={[styles.container, styles.bg]}>
        <Text>No clothes added</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, width: "100%", marginVertical: 20 }}>
      {/* {buttonIsShown && ( */}
      {/* <FilterButtonGroup
        isClothesOnly={isClothesOnly}
        isOutfitsOnly={isOutfitsOnly}
        clothesUpdate={clothesUpdate}
        outfitsUpdate={outfitsUpdate}
      /> */}
      {/* )} */}

      <ScrollView
        style={{ flex: 1, marginTop: 20 }}
        contentContainerStyle={{
          width: "100%",
          flexDirection: "column",
          gap: 16,
          flexGrow: 1,
        }}
      >
        {items && items.length > 0 ? (
          <ScrollView contentContainerStyle={{ gap: 16 }}>
            {items.map((i) => {
              if (!i) return null;

              return (
                <Fragment key={i._id}>
                  {i.type === "clothes" ? (
                    <ClothesItem
                      color={i.color}
                      name={i.name}
                      season={i.season}
                      size={i.size}
                      brand={i.brand}
                      image={i.image}
                    />
                  ) : (
                    <OutfitItem
                      clothes={i.clothes}
                      name={i.name}
                      season={i.season}
                      image={i.image}
                    />
                  )}
                </Fragment>
              );
            })}
          </ScrollView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text style={{ color: "black" }}>No data</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default WishlistView;
