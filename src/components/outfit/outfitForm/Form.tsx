import { styles } from "@/app/styles/global";
import { addToWardrobeButton } from "@/components/buttons/styles";
import UpdateFormButtons from "@/components/buttons/UpdateFormButtons";
import Photos from "@/components/clothes/AddModal/Photos";
import Seasons from "@/components/clothes/AddModal/Seasons";
import InfoItem from "@/components/InfoItem";
import { Season } from "@/features/clothes/interface";
import { Image } from "expo-image";
import { ImagePickerAsset } from "expo-image-picker";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import ChooseClothes from "../ChooseClothes";
import { ClothesItem } from "../interface";
import { outfitStyle } from "./style";

export interface IOutfit {
  _id: string;
  name: string;
  season: Season[];
  image?: string;
  clothes: ClothesItem[];
}

const Form = ({
  data,
  updateOutfitFn,
  deleteOutfit,
  updateStatus = false,
  updateStatusFn,
  moveDisabled,
}: {
  data: IOutfit;
  updateOutfitFn: (val: FormData) => void;
  deleteOutfit: () => void;
  updateStatus?: boolean;
  updateStatusFn?: () => void;
  moveDisabled?: boolean;
}) => {
  const [mode, setMode] = useState<"review" | "edit">("review");

  const updateMode = () => {
    if (mode === "review") {
      setMode("edit");
    } else {
      setMode("review");
    }
  };

  const [name, setName] = useState("");
  const [season, setSeason] = useState<Season[]>([]);
  const [clothes, setClothes] = useState<ClothesItem[]>([]);

  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  useEffect(() => {
    if (data) {
      setName(data.name);
      setSeason(data.season);
      setClothes(data.clothes);
      setImagePreview(data.image || "");
    }
  }, [data]);

  // const client = useQueryClient();

  // const param = data._id;

  // const { mutate: updateOutfitFn } = useMutation({
  //   mutationFn: (newData: FormData) =>
  //     updateOutfit({ data: newData, id: data._id }),

  //   onSuccess() {
  //     client.invalidateQueries({ queryKey: ["getOutfitById", param] });
  //   },
  // });
  //
  // const {
  //   outfit_season: searchSeason,
  //   outfit_name: searchName,
  //   clothes: searchClothes,
  // } = useLocalSearchParams<{
  //   outfit_season?: string;
  //   outfit_name?: string;
  //   clothes?: string;
  // }>();

  // const { mutate: deleteOutfit } = useMutation({
  //   mutationFn: () => deleteOutfirById(data._id),
  //   onSuccess() {
  //     router.replace("/(tabs)/fits");
  //     client.invalidateQueries({
  //       queryKey: ["getOutfits", searchSeason, searchName, searchClothes],
  //     });
  //   },
  // });

  const handleUpdate = () => {
    const formData = new FormData();

    formData.append("name", name);

    season.forEach((s) => formData.append("season", s));
    clothes.forEach((c) => formData.append("clothes", c._id));

    if (image) {
      formData.append("newImage", {
        uri: image.uri,
        name: image.fileName || "photo.jpg",
        type: image.mimeType || "image/jpeg",
      } as any);
    } else {
      formData.append("sentImage", imagePreview);
    }

    updateOutfitFn(formData);
  };

  // console.log("data in form: ", data.season);
  // console.log(data.clothes.map((c) => c.isOwned));

  return (
    <ScrollView
      style={{ width: "100%", flex: 1 }}
      contentContainerStyle={{
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 32,
      }}
    >
      <View style={[styles.contentContainer]}>
        {image ? (
          <>
            {mode === "review" ? (
              <Image
                source={imagePreview}
                alt={`${name}'s photo`}
                style={{ width: "100%", height: 400 }}
              />
            ) : (
              <Photos
                setImage={setImage}
                image={image}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
              />
            )}
          </>
        ) : (
          <>
            {mode === "review" ? (
              <View style={outfitStyle.noImage}></View>
            ) : (
              <Photos
                setImage={setImage}
                image={image}
                setImagePreview={setImagePreview}
                imagePreview={imagePreview}
              />
            )}
          </>
        )}

        <InfoItem data={name} label="Name" mode={mode} setData={setName} />
        {mode === "review" ? (
          <View style={{ width: "100%", marginTop: 16 }}>
            <Text style={styles.inputName}>Season</Text>
            <View style={outfitStyle.list}>
              {season.map((item, index) => (
                <View
                  key={index}
                  style={[outfitStyle.tag, outfitStyle.tagClothesOwned]}
                >
                  <Text style={outfitStyle.tagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Seasons season={season} setSeason={setSeason} />
        )}

        {mode === "review" ? (
          <>
            {clothes.length === 0 ? (
              <View>
                <Text>No clothes</Text>
              </View>
            ) : (
              <View style={{ width: "100%", marginTop: 16 }}>
                <Text style={styles.inputName}>Clothes</Text>
                <View style={outfitStyle.list}>
                  {clothes.map((c) => {
                    return (
                      <View
                        key={c._id}
                        style={[
                          outfitStyle.tag,
                          c.isOwned
                            ? outfitStyle.tagClothesOwned
                            : outfitStyle.tagClothesNotOwned,
                        ]}
                      >
                        <Text style={outfitStyle.tagText}>{c.name}</Text>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </>
        ) : (
          <ChooseClothes
            isInWishlist={updateStatus}
            selectedClothes={clothes}
            setSelectedClothes={setClothes}
          />
        )}

        <UpdateFormButtons
          deleteItem={deleteOutfit}
          handleModeChange={updateMode}
          handleUpdate={handleUpdate}
          mode={mode}
        />

        {updateStatus && mode === "review" && (
          <Pressable
            style={[
              styles.button,
              addToWardrobeButton.addToWardrobe,
              moveDisabled && { opacity: 0.5 },
            ]}
            onPress={() => {
              if (updateStatusFn) {
                updateStatusFn();
              }
            }}
          >
            <Text style={addToWardrobeButton.addToWardrobeButtonText}>
              Add to wardrobe
            </Text>
          </Pressable>
        )}
      </View>
    </ScrollView>
  );
};

export default Form;
