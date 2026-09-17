import ModalButton from "@/components/buttons/ModalButton";
import AddModal from "@/components/outfit/AddModal";
import FilterModal from "@/components/outfit/FilterModal";
import OutfitView from "@/components/outfit/OutfitView";
import { getOutfits } from "@/features/outfit/requests";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/global";

export default function FitsScreen() {
  const [addModalVisible, setAddModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const {
    outfit_season: searchSeason,
    outfit_name: searchName,
    clothes: searchClothes,
  } = useLocalSearchParams<{
    outfit_season?: string;
    outfit_name?: string;
    clothes?: string;
  }>();

  const { data: outfits, isFetching } = useQuery({
    queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
    queryFn: () =>
      getOutfits({
        season: searchSeason,
        name: searchName,
        clothes: searchClothes,
      }),
    staleTime: 0,
    gcTime: 0,
  });

  return (
    <SafeAreaProvider style={[styles.container, styles.bg]}>
      <SafeAreaView style={[styles.main, { marginVertical: 40 }]}>
        <ModalButton
          text={t("filters")}
          fn={() => setFilterModalVisible(true)}
        />
        <FilterModal
          modalVisible={filterModalVisible}
          setModalVisible={setFilterModalVisible}
        />

        <OutfitView outfits={outfits} loading={isFetching} />

        <ModalButton
          text={t("add_outfit")}
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
