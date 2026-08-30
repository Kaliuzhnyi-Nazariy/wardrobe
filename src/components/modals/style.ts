import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const modalStyles = StyleSheet.create({
  // modalBackground: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   backgroundColor: "rgba(0,0,0,0.5)",
  // },
  // modalView: {
  //   width: "85%",
  //   maxHeight: "80%",
  //   backgroundColor: colors.background,
  //   borderRadius: 20,
  //   padding: 25,
  //   shadowColor: "#000",
  //   shadowOffset: { width: 0, height: 2 },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },

  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "85%",
    maxHeight: "80%",
    flexGrow: 0,
    backgroundColor: colors.background,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  //
  header: {
    fontWeight: "900",
    fontSize: 24,
    textAlign: "center",
  },
});

export const buttonStyles = StyleSheet.create({
  textStyle: {
    // color: colors.se,
    fontWeight: "bold",
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  button: {
    borderRadius: 10,
    padding: 12,
    // elevation: 2,
    flex: 1,
  },
  addBtn: {
    borderWidth: 1,
    borderColor: "transparent",
    backgroundColor: colors.primary,
  },
  addBtnActive: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  addBtnText: {
    color: colors.card,
  },
  addBtnTextActive: {
    color: colors.primary,
  },
  cancelBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: "transparent",
  },
  cancelBtnActive: {
    borderColor: "transparent",
    backgroundColor: colors.primary,
  },
  cancelBtnText: { color: colors.primary },
  cancelBtnTextActive: { color: colors.card },
});

export const filtersModalStyles = StyleSheet.create({
  header: {
    fontWeight: "900",
    fontSize: 24,
    textAlign: "center",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 16,
  },
  buttonHalf: {
    width: "48.5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    borderRadius: 8,
  },
  reset: { backgroundColor: colors.secondary },
  resetText: { color: colors.card },
  resetPressed: { backgroundColor: colors.card },
  resetTextPressed: { color: colors.secondary },

  apply: {
    backgroundColor: colors.accent,
    borderColor: "transparent",
    borderWidth: 1,
  },
  applyPressed: {
    borderColor: colors.primary,
  },

  buttonClose: {
    borderColor: colors.secondary,
    color: colors.secondary,
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 12,
  },

  buttonClosePressed: {
    borderColor: "transparent",
    backgroundColor: colors.secondary,
  },
  buttonCloseTextPressed: {
    color: colors.background,
  },

  disabled: { opacity: 0.5 },

  textStyle: {
    // color: colors.se,
    fontWeight: "bold",
    textAlign: "center",
  },

  field: {
    marginTop: 12,
    width: "100%",
  },

  inputField: {
    display: "flex",
    gap: 4,
  },

  seasonList: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
    marginTop: 8,
  },
  seasonButton: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: colors.chips,
  },
  seasonButtonText: {
    textTransform: "capitalize",
    textAlign: "center",
    fontWeight: "bold",
  },
  seasonButtonActive: {
    backgroundColor: colors.secondary,
  },
  seasonButtonActiveText: { color: colors.card },
});
