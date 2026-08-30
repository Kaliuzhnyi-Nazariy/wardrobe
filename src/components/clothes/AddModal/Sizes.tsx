import { styles } from "@/app/styles/global";
import { Size } from "@/features/clothes/interface";
import React from "react";
import { Pressable, Text, View } from "react-native";
import { clothesStyles } from "../style";

const Sizes = ({
  size,
  setSize,
}: {
  size?: Size | Size[];
  setSize: (val: Size) => void;
}) => {
  const sizes = ["s", "m", "l", "xl", "2xl", "3xl"] as const;

  return (
    <View style={{ marginBottom: 24, marginTop: 16 }}>
      <Text style={styles.inputName}>Sizes</Text>
      <View style={clothesStyles.sizesList}>
        {sizes.map((item) => (
          <Pressable
            key={item}
            style={[
              clothesStyles.sizesButton,
              size === item && clothesStyles.sizesButtonActive,
              size?.includes(item) && clothesStyles.sizesButtonActive,
            ]}
            onPress={() => setSize(item)}
          >
            <Text
              style={[
                clothesStyles.sizesButtonText,
                size === item && clothesStyles.sizesButtonTextActive,
                size?.includes(item) && clothesStyles.sizesButtonActive,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Sizes;
