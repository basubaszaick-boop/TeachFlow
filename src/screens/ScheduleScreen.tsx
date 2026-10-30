
import React from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { colors } from "../constants/colors";
import Header from "../components/Header";

const { green, pale, ink, muted, line } = colors;

export default function ScheduleScreen() {
  const card = {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: line,
    marginBottom: 10,
  } as const;

  const button = {
    backgroundColor: green,
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center" as const,
  };

  return (
    <>
      <Header
        title="Class Schedule"
        subtitle="Your daily and weekly teaching agenda"
      />

      <View
        style={{
          backgroundColor: pale,
          borderRadius: 13,
          padding: 13,
          marginBottom: 14,
        }}
      >
        <Text style={{ color: green, fontWeight: "700" }}>
          Monday · October 19
        </Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
          2 classes scheduled today
        </Text>
      </View>

      <View style={card}>
        <Text style={{ color: muted, fontSize: 11 }}>
          8:00 AM – 10:00 AM
        </Text>
        <Text
          style={{
            color: ink,
            fontWeight: "700",
            fontSize: 15,
            marginTop: 5,
          }}
        >
          Mobile Programming
        </Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
          IT 313 · BSIT 3A · Lab 2
        </Text>
      </View>

      <View style={card}>
        <Text style={{ color: muted, fontSize: 11 }}>
          1:00 PM – 3:00 PM
        </Text>
        <Text
          style={{
            color: ink,
            fontWeight: "700",
            fontSize: 15,
            marginTop: 5,
          }}
        >
          Database Management
        </Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
          IT 212 · BSIT 2B · Lab 1
        </Text>
      </View>

      <Text
        style={{
          color: muted,
          fontSize: 12,
          lineHeight: 19,
          marginTop: 4,
        }}
      >
        Schedule editing can be added next with a form for subject, day, time,
        and room.
      </Text>

      <TouchableOpacity
        style={[button, { marginTop: 14 }]}
        onPress={() =>
          Alert.alert(
            "Add schedule",
            "The schedule form is the next feature to connect. Your sample classes are shown above."
          )
        }
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
          ＋ Add Class Schedule
        </Text>
      </TouchableOpacity>
    </>
  );
}
