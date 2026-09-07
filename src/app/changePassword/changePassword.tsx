import { updateBtn } from "@/components/buttons/styles";
import { updateUserPassword } from "@/features/user/requests";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { authStyles } from "../auth/auth";
import { colors, styles } from "../styles/global";

const changePassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handlePasswordShowing = () => setHidePassword(!hidePassword);
  const handleConfirmPasswordShowing = () =>
    setHideConfirmPassword(!hideConfirmPassword);

  const validation = password.length > 0 && confirmPassword.length > 0;

  const { mutate } = useMutation({
    mutationFn: () => updateUserPassword({ password, confirmPassword }),
    onSuccess() {
      router.replace("/(tabs)/account");
    },
    onError(err) {
      console.log(err);
    },
  });

  return (
    <View style={[styles.bg, styles.main]}>
      <View style={{ width: "100%", flexDirection: "column", gap: 16 }}>
        <View style={authStyles.field && authStyles.passwordField}>
          <Text style={styles.inputName}>Password</Text>
          {/* <Text style={authStyles.inputName}>Password</Text> */}
          <TextInput
            value={password}
            onChangeText={setPassword}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            style={styles.input}
            // style={authStyles.input}
            secureTextEntry={hidePassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
          />
          <Pressable
            onPress={handlePasswordShowing}
            style={authStyles.passwordButton}
          >
            <Ionicons name="eye" size={16} color={colors.primary} />
          </Pressable>
        </View>
        <View style={authStyles.field && authStyles.passwordField}>
          <Text style={styles.inputName}>Confirm password</Text>
          {/* <Text style={authStyles.inputName}>Confirm password</Text> */}
          <TextInput
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            passwordRules={
              "required: upper; required: lower; required: digit; max-consecutive: 2; minlength: 8;"
            }
            style={styles.input}
            // style={authStyles.input}
            secureTextEntry={hideConfirmPassword}
            autoCapitalize="none"
            autoCorrect={false}
            autoComplete="password"
            textContentType="password"
          />
          <Pressable
            onPress={handleConfirmPasswordShowing}
            style={authStyles.passwordButton}
          >
            <Ionicons name="eye" size={16} color={colors.primary} />
          </Pressable>
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
    </View>
  );
};

export default changePassword;
