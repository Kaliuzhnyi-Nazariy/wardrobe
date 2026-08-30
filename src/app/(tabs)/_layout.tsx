import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { colors } from "../styles/global";

export default function TabLayout() {
  return (
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
  );
}
