import { Season } from "@/features/clothes/interface";
import { createOutfit } from "@/features/outfit/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import Name from "../clothes/AddModal/Name";
import Photos from "../clothes/AddModal/Photos";
import Seasons from "../clothes/AddModal/Seasons";
import AddModalLayout from "../modals/AddModalLayout";
import ModalComponent from "../modals/ModalComponent";
import OperationButtons from "../modals/OperationButtons";
import ChooseClothes from "./ChooseClothes";
import { ClothesItem } from "./interface";

const AddModal = ({
  modalVisible,
  setModalVisible,
}: {
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
}) => {
  const [name, setName] = useState("");
  const [seasons, setSeasons] = useState<Season[]>([]);

  const [photo, setPhoto] = useState<ImagePickerAsset | null>(null);
  const [previewPhoto, setPreviewPhoto] = useState("");
  const [clothes, setClothes] = useState<ClothesItem[]>([]);

  const client = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => createOutfit(data),

    onSuccess() {
      client.invalidateQueries({
        queryKey: ["getOutfits"],
      });
      setModalVisible(false);
    },
    onError(err) {
      console.log(err);
    },
  });

  const availabilty =
    name.length > 0 && seasons.length > 0 && clothes.length > 0;

  const handleAddOutfit = () => {
    if (seasons.length === 0 || clothes.length === 0) return;

    const formData = new FormData();

    formData.append("name", name);

    seasons.forEach((s) => {
      formData.append("season", typeof s === "object" ? (s as any)._id : s);
    });

    clothes.forEach((c) => formData.append("clothes", c._id));

    if (photo) {
      formData.append("image", {
        uri: photo.uri,
        name: photo.fileName || "photo.jpg",
        type: photo.mimeType || "image/jpeg",
      } as any);
    }

    formData.append("isOwned", "true");

    mutate(formData);
  };

  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
    >
      <AddModalLayout title="Add outfit">
        <Name name={name} setName={setName} />
        <Seasons season={seasons} setSeason={setSeasons} />
        <Photos
          setImage={setPhoto}
          setImagePreview={setPreviewPhoto}
          image={photo}
          imagePreview={previewPhoto}
        />
        <ChooseClothes
          selectedClothes={clothes}
          setSelectedClothes={setClothes}
        />
      </AddModalLayout>
      <OperationButtons
        availabilty={availabilty}
        handleSubmit={handleAddOutfit}
        setModalVisible={setModalVisible}
      />
    </ModalComponent>
  );
};

export default AddModal;
