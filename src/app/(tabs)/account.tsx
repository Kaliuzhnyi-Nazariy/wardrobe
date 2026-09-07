import AccButton from "@/components/Account/AccButton";
import { logout } from "@/features/auth/request";
import { deleteAllClothes } from "@/features/clothes/request";
import { deleteAllOutfits } from "@/features/outfit/requests";
import { deleteUserAccount } from "@/features/user/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { ScrollView, Text, View } from "react-native";
import { styles } from "../styles/global";

export default function Account() {
  const client = useQueryClient();

  const { mutate: deleteClothes } = useMutation({
    mutationFn: deleteAllClothes,
    onSuccess() {
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
      router.replace("/");
      client.invalidateQueries({
        queryKey: ["userData"],
      });
    },
  });

  const { mutate: deleteAccount } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess() {
      router.replace("/");
    },
  });

  const redirect = (link: string) => {
    router.navigate(link as any);
  };

  return (
    <View style={[styles.bg, styles.container, { marginVertical: 60 }]}>
      <Text>Account</Text>
      <ScrollView
        style={{ flex: 1, width: "100%" }}
        contentContainerStyle={[
          // {
          //   outlineWidth: 1,
          //   outlineColor: "tomato",
          // },
          {
            marginTop: 20,
            flexDirection: "column",
            gap: 16,
          },
          {
            flex: 1,
            width: "80%",
            alignItems: "center",
            marginHorizontal: "auto",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
          <Text>Wardrobe</Text>
          <AccButton text="Remove clothes" fn={deleteClothes} />
          <AccButton text="Remove outfits" fn={deleteOutfitss} />

          <Text>User</Text>
          <AccButton
            text="Change password"
            fn={() => redirect("/changePassword/changePassword")}
          />
          <AccButton
            text="Update data"
            fn={() => redirect("/updateUser/updateUserdata")}
          />
        </View>
        <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
          <AccButton text="Logout" fn={logoutFn} />
          <AccButton text="Delete account" fn={deleteAccount} />
        </View>

        {/* <Text>Account buttons</Text> */}
      </ScrollView>
    </View>
  );
}
