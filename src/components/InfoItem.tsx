import { clothesItemStyles } from "@/app/clothes/clothesItem";
import { Linking, Text, TextInput, View } from "react-native";
import { styles } from "../app/styles/global";

const InfoItem = ({
  data,
  label,
  setData,
  mode,
  isLink = false,
}: {
  data: string;
  label: string;
  setData: (val: string) => void;
  mode: "review" | "edit";
  isLink?: boolean;
}) => {
  const linkHandle = () => {
    if (!isLink) return;

    Linking.openURL(data);
  };

  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <Text style={styles.inputName}>{label}</Text>
      {mode === "review" ? (
        <Text
          style={clothesItemStyles.text}
          onPress={() => {
            isLink && linkHandle();
          }}
          // onPress={() => linkHandle()}
        >
          {data}
        </Text>
      ) : (
        <TextInput value={data} onChangeText={setData} style={styles.input} />
      )}
    </View>
  );
};

export default InfoItem;
