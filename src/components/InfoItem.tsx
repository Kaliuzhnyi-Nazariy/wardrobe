import { clothesItemStyles } from "@/app/clothes/clothesItem";
import { Text, TextInput, View } from "react-native";
import { styles } from "../app/styles/global";

const InfoItem = ({
  data,
  label,
  setData,
  mode,
}: {
  data: string;
  label: string;
  setData: (val: string) => void;
  mode: "review" | "edit";
}) => {
  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <Text style={styles.inputName}>{label}</Text>
      {mode === "review" ? (
        <Text style={clothesItemStyles.text}>{data}</Text>
      ) : (
        <TextInput value={data} onChangeText={setData} style={styles.input} />
      )}
    </View>
  );
};

export default InfoItem;
