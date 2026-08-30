import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const headerStyles = StyleSheet.create({
  header: {
    width: "100%",
    paddingTop: 70,
    paddingBottom: 20,
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerLink: {
    position: "absolute",
    left: "10%",
    top: 70,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    zIndex: 1,
    color: colors.card,
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.card,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    maxWidth: "50%",
  },
  headerText: {
    color: colors.card,
    fontSize: 16,
  },
});
