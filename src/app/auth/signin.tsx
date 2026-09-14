import ErrorMessages from "@/components/ErrorMessages";
import { ISignIn } from "@/features/auth/interface";
import { signin } from "@/features/auth/request";
import { useErrorHandler } from "@/hooks/useErrorHandler";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link, router } from "expo-router";
import { useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import Toast from "react-native-toast-message";
import { colors, styles } from "../styles/global";
import { authStyles } from "./auth";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const queryClient = useQueryClient();
  const { messages, setError, clearErrors } = useErrorHandler();

  const { mutate: signinFn, isPending } = useMutation({
    mutationFn: (data: ISignIn) => signin(data),
    onSuccess() {
      Toast.show({
        type: "success",
        text1: "Welcome!",
        position: "top",
        visibilityTime: 3000,
      });

      queryClient.invalidateQueries({ queryKey: ["userData"] });

      router.replace("/home");
    },
    onError(err) {
      // if (Array.isArray(err)) {
      //   const messages = err.map(
      //     (item: { field: string; message: string }) => ({
      //       field: item.field,
      //       message: item.message,
      //     }),
      //   );
      //   setError(messages);
      // } else {
      //   setError([{ message: err.message }]);
      // }
      // errorHandler({ err, setError });
      console.log({ err });
      setError(err);
    },
    gcTime: 0,
  });

  const handleSignin = () => {
    if (!email || !password) return;
    clearErrors();
    signinFn({ email, password });
  };

  const handlePasswordShowing = () => {
    setHidePassword(!hidePassword);
  };

  const isValid = email.length > 0 && password.length >= 8;

  // console.log({ isValid });

  return (
    <View style={[styles.main, authStyles.page]}>
      <Text style={styles.h1}>SIGN IN</Text>
      <View style={authStyles.form}>
        <View style={authStyles.field}>
          <Text style={styles.inputName}>Email</Text>
          {/* <Text style={authStyles.inputName}>Email</Text> */}
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
            accessible={!isPending}
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
            accessible={!isPending}
          />
          <Pressable
            onPress={handlePasswordShowing}
            style={authStyles.passwordButton}
          >
            <Ionicons name="eye" size={16} color={colors.primary} />
          </Pressable>
        </View>

        {isPending ? (
          <Text
            style={{
              marginHorizontal: "auto",
            }}
          >
            Loading...
          </Text>
        ) : (
          <Pressable
            onPress={handleSignin}
            style={({ pressed }) => [
              authStyles.button,
              pressed && authStyles.buttonPressed,
              !isValid && authStyles.buttonDisabled,
            ]}
            disabled={!isValid || isPending}
          >
            {({ pressed }) => (
              <Text
                style={[
                  authStyles.buttonText,
                  pressed && authStyles.buttonTextPressed,
                ]}
              >
                Sign in
              </Text>
            )}
          </Pressable>
        )}

        {/* {error &&
          error?.length > 0 &&
          error.map((e) => (
            <Text key={e.message} style={{ color: "red" }}>
              {e.field && <Text key={e.field}>{e.field}: </Text>}
              {e.message}
            </Text>
          ))} */}

        {/* {messages &&
          messages?.length > 0 &&
          messages.map((e) => (
            <Text key={e.message} style={{ color: "red" }}>
              {e.field && <Text key={e.field}>{e.field}: </Text>}
              {e.message}
            </Text>
            ))} */}

        <ErrorMessages messages={messages} />

        <Text style={authStyles.linkMessage}>
          You don't have an account?{" "}
          <Link href="/auth/signup" style={authStyles.link}>
            Sign up!
          </Link>
        </Text>
      </View>
    </View>
  );
}
