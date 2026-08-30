import { Pressable, Text, View } from "react-native";
import { buttonStyles } from "./style";

const OperationButtons = ({
  handleSubmit,
  setModalVisible,
  availabilty,
}: {
  handleSubmit: () => void;
  setModalVisible: (val: boolean) => void;
  availabilty?: boolean;
}) => {
  return (
    <View style={buttonStyles.buttonGroup}>
      <Pressable
        disabled={!availabilty}
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
            Add
          </Text>
        )}
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          buttonStyles.button,
          buttonStyles.cancelBtn,
          pressed && buttonStyles.cancelBtnActive,
        ]}
        onPress={() => setModalVisible(false)}
      >
        {({ pressed }) => (
          <Text
            style={[
              buttonStyles.textStyle,
              buttonStyles.cancelBtnText,
              pressed && buttonStyles.cancelBtnTextActive,
            ]}
          >
            Close
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export default OperationButtons;
