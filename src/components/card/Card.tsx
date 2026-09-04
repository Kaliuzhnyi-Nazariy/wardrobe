import React from "react";
import { View } from "react-native";
import { cardStyles } from "./styles";

const Card = ({
  children,
  moveIsAble,
}: {
  children: React.ReactNode;
  moveIsAble?: boolean;
}) => {
  return (
    <View
      style={[cardStyles.card, moveIsAble && cardStyles.ableToAddToWardrobe]}
    >
      {children}
    </View>
  );
};

export default Card;
