import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const outfitStyle = StyleSheet.create({
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  tag: {
    display: "flex",
    flexDirection: "row",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  tagClothesOwned: {
    backgroundColor: colors.chips,
  },
  tagClothesNotOwned: {
    backgroundColor: colors.accent,
  },
  tagText: {
    fontSize: 14,
    color: colors.card,
  },
  tagDelete: { marginLeft: 5, color: colors.background },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },

  noImage: {
    width: "100%",
    height: 400,
    backgroundColor: colors.primary,
  },

  //   buttons
  buttonsContainer: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 24,
  },
  topButtonContainer: {
    display: "flex",
    gap: 8,
    alignItems: "center",
    flexDirection: "row",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    textAlign: "center",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});
