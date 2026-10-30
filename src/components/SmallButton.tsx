
import React from "react";
import { TouchableOpacity, Text } from "react-native";
import { colors } from "../constants/colors";

type SmallButtonProps = {
  label: string;
  onPress: () => void;
  secondary?: boolean;
};

export default function SmallButton({
  label,
  onPress,
  secondary = false,
}: SmallButtonProps) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: secondary ? "#FFFFFF" : colors.green,
        borderColor: secondary ? colors.line : colors.green,
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 12,
        alignItems: "center",
        flex: 1,
      }}
    >
      <Text
        style={{
          color: secondary ? colors.green : "#FFFFFF",
          fontWeight: "600",
          fontSize: 12,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
