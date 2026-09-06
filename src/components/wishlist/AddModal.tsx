import { styles } from "@/app/styles/global";
import { Season, Size } from "@/features/clothes/interface";
import { addClothes } from "@/features/clothes/request";
import { createOutfit } from "@/features/outfit/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import Brand from "../clothes/AddModal/Brand";
import Colors from "../clothes/AddModal/Colors";
import Name from "../clothes/AddModal/Name";
import OperationModalButtons from "../clothes/AddModal/OperationModalButtons";
import Photos from "../clothes/AddModal/Photos";
import Seasons from "../clothes/AddModal/Seasons";
import Sizes from "../clothes/AddModal/Sizes";
import AddModalLayout from "../modals/AddModalLayout";
import ModalComponent from "../modals/ModalComponent";
import { ClothesItem } from "../outfit/interface";
import { ChooseClothesInOutfit } from "./ChooseClothesInOutfit";
import { wishlistStyles } from "./style";

const AddModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) => {
  const [mode, setMode] = useState<"clothes" | "outfit" | undefined>();

  // clothes data
  const [clothesName, setClothesName] = useState("");
  const [clothesSeason, setClothesSeason] = useState<Season[]>([]);
  const [clothesColor, setClothesColor] = useState<string[]>([]);
  const [clothesBrand, setClothesBrand] = useState("");
  const [clothesSize, setClothesSize] = useState<Size>();
  const [clothesImagePreview, setClothesImagePreview] = useState("");

  const [clothesImage, setClothesImage] = useState<ImagePickerAsset | null>(
    null,
  );

  const [linkToStore, setLinkToStore] = useState("");

  // outfit data
  const [outfitName, setOutfitName] = useState("");
  const [outfitClothes, setOutfitClohtes] = useState<ClothesItem[]>([]);
  const [outfitSeason, setOutfitSeason] = useState<Season[]>([]);
  const [outfitImagePreview, setOutfitImagePreview] = useState("");

  const [outfitImage, setOutfitImage] = useState<ImagePickerAsset | null>(null);

  const resetFields = () => {
    setClothesBrand("");
    setClothesColor([]);
    setClothesImage(null);
    setClothesImagePreview("");
    setClothesName("");
    setClothesSeason([]);
    setClothesSize(undefined);

    setOutfitClohtes([]);
    setOutfitImage(null);
    setOutfitImagePreview("");
    setOutfitName("");
    setOutfitSeason([]);
    setLinkToStore("");
  };

  const client = useQueryClient();

  // submits
  const { mutate: addWishClothes, isPending } = useMutation({
    mutationFn: (clothesData: FormData) => addClothes(clothesData),
    onSuccess() {
      resetFields();
      setModalVisible(false);
      setMode(undefined);
      client.invalidateQueries({ queryKey: ["getWishlist"] });
    },
  });

  const handleClothesSubmit = () => {
    const formData = new FormData();

    if (
      !clothesBrand ||
      !clothesName ||
      !clothesSize ||
      clothesSeason.length === 0 ||
      clothesColor.length === 0
    )
      return;

    formData.append("name", clothesName);
    formData.append("brand", clothesBrand);
    formData.append("size", clothesSize);

    clothesColor.forEach((cc) => formData.append("color", cc));
    clothesSeason.forEach((cs) => formData.append("season", cs));

    if (clothesImage) {
      formData.append("image", {
        uri: clothesImage.uri,
        name: clothesImage.fileName || "photo.jpg",
        type: clothesImage.mimeType || "image/jpeg",
      } as any);
    }

    formData.append("isOwned", "false");

    if (linkToStore.trim().length > 0)
      formData.append("storeLink", linkToStore);

    addWishClothes(formData);
  };

  const { mutate: addWishOutfit, isPending: outfitPending } = useMutation({
    mutationFn: (clothesData: FormData) => createOutfit(clothesData),
    onSuccess() {
      resetFields();
      setModalVisible(false);
      setMode(undefined);
      client.invalidateQueries({ queryKey: ["getWishlist"] });
    },
  });

  const handleOutfitSubmit = () => {
    const formData = new FormData();

    if (!outfitName || outfitSeason.length === 0 || outfitClothes.length === 0)
      return;

    formData.append("name", outfitName);

    outfitClothes.forEach((cc) => formData.append("clothes", cc._id));
    outfitSeason.forEach((cs) => formData.append("season", cs));

    if (outfitImage) {
      formData.append("image", {
        uri: outfitImage.uri,
        name: outfitImage.fileName || "photo.jpg",
        type: outfitImage.mimeType || "image/jpeg",
      } as any);
    }

    formData.append("isOwned", "false");

    addWishOutfit(formData);
  };

  const closeModal = () => {
    setMode(undefined);
    setModalVisible(false);
  };

  const clothesAvailability =
    clothesName.length > 0 &&
    clothesColor.length > 0 &&
    !!clothesSize &&
    clothesSeason.length > 0;

  const outfitAvailability =
    outfitName.length > 0 &&
    outfitSeason.length > 0 &&
    outfitClothes.length > 0;

  const resetOutfitIsAvailable =
    outfitName.length > 0 ||
    outfitClothes.length > 0 ||
    outfitSeason.length > 0 ||
    !!outfitImage;

  const resetClothesIsAvailable =
    clothesName.length > 0 ||
    clothesBrand.length > 0 ||
    clothesSeason.length > 0 ||
    !!clothesImage ||
    clothesColor.length > 0 ||
    !!clothesSize;

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <AddModalLayout title="Add to wishlist">
        <View style={wishlistStyles.btnContainer}>
          <Pressable
            onPress={() => setMode("clothes")}
            style={[
              styles.button,
              wishlistStyles.btnOption,
              mode === "clothes" && wishlistStyles.btnOptionPressed,
            ]}
          >
            <Text
              style={[
                wishlistStyles.text,
                mode === "clothes" && wishlistStyles.textButtonChosen,
              ]}
            >
              Clothes
            </Text>
          </Pressable>
          <Pressable
            onPress={() => setMode("outfit")}
            style={[
              styles.button,
              wishlistStyles.btnOption,
              mode === "outfit" && wishlistStyles.btnOptionPressed,
            ]}
          >
            <Text
              style={[
                wishlistStyles.text,
                mode === "outfit" && wishlistStyles.textButtonChosen,
              ]}
            >
              Outfit
            </Text>
          </Pressable>
        </View>

        <View
          style={[wishlistStyles.container, !mode && wishlistStyles.noMode]}
        >
          {!mode ? (
            <Text>
              <Text>Select what you want to add!</Text>
            </Text>
          ) : (
            <>
              {mode === "clothes" ? (
                <>
                  <Name name={clothesName} setName={setClothesName} />

                  <Colors color={clothesColor} setColors={setClothesColor} />

                  <Photos
                    setImage={setClothesImage}
                    setImagePreview={setClothesImagePreview}
                    image={clothesImage}
                    imagePreview={clothesImagePreview}
                  />

                  <Seasons
                    season={clothesSeason}
                    setSeason={setClothesSeason}
                  />

                  <Brand brand={clothesBrand} setBrand={setClothesBrand} />

                  <Sizes size={clothesSize} setSize={setClothesSize} />

                  <Name
                    title="Link to store"
                    name={linkToStore}
                    setName={setLinkToStore}
                    placeholder="Enter the link"
                  />

                  <OperationModalButtons
                    isResetAvailable={resetClothesIsAvailable}
                    handleSubmit={handleClothesSubmit}
                    resetFn={resetFields}
                    availabilty={clothesAvailability}
                  />
                </>
              ) : (
                <>
                  <Name name={outfitName} setName={setOutfitName} />

                  <Photos
                    setImage={setOutfitImage}
                    setImagePreview={setOutfitImagePreview}
                    image={outfitImage}
                    imagePreview={outfitImagePreview}
                  />

                  <ChooseClothesInOutfit
                    chosenClothes={outfitClothes}
                    setClothes={setOutfitClohtes}
                  />

                  <Seasons season={outfitSeason} setSeason={setOutfitSeason} />

                  <OperationModalButtons
                    isResetAvailable={resetOutfitIsAvailable}
                    handleSubmit={handleOutfitSubmit}
                    resetFn={resetFields}
                    availabilty={outfitAvailability}
                  />
                </>
              )}
            </>
          )}
        </View>
      </AddModalLayout>
      <Pressable
        onPress={closeModal}
        style={({ pressed }) => [
          styles.button,
          wishlistStyles.closeBtn,
          pressed && wishlistStyles.closeBtnClicked,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              wishlistStyles.closeBtnText,
              pressed && wishlistStyles.closeBtnTextPressed,
            ]}
          >
            Close
          </Text>
        )}
      </Pressable>
    </ModalComponent>
  );
};

export default AddModal;
