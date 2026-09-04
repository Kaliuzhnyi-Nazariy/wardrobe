import { styles } from "@/app/styles/global";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { clothesStyles } from "../style";

const Colors = ({
  // inputColor,
  // setInputColor,
  // handleColorInput,
  // handleDeleteColor,
  color,
  setColors,
}: {
  // inputColor: string;
  // setInputColor: (val: string) => void;
  // handleColorInput: (val: string) => void;
  // handleDeleteColor: (id: string) => void;
  color: string[];
  setColors: (val: string[]) => void;
}) => {
  const [inputColor, setInputColor] = useState("");

  const handleColorInput = () => {
    if (inputColor.trim().length === 0) {
      setInputColor("");
      return;
    }

    if (!color.includes(inputColor)) {
      setColors([...color, inputColor]);
    }

    setInputColor("");
  };

  const handleDeleteColor = (colorId: string) => {
    setColors(color.filter((c) => c !== colorId));
  };

  return (
    <View style={{ marginTop: 16, width: "100%" }}>
      <Text style={styles.inputName}>Colors</Text>
      <View style={clothesStyles.inlineRow}>
        <TextInput
          style={[styles.input, clothesStyles.colorInput]}
          value={inputColor}
          onChangeText={setInputColor}
          placeholder="Type a color..."
        />
        <Pressable
          style={[clothesStyles.addButton]}
          onPress={() => handleColorInput()}
        >
          <Text style={clothesStyles.addButtonText}>Add</Text>
        </Pressable>
      </View>

      <View style={clothesStyles.colorList}>
        {color.map((item, index) => (
          <View key={index} style={clothesStyles.colorTag}>
            <Text style={clothesStyles.colorTagText}>{item}</Text>
            <Pressable onPress={() => handleDeleteColor(item)}>
              <Text style={clothesStyles.tagDelete}>X</Text>
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Colors;
