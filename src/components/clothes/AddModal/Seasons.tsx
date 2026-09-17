import { styles } from "@/app/styles/global";
import { Season } from "@/features/clothes/interface";
import { t } from "i18next";
import { Pressable, Text, View } from "react-native";
import { clothesStyles } from "../style";

const Seasons = ({
  season,
  // handleSeason,
  setSeason,
  loadingState,
}: {
  season: readonly Season[];
  setSeason: (val: Season[]) => void;
  loadingState: boolean;
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
      <Text style={styles.inputName}>{t("season")}</Text>
      <View style={clothesStyles.seasonsList}>
        {seasons.map((seas) => (
          <Pressable
            disabled={loadingState}
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
              {t(seas)}
            </Text>
          </Pressable>
        ))}
      </View>
    </View>
  );
};

export default Seasons;
