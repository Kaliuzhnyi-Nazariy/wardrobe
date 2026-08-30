import { styles } from "@/app/styles/global";
import { Text, TextInput, View } from "react-native";

const Name = ({
  name,
  setName,
}: {
  name: string;
  setName: (name: string) => void;
}) => {
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <Text style={styles.inputName}>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Enter item name"
      />
    </View>
  );
};

export default Name;
