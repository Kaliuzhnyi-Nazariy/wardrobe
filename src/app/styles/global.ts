import { StyleSheet } from "react-native";

export const colors = {
  background: "#F5F2EC",
  card: "#FFFFFF",
  primary: "#4E4034",
  secondary: "#8C7864",
  accent: "#D9D2C6",
  chips: "#B7A996",
};

export const styles = StyleSheet.create({
  bg: {
    backgroundColor: colors.background,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  main: {
    width: "80%",
    marginHorizontal: "auto",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    color: colors.primary,
  },

  h1: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 72,
  },
  button: {
    width: "100%",
    paddingVertical: 12,
    textAlign: "center",
    borderRadius: 8,
  },

  inputName: {
    color: colors.primary,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 8,
    backgroundColor: colors.accent,
    color: colors.primary,

    borderRadius: 8,
  },

  contentContainer: {
    width: "80%",
    alignItems: "center",
    justifyContent: "center",
  },

  headerForUpdPages: {
    fontSize: 32,
    fontWeight: 500,
    color: colors.primary,
    marginHorizontal: "auto",
  },

  h2: {
    fontSize: 28,
    fontWeight: 500,
    color: colors.primary,
    marginHorizontal: "auto",
  },
  homeButton: {
    borderWidth: 1,
    borderColor: colors.secondary,
    color: colors.secondary,
    marginTop: 36,
  },
});

export const splashStyles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "center",
    alignItems: "center",
  },
  splashImage: {
    width: 200,
    height: 200,
  },
});
