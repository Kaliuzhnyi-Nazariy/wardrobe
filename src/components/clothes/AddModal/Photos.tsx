import { styles } from "@/app/styles/global";
import * as ImagePicker from "expo-image-picker";
import { ImagePickerAsset } from "expo-image-picker";
import { Alert, Image, Pressable, Text, View } from "react-native";
import { clothesStyles } from "../style";

const Photos = ({
  image,
  imagePreview,
  setImage,
  setImagePreview,
}: {
  image?: ImagePickerAsset | null;
  imagePreview?: string;
  setImage: (val: ImagePickerAsset | null) => void;
  setImagePreview: (val: string) => void;
}) => {
  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to allow access to your photos to upload an image.",
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImagePreview(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert(
        "Permission Denied",
        "You need to allow camera access to take a photo.",
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
      setImagePreview(result.assets[0].uri);
    }
  };

  const imageUri =
    typeof imagePreview === "object" &&
    imagePreview !== null &&
    "uri" in imagePreview
      ? imagePreview
      : typeof imagePreview === "string"
      ? imagePreview
      : undefined;

  return (
    <View style={{ width: "100%", marginTop: 16 }}>
      <Text style={styles.inputName}>Clothing Photo</Text>
      <View style={{ flexDirection: "row", gap: 10, marginTop: 5 }}>
        <Pressable
          style={({ pressed }) => [
            clothesStyles.photoButton,
            pressed && clothesStyles.photoButtonPressed,
          ]}
          onPress={takePhoto}
        >
          {({ pressed }) => (
            <Text
              style={[
                clothesStyles.photoButtonText,
                pressed && clothesStyles.photoButtonTextPressed,
              ]}
            >
              📸 Take Photo
            </Text>
          )}
        </Pressable>
        <Pressable
          style={({ pressed }) => [
            clothesStyles.photoButton,
            pressed && clothesStyles.photoButtonPressed,
          ]}
          onPress={pickImage}
        >
          {({ pressed }) => (
            <Text
              style={[
                clothesStyles.photoButtonText,
                pressed && clothesStyles.photoButtonPressed,
              ]}
            >
              🖼️ Gallery
            </Text>
          )}
        </Pressable>
      </View>

      {imageUri && (
        <View style={clothesStyles.previewContainer}>
          <Image
            source={{ uri: imageUri }}
            style={clothesStyles.imagePreview}
          />
          <Pressable
            style={clothesStyles.removePhotoBadge}
            onPress={() => {
              setImagePreview("");
              setImage(null);
            }}
          >
            <Text style={clothesStyles.removePhotoText}>✕ Remove</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default Photos;
