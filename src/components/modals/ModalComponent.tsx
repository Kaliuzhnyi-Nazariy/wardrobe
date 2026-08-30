import { Modal, ScrollView, View } from "react-native";
import { modalStyles } from "./style";

const ModalComponent = ({
  children,
  modalVisible,
  setModalVisible,
  extraStyles,
}: {
  children: React.ReactNode;
  modalVisible: boolean;
  setModalVisible: (val: boolean) => void;
  extraStyles?: object;
}) => {
  return (
    // <Modal
    //   animationType="slide"
    //   transparent={true}
    //   visible={modalVisible}
    //   onRequestClose={() => {
    //     // Alert.alert("Modal has been closed.");
    //     setModalVisible(!modalVisible);
    //   }}
    // >
    //   <View style={modalStyles.modalBackground}>
    //     <ScrollView
    //       style={[modalStyles.modalView]}
    //       contentContainerStyle={[
    //         modalStyles.modalView,
    //         extraStyles && extraStyles,
    //       ]}
    //     >
    //       {children}
    //     </ScrollView>
    //     {/* <View style={modalStyles.modalView}>{children}</View> */}
    //   </View>
    // </Modal>

    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}
    >
      <View style={modalStyles.modalBackground}>
        {/* Zewnętrzny kontener ScrollView definiuje pozycję i rozmiar */}
        <ScrollView
          style={[modalStyles.modalView]}
          // Wewnętrzny kontener obsługuje padding i style użytkownika
          contentContainerStyle={[{ padding: 25 }, extraStyles]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default ModalComponent;
