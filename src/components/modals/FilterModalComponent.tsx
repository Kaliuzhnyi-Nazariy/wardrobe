import { styles } from "@/app/styles/global";
import { t } from "i18next";
import React from "react";
import { Pressable, Text, View } from "react-native";
import ModalComponent from "./ModalComponent";
import { filtersModalStyles } from "./style";

const FilterModalComponent = ({
  children,
  modalVisible,
  setModalVisible,
  isApplyAvailable,
  isResetAvailable,
  applyFilters,
  resetFilters,
  extraStyle,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  isApplyAvailable: boolean;
  applyFilters: () => void;
  resetFilters: () => void;
  isResetAvailable: boolean;
  extraStyle?: object;
}) => {
  return (
    <ModalComponent
      modalVisible={modalVisible}
      setModalVisible={setModalVisible}
      extraStyles={extraStyle}
    >
      <Text style={filtersModalStyles.header}>{t("filters")}</Text>
      {/* <Text style={filtersModalStyles.header}>Filters</Text> */}
      {children}
      <View style={filtersModalStyles.buttonGroup}>
        <Pressable
          disabled={!isResetAvailable}
          onPress={resetFilters}
          style={({ pressed }) => [
            filtersModalStyles.buttonHalf,
            filtersModalStyles.reset,
            !isResetAvailable && filtersModalStyles.disabled,
            pressed && filtersModalStyles.resetPressed,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                filtersModalStyles.resetText,
                pressed && filtersModalStyles.resetTextPressed,
              ]}
            >
              {t("reset_filters")}
            </Text>
          )}
        </Pressable>

        <Pressable
          disabled={!isApplyAvailable}
          onPress={applyFilters}
          style={({ pressed }) => [
            filtersModalStyles.buttonHalf,
            filtersModalStyles.apply,
            !isApplyAvailable && filtersModalStyles.disabled,
            pressed && filtersModalStyles.applyPressed,
          ]}
        >
          <Text style={{ textAlign: "center" }}>{t("apply_filter")}</Text>
        </Pressable>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.button,
          filtersModalStyles.buttonClose,
          { width: "100%" },
          pressed && filtersModalStyles.buttonClosePressed,
        ]}
        onPress={() => setModalVisible(false)}
      >
        {({ pressed }) => (
          <Text
            style={[
              filtersModalStyles.textStyle,
              pressed && filtersModalStyles.buttonCloseTextPressed,
            ]}
          >
            {t("close")}
            {/* Close */}
          </Text>
        )}
      </Pressable>
    </ModalComponent>
  );
};

export default FilterModalComponent;
