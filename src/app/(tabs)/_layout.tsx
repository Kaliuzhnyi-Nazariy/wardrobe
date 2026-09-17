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
import { t } from "i18next";
import { ActivityIndicator, View } from "react-native";
import { colors } from "../styles/global";

export default function TabLayout() {
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
            title: t("home"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={20} color={color} />
            ),
          }}
        />
        {/* Pozostałe ekrany bez zmian... */}
        <Tabs.Screen
          name="clothes"
          options={{
            title: t("clothes"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="shirt" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fits"
          options={{
            title: t("outfits"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="body" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wishlist"
          options={{
            title: t("wishlist"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="heart" size={20} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: t("account"),
            tabBarIcon: ({ color }) => (
              <Ionicons name="person" size={20} color={color} />
            ),
          }}
        />
      </Tabs>

      {isFetching && (
        <View style={[loadingStyles.generalLoading]}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      )}
    </View>
  );
}
