import { ISignUp } from "@/features/auth/interface";
import { signup } from "@/features/auth/request";
import { Ionicons } from "@expo/vector-icons";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors, styles } from "../styles/global";
import { authStyles } from "./auth";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handlePasswordShowing = () => {
    setHidePassword(!hidePassword);
  };

  const handleConfirmPasswordShowing = () => {
    setHideConfirmPassword(!hideConfirmPassword);
  };

  const isValid =
    email.length > 0 &&
    password.length > 0 &&
    confirmPassword.length > 0 &&
    name.length > 0;

  const { mutate: signupFn, isPending } = useMutation({
    mutationFn: (data: ISignUp) => signup(data),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Welcome!",
        position: "top",
        visibilityTime: 3000,
      });

      router.push("/home");
    },
    onError(error) {
      // console.log("err", error);
      // console.log("err", error.message);
      // console.log("err", (error as AxiosError).event);
    },
  });

  const handleSignup = () => {
    // console.log({ email, name, password, confirmPassword });

    // console.log(!email || !password || !confirmPassword || !name);
    if (!email || !password || !confirmPassword || !name) return;
    // console.log(password != confirmPassword);
    if (password != confirmPassword) return;

    // console.log({ email, name, password, confirmPassword });
    signupFn({ email, name, password, confirmPassword });
  };

  return (
    <View style={[styles.main, authStyles.page]}>
      <Text style={styles.h1}>SIGN UP</Text>
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text>Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            // style={authStyles.input}
          />
        </View>
        <View style={authStyles.field}>
          {/* <Text style={authStyles.inputName}>Email</Text> */}
          <Text style={styles.inputName}>Email</Text>
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            // style={authStyles.input}
            keyboardType="email-address"
            autoCorrect={false}
            autoComplete="email"
            textContentType="emailAddress"
            autoCapitalize="none"
          />
        </View>
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
      </View>
      <Pressable
        onPress={handleSignup}
        disabled={!isValid}
        style={({ pressed }) => [
          authStyles.button,
          pressed && authStyles.buttonPressed,
          !isValid && authStyles.buttonDisabled,
        ]}
      >
        {({ pressed }) => (
          <Text
            style={[
              authStyles.buttonText,
              pressed && authStyles.buttonTextPressed,
            ]}
          >
            Sign up
          </Text>
        )}
      </Pressable>

      <Text style={authStyles.linkMessage}>
        You have an account?{" "}
        <Link href="/auth/signin" style={authStyles.link}>
          Sign in!
        </Link>
      </Text>
    </View>
  );
}
