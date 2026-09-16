import { colors } from "@/app/styles/global";
import React from "react";
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { loadingStyles } from "./styles";

const Loading = () => {
  return (
    <SafeAreaView style={[loadingStyles.container]}>
      <ActivityIndicator size="large" color={colors.primary} />
    </SafeAreaView>
  );
};

export default Loading;
