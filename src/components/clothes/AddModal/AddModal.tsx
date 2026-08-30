import AddModalLayout from "@/components/modals/AddModalLayout";
import ModalComponent from "@/components/modals/ModalComponent";
import OperationButtons from "@/components/modals/OperationButtons";
import { Size } from "@/features/clothes/interface";
import { addClothes } from "@/features/clothes/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
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

  // const handleColorInput = (col: string) => {
  //   if (col.trim().length === 0) {
  //     setInputColor("");
  //     return;
  //   }

  //   const isInList = color.includes(col.toLowerCase());

  //   if (!isInList) {
  //     setColor([...color, col.toLowerCase()]);
  //     setInputColor("");
  //   } else {
  //     setInputColor("");
  //   }
  // };

  // const handleDeleteColor = (col: string) => {
  //   setColor(color.filter((c) => c !== col));
  // };

  // const handleSeason = (
  //   pickSeason: "winter" | "spring" | "fall" | "summer",
  // ) => {
  //   if (season.includes(pickSeason)) {
  //     setSeason(season.filter((s) => s !== pickSeason));
  //   } else {
  //     setSeason([...season, pickSeason]);
  //   }
  // };

  const { mutate } = useMutation({
    mutationFn: (data: FormData) => addClothes(data),
    onError(err) {
      console.log(err);
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

    mutate(formData);
  };

  const addAvailable =
    name.length > 0 && color.length > 0 && !!size && season.length > 0;

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <AddModalLayout title="Add clothes item">
        <Name name={name} setName={setName} />

        <Colors
          setColors={setColor}
          // inputColor={inputColor}
          // setInputColor={setInputColor}
          // handleColorInput={handleColorInput}
          // handleDeleteColor={handleDeleteColor}
          color={color}
        />

        <Photos
          setImage={setImage}
          setImagePreview={setImagePreview}
          image={image}
          imagePreview={imagePreview}
        />

        <Seasons season={season} setSeason={setSeason} />

        <Brand brand={brand} setBrand={setBrand} />

        <Sizes size={size} setSize={setSize} />
      </AddModalLayout>

      <OperationButtons
        availabilty={addAvailable}
        handleSubmit={handleSubmit}
        setModalVisible={setModalVisible}
      />
    </ModalComponent>
  );
};

export default AddModal;
