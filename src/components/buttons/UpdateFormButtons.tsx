import { styles } from "@/app/styles/global";
import { t } from "i18next";
import { Pressable, Text, View } from "react-native";
import { updateFormButtonsStyles } from "./styles";

const UpdateFormButtons = ({
  mode,
  handleUpdate,
  handleModeChange,
  deleteItem,
  isAble = false,
}: {
  mode: "review" | "edit";
  handleUpdate: () => void;
  handleModeChange: () => void;
  deleteItem: () => void;
  isAble?: boolean;
}) => {
  return (
    <View style={updateFormButtonsStyles.buttonsContainer}>
      <View style={updateFormButtonsStyles.topButtonContainer}>
        <Pressable
          onPress={() => {
            if (mode === "edit") {
              handleUpdate();
            } else {
              handleModeChange();
            }
          }}
          disabled={!isAble}
          style={({ pressed }) => [
            updateFormButtonsStyles.button,
            updateFormButtonsStyles.update,
            pressed && updateFormButtonsStyles.updateActive,
            !isAble && { opacity: 0.5 },
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                updateFormButtonsStyles.updateText,
                pressed && updateFormButtonsStyles.updateActiveText,
              ]}
            >
              {mode === "review" ? `${t("update")}` : `${t("save")}`}
              {/* {mode === "review" ? `${t("update")}` : "Save"} */}
              {/* {mode === "review" ? "Update" : "Save"} */}
            </Text>
          )}
        </Pressable>
        <Pressable
          onPress={() => deleteItem()}
          style={({ pressed }) => [
            updateFormButtonsStyles.button,
            updateFormButtonsStyles.deleteButton,
            pressed && updateFormButtonsStyles.deleteActive,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                updateFormButtonsStyles.deleteText,
                pressed && updateFormButtonsStyles.deleteActiveText,
              ]}
            >
              {/* Delete */}
              {t("delete")}
            </Text>
          )}
        </Pressable>
      </View>
      {mode === "edit" && (
        <Pressable
          onPress={handleModeChange}
          style={({ pressed }) => [
            styles.button,
            updateFormButtonsStyles.deleteButton,
            pressed && updateFormButtonsStyles.deleteActive,
            { alignItems: "center" },
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                updateFormButtonsStyles.deleteText,
                pressed && updateFormButtonsStyles.deleteActiveText,
              ]}
            >
              {t("cancel")}
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default UpdateFormButtons;
