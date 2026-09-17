import ErrorMessages from "@/components/ErrorMessages";
import AddModalLayout from "@/components/modals/AddModalLayout";
import ModalComponent from "@/components/modals/ModalComponent";
import OperationButtons from "@/components/modals/OperationButtons";
import { Size } from "@/features/clothes/interface";
import { addClothes } from "@/features/clothes/request";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { t } from "i18next";
import { useState } from "react";
import Toast from "react-native-toast-message";
import Brand from "./Brand";
import Colors from "./Colors";
import Name from "./Name";
import Photos from "./Photos";
import Seasons from "./Seasons";
import Sizes from "./Sizes";

const AddModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState<string[]>([]);
  const [season, setSeason] = useState<
    ("winter" | "spring" | "fall" | "summer")[]
  >([]);
  const [image, setImage] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [imagePreview, setImagePreview] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState<Size>();
  const [linkToStore, setLinkToStore] = useState("");

  const [inputColor, setInputColor] = useState("");

  const client = useQueryClient();

  const {
    season: searchSeason,
    name: search,
    color: searchColor,
    size: searchSize,
  } = useLocalSearchParams<{
    season?: string;
    name?: string;
    color?: string;
    size?: string;
  }>();

  const { messages, setError, clearErrors } = useErrorHandler();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => addClothes(data),
    onError(err) {
      // console.log(err);
      setError(err);
    },
    onSuccess() {
      setName("");
      setColor([]);
      setBrand("");
      setImage(null);
      setImagePreview("");
      setSeason([]);
      setSize(undefined);
      setInputColor("");
      setModalVisible(false);
      setLinkToStore("");

      Toast.show({
        type: "success",
        text1: t("clothes_added"),
        position: "top",
        visibilityTime: 3000,
      });

      client.invalidateQueries({
        queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
      });
    },
  });

  const handleSubmit = () => {
    const formData = new FormData();

    if (!size) return;

    formData.append("name", name);
    formData.append("size", size);
    formData.append("brand", brand);
    if (image) {
      formData.append("image", {
        uri: image.uri,
        name: image.fileName || "photo.jpg",
        type: image.mimeType || "image/jpeg",
      } as any);
    }
    color.map((c) => {
      formData.append("color", c);
    });
    season.map((s) => {
      formData.append("season", s);
    });
    formData.append("isOwned", "true");

    if (linkToStore.trim().length > 0)
      formData.append("storeLink", linkToStore);

    clearErrors();

    mutate(formData);
  };

  const addAvailable =
    name.length > 0 && color.length > 0 && !!size && season.length > 0;

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <AddModalLayout title={t("add_clothes_item")}>
        <Name
          title={t("name")}
          name={name}
          setName={setName}
          loadingState={isPending}
        />
        <Colors
          loadingState={isPending}
          setColors={setColor}
          // inputColor={inputColor}
          // setInputColor={setInputColor}
          // handleColorInput={handleColorInput}
          // handleDeleteColor={handleDeleteColor}
          color={color}
        />
        <Photos
          loadingState={isPending}
          setImage={setImage}
          setImagePreview={setImagePreview}
          image={image}
          imagePreview={imagePreview}
        />
        <Seasons
          loadingState={isPending}
          season={season}
          setSeason={setSeason}
        />
        <Brand loadingState={isPending} brand={brand} setBrand={setBrand} />
        <Sizes loadingState={isPending} size={size} setSize={setSize} />
        <Name
          title={t("store_link")}
          name={linkToStore}
          setName={setLinkToStore}
          placeholder="Enter the link"
          loadingState={isPending}
        />
      </AddModalLayout>

      <OperationButtons
        loadingState={isPending}
        availabilty={addAvailable}
        handleSubmit={handleSubmit}
        setModalVisible={setModalVisible}
      />

      <ErrorMessages mt={16} messages={messages} />
    </ModalComponent>
  );
};

export default AddModal;
