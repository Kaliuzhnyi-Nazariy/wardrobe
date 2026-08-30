import { StyleSheet } from "react-native";
import { colors } from "../styles/global";

export const authStyles = StyleSheet.create({
  page: {
    display: "flex",
    flexDirection: "column",
    gap: 40,
  },
  form: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 24,
  },
  field: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 8,
  },
  passwordField: {
    position: "relative",
  },
  passwordButton: {
    position: "absolute",
    top: "50%",
    right: 6,
  },
  // inputName: { color: colors.primary },
  // input: {
  //   width: "100%",
  //   paddingVertical: 12,
  //   paddingHorizontal: 8,
  //   backgroundColor: colors.accent,
  //   color: colors.primary,

  //   borderRadius: 8,
  // },
  button: {
    width: "100%",
    paddingVertical: 16,
    backgroundColor: colors.primary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 16,
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "transparent",
    transform: "colors",
    transitionDuration: 200,
    marginTop: 8,
  },
  buttonPressed: {
    backgroundColor: colors.background,
    borderStyle: "solid",
    borderColor: colors.primary,
  },
  buttonText: {
    color: colors.card,
    textTransform: "uppercase",
  },
  buttonTextPressed: {
    color: colors.primary,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  linkMessage: {
    textAlign: "center",
    color: colors.secondary,
  },
  link: {
    color: colors.primary,
    fontWeight: "bold",
  },
});
