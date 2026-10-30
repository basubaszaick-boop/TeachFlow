
import React from "react";
import { View, Text } from "react-native";
import { colors } from "../constants/colors";

type HeaderProps = {
  title: string;
  subtitle?: string;
};

export default function Header({
  title,
  subtitle,
}: HeaderProps) {
  return (
    <View style={{ marginBottom: 18 }}>
      <Text
        style={{
          color: colors.ink,
          fontSize: 25,
          fontWeight: "700",
        }}
      >
        {title}
      </Text>

      {!!subtitle && (
        <Text
          style={{
            color: colors.muted,
            marginTop: 4,
            fontSize: 12,
          }}
        >
          {subtitle}
        </Text>
      )}
    </View>
  );
}
