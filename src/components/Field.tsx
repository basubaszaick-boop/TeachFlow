
import React from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "../constants/colors";

type FieldProps = {
  label: string;
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
};

export default function Field({
  label,
  value,
  onChangeText,
  placeholder,
}: FieldProps) {
  return (
    <View style={{ marginBottom: 12 }}>
      <Text
        style={{
          color: colors.ink,
          fontWeight: "600",
          fontSize: 12,
        }}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#9BA39C"
        autoCapitalize="none"
        style={{
          backgroundColor: "#FFFFFF",
          borderWidth: 1,
          borderColor: colors.line,
          borderRadius: 10,
          paddingHorizontal: 12,
          paddingVertical: 11,
          color: colors.ink,
          marginTop: 6,
        }}
      />
    </View>
  );
}
