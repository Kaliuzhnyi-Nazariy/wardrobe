import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const homeStyles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "80%",
    gap: 16,
    backgroundColor: colors.background,
    alignItems: "center",
  },

  header: {
    fontSize: 60,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#FFFFFF", // Add global style or fallback here if needed
  },
  dataContainer: {
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 16,
    padding: 16,
    backgroundColor: colors.secondary,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "bold",
  },
  userData: {
    width: "100%",
    flexDirection: "column",
    gap: 8,
  },
  data: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
  },
  // dataClothContainer: {
  //   flexDirection: "column",
  //   borderWidth: 1,
  //   borderColor: colors.accent,
  //   borderRadius: 16,
  //   padding: 16,
  //   width: "48%",
  //   backgroundColor: colors.secondary,
  // },
  dataClothContainer: {
    flexDirection: "row", // Changed from column to row
    justifyContent: "space-between", // Pushes text and number to opposite sides
    gap: 8, // Adds clean spacing between elements
    borderWidth: 1,
    borderColor: colors.accent,
    borderRadius: 16,
    padding: 16,
    width: "48%",
    backgroundColor: colors.secondary,
  },
});
