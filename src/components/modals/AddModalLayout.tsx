import React from "react";
import { ScrollView, Text } from "react-native";
import { modalStyles } from "./style";

const AddModalLayout = ({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) => {
  return (
    <>
      <Text style={modalStyles.header}>{title}</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ marginTop: 24 }}
      >
        {children}
      </ScrollView>
    </>
  );
};

export default AddModalLayout;
