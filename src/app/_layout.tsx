import { getData } from "@/features/user/requests";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Image } from "expo-image";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import Toast from "react-native-toast-message";
import { splashStyles } from "./styles/global";

// Prevent the splash screen from auto-hiding before initialization is complete
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const userData = await queryClient.fetchQuery({
          queryKey: ["userData"],
          queryFn: getData,
          staleTime: 1000 * 60 * 5, // Keep cache fresh for 5 minutes
        });
        setTimeout(() => {
          if (userData) {
            router.replace("/(tabs)/home");
          } else {
            router.replace("/");
          }
        }, 0);
      } catch (e) {
        console.warn("Splash preparation failed: ", e);
        // Fallback route on error
        setTimeout(() => router.replace("/"), 0);
      } finally {
        // Tell the application to render the Stack
        setIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (isReady) {
      // Hide the splash screen smoothly now that layout is calculated
      await SplashScreen.hideAsync();
    }
  }, [isReady]);

  // Block visual rendering until initialization tasks finish
  // if (!isReady) {
  //   return null;
  // }

  if (!isReady) {
    return (
      <View style={splashStyles.splashContainer}>
        <Image
          source={require("../../assets/images/logo.png")}
          style={splashStyles.splashImage}
          resizeMode="contain"
        />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <QueryClientProvider client={queryClient}>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="auth" />
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="updateUser/updateUserdata" />
          <Stack.Screen name="changePassword/changePassword" />
        </Stack>
      </QueryClientProvider>
      <Toast />
    </View>
  );
}
