import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { addClothes } from "@/features/clothes/request";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { t } from "i18next";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import Brand from "../clothes/AddModal/Brand";
import Colors from "../clothes/AddModal/Colors";
import Name from "../clothes/AddModal/Name";
import Photos from "../clothes/AddModal/Photos";
import Seasons from "../clothes/AddModal/Seasons";
import Sizes from "../clothes/AddModal/Sizes";
import ErrorMessages from "../ErrorMessages";
import ChooseClothes from "../outfit/ChooseClothes";
import { ClothesItem } from "../outfit/interface";
import { wishlistStyles } from "./style";

export const ChooseClothesInOutfit = ({
  chosenClothes,
  setClothes,
  setClothesOpen,
  handleClothesIsAble,
}: {
  handleClothesIsAble: boolean;
  chosenClothes: ClothesItem[];
  setClothes: React.Dispatch<React.SetStateAction<ClothesItem[]>>;
  setClothesOpen?: (val: boolean) => void;
}) => {
  const [chosenMethod, setChosenMethod] = useState<
    "wardrobe" | "new" | undefined
  >();

  const [newClothesName, setNewClothesName] = useState("");
  const [newClothesBrand, setNewClothesBrand] = useState("");
  const [newClothesSeasons, setNewClothesSeason] = useState<Season[]>([]);
  const [newClothesSize, setNewClothesSize] = useState<Size>();
  const [newClothesColors, setNewClothesColors] = useState<string[]>([]);
  const [newClothesLinkToStore, setNewClothesLinkToStore] =
    useState<string>("");

  const [newClothesPreview, setNewClothesPreview] = useState("");
  const [newClothesImage, setNewClothesImage] =
    useState<ImagePickerAsset | null>(null);

  const handleClose = () => setChosenMethod(undefined);

  const client = useQueryClient();

  const { messages, clearErrors, setError } = useErrorHandler();

  const { mutate: addWishClothes, isPending } = useMutation({
    mutationFn: (clothesData: FormData) => addClothes(clothesData),
    onSuccess(data: ClothesItem) {
      // onSuccess(data: { data: ClothesItem }) {
      // resetFields();
      // console.log(data._id);
      handleClose();
      setClothes((prev) => [
        ...prev,
        {
          _id: data._id,
          name: data.name,
          isOwned: data.isOwned,
        },
      ]);
      Toast.show({
        type: "success",
        text1: t("clothes_added"),
        position: "top",
        visibilityTime: 3000,
      });
      client.invalidateQueries({ queryKey: ["getWishlist"] });
    },
    onError(err) {
      setError(err);
    },
  });

  const isAddingDisable =
    newClothesName.length == 0 ||
    !newClothesSize ||
    newClothesSeasons.length === 0 ||
    newClothesColors.length === 0;

  const handleClothesSubmit = () => {
    const formData = new FormData();

    if (isAddingDisable) return;

    formData.append("name", newClothesName);
    formData.append("brand", newClothesBrand);
    formData.append("size", newClothesSize!);

    newClothesColors.forEach((cc) => formData.append("color", cc));
    newClothesSeasons.forEach((cs) => formData.append("season", cs));

    if (newClothesImage) {
      formData.append("image", {
        uri: newClothesImage.uri,
        name: newClothesImage.fileName || "photo.jpg",
        type: newClothesImage.mimeType || "image/jpeg",
      } as any);
    }

    formData.append("isOwned", "false");

    clearErrors();

    addWishClothes(formData);
  };

  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <Text style={styles.inputName}>{t("select_clothes")}</Text>

      <View style={wishlistStyles.list}>
        {chosenClothes.map((cc) => (
          <View key={cc._id} style={wishlistStyles.clothesItem}>
            <Text style={wishlistStyles.clothesItemText}>{cc.name}</Text>
            <Text style={wishlistStyles.clothesItemText}>X</Text>
          </View>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={{ gap: 16, width: "100%", marginTop: 8 }}
      >
        {/* <View style={{ gap: 16, width: "100%", marginTop: 8 }}> */}
        {!chosenMethod ? (
          <View style={wishlistStyles.btnContainer}>
            <Pressable
              disabled={handleClothesIsAble}
              onPress={() => {
                setChosenMethod("wardrobe");
                if (setClothesOpen) setClothesOpen(true);
              }}
              style={(pressed) => [
                styles.button,
                wishlistStyles.btnOption,
                pressed && wishlistStyles.btnOptionPressed,
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[wishlistStyles.text, wishlistStyles.textButtonChosen]}
                >
                  {t("add_from_wardrobe")}
                </Text>
              )}
            </Pressable>
            <Pressable
              disabled={handleClothesIsAble}
              onPress={() => {
                setChosenMethod("new");
                if (setClothesOpen) setClothesOpen(true);
              }}
              style={({ pressed }) => [
                styles.button,
                wishlistStyles.btnOption,
                pressed && wishlistStyles.btnOptionPressed,
              ]}
            >
              {({ pressed }) => (
                <Text
                  style={[
                    wishlistStyles.text,
                    pressed && wishlistStyles.textButtonChosen,
                  ]}
                >
                  {t("add_new")}
                </Text>
              )}
            </Pressable>
          </View>
        ) : (
          <Pressable
            onPress={() => {
              setChosenMethod(undefined);
              if (setClothesOpen) setClothesOpen(false);
            }}
            style={[styles.button, wishlistStyles.cancelBtn]}
          >
            <Text>{t("close")}</Text>
          </Pressable>
        )}

        {chosenMethod && (
          <>
            {chosenMethod === "new" ? (
              <View
                style={{
                  borderTopWidth: 1,
                  borderTopColor: "brown",
                  borderBottomColor: "brown",
                  borderBottomWidth: 1,
                  paddingVertical: 16,
                }}
              >
                <Name
                  title={t("name")}
                  loadingState={isPending}
                  name={newClothesName}
                  setName={setNewClothesName}
                />

                <Colors
                  loadingState={isPending}
                  color={newClothesColors}
                  setColors={setNewClothesColors}
                />

                <Photos
                  loadingState={isPending}
                  setImage={setNewClothesImage}
                  setImagePreview={setNewClothesPreview}
                  image={newClothesImage}
                  imagePreview={newClothesPreview}
                />

                <Seasons
                  loadingState={isPending}
                  season={newClothesSeasons}
                  setSeason={setNewClothesSeason}
                />

                <Brand
                  loadingState={isPending}
                  brand={newClothesBrand}
                  setBrand={setNewClothesBrand}
                />

                <Sizes
                  loadingState={isPending}
                  size={newClothesSize}
                  setSize={setNewClothesSize}
                />

                <Name
                  loadingState={isPending}
                  title={t("store_link")}
                  name={newClothesLinkToStore}
                  setName={setNewClothesLinkToStore}
                  placeholder="Enter the link"
                />

                <View style={[wishlistStyles.btnContainer, { marginTop: 16 }]}>
                  <Pressable
                    onPress={handleClothesSubmit}
                    disabled={isAddingDisable}
                    style={({ pressed }) => [
                      styles.button,
                      wishlistStyles.btnAdd,
                      pressed && wishlistStyles.btnAddPressed,
                      isAddingDisable && { opacity: 0.5 },
                    ]}
                  >
                    {({ pressed }) => (
                      <Text
                        style={[
                          wishlistStyles.text,
                          wishlistStyles.textButtonAdd,
                          pressed && wishlistStyles.textButtonAddPressed,
                        ]}
                      >
                        {/* Add */}
                        {t("add")}
                      </Text>
                    )}
                  </Pressable>
                  <Pressable
                    // onPress={resetFields}
                    style={({ pressed }) => [
                      styles.button,
                      wishlistStyles.btnOption,
                      pressed && wishlistStyles.resetBtnPressed,
                    ]}
                  >
                    {({ pressed }) => (
                      <Text
                        style={[
                          wishlistStyles.text,
                          wishlistStyles.textResetBtn,
                          pressed && wishlistStyles.textResetBtnPressed,
                        ]}
                      >
                        {/* Reset */}
                        {t("reset")}
                      </Text>
                    )}
                  </Pressable>
                </View>
                <ErrorMessages mt={16} messages={messages} />
              </View>
            ) : (
              <ChooseClothes
                isInWishlist
                showList={false}
                selectedClothes={chosenClothes}
                setSelectedClothes={setClothes}
                extraFn={handleClose}
              />
            )}
          </>
        )}
      </ScrollView>
    </View>
  );
};
