// import { getData } from "@/features/user/requests";
// import { Ionicons } from "@expo/vector-icons";
// import { useQuery } from "@tanstack/react-query";
// import { router } from "expo-router";
// import { useEffect } from "react";
// import { ActivityIndicator, Pressable, Text, View } from "react-native";
// import HomeView from "../../components/home/HomeView";
// import { styles } from "../styles/global";

// export default function HomeScreen() {
//   const { data, isFetched, isFetching, refetch } = useQuery({
//     queryKey: ["userData"],
//     queryFn: getData,
//     gcTime: 0,
//     staleTime: 0,
//   });

//   useEffect(() => {
//     if (isFetched && !data) {
//       setTimeout(() => {
//         router.replace("/auth/signin");
//       }, 0);
//     }
//   }, [data, isFetched]);

//   // if (isFetching) {
//   //   return (
//   //     <View style={[styles.container, styles.bg]}>
//   //       <Text>Loading...</Text>
//   //     </View>
//   //   );
//   // }

//   if (isFetching) {
//     return (
//       <View
//         style={[
//           styles.container,
//           styles.bg,
//           { justifyContent: "center", alignItems: "center" },
//           { position: "absolute", zIndex: 5, width: "100%", height: "100%" },
//         ]}
//       >
//         {/* A native, animated spinning wheel */}
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text style={{ marginTop: 12, fontSize: 16, color: "#555" }}>
//           Loading your dashboard...
//         </Text>
//       </View>
//     );
//   }

//   return (
//     <View style={[styles.container]}>
//       {isFetched ? (
//         <>
//           {data ? (
//             <HomeView
//               userData={data.userData}
//               clothesCount={data.clothesCount}
//               outfitCount={data.outfitCount}
//             />
//           ) : (
//             <Pressable
//               style={{
//                 display: "flex",
//                 gap: 8,
//                 flexDirection: "row",
//                 alignItems: "center",
//               }}
//               onPress={() => refetch()}
//             >
//               <Text>Refetch</Text>
//               <Ionicons name="reload-sharp" />
//             </Pressable>
//           )}
//         </>
//       ) : (
//         <Text
//         // style={styles}
//         >
//           Home Screen
//         </Text>
//       )}
//     </View>
//   );
// }

import { getData } from "@/features/user/requests";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { router } from "expo-router";
import { useEffect } from "react";
import { Pressable, Text, View } from "react-native";
import HomeView from "../../components/home/HomeView";
import { styles } from "../styles/global";

export default function HomeScreen() {
  const { data, isFetched, refetch, isFetching } = useQuery({
    queryKey: ["userData"],
    queryFn: getData,
    // gcTime: 0,
    // staleTime: 0,
  });

  useEffect(() => {
    if (isFetched && !isFetching && !data) {
      router.replace("/auth/signin");
    }
  }, [data, isFetching, isFetched]);

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
        <Text>Home Screen</Text>
      )}
    </View>
  );
}
