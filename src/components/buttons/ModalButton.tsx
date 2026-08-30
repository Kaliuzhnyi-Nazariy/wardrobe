import { styles } from "@/app/styles/global";
import React from "react";
import { Pressable, Text } from "react-native";
import { buttonStyles } from "./styles";

const ModalButton = ({
  fn,
  text,
}: {
  fn: (val: boolean) => void;
  text: string;
}) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        buttonStyles.buttonModal,
        pressed && buttonStyles.buttonPressed,
      ]}
      onPress={() => fn(true)}
    >
      {({ pressed }) => (
        <Text
          style={[
            buttonStyles.buttonModalText,
            pressed && buttonStyles.buttonTextPressed,
          ]}
        >
          {text}
        </Text>
      )}
    </Pressable>
  );
};

export default ModalButton;
