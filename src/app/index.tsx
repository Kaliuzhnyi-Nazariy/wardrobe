import { Link } from "expo-router";
import { t } from "i18next";
import { Text, View } from "react-native";
import { styles } from "./styles/global";

export default function Index() {
  return (
    <View style={styles.main}>
      <Text style={styles.h2}>{t("greeting_welcome")}!</Text>
      <Link href={"/(tabs)/home"} style={[styles.button, styles.homeButton]}>
        {t("greeting_button")}
      </Link>
      {/* <Link href={"/auth/signin"}>Go Signin</Link> */}
    </View>
  );
}
