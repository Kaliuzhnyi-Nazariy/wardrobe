import { styles } from "@/app/styles/global";
import { getClothes } from "@/features/clothes/request";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { useDebounce } from "use-debounce";
import ModalButton from "../buttons/ModalButton";
import { ClothesItem } from "./interface";
import { addOutfitStyle } from "./style";

const ChooseClothes = ({
  showList = true,
  selectedClothes,
  setSelectedClothes,
  extraFn,
  isInWishlist,
}: {
  showList?: boolean;
  selectedClothes: ClothesItem[];
  setSelectedClothes: React.Dispatch<React.SetStateAction<ClothesItem[]>>;
  extraFn?: () => void;
  isInWishlist?: boolean;
}) => {
  const [addClothesMode, setAddClothesMode] = useState(false);
  const [searchVal, setSearchVal] = useState("");

  const [debouncedSearchVal] = useDebounce(searchVal, 300);

  const { data: clothes, isFetching } = useQuery({
    queryKey: ["clothesForOutfit", debouncedSearchVal],
    queryFn: () =>
      getClothes({
        name: debouncedSearchVal,
        isOwned: isInWishlist ? "undefined" : "true",
      }),
  });

  const handleClothesItem = (item: ClothesItem) => {
    setSelectedClothes((prev) => [...prev, item]);
    setSearchVal("");
    setAddClothesMode(false);
  };

  const handleRemove = ({ id }: { id: string }) => {
    setSelectedClothes(selectedClothes.filter((sc) => sc._id !== id));
  };

  if (isFetching) {
    return (
      <View>
        <Text>Loaidng...</Text>
      </View>
    );
  }

  return (
    <View style={{ marginTop: 16, width: "100%" }}>
      <Text style={styles.inputName}>Clothes</Text>
      {showList && (
        <>
          {selectedClothes.length > 0 ? (
            // <View style={addOutfitStyle.list}>
            //   {selectedClothes.map(({ name, _id }) => (
            //     <View key={_id} style={addOutfitStyle.chosenClothesItem}>
            //       <Text style={addOutfitStyle.chosenClothesItemText}>
            //         {name}
            //       </Text>
            //       <Pressable onPress={() => handleRemove({ id: _id })}>
            //         <Text style={addOutfitStyle.chosenClothesItemText}>X</Text>
            //       </Pressable>
            //     </View>
            //   ))}
            // </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={addOutfitStyle.list}
            >
              {selectedClothes.map(({ name, _id }) => (
                <View key={_id} style={addOutfitStyle.chosenClothesItem}>
                  <Text style={addOutfitStyle.chosenClothesItemText}>
                    {name}
                  </Text>
                  <Pressable onPress={() => handleRemove({ id: _id })}>
                    <Text style={addOutfitStyle.chosenClothesItemText}>X</Text>
                  </Pressable>
                </View>
              ))}
            </ScrollView>
          ) : (
            <View style={addOutfitStyle.list}>
              <Text>Add clothes</Text>
            </View>
          )}
        </>
      )}
      {addClothesMode ? (
        <>
          <TextInput
            style={styles.input}
            value={searchVal}
            onChangeText={setSearchVal}
            autoCapitalize="none"
            autoFocus={addClothesMode}
          />

          <ScrollView contentContainerStyle={addOutfitStyle.clothesItemList}>
            {clothes.length > 0 ? (
              <>
                {clothes.map((c: ClothesItem) => (
                  <View key={c._id} style={addOutfitStyle.clotesItem}>
                    <Text>{c.name}</Text>
                    {!selectedClothes.some((sc) => sc._id === c._id) ? (
                      <Pressable
                        onPress={() => {
                          handleClothesItem(c);
                          if (extraFn) {
                            extraFn();
                          }
                        }}
                        style={addOutfitStyle.button}
                      >
                        <Text style={addOutfitStyle.buttonText}>Add</Text>
                      </Pressable>
                    ) : (
                      <Text>Selected</Text>
                    )}
                  </View>
                ))}
              </>
            ) : (
              <Text>Not found</Text>
            )}
          </ScrollView>
          <Pressable
            onPress={() => setAddClothesMode(false)}
            style={addOutfitStyle.cancelButton}
          >
            <Text style={addOutfitStyle.cancelButtonText}>Cancel</Text>
          </Pressable>
        </>
      ) : (
        <ModalButton text="Add clothes" fn={setAddClothesMode} />
      )}
    </View>
  );
};

export default ChooseClothes;
