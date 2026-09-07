import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  buttonModal: {
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: "transparent",
  },
  buttonModalText: {
    textAlign: "center",
    color: colors.card,
  },
  buttonPressed: {
    backgroundColor: "transparent",
    borderColor: colors.secondary,
  },
  buttonTextPressed: {
    color: colors.secondary,
  },
});

export const updateFormButtonsStyles = StyleSheet.create({
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
  update: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: "transparent",
  },
  updateText: {
    color: colors.card,
    fontWeight: 600,
  },
  updateActive: {
    backgroundColor: "transparent",
    borderColor: colors.primary,
  },
  updateActiveText: {
    color: colors.primary,
  },
  deleteButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
  },
  deleteText: {
    color: colors.primary,
    fontWeight: 600,
  },
  deleteActive: {
    backgroundColor: colors.primary,
    borderColor: "transparent",
  },
  deleteActiveText: {
    color: colors.card,
  },
});

export const addToWardrobeButton = StyleSheet.create({
  addToWardrobe: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.secondary,
    alignItems: "center",
    alignContent: "center",
    marginTop: 16,
  },
  addToWardrobeButtonText: {
    color: colors.secondary,
    fontWeight: 700,
  },
});

export const updateBtn = StyleSheet.create({
  updBtn: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    backgroundColor: colors.secondary,
    marginTop: 16,
  },
});
