import { styles } from "@/app/styles/global";
import { Pressable, Text, View } from "react-native";
import { updateFormButtonsStyles } from "./styles";

const UpdateFormButtons = ({
  mode,
  handleUpdate,
  handleModeChange,
  deleteItem,
}: {
  mode: "review" | "edit";
  handleUpdate: () => void;
  handleModeChange: () => void;
  deleteItem: () => void;
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
          style={({ pressed }) => [
            updateFormButtonsStyles.button,
            updateFormButtonsStyles.update,
            pressed && updateFormButtonsStyles.updateActive,
          ]}
        >
          {({ pressed }) => (
            <Text
              style={[
                updateFormButtonsStyles.updateText,
                pressed && updateFormButtonsStyles.updateActiveText,
              ]}
            >
              {mode === "review" ? "Update" : "Save"}
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
              Delete
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
              Cancel
            </Text>
          )}
        </Pressable>
      )}
    </View>
  );
};

export default UpdateFormButtons;
