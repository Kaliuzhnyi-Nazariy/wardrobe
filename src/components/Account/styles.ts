import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const accBtnStyles = StyleSheet.create({
  accBtn: {
    width: "100%",
    // paddingVertical: 1,
    paddingHorizontal: 12,
    backgroundColor: colors.card,
  },
  //   accBtnText: {
  //     textTransform: "capitalize",
  //   },
});

export const accountStyles = StyleSheet.create({
  accHeader: {
    backgroundColor: colors.primary,
    paddingTop: 60,
    paddingBottom: 20,
    width: "100%",
    alignItems: "center",
    marginTop: -60,
  },
  accHeaderText: {
    color: colors.card,
    fontSize: 16,
    fontWeight: 500,
  },

  accView: {
    marginTop: 20,
    flexDirection: "column",
    gap: 16,

    // flex: 1,
    width: "80%",
    alignItems: "center",
    marginHorizontal: "auto",
    // justifyContent: "space-between",
  },
});
