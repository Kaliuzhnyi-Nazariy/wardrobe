import { colors } from "@/app/styles/global";
import { StyleSheet } from "react-native";

export const clothesStyles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
    width: "100%",
    marginBottom: 40,
  },

  textStyle: {
    // color: colors.se,
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
  },

  formScroll: {
    width: "100%",
    marginBottom: 15,
  },

  field: {
    marginTop: 12,
    width: "100%",
  },

  inputField: {
    display: "flex",
    gap: 4,
  },

  sizeButton: {
    // width: 36,
    // height: 36,
    width: "15.5%",
    paddingVertical: 12,
    // height: "15%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.chips,
    borderRadius: 8,
  },

  sizeActive: {
    backgroundColor: colors.secondary,
  },

  sizeText: { textTransform: "uppercase", fontWeight: "bold" },

  activeButtonText: {
    color: colors.card,
  },

  // seasonList: {
  //   display: "flex",
  //   flexDirection: "row",
  //   gap: 8,
  //   marginTop: 8,
  // },
  // seasonButton: {
  //   paddingVertical: 8,
  //   paddingHorizontal: 14,
  //   borderRadius: 8,
  //   backgroundColor: colors.chips,
  // },
  // seasonButtonText: {
  //   textTransform: "capitalize",
  //   textAlign: "center",
  //   fontWeight: "bold",
  // },
  // seasonButtonActive: {
  //   backgroundColor: colors.secondary,
  // },
  // seasonButtonActiveText: { color: colors.card },

  // item
  card: {
    borderRadius: 8,
    // outlineColor: "tomato",
    // outlineWidth: 1,
    // backgroundColor: colors.primary,
    backgroundColor: colors.card,
    width: "100%",
    height: 165,
    flexDirection: "row",
  },
  imageView: {
    width: 120,
    height: "100%",
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
  },
  image: {
    width: 120,
    height: "100%",
  },
  noImage: {
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
  },
  noImageText: {
    color: colors.card,
  },
  dataContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  dataBlock: {
    flexDirection: "row",
  },
  name: {
    fontWeight: 700,
    color: colors.primary,
  },
  data: {
    fontSize: 12,
    color: colors.primary,
    opacity: 0.7,
  },
  chirpList: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
    marginTop: 4,
    flexWrap: "wrap",
  },
  chirp: {
    backgroundColor: colors.chips,
    color: colors.card,
    textTransform: "capitalize",
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  size: {
    textTransform: "uppercase",
  },

  // colors input
  inlineRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  addButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  addButtonText: {
    color: colors.card,
    fontWeight: "bold",
  },
  colorTag: {
    display: "flex",
    flexDirection: "row",
    backgroundColor: colors.chips,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  colorTagText: {
    fontSize: 14,
    color: colors.card,
  },
  tagDelete: { marginLeft: 5, color: colors.background },
  colorList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 10,
  },
  colorInput: { flex: 1, marginBottom: 0, marginTop: 4 },

  // season
  seasonsList: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 4 },
  seasonsButton: {
    width: "48%",
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    backgroundColor: colors.accent,
  },
  seasonsButtonActive: {
    backgroundColor: colors.chips,
  },
  seasonsButtonText: {
    color: colors.primary,
  },
  seasonsButtonTextActive: {
    color: colors.card,
  },

  // sizes
  sizesList: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 4,
    width: "100%",
    marginTop: 4,
  },
  sizesButton: {
    width: "15.5%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 6,
    backgroundColor: colors.accent,
  },
  sizesButtonActive: {
    backgroundColor: colors.chips,
  },
  sizesButtonText: {
    textTransform: "uppercase",
    color: colors.primary,
  },
  sizesButtonTextActive: {
    color: colors.card,
  },

  // photo picker
  previewContainer: {
    marginTop: 10,
    position: "relative",
    alignItems: "center",
    maxHeight: 400,
  },
  imagePreview: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    backgroundColor: "#eee",
  },
  removePhotoBadge: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  removePhotoText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  photoButton: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  photoButtonPressed: {
    backgroundColor: colors.card,
    borderColor: colors.secondary,
  },
  photoButtonText: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 14,
  },
  photoButtonTextPressed: {
    color: colors.primary,
  },
});
