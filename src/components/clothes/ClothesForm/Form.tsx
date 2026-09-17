import { clothesItemStyles } from "@/app/clothes/clothesItem";
import { styles } from "@/app/styles/global";
import { addToWardrobeButton } from "@/components/buttons/styles";
import UpdateFormButtons from "@/components/buttons/UpdateFormButtons";
import ErrorMessages from "@/components/ErrorMessages";
import { Season, Size } from "@/features/clothes/interface";
import { IValidationError } from "@/helpers/interface";
import { ImagePickerAsset } from "expo-image-picker";
import { t } from "i18next";
import { useEffect, useState } from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
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
  storeLink?: string;

  isOwned: boolean;
}

const Form = ({
  data,
  updateClothesItem,
  deleteClothesById,
  updateStatus = false,
  updateStatusFn,
  loadingState,

  mode,
  handleModeChange,
  messages,
  clearErrrors,
}: {
  data: IClothesItem;
  updateClothesItem: (val: FormData) => void;
  deleteClothesById: () => void;
  updateStatus?: boolean;
  updateStatusFn?: () => void;
  loadingState: boolean;

  mode?: "review" | "edit";
  handleModeChange?: () => void;
  messages: IValidationError[];
  clearErrrors: () => void;
}) => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [colors, setColors] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [season, setSeason] = useState<Season[]>([]);
  const [size, setSize] = useState<Size>();
  const [storeLink, setStoreLink] = useState("");

  const [newImage, setNewImage] = useState<ImagePickerAsset | null>(null);

  useEffect(() => {
    clearErrrors();
  }, []);

  useEffect(() => {
    if (data) {
      setName(data.name || "");
      setBrand(data.brand || "");
      setColors(data.color || []);
      setImage(data.image || "");
      setSeason(data.season || []);
      setSize(data.size || "");
      setStoreLink(data.storeLink || "none");
    }
  }, [data]);

  const isSubmitUnable =
    !name || colors.length == 0 || season.length == 0 || !size;

  const handleUpdate = async () => {
    const form = new FormData();

    clearErrrors();

    if (isSubmitUnable) return;

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

    form.append("storeLink", storeLink);
    form.append("isOwned", JSON.stringify(data.isOwned));

    updateClothesItem(form);
  };

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
                loadingState={loadingState}
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
                loadingState={loadingState}
              />
            ) : (
              // <Image src={image} style={{ width: "100%", height: 400 }} />
              <View style={clothesItemStyles.noImage}></View>
            )}
          </>
        )}

        <InfoItem
          data={name}
          label={t("name")}
          mode={mode!}
          setData={setName}
        />
        <InfoItem
          data={brand}
          label={t("brand")}
          mode={mode!}
          setData={setBrand}
        />

        {mode === "review" ? (
          <View
            style={{
              marginTop: 16,
              width: "100%",
              //   outlineColor: "tomato",
              //   outlineWidth: 1,
            }}
          >
            <Text style={styles.inputName}>{t("colors")}</Text>
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
            loadingState={loadingState}
          />
        )}

        {mode === "review" ? (
          <View style={{ width: "100%", marginTop: 16 }}>
            <Text style={styles.inputName}>{t("season")}</Text>
            <View style={clothesStyles.colorList}>
              {season.map((item, index) => (
                <View key={index} style={clothesStyles.colorTag}>
                  <Text style={clothesStyles.colorTagText}>{t(item)}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : (
          <Seasons
            loadingState={loadingState}
            season={season}
            setSeason={setSeason}
          />
          // <Seasons season={season} handleSeason={handleSeason} />
        )}

        <InfoItem
          data={storeLink}
          label={t("store_link")}
          isLink
          mode={mode!}
          setData={setStoreLink}
        />

        <UpdateFormButtons
          deleteItem={deleteClothesById}
          handleModeChange={() => handleModeChange && handleModeChange()}
          handleUpdate={handleUpdate}
          mode={mode!}
          isAble={!isSubmitUnable}
        />

        {updateStatus && !data.isOwned && mode === "review" && (
          <Pressable
            style={[styles.button, addToWardrobeButton.addToWardrobe]}
            onPress={() => {
              if (updateStatusFn) {
                updateStatusFn();
              }
            }}
          >
            <Text style={addToWardrobeButton.addToWardrobeButtonText}>
              {t('add_to_wardrobe')}
            </Text>
          </Pressable>
        )}
      </View>

      <ErrorMessages mt={16} messages={messages} />
    </ScrollView>
  );
};

export default Form;
