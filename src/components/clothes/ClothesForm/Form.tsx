import { clothesItemStyles } from "@/app/clothes/clothesItem";
import { styles } from "@/app/styles/global";
import UpdateFormButtons from "@/components/buttons/UpdateFormButtons";
import { Season, Size } from "@/features/clothes/interface";
import { deleteClothes, updateClothes } from "@/features/clothes/request";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ImagePickerAsset } from "expo-image-picker";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import InfoItem from "../../InfoItem";
import Colors from "../AddModal/Colors";
import Photos from "../AddModal/Photos";
import Seasons from "../AddModal/Seasons";
import { clothesStyles } from "../style";

export interface IClothesItem {
  _id: string;
  name: string;
  color: string[];
  image?: string;
  season: Season[];
  size: Size;
  brand: string;
}

const Form = ({ data }: { data: IClothesItem }) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [season, setSeason] = useState<Season[]>([]);
  const [size, setSize] = useState<Size>();

  const [newImage, setNewImage] = useState<ImagePickerAsset | null>(null);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setBrand(data.brand || "");
      setColors(data.color || []);
      setImage(data.image || "");
      setSeason(data.season || []);
      setSize(data.size || "");
    }
  }, [data]);

  const [mode, setMode] = useState<"review" | "edit">("review");

  const handleModeChange = () => {
    if (mode === "edit") {
      setMode("review");
    } else {
      setMode("edit");
    }
  };

  // const [inputColor, setInputColor] = useState("");

  // const colorsInputHandle = () => {
  //   if (!colors.includes(inputColor)) {
  //     setColors([...colors, inputColor]);
  //   }

  //   setInputColor("");
  // };

  // const handleDeleteColor = (color: string) => {
  //   setColors(colors.filter((c) => c !== color));
  // };

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

  const { mutate: updateClothesItem, isPending } = useMutation({
    mutationFn: (clothesData: FormData) =>
      updateClothes({
        id: data._id,
        data: clothesData,
      }),

    onSuccess() {
      client.invalidateQueries({
        queryKey: ["getClothes", searchSeason, search, searchColor, searchSize],
      });
      handleModeChange();
    },
    onError(err) {
      console.log(err);
      return;
    },
  });

  const handleUpdate = async () => {
    const form = new FormData();

    if (
      !name ||
      !brand ||
      colors.length == 0 ||
      !image ||
      season.length == 0 ||
      !size
    )
      return;

    form.append("name", name);
    form.append("brand", brand);

    colors.map((c) => form.append("color", c));
    if (newImage) {
      form.append("newImage", {
        uri: newImage.uri,
        name: newImage.fileName || "photo.jpg",
        type: newImage.mimeType || "image/jpeg",
      } as any);
    } else {
      form.append("image", image);
    }
    season.map((s) => form.append("season", s));
    form.append("size", size);

    updateClothesItem(form);
  };

  const { mutate: deleteClothesById } = useMutation({
    mutationFn: () => deleteClothes({ id: data._id }),
    onSuccess() {
      router.replace("/(tabs)/clothes");
    },
    onError(err) {
      console.log(err);
      return;
    },
  });

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
            {mode === "edit" ? (
              <Photos
                setImage={setNewImage}
                image={newImage}
                setImagePreview={setImage}
                imagePreview={image}
              />
            ) : (
              <Image src={image} style={{ width: "100%", height: 400 }} />
            )}
          </>
        ) : (
          <>
            {mode === "edit" ? (
              <Photos
                setImage={setNewImage}
                image={newImage}
                setImagePreview={setImage}
                imagePreview={image}
              />
            ) : (
              // <Image src={image} style={{ width: "100%", height: 400 }} />
              <View style={clothesItemStyles.noImage}></View>
            )}
          </>
        )}

        <InfoItem data={name} label="Name" mode={mode} setData={setName} />
        <InfoItem data={brand} label="Brand" mode={mode} setData={setBrand} />

        {mode === "review" ? (
          <View
            style={{
              marginTop: 16,
              width: "100%",
              //   outlineColor: "tomato",
              //   outlineWidth: 1,
            }}
          >
            <Text style={styles.inputName}>Colors</Text>
            <View style={clothesStyles.colorList}>
              {colors.map((item, index) => (
                <View key={index} style={clothesStyles.colorTag}>
                  <Text style={clothesStyles.colorTagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Colors
            color={colors}
            setColors={setColors}
            // handleColorInput={colorsInputHandle}
            // handleDeleteColor={handleDeleteColor}
            // inputColor={inputColor}
            // setInputColor={setInputColor}
            key="color_input"
          />
        )}

        {mode === "review" ? (
          <View style={{ width: "100%", marginTop: 16 }}>
            <Text style={styles.inputName}>Season</Text>
            <View style={clothesStyles.colorList}>
              {season.map((item, index) => (
                <View key={index} style={clothesStyles.colorTag}>
                  <Text style={clothesStyles.colorTagText}>{item}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Seasons season={season} setSeason={setSeason} />
          // <Seasons season={season} handleSeason={handleSeason} />
        )}

        <UpdateFormButtons
          deleteItem={deleteClothesById}
          handleModeChange={handleModeChange}
          handleUpdate={handleUpdate}
          mode={mode}
        />
      </View>
    </ScrollView>
  );
};

export default Form;
