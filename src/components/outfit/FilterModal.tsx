import { styles } from "@/app/styles/global";
import { Season } from "@/features/clothes/interface";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FilterModalComponent from "../modals/FilterModalComponent";
import { filtersModalStyles } from "../modals/style";
import ChooseClothes from "./ChooseClothes";
import { ClothesItem } from "./interface";

const FilterModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) => {
  const seasons = ["winter", "spring", "summer", "fall"] as const;

  const [season, setSeason] = useState<Season[]>([]);
  const [outfitName, setOutfitName] = useState<string>("");
  const [clothes, setClothes] = useState<ClothesItem[]>([]);

  const router = useRouter();

  const applyFilters = () => {
    const params: Record<string, string> = {};

    if (season.length > 0) params.outfit_season = season.join(",");
    if (outfitName.trim()) params.outfit_name = outfitName;
    if (clothes.length > 0)
      params.clothes = clothes.map((c) => c._id).join(",");

    router.setParams(params);
    setModalVisible(false);
  };

  const pathname = usePathname();
  const resetFilters = () => {
    setSeason([]);
    setOutfitName("");
    setClothes([]);
    router.replace(pathname as any);
  };

  const setSeasonParam = (seasonPick: Season) => {
    if (season.length > 0) {
      let newSeasonParams: Season[] = [];

      if (season.includes(seasonPick)) {
        newSeasonParams = season.filter((os) => os !== seasonPick);
      } else {
        newSeasonParams = [...season, seasonPick];
      }
      setSeason(newSeasonParams);
    } else {
      setSeason([seasonPick]);
    }
  };

  const setNameParam = (name: string) => {
    setOutfitName(name);
  };

  const isApplyAvailable =
    season.length > 0 || outfitName.length > 0 || clothes.length > 0;

  const isResetAvailable =
    season.length !== 0 || outfitName.length !== 0 || clothes.length !== 0;

  return (
    <FilterModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      applyFilters={applyFilters}
      isApplyAvailable={isApplyAvailable}
      isResetAvailable={isResetAvailable}
      resetFilters={resetFilters}
    >
      <View style={[filtersModalStyles.field, filtersModalStyles.inputField]}>
        <Text style={styles.inputName}>Name</Text>
        <TextInput
          value={outfitName}
          onChangeText={setNameParam}
          style={styles.input}
        />
      </View>

      <View style={filtersModalStyles.field}>
        <Text style={styles.inputName}>Season</Text>
        <View style={filtersModalStyles.seasonList}>
          {seasons.map((seas) => {
            const isActive = season.includes(seas);
            return (
              <Pressable
                key={seas}
                onPress={() => setSeasonParam(seas)}
                style={[
                  filtersModalStyles.seasonButton,
                  isActive && filtersModalStyles.seasonButtonActive,
                ]}
              >
                <Text
                  style={[
                    filtersModalStyles.seasonButtonText,
                    isActive && filtersModalStyles.seasonButtonActiveText,
                  ]}
                >
                  {seas}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      <ChooseClothes
        selectedClothes={clothes}
        setSelectedClothes={setClothes}
      />
    </FilterModalComponent>
  );
};

export default FilterModal;
