
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { Task, Subject } from "../types";
import { colors } from "../constants/colors";
import Header from "../components/Header";
import TaskCard from "../components/TaskCard";

const { green, pale, ink, muted, line } = colors;

type HomeScreenProps = {
  teacherName: string;
  subjects: Subject[];
  tasks: Task[];
  pendingCount: number;
  completedCount: number;
  onChangeTab: (tab: "Tasks") => void;
  onToggleTaskStatus: (taskId: number) => void;
  onDeleteTask: (taskId: number) => void;
};

export default function HomeScreen({
  teacherName,
  subjects,
  tasks,
  pendingCount,
  completedCount,
  onChangeTab,
  onToggleTaskStatus,
  onDeleteTask,
}: HomeScreenProps) {
  const card = {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: line,
    marginBottom: 10,
  } as const;

  return (
    <>
      <Header
        title={`Good morning, ${teacherName.split(" ")[0]}!`}
        subtitle="Monday, October 19, 2026 · Your teaching workspace"
      />

      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        {[
          { n: String(subjects.length), label: "Subjects", icon: "▤" },
          { n: "3", label: "Lessons to prepare", icon: "▱" },
          { n: String(pendingCount), label: "Pending tasks", icon: "☷" },
        ].map((item, index) => (
          <View
            key={index}
            style={{
              flex: 1,
              backgroundColor: "#FFFFFF",
              borderRadius: 14,
              padding: 12,
              borderColor: line,
              borderWidth: 1,
            }}
          >
            <Text style={{ color: green, fontSize: 18 }}>{item.icon}</Text>
            <Text
              style={{
                color: ink,
                fontWeight: "700",
                fontSize: 22,
                marginTop: 6,
              }}
            >
              {item.n}
            </Text>
            <Text style={{ color: muted, fontSize: 10, marginTop: 3 }}>
              {item.label}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          backgroundColor: pale,
          borderRadius: 15,
          padding: 15,
          marginBottom: 18,
        }}
      >
        <Text style={{ color: green, fontWeight: "700", fontSize: 15 }}>
          Today's Classes
        </Text>
        <Text style={{ color: ink, fontWeight: "700", marginTop: 12 }}>
          8:00–10:00 AM · Mobile Programming
        </Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 3 }}>
          IT 313 · BSIT 3A · Lab 2
        </Text>
        <View
          style={{
            height: 1,
            backgroundColor: "#C5D7C3",
            marginVertical: 10,
          }}
        />
        <Text style={{ color: ink, fontWeight: "700" }}>
          1:00–3:00 PM · Database Management
        </Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 3 }}>
          IT 212 · BSIT 2B · Lab 1
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        <Text style={{ color: ink, fontWeight: "700", fontSize: 17 }}>
          Priority Tasks
        </Text>
        <TouchableOpacity onPress={() => onChangeTab("Tasks")}>
          <Text style={{ color: green, fontSize: 12, fontWeight: "600" }}>
            View all →
          </Text>
        </TouchableOpacity>
      </View>

      {tasks
        .filter((task) => task.status !== "Completed")
        .slice(0, 2)
        .map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onToggleStatus={() => onToggleTaskStatus(task.id)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}

      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700" }}>
          Weekly Workload Progress
        </Text>
        <View
          style={{
            height: 8,
            borderRadius: 6,
            backgroundColor: "#E9ECE6",
            marginTop: 12,
            overflow: "hidden",
          }}
        >
          <View
            style={{
              height: 8,
              width: `${Math.min(
                100,
                Math.round(
                  (completedCount / Math.max(tasks.length, 1)) * 100
                )
              )}%`,
              backgroundColor: green,
            }}
          />
        </View>
        <Text style={{ color: muted, fontSize: 11, marginTop: 7 }}>
          {completedCount} of {tasks.length} tasks completed
        </Text>
      </View>
    </>
  );
}
