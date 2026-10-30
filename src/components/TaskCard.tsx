
import React from "react";
import {
  View,
  Text,
  Alert,
} from "react-native";
import type { Task } from "../types";
import { colors } from "../constants/colors";
import SmallButton from "./SmallButton";

type TaskCardProps = {
  task: Task;
  onToggleStatus: () => void;
  onDelete: () => void;
};

export default function TaskCard({
  task,
  onToggleStatus,
  onDelete,
}: TaskCardProps) {
  const handleDelete = () => {
    Alert.alert("Delete task", "Delete this task?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        style: "destructive",
        onPress: onDelete,
      },
    ]);
  };

  return (
    <View
      style={{
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 15,
        borderWidth: 1,
        borderColor: colors.line,
        marginBottom: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text
            style={{
              color: colors.ink,
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            {task.title}
          </Text>

          <Text
            style={{
              color: colors.muted,
              fontSize: 11,
              marginTop: 5,
            }}
          >
            {task.subject}
          </Text>

          <Text
            style={{
              color:
                task.status === "Completed"
                  ? colors.green
                  : task.due.toLowerCase().includes("today")
                    ? "#B45C4B"
                    : colors.muted,
              fontSize: 11,
              marginTop: 7,
            }}
          >
            ◷ {task.due}
          </Text>
        </View>

        <View
          style={{
            backgroundColor:
              task.status === "Completed"
                ? colors.pale
                : task.status === "In Progress"
                  ? "#F6E7CE"
                  : "#F5DEDA",
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 5,
          }}
        >
          <Text
            style={{
              color:
                task.status === "Completed"
                  ? colors.green
                  : task.status === "In Progress"
                    ? "#95672D"
                    : "#A64F43",
              fontSize: 10,
              fontWeight: "700",
            }}
          >
            {task.status}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          gap: 8,
          marginTop: 12,
        }}
      >
        {task.status !== "Completed" && (
          <SmallButton
            label={
              task.status === "Pending"
                ? "Start task"
                : "Mark complete"
            }
            onPress={onToggleStatus}
          />
        )}

        <SmallButton
          label="Delete"
          secondary
          onPress={handleDelete}
        />
      </View>
    </View>
  );
}
