import { styles } from "@/app/styles/global";
import { Text, TextInput, View } from "react-native";

const Brand = ({
  brand,
  setBrand,
}: {
  brand: string;
  setBrand: (val: string) => void;
}) => {
  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.inputName}>Brand</Text>
      <TextInput
        style={[styles.input, { marginTop: 4 }]}
        value={brand}
        onChangeText={setBrand}
        placeholder="Enter brand"
      />
    </View>
  );
};

export default Brand;

// const brandStyles = StyleSheet.create({
//   inputGroup: {
//     marginBottom: 15,
//     width: "100%",
//   },
//   label: {
//     fontWeight: "bold",
//     marginBottom: 5,
//   },
// });
