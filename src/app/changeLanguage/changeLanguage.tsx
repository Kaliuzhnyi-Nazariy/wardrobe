import AccButton from "@/components/Account/AccButton";
import Header from "@/components/header/Header";
import i18n from "@/features/localization/i18n";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";
import { styles } from "../styles/global";

const ChangeLanguage = () => {
  const changeLang = async (lang: string) => {
    await SecureStore.setItemAsync("user-language", lang);

    i18n.changeLanguage(lang);

    setTimeout(() => {
      router.replace("/(tabs)/account");
    }, 0);
  };

  return (
    <View style={[styles.container, styles.bg]}>
      <Header title={t("change_language")} link="/account" />
      <View style={[{ flex: 1, gap: 16, width: "80%", marginTop: 24 }]}>
        <AccButton text="Polski" fn={() => changeLang("pl")} />
        <AccButton text="English" fn={() => changeLang("en")} />
        <AccButton text="Українська" fn={() => changeLang("uk")} />
        <AccButton text="Русский" fn={() => changeLang("ru")} />
      </View>
    </View>
  );
};

export default ChangeLanguage;
