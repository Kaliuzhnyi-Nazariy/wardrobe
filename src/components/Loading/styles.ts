import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const loadingStyles = StyleSheet.create({
  container: {
    // width: "100%",
    // height: "100%",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  generalLoading: {
    position: "absolute",
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 99,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
});
