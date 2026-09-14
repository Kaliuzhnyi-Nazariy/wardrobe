import { IValidationError } from "@/helpers/interface";
import React from "react";
import { Text, View } from "react-native";

const ErrorMessages = ({
  messages,
  mt,
}: {
  messages: IValidationError[];
  mt?: number;
}) => {
  return (
    <>
      {messages && messages?.length > 0 && (
        <View style={{ flexDirection: "column", gap: 12, marginTop: mt }}>
          {messages.map((e, index) => (
            <Text key={index} style={{ color: "red", fontSize: 12 }}>
              {/* <Text key={index} style={{ color: "red" }}> */}
              {e.field && <Text key={e.field}>{e.field}: </Text>}
              {e.message}
            </Text>
          ))}
        </View>
      )}
    </>
  );
};

export default ErrorMessages;
