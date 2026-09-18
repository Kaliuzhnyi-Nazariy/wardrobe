import { updateBtn } from "@/components/buttons/styles";
import ErrorMessages from "@/components/ErrorMessages";
import { updateUserData } from "@/features/user/requests";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import { t } from "i18next";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
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

  const { messages, setError, clearErrors } = useErrorHandler();

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateUserData({ name, email }),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: t("data_updated"),
        position: "top",
        visibilityTime: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["userData"] });
      router.replace("/(tabs)/account");
    },
    onError(err) {
      setError(err);
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
    <View style={[styles.bg, styles.main, { gap: 16 }]}>
      <Text style={styles.headerForUpdPages}>{t("update_data")}</Text>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Text style={styles.inputName}>{t("user_name")}: </Text>
        <TextInput
          value={name}
          onChangeText={setName}
          autoFocus
          style={styles.input}
        />
      </View>
      <View
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 8,
        }}
      >
        <Text style={styles.inputName}>Email: </Text>
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
      {isPending ? (
        <Text style={{ textAlign: "center" }}>Loading...</Text>
      ) : (
        <Pressable
          disabled={!validation}
          style={[
            styles.button,
            updateBtn.updBtn,
            !validation && { opacity: 0.5 },
          ]}
          onPress={() => {
            clearErrors();
            mutate();
          }}
        >
          <Text style={{ color: "white", fontWeight: 700 }}>{t("update")}</Text>
        </Pressable>
      )}
      <ErrorMessages mt={16} messages={messages} />
    </View>
  );
};

export default updateUserdata;
