import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { usePathname, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import FilterModalComponent from "../modals/FilterModalComponent";
import { filtersModalStyles } from "../modals/style";
import { clothesStyles } from "./style";

interface FiltersModalProps {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}

const FiltersModal = ({ modalVisible, setModalVisible }: FiltersModalProps) => {
  const seasons = ["winter", "spring", "summer", "fall"] as const;
  const sizes = ["s", "m", "l", "xl", "2xl", "3xl"] as const;

  const [season, setSeason] = useState<Season[]>([]);
  const [name, setName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const [size, setSize] = useState<Size[]>([]);

  const router = useRouter();

  const applyFilters = () => {
    const params: {
      season?: string;
      size?: string;
      name?: string;
      color?: string;
    } = {};

    if (season.length > 0) params.season = season.join(",");
    if (size.length > 0) params.size = size.join(",");
    if (name.trim()) params.name = name;
    if (color.trim()) params.color = color;

    router.setParams(params);
    setModalVisible(false);
  };

  const pathname = usePathname();
  const resetFilters = () => {
    setSeason([]);
    setName("");
    setColor("");
    setSize([]);
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

  const setSizeParam = (sizePick: Size) => {
    if (size && size?.length > 0) {
      let newSizeParams = [];

      if (size.includes(sizePick)) {
        newSizeParams = size.filter((os) => os !== sizePick);
      } else {
        newSizeParams = [...size, sizePick];
      }
      setSize(newSizeParams);
    } else {
      setSize([sizePick]);
    }
  };

  const setNameParam = (name: string) => {
    setName(name);
  };

  const setColorParam = (color: string) => {
    setColor(color);
  };

  const isApplyAvailable =
    season.length > 0 || name.length > 0 || color.length > 0 || size.length > 0;

  const isResetAvailable =
    season.length !== 0 ||
    name.length !== 0 ||
    color.length !== 0 ||
    size.length !== 0;

  return (
    <FilterModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      applyFilters={applyFilters}
      isApplyAvailable={isApplyAvailable}
      isResetAvailable={isResetAvailable}
      resetFilters={resetFilters}
    >
      <View style={[clothesStyles.field, clothesStyles.inputField]}>
        <Text style={styles.inputName}>Name</Text>
        <TextInput
          value={name}
          onChangeText={setNameParam}
          style={styles.input}
        />
      </View>

      <View style={clothesStyles.field}>
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

      <View style={[clothesStyles.field, clothesStyles.inputField]}>
        <Text style={styles.inputName}>Color</Text>
        <TextInput
          value={color}
          onChangeText={setColorParam}
          style={styles.input}
        />
      </View>

      <View style={clothesStyles.field}>
        <Text style={styles.inputName}>Sizes</Text>
        <View style={clothesStyles.sizesList}>
          {sizes.map((s) => {
            const isActive = size && size.includes(s);
            return (
              <Pressable
                key={s}
                onPress={() => setSizeParam(s)}
                style={[
                  clothesStyles.sizeButton,
                  isActive && clothesStyles.sizesButtonActive,
                ]}
              >
                <Text
                  style={[
                    clothesStyles.sizeText,
                    isActive && clothesStyles.activeButtonText,
                  ]}
                >
                  {s}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </FilterModalComponent>
  );
};

export default FiltersModal;
