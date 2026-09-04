import { Season, Size } from "@/features/clothes/interface";
import { Image } from "expo-image";
import { ScrollView, Text, View } from "react-native";
import Card from "../card/Card";
import { cardStyles } from "../card/styles";

const ClothesItem = ({
  name,
  image,
  season,
  size,
  brand,
  color,
}: {
  name: string;
  image?: string;
  season: Season[];
  size: Size;
  brand?: string;
  color: string[];
}) => {
  // return (
  //   <View style={[clothesStyles.card]}>
  //     {image ? (
  //       <Image
  //         source={image}
  //         style={[clothesStyles.imageView, clothesStyles.image]}
  //       />
  //     ) : (
  //       <View style={[clothesStyles.imageView, clothesStyles.noImage]}>
  //         <Text style={[clothesStyles.noImageText]}>No image</Text>
  //       </View>
  //     )}

  //     <View style={[clothesStyles.dataContainer]}>
  //       <View
  //         style={{
  //           flexDirection: "row",
  //           justifyContent: "space-between",
  //           alignItems: "center",
  //         }}
  //       >
  //         <View style={[clothesStyles.dataBlock]}>
  //           <Text style={clothesStyles.name}>Name: </Text>
  //           <Text style={clothesStyles.name}>{name}</Text>
  //         </View>
  //         {brand && (
  //           <View style={clothesStyles.dataBlock}>
  //             <Text style={clothesStyles.data}>Brand: </Text>
  //             <Text style={clothesStyles.data}>{brand}</Text>
  //           </View>
  //         )}
  //       </View>
  //       <View>
  //         <Text style={clothesStyles.data}>Season: </Text>
  //         <ScrollView
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           contentContainerStyle={clothesStyles.chirpList}
  //         >
  //           {season.map((s) => (
  //             <Text style={clothesStyles.chirp} key={s}>
  //               {s}
  //             </Text>
  //           ))}
  //         </ScrollView>
  //       </View>
  //       <View style={clothesStyles.dataBlock}>
  //         <Text style={clothesStyles.data}>Size: </Text>
  //         <Text style={[clothesStyles.data, clothesStyles.size]}>{size}</Text>
  //       </View>

  //       <View>
  //         <Text style={clothesStyles.data}>Colors: </Text>
  //         <ScrollView
  //           horizontal
  //           showsHorizontalScrollIndicator={false}
  //           contentContainerStyle={clothesStyles.chirpList}
  //         >
  //           {color.map((c) => (
  //             <Text style={clothesStyles.chirp} key={c}>
  //               {c}
  //             </Text>
  //           ))}
  //         </ScrollView>
  //       </View>
  //     </View>
  //   </View>
  // );

  return (
    <Card>
      {image ? (
        <Image
          source={image}
          style={[cardStyles.imageView, cardStyles.image]}
        />
      ) : (
        <View style={[cardStyles.imageView, cardStyles.noImage]}>
          <Text style={[cardStyles.noImageText]}>No image</Text>
        </View>
      )}

      <View style={[cardStyles.dataContainer]}>
        {/* <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        > */}
        <View style={[cardStyles.dataBlock]}>
          <Text style={cardStyles.name}>Name: </Text>
          <Text
            style={[cardStyles.name, cardStyles.nameLimit]}
            numberOfLines={1}
          >
            {name}
          </Text>
        </View>

        {/* </View> */}

        {brand && (
          <View style={cardStyles.dataBlock}>
            {/* <Text style={[cardStyles.data, cardStyles.brand]}>Brand: </Text> */}
            <Text style={[cardStyles.data]}>Brand: </Text>
            <Text style={cardStyles.data}>{brand}</Text>
          </View>
        )}

        <View style={[cardStyles.chirpList]}>
          <Text style={cardStyles.data}>Season: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {season.map((s) => (
              <Text style={cardStyles.chirp} key={s}>
                {s}
              </Text>
            ))}
          </ScrollView>
        </View>
        <View style={cardStyles.dataBlock}>
          <Text style={cardStyles.data}>Size: </Text>
          <Text style={[cardStyles.data, cardStyles.size]}>{size}</Text>
        </View>

        <View style={cardStyles.chirpList}>
          <Text style={cardStyles.data}>Colors: </Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={cardStyles.chirpList}
          >
            {color.map((c) => (
              <Text style={cardStyles.chirp} key={c}>
                {c}
              </Text>
            ))}
          </ScrollView>
        </View>
      </View>
    </Card>
  );
};

export default ClothesItem;
