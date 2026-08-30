import ClothesView from "../../components/clothes/ClothesView";
import ModalButton from "@/components/buttons/ModalButton";
import AddModal from "@/components/clothes/AddModal/AddModal";
import FiltersModal from "@/components/clothes/FiltersModal";
import { getClothes } from "@/features/clothes/request";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles/global";

export default function ClothesScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);

  const {
    season: searchSeason,
    name: search,
    color: searchColor,
    size: searchSize,
  } = useLocalSearchParams<{
    season?: string;
    name?: string;
    color?: string;
    size?: string;
  }>();

  const { data, isFetching } = useQuery({
    queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
    queryFn: () =>
      getClothes({
        season: searchSeason,
        name: search,
        color: searchColor,
        size: searchSize,
      }),
  });

  return (
    <SafeAreaProvider style={[styles.container, styles.bg]}>
      <SafeAreaView style={[styles.main, { marginVertical: 40 }]}>
        <ModalButton text="Filters" fn={setFilterModalVisible} />
        <FiltersModal
          modalVisible={filterModalVisible}
          setModalVisible={setFilterModalVisible}
        />

        <ClothesView isFetching={isFetching} data={data} />

        <ModalButton text="+ Add Clothes" fn={setModalVisible} />

        <AddModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
