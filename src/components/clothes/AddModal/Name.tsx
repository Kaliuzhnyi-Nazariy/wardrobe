import { styles } from "@/app/styles/global";
import { Text, TextInput, View } from "react-native";

const Name = ({
  title = "Name",
  name,
  setName,
  placeholder = "Enter item name",
}: {
  title?: string;
  name: string;
  setName: (name: string) => void;
  placeholder?: string;
}) => {
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <Text style={styles.inputName}>{title}</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder={placeholder}
      />
    </View>
  );
};

export default Name;
