import { buttonStyles } from "@/components/modals/style";
import { t } from "i18next";
import React from "react";
import { Pressable, Text, View } from "react-native";

const OperationModalButtons = ({
  handleSubmit,
  resetFn,
  availabilty,
  isResetAvailable,
  loadingState,
}: {
  handleSubmit: () => void;
  resetFn: (val: boolean) => void;
  availabilty?: boolean;
  isResetAvailable: boolean;
  loadingState: boolean;
}) => {
  return (
    <View style={buttonStyles.buttonGroup}>
      {loadingState ? (
        <Text style={{ marginHorizontal: "auto" }}>Loaading</Text>
      ) : (
        <>
          <Pressable
            disabled={!availabilty || loadingState}
            style={({ pressed }) => [
              buttonStyles.button,
              buttonStyles.addBtn,
              pressed && buttonStyles.addBtnActive,
              !availabilty && { opacity: 0.5 },
            ]}
            onPress={() => handleSubmit()}
          >
            {({ pressed }) => (
              <Text
                style={[
                  buttonStyles.textStyle,
                  buttonStyles.addBtnText,
                  pressed && buttonStyles.addBtnTextActive,
                ]}
              >
                {/* Add */}
                {t("add")}
              </Text>
            )}
          </Pressable>
          <Pressable
            disabled={!isResetAvailable || loadingState}
            style={({ pressed }) => [
              buttonStyles.button,
              buttonStyles.cancelBtn,
              pressed && buttonStyles.cancelBtnActive,
              !isResetAvailable && { opacity: 0.5 },
            ]}
            onPress={() => resetFn(false)}
          >
            {({ pressed }) => (
              <Text
                style={[
                  buttonStyles.textStyle,
                  buttonStyles.cancelBtnText,
                  pressed && buttonStyles.cancelBtnTextActive,
                ]}
              >
                {/* Reset */}
                {t("reset")}
              </Text>
            )}
          </Pressable>
        </>
      )}
    </View>
  );
};

export default OperationModalButtons;
