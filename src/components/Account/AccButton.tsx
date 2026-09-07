import { styles } from "@/app/styles/global";
import { Pressable, Text } from "react-native";
import { accBtnStyles } from "./styles";

const AccButton = ({
  text = "default",
  fn,
}: {
  text: string;
  fn: () => void;
}) => {
  return (
    <Pressable onPress={fn} style={[accBtnStyles.accBtn, styles.button]}>
      <Text>{text}</Text>
      {/* <Text style={accBtnStyles.accBtnText}>{text}</Text> */}
    </Pressable>
  );
};

export default AccButton;
