import ModalButton from "@/components/buttons/ModalButton";
import AddModal from "@/components/wishlist/AddModal";
import FilterButtonGroup from "@/components/wishlist/FilterButtonGroup";
import FilterModal from "@/components/wishlist/FilterModal";
import WishlistView from "@/components/wishlist/WishlistView";
import { getWishlist } from "@/features/wishlist/requests";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/global";

export default function WishlistScreen() {
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [addModalVisible, setAddModalVisible] = useState(false);

  const queryClient = useQueryClient();
  const firstTimeRef = useRef(true);

  // const { clothes, outfit, clothesIds, season } = useLocalSearchParams<{
  //   clothes?: "true" | "false";
  //   outfit?: "true" | "false";
  //   clothesIds?: string;
  //   season: string;
  // }>();

  const { clothes, outfit, name, colors, clothesIds, season, size } =
    useLocalSearchParams<{
      clothes?: "true" | "false";
      outfit?: "true" | "false";
      clothesIds?: string;
      season?: string;
      name?: string;
      colors?: string;
      size?: string;
    }>();

  // console.log({
  //   clothes,
  //   outfit,
  //   name,
  //   color: colors,
  //   clothesIds,
  //   season,
  //   size,
  // });

  const { data: items, isFetching } = useQuery({
    queryKey: [
      "getWishlist",
      clothes,
      outfit,
      name,
      colors,
      clothesIds,
      season,
      size,
    ],
    queryFn: () =>
      getWishlist({
        params: {
          clothes,
          outfit,
          name,
          color: colors,
          clothesIds,
          season,
          size,
        },
      }),
  });

  useFocusEffect(
    useCallback(() => {
      if (firstTimeRef.current) {
        firstTimeRef.current = false;

        if (!clothes && !outfit) {
          const params: Record<string, string> = {};

          params.clothes = "true";
          params.outfit = "true";

          router.setParams(params);
        }

        return;
      }

      queryClient.refetchQueries({
        queryKey: ["getWishlist"],
        stale: true,
        type: "active",
      });
    }, [queryClient]),
  );

  const isClothesOnly = clothes === "true" && outfit === "false";
  const isOutfitsOnly = outfit === "true" && clothes === "false";

  const updateClothesParam = () => {
    if (isClothesOnly) {
      router.setParams({ clothes: "true", outfit: "true" });
    } else {
      router.setParams({ clothes: "true", outfit: "false" });
    }
  };

  const updateOutfitsParam = () => {
    if (isOutfitsOnly) {
      router.setParams({ clothes: "true", outfits: "true" });
    } else {
      router.setParams({ clothes: "false", outfits: "true" });
    }
  };

  // console.log(items[0]);
  // console.log(items[1]);

  return (
    <SafeAreaProvider style={[styles.container, styles.bg]}>
      <SafeAreaView style={[styles.main, { marginVertical: 40 }]}>
        <ModalButton text="Filters" fn={() => setFilterModalVisible(true)} />

        <FilterModal
          modalVisible={filterModalVisible}
          setModalVisible={setFilterModalVisible}
        />

        <FilterButtonGroup
          isClothesOnly={isClothesOnly}
          isOutfitsOnly={isOutfitsOnly}
          clothesUpdate={updateClothesParam}
          outfitsUpdate={updateOutfitsParam}
        />

        <WishlistView items={items} isFetching={isFetching} />

        <ModalButton
          text="+ Add to wishlist"
          fn={() => setAddModalVisible(true)}
        />

        <AddModal
          modalVisible={addModalVisible}
          setModalVisible={setAddModalVisible}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
