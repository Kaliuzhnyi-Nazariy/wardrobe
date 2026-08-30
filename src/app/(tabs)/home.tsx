import { getData } from "@/features/user/requests";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Pressable, Text, View } from "react-native";
import HomeView from "../../components/home/HomeView";
import { styles } from "../styles/global";

export default function HomeScreen() {
  const { data, isFetched, isFetching, refetch } = useQuery({
    queryKey: ["userData"],
    queryFn: getData,
  });

  if (isFetching) {
    return (
      <View style={[styles.container, styles.bg]}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={[styles.container]}>
      {isFetched ? (
        <>
          {data ? (
            <HomeView
              userData={data.userData}
              clothesCount={data.clothesCount}
              outfitCount={data.outfitCount}
            />
          ) : (
            <Pressable
              style={{
                display: "flex",
                gap: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => refetch()}
            >
              <Text>Refetch</Text>
              <Ionicons name="reload-sharp" />
            </Pressable>
          )}
        </>
      ) : (
        <Text
        // style={styles}
        >
          Home Screen
        </Text>
      )}
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   text: { fontSize: 20 },
// });
