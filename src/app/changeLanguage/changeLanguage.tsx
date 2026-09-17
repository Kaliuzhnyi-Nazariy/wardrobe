import AccButton from "@/components/Account/AccButton";
import Header from "@/components/header/Header";
import i18n from "@/features/localization/i18n";
import { router } from "expo-router";
import { t } from "i18next";
import React from "react";
import { View } from "react-native";
import { styles } from "../styles/global";

const ChangeLanguage = () => {
  const changeLang = (lang: string) => {
    i18n.changeLanguage(lang);
    setTimeout(() => {
      router.replace("/(tabs)/account");
    }, 0);
  };

  return (
    <View style={[styles.container, styles.bg]}>
      <Header title={t("change_language")} link="/account" />
      {/* <Button title="Polski" onPress={() => i18n.changeLanguage("pl")} />
      <Button title="English" onPress={() => i18n.changeLanguage("en")} />
      <Button title="Українська" onPress={() => i18n.changeLanguage("uk")} />
      <Button title="Русский" onPress={() => i18n.changeLanguage("ru")} /> */}
      {/* <Button title="Polski" onPress={() => changeLang("pl")} />
      <Button title="English" onPress={() => changeLang("en")} />
      <Button title="Українська" onPress={() => changeLang("uk")} />
      <Button title="Русский" onPress={() => changeLang("ru")} /> */}
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
