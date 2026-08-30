import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { router, usePathname } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, View } from "react-native";
import Seasons from "../clothes/AddModal/Seasons";
import Sizes from "../clothes/AddModal/Sizes";
import { clothesStyles } from "../clothes/style";
import FilterModalComponent from "../modals/FilterModalComponent";
import { filtersModalStyles } from "../modals/style";
import { ClothesItem } from "../outfit/interface";
import { ChooseClothesInOutfit } from "./ChooseClothesInOutfit";

export interface IWishlistParams {
  name?: string;
  colors?: string;
  [key: string]: unknown;
}

const FilterModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) => {
  const [itemName, setItemName] = useState("");
  const [colors, setColors] = useState("");
  const [clothesIds, setClothesIds] = useState<ClothesItem[]>([]);
  const [selectedSeason, setSeason] = useState<Season[]>([]);
  const [size, setSize] = useState<Size[]>([]);

  const isAvailable =
    itemName.length > 0 ||
    colors.length > 0 ||
    clothesIds.length > 0 ||
    selectedSeason.length > 0 ||
    size.length > 0;

  const applyParams = () => {
    const params: Record<string, string> = {};
    if (itemName.length > 0) params.name = itemName;
    if (colors.length > 0) params.colors = colors;
    if (clothesIds.length > 0)
      params.clothesIds = clothesIds.map((ci) => ci._id).join(",");
    if (selectedSeason.length > 0) params.season = selectedSeason.join(",");
    if (size.length > 0) params.size = size.join(",");

    router.setParams(params);
  };

  const pathname = usePathname();

  const resetParams = () => {
    setItemName("");
    setColors("");
    setClothesIds([]);
    setSeason([]);
    setSize([]);

    router.replace(pathname as any);
  };

  const setSizes = (val: Size) => {
    if (size.includes(val)) {
      setSize(size.filter((s) => s !== val));
    } else {
      setSize([...size, val]);
    }
  };

  const [isClothesOpen, setClothesOpen] = useState(false);

  return (
    <FilterModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      applyFilters={applyParams}
      isApplyAvailable={isAvailable}
      isResetAvailable={isAvailable}
      resetFilters={resetParams}
      extraStyle={[isClothesOpen && { paddingBottom: 60 }]}
    >
      <View style={[filtersModalStyles.field, filtersModalStyles.inputField]}>
        <Text style={styles.inputName}>Name</Text>
        <TextInput
          value={itemName}
          onChangeText={setItemName}
          style={styles.input}
        />
      </View>

      <View style={[clothesStyles.field, clothesStyles.inputField]}>
        <Text style={styles.inputName}>Color</Text>
        <TextInput
          value={colors}
          onChangeText={setColors}
          style={styles.input}
        />
      </View>

      <ChooseClothesInOutfit
        chosenClothes={clothesIds}
        setClothes={setClothesIds}
        setClothesOpen={setClothesOpen}
      />

      <Seasons season={selectedSeason} setSeason={setSeason} />

      <Sizes setSize={setSizes} size={size} />
    </FilterModalComponent>
  );
};

export default FilterModal;
