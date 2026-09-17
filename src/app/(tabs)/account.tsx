import AccButton from "@/components/Account/AccButton";
import { accountStyles } from "@/components/Account/styles";
import { logout } from "@/features/auth/request";
import { deleteAllClothes } from "@/features/clothes/request";
import { deleteAllOutfits } from "@/features/outfit/requests";
import { deleteUserAccount } from "@/features/user/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { t } from "i18next";
import { Linking, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { styles } from "../styles/global";

export default function Account() {
  const client = useQueryClient();

  const { mutate: deleteClothes } = useMutation({
    mutationFn: deleteAllClothes,
    onSuccess() {
      Toast.show({
        type: "success",
        text1: t("all_clothes_removed"),
        position: "top",
        visibilityTime: 3000,
      });

      client.invalidateQueries({
        predicate: (query) => {
          const queryName = query.queryKey[0] as string;
          return ["getClothes", "getWishlist", "userData"].includes(queryName);
        },
      });
    },
  });

  const { mutate: deleteOutfitss } = useMutation({
    mutationFn: deleteAllOutfits,
    onSuccess() {
      Toast.show({
        type: "success",
        text1: t("all_outfits_removed"),
        position: "top",
        visibilityTime: 3000,
      });
      client.invalidateQueries({
        predicate: (query) => {
          const queryName = query.queryKey[0] as string;
          return ["getOutfits", "getWishlist", "userData"].includes(queryName);
        },
      });
    },
  });

  const { mutate: logoutFn } = useMutation({
    mutationFn: logout,
    onSuccess() {
      client.setQueryData(["userData"], null);
      setTimeout(() => {
        router.replace("/");
      }, 0);
    },
    onError(err) {
      Toast.show({
        type: "error",
        text1: err.message,
      });
    },
  });

  const { mutate: deleteAccount } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess() {
      client.setQueryData(["userData"], null);
      setTimeout(() => {
        router.replace("/");
      }, 0);
    },
    onError(err) {
      ({
        type: "error",
        text1: err.message,
      });
    },
  });

  const redirect = (link: string) => {
    setTimeout(() => {
      router.navigate(link as any);
    }, 0);
  };

  const formLink = () => {
    Linking.openURL(
      "https://docs.google.com/forms/d/e/1FAIpQLSfTTRREY_zy5nGtABHUi0sJ_TG7ScHZT3mJqww7627OqDw9ZA/viewform?usp=header",
    );
  };

  return (
    <View style={[styles.bg, styles.container, { marginVertical: 60 }]}>
      <View style={accountStyles.accHeader}>
        <Text style={accountStyles.accHeaderText}>{t("account")}</Text>
        {/* <Text style={accountStyles.accHeaderText}>Account</Text> */}
      </View>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={accountStyles.accView}
      >
        <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
          <Text style={styles.inputName}>{t("wardrobe")}</Text>
          {/* <Text style={styles.inputName}>Wardrobe</Text> */}
          <AccButton
            // text="Remove clothes"
            text={t("remove_clothes")}
            fn={deleteClothes}
          />
          <AccButton
            // text="Remove outfits"
            text={t("remove_outfits")}
            fn={deleteOutfitss}
          />

          <Text style={styles.inputName}>{t("user")}</Text>
          <AccButton
            // text="Change password"
            text={t("change_password")}
            fn={() => redirect("/changePassword/changePassword")}
          />
          <AccButton
            text={t("update_data")}
            // text="Update data"
            fn={() => redirect("/updateUser/updateUserdata")}
          />
          <AccButton
            text={t("change_language")}
            // text="Change Language"
            fn={() => redirect("/changeLanguage/changeLanguage")}
          />
          <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
            <Text style={styles.inputName}>{t("form")}</Text>
            <AccButton text={t("leave_your_opinion")} fn={formLink} />
          </View>
        </View>

        <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
          <Text style={styles.inputName}>{t("account_actions")}</Text>

          <AccButton text={t("logout")} fn={logoutFn} />
          <AccButton text={t("delete_account")} fn={deleteAccount} />
        </View>

        {/* <Text>Account buttons</Text> */}
      </ScrollView>
    </View>
  );
}
