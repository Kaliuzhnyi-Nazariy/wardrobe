import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const addOutfitStyle = StyleSheet.create({
  list: {
    marginVertical: 8,
    flexDirection: "row",
    gap: 8,
  },
  chosenClothesItem: {
    backgroundColor: colors.chips,
    flexDirection: "row",
    gap: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  chosenClothesItemText: {
    color: colors.card,
  },

  clothesItemList: {
    marginVertical: 16,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.secondary,
    borderRadius: 8,
  },
  buttonText: { color: colors.card },
  clotesItem: {
    display: "flex",
    flexDirection: "row",
    padding: 12,
    borderColor: colors.secondary,
    borderWidth: 1,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 8,
    height: 60,
  },

  //   cancel button
  cancelButton: {
    marginBottom: 40,

    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 8,
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  cancelButtonText: {
    color: colors.primary,
  },
});

export const outfitViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 40,
  },
});
