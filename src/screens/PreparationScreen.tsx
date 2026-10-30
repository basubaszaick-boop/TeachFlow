
import React from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import type { Task } from "../types";
import { colors } from "../constants/colors";
import Header from "../components/Header";
import SmallButton from "../components/SmallButton";

const { green, ink, muted, line } = colors;

type PreparationScreenProps = {
  tasks: Task[];
  search: string;
  onSearchChange: (value: string) => void;
  onChangeTab: (tab: "Tasks") => void;
  onDeleteTask: (taskId: number) => void;
};

export default function PreparationScreen({
  tasks,
  search,
  onSearchChange,
  onChangeTab,
  onDeleteTask,
}: PreparationScreenProps) {
  const card = {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: line,
    marginBottom: 10,
  } as const;

  const input = {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: line,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 11,
    color: ink,
    marginTop: 6,
    marginBottom: 12,
  } as const;

  const filteredTasks = tasks.filter((task) =>
    `${task.title} ${task.subject} ${task.status}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <>
      <Header
        title="Lesson Preparation"
        subtitle="Plan, organize, and track your teaching materials"
      />

      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Search lesson tasks..."
        placeholderTextColor="#9BA39C"
        style={input}
      />

      {filteredTasks.map((task) => (
        <View key={task.id} style={card}>
          <Text style={{ color: green, fontSize: 10, fontWeight: "700" }}>
            LESSON PREPARATION
          </Text>
          <Text
            style={{
              color: ink,
              fontWeight: "700",
              fontSize: 15,
              marginTop: 6,
            }}
          >
            {task.title}
          </Text>
          <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
            {task.subject} · Due {task.due}
          </Text>

          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <SmallButton
              label="Open lesson"
              onPress={() =>
                Alert.alert(
                  "Lesson notes",
                  `Add lesson notes and resources for: ${task.title}`
                )
              }
            />
            <SmallButton
              label="Delete"
              secondary
              onPress={() => onDeleteTask(task.id)}
            />
          </View>
        </View>
      ))}

      {filteredTasks.length === 0 && (
        <Text style={{ color: muted, textAlign: "center", padding: 20 }}>
          No lesson tasks found.
        </Text>
      )}

      <TouchableOpacity
        style={{
          backgroundColor: green,
          borderRadius: 11,
          paddingVertical: 13,
          paddingHorizontal: 15,
          alignItems: "center",
        }}
        onPress={() => onChangeTab("Tasks")}
      >
        <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
          ＋ Create Lesson Task
        </Text>
      </TouchableOpacity>
    </>
  );
}
