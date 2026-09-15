import { Link } from "expo-router";
import { Text, View } from "react-native";
import { styles } from "./styles/global";

export default function Index() {
  return (
    <View style={styles.main}>
      <Text style={styles.h2}>Welcome to WARDROBE!</Text>
      <Link href={"/(tabs)/home"} style={[styles.button, styles.homeButton]}>
        Go Home
      </Link>
      {/* <Link href={"/auth/signin"}>Go Signin</Link> */}
    </View>
  );
}
