// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import { colors } from "../styles/global";

// export default function TabLayout() {
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarStyle: {
//           backgroundColor: colors.primary,
//           borderTopColor: colors.chips,
//         },
//         tabBarActiveTintColor: colors.accent,
//         tabBarInactiveTintColor: colors.chips,
//       }}
//     >
//       <Tabs.Screen
//         name="home"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="home" size={20} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="clothes"
//         options={{
//           title: "Clothes",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="shirt" size={20} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="fits"
//         options={{
//           title: "Outfits",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="body" size={20} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="wishlist"
//         options={{
//           title: "Wish list",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="heart" size={20} color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="account"
//         options={{
//           title: "Account",
//           tabBarIcon: ({ color }) => (
//             <Ionicons name="person" size={20} color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { loadingStyles } from "@/components/Loading/styles";
import { getData } from "@/features/user/requests";
import { Ionicons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { Tabs } from "expo-router";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../styles/global"; // upewnij się, że ścieżka do styles jest poprawna

export default function TabLayout() {
  // Pobieramy ten sam query klucz. TanStack Query współdzieli stan,
  // więc nie wywoła to podwójnego zapytania do API.
  const { isFetching } = useQuery({
    queryKey: ["userData"],
    queryFn: getData,
  });

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: colors.primary,
            borderTopColor: colors.chips,
          },
          tabBarActiveTintColor: colors.accent,
          tabBarInactiveTintColor: colors.chips,
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        {/* Pozostałe ekrany bez zmian... */}
        <Tabs.Screen
          name="clothes"
          options={{
            title: "Clothes",
            tabBarIcon: ({ color }) => (
              <Ionicons name="shirt" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fits"
          options={{
            title: "Outfits",
            tabBarIcon: ({ color }) => (
              <Ionicons name="body" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: "Wish list",
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "Account",
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Ekran ładowania renderowany NAD strukturą Tabs */}
      {isFetching && (
        <View
          style={[
            // styles.container,
            // styles.bg,
            // {
            //   position: "absolute",
            //   left: 0,
            //   top: 0,
            //   right: 0,
            //   bottom: 0,
            //   zIndex: 99,
            //   justifyContent: "center",
            //   alignItems: "center",
            //   backgroundColor: "rgba(255,255,255,0.9)", // Opcjonalnie: półprzezroczyste tło, jeśli chcesz widzieć zablokowany interfejs w tle
            // },
            loadingStyles.generalLoading,
          ]}
        >
          <ActivityIndicator size="large" color={colors.primary} />
          {/* <Text style={{ marginTop: 12, fontSize: 16, color: "#555" }}>
            Loading your dashboard...
          </Text> */}
        </View>
        // <Loading />
      )}
    </View>
  );
}
