import { updateBtn } from "@/components/buttons/styles";
import { updateUserData } from "@/features/user/requests";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../styles/global";

interface UserDataCache {
  clothesCount: number;
  outfitCount: number;
  userData: {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
  };
}

const updateUserdata = () => {
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData<UserDataCache>(["userData"]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { mutate } = useMutation({
    mutationFn: () => updateUserData({ name, email }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["userData"] });
      router.replace("/(tabs)/account");
    },
  });

  useEffect(() => {
    if (userData) {
      setName(userData?.userData?.name ?? "");
      setEmail(userData?.userData?.email ?? "");
    }
  }, [userData]);

  const validation = name.length > 0 && email.length > 0;

  return (
    <View style={[styles.bg, styles.main]}>
      <Text>Update user data</Text>
      <View style={{ width: "100%" }}>
        <Text>Name: </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          autoFocus
          style={styles.input}
        />
      </View>
      <View style={{ width: "100%" }}>
        <Text>Email: </Text>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCorrect={false}
          autoComplete="email"
          textContentType="emailAddress"
          autoCapitalize="none"
        />
      </View>
      <Pressable
        disabled={!validation}
        style={[
          styles.button,
          updateBtn.updBtn,
          !validation && { opacity: 0.5 },
        ]}
        onPress={() => mutate()}
      >
        <Text style={{ color: "white", fontWeight: 700 }}>Update</Text>
      </Pressable>
    </View>
  );
};

export default updateUserdata;
