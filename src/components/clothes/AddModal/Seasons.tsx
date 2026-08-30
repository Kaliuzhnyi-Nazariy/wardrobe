import { styles } from "@/app/styles/global";
import { Season } from "@/features/clothes/interface";
import { Pressable, Text, View } from "react-native";
import { clothesStyles } from "../style";

const Seasons = ({
  season,
  // handleSeason,
  setSeason,
}: {
  season: readonly Season[];
  setSeason: (val: Season[]) => void;
}) => {
  const handleSeason = (
    pickSeason: "winter" | "spring" | "fall" | "summer",
  ) => {
    if (season.includes(pickSeason)) {
      setSeason(season.filter((s) => s !== pickSeason));
    } else {
      setSeason([...season, pickSeason]);
    }
  };

  const seasons = ["winter", "spring", "summer", "fall"] as const;

  return (
    <View style={{ marginTop: 16 }}>
      <Text style={styles.inputName}>Seasons</Text>
      <View style={clothesStyles.seasonsList}>
        {seasons.map((seas) => (
          <Pressable
            key={seas}
            style={[
              clothesStyles.seasonsButton,
              season.includes(seas) && clothesStyles.seasonsButtonActive,
            ]}
            onPress={() => handleSeason(seas)}
          >
            <Text
              style={[
                season.includes(seas)
                  ? clothesStyles.seasonsButtonTextActive
                  : clothesStyles.seasonsButtonText,
              ]}
            >
              {seas}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Seasons;
