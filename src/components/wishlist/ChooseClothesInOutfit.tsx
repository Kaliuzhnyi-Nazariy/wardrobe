import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { addClothes } from "@/features/clothes/request";
import { useMutation } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import Brand from "../clothes/AddModal/Brand";
import Colors from "../clothes/AddModal/Colors";
import Name from "../clothes/AddModal/Name";
import Photos from "../clothes/AddModal/Photos";
import Seasons from "../clothes/AddModal/Seasons";
import Sizes from "../clothes/AddModal/Sizes";
import ChooseClothes from "../outfit/ChooseClothes";
import { ClothesItem } from "../outfit/interface";
import { wishlistStyles } from "./style";

export const ChooseClothesInOutfit = ({
  chosenClothes,
  setClothes,
  setClothesOpen,
}: // handleClothesSubmit,
// resetFields,
{
  chosenClothes: ClothesItem[];
  setClothes: React.Dispatch<React.SetStateAction<ClothesItem[]>>;
  // handleClothesSubmit: () => void;
  // resetFields: () => void;
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

  const [newClothesPreview, setNewClothesPreview] = useState("");
  const [newClothesImage, setNewClothesImage] =
    useState<ImagePickerAsset | null>(null);

  const handleClose = () => setChosenMethod(undefined);

  const { mutate: addWishClothes, isPending } = useMutation({
    mutationFn: (clothesData: FormData) => addClothes(clothesData),
    onSuccess(data: { data: ClothesItem }) {
      // resetFields();
      handleClose();
      setClothes((prev) => [
        ...prev,
        { _id: data.data._id, name: data.data.name },
      ]);
    },
  });

  const handleClothesSubmit = () => {
    const formData = new FormData();

    if (
      !newClothesBrand ||
      !newClothesName ||
      !newClothesSize ||
      newClothesSeasons.length === 0 ||
      newClothesColors.length === 0
    )
      return;

    formData.append("name", newClothesName);
    formData.append("brand", newClothesBrand);
    formData.append("size", newClothesSize);

    newClothesColors.forEach((cc) => formData.append("colors", cc));
    newClothesSeasons.forEach((cs) => formData.append("season", cs));

    if (newClothesImage) {
      formData.append("image", {
        uri: newClothesImage.uri,
        name: newClothesImage.fileName || "photo.jpg",
        type: newClothesImage.mimeType || "image/jpeg",
      } as any);
    }

    formData.append("isOwned", "false");

    addWishClothes(formData);
  };

  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <Text style={styles.inputName}>Select clothes</Text>

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
                  Add from wardrobe
                </Text>
              )}
            </Pressable>
            <Pressable
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
                  Add new
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
            <Text>Close</Text>
          </Pressable>
        )}

        {chosenMethod && (
          <>
            {chosenMethod === "new" ? (
              <>
                <Name name={newClothesName} setName={setNewClothesName} />

                <Colors
                  color={newClothesColors}
                  setColors={setNewClothesColors}
                />

                <Photos
                  setImage={setNewClothesImage}
                  setImagePreview={setNewClothesPreview}
                  image={newClothesImage}
                  imagePreview={newClothesPreview}
                />

                <Seasons
                  season={newClothesSeasons}
                  setSeason={setNewClothesSeason}
                />

                <Brand brand={newClothesBrand} setBrand={setNewClothesBrand} />

                <Sizes size={newClothesSize} setSize={setNewClothesSize} />

                <View style={[wishlistStyles.btnContainer]}>
                  <Pressable
                    onPress={handleClothesSubmit}
                    style={({ pressed }) => [
                      styles.button,
                      wishlistStyles.btnAdd,
                      pressed && wishlistStyles.btnAddPressed,
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
                        Add
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
                        Reset
                      </Text>
                    )}
                  </Pressable>
                </View>
              </>
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
