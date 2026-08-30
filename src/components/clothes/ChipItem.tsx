import { Season } from "@/features/clothes/interface";
import { Text } from "react-native";
import { clothesStyles } from "./style";

const ChipItem = ({ season }: { season: Season }) => {
  return <Text style={clothesStyles.chirp}>{season}</Text>;
};

export default ChipItem;
