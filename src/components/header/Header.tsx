import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import React from "react";
import { Text, View } from "react-native";
import { headerStyles } from "./style";

const Header = ({ title, link }: { title: string; link: string }) => {
  return (
    <View style={[headerStyles.header]}>
      <Link href={link as any} style={[headerStyles.headerLink]}>
        <Ionicons name="arrow-back-outline" size={16} />
        <Text style={[headerStyles.headerText]}>Back</Text>
      </Link>

      <Text style={headerStyles.headerTitle}>{title}</Text>
    </View>
  );
};

export default Header;
