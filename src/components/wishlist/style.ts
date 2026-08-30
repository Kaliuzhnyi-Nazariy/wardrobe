import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const wishlistStyles = StyleSheet.create({
  //   modal type buttons
  btnContainer: {
    flexDirection: "row",
    gap: 12,
  },
  btnOption: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.secondary,
  },
  btnOptionPressed: {
    backgroundColor: colors.secondary,
    borderColor: "transparent",
  },
  text: {
    fontWeight: 700,
    color: colors.secondary,
  },
  textButtonChosen: {
    color: colors.card,
  },

  //   content
  container: {
    marginVertical: 20,
  },
  noMode: {
    alignItems: "center",
    justifyContent: "center",
  },

  //   container buttons
  btnAdd: {
    width: "48%",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: colors.secondary,
  },
  btnAddPressed: {
    backgroundColor: "transparent",
    borderColor: colors.secondary,
  },
  textButtonAdd: {
    color: colors.card,
  },
  textButtonAddPressed: {
    color: colors.secondary,
  },
  resetBtnPressed: { backgroundColor: colors.chips },
  textResetBtn: {
    color: colors.secondary,
  },
  textResetBtnPressed: {
    color: colors.card,
  },

  // clothes cancel
  cancelBtn: {
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },

  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 4,
  },
  clothesItem: {
    flexDirection: "row",
    gap: 4,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 16,
    backgroundColor: colors.chips,
  },
  clothesItemText: {
    color: colors.card,
  },

  //   close btn
  closeBtn: {
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  closeBtnClicked: {
    backgroundColor: colors.secondary,
    borderColor: "transparent",
  },
  closeBtnText: {
    color: colors.secondary,
    fontWeight: 700,
  },
  closeBtnTextPressed: {
    color: colors.card,
  },
});

export const filterButtonStyles = StyleSheet.create({
  container: { flexDirection: "row", gap: 12, marginTop: 20 },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    paddingVertical: 8,
  },
  buttonText: {
    fontWeight: 700,
    color: colors.secondary,
  },
  buttonChosen: {
    backgroundColor: colors.secondary,
    borderColor: "transparent",
  },
  buttonTextChosen: {
    color: colors.card,
  },
});
