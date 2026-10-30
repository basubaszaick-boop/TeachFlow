
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

import type { Task } from "../types";
import { colors } from "../constants/colors";
import Header from "../components/Header";
import Field from "../components/Field";
import SmallButton from "../components/SmallButton";
import TaskCard from "../components/TaskCard";

const { green, ink, muted, line } = colors;

type TasksScreenProps = {
  visibleTasks: Task[];
  pendingCount: number;
  completedCount: number;
  search: string;
  onSearchChange: (value: string) => void;

  showTaskForm: boolean;
  taskTitle: string;
  taskSubject: string;
  taskDue: string;

  onTaskTitleChange: (value: string) => void;
  onTaskSubjectChange: (value: string) => void;
  onTaskDueChange: (value: string) => void;

  onToggleTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;

  onCancelTaskForm: () => void;
  onShowTaskForm: () => void;
  onSaveTask: () => void;
};

export default function TasksScreen({
  visibleTasks,
  pendingCount,
  completedCount,
  search,
  onSearchChange,
  showTaskForm,
  taskTitle,
  taskSubject,
  taskDue,
  onTaskTitleChange,
  onTaskSubjectChange,
  onTaskDueChange,
  onToggleTaskStatus,
  onDeleteTask,
  onCancelTaskForm,
  onShowTaskForm,
  onSaveTask,
}: TasksScreenProps) {
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

  return (
    <>
      <Header
        title="My Tasks"
        subtitle={`${pendingCount} remaining · ${completedCount} completed`}
      />

      <TextInput
        value={search}
        onChangeText={onSearchChange}
        placeholder="Search academic tasks"
        placeholderTextColor="#9BA39C"
        style={input}
      />

      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <SmallButton label="All" onPress={() => onSearchChange("")} />
        <SmallButton
          label="Pending"
          secondary
          onPress={() => onSearchChange("Pending")}
        />
        <SmallButton
          label="Completed"
          secondary
          onPress={() => onSearchChange("Completed")}
        />
      </View>

      {visibleTasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          onToggleStatus={() => onToggleTaskStatus(task.id)}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}

      {visibleTasks.length === 0 && (
        <Text style={{ color: muted, textAlign: "center", padding: 20 }}>
          No tasks found.
        </Text>
      )}

      {showTaskForm ? (
        <View style={card}>
          <Text
            style={{
              color: ink,
              fontSize: 17,
              fontWeight: "700",
              marginBottom: 14,
            }}
          >
            Create Academic Task
          </Text>

          <Field
            label="Task title"
            value={taskTitle}
            onChangeText={onTaskTitleChange}
            placeholder="e.g. Prepare lesson slides"
          />

          <Field
            label="Subject"
            value={taskSubject}
            onChangeText={onTaskSubjectChange}
            placeholder="Subject name"
          />

          <Field
            label="Deadline"
            value={taskDue}
            onChangeText={onTaskDueChange}
            placeholder="e.g. Oct 25, 2026"
          />

          <View style={{ flexDirection: "row", gap: 8 }}>
            <SmallButton
              label="Cancel"
              secondary
              onPress={onCancelTaskForm}
            />

            <SmallButton
              label="Save Task"
              onPress={onSaveTask}
            />
          </View>
        </View>
      ) : (
        <TouchableOpacity
          style={{
            backgroundColor: green,
            borderRadius: 11,
            paddingVertical: 13,
            paddingHorizontal: 15,
            alignItems: "center",
            marginTop: 6,
          }}
          onPress={onShowTaskForm}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
            ＋ Add Task
          </Text>
        </TouchableOpacity>
      )}
    </>
  );
}
