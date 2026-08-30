import { Pressable, Text, View } from "react-native";
import { filterButtonStyles } from "./style";

const FilterButtonGroup = ({
  clothesUpdate,
  outfitsUpdate,
  isOutfitsOnly,
  isClothesOnly,
}: {
  clothesUpdate: () => void;
  outfitsUpdate: () => void;
  isOutfitsOnly: boolean;
  isClothesOnly: boolean;
}) => {
  return (
    <View style={filterButtonStyles.container}>
      <Pressable
        style={[
          filterButtonStyles.button,
          isClothesOnly && filterButtonStyles.buttonChosen,
        ]}
        onPress={clothesUpdate}
      >
        <Text
          style={[
            filterButtonStyles.buttonText,
            isClothesOnly && filterButtonStyles.buttonTextChosen,
          ]}
        >
          Clothes
        </Text>
      </Pressable>
      <Pressable
        style={[
          filterButtonStyles.button,
          isOutfitsOnly && filterButtonStyles.buttonChosen,
        ]}
        onPress={outfitsUpdate}
      >
        <Text
          style={[
            filterButtonStyles.buttonText,
            isOutfitsOnly && filterButtonStyles.buttonTextChosen,
          ]}
        >
          Outfits
        </Text>
      </Pressable>
    </View>
  );
};

export default FilterButtonGroup;
