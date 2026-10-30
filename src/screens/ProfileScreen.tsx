
import React from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";

import type { Subject } from "../types";
import { colors } from "../constants/colors";
import Header from "../components/Header";
import Field from "../components/Field";
import SmallButton from "../components/SmallButton";

const { green, ink, muted, line } = colors;

type ProfileScreenProps = {
  teacherName: string;
  email: string;
  onTeacherNameChange: (value: string) => void;
  onEmailChange: (value: string) => void;

  notificationsOn: boolean;
  onNotificationsChange: (value: boolean) => void;

  subjects: Subject[];
  showSubjectForm: boolean;
  subjectName: string;
  subjectCode: string;
  subjectSection: string;

  onSubjectNameChange: (value: string) => void;
  onSubjectCodeChange: (value: string) => void;
  onSubjectSectionChange: (value: string) => void;

  onShowSubjectForm: () => void;
  onCancelSubjectForm: () => void;
  onSaveSubject: () => void;
  onSignOut: () => void;
};

export default function ProfileScreen({
  teacherName,
  email,
  onTeacherNameChange,
  onEmailChange,
  notificationsOn,
  onNotificationsChange,
  subjects,
  showSubjectForm,
  subjectName,
  subjectCode,
  subjectSection,
  onSubjectNameChange,
  onSubjectCodeChange,
  onSubjectSectionChange,
  onShowSubjectForm,
  onCancelSubjectForm,
  onSaveSubject,
  onSignOut,
}: ProfileScreenProps) {
  const card = {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: line,
    marginBottom: 10,
  } as const;

  const pale = colors.pale;

  const button = {
    backgroundColor: green,
    borderRadius: 11,
    paddingVertical: 13,
    paddingHorizontal: 15,
    alignItems: "center",
    marginTop: 6,
  } as const;

  return (
    <>
      <Header
        title="Profile & Settings"
        subtitle="Your personal teaching workspace"
      />

      <View
        style={{
          backgroundColor: pale,
          borderRadius: 16,
          padding: 17,
          marginBottom: 14,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: green,
            borderRadius: 30,
            width: 52,
            height: 52,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 12,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 18 }}>
            {teacherName
              .split(" ")
              .map((name) => name[0])
              .join("")
              .slice(0, 2)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={{ color: ink, fontWeight: "700", fontSize: 16 }}>
            {teacherName}
          </Text>
          <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>
            {email}
          </Text>
          <Text style={{ color: green, fontSize: 11, marginTop: 4 }}>
            College Instructor
          </Text>
        </View>
      </View>

      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700", marginBottom: 12 }}>
          Edit Profile
        </Text>

        <Field
          label="Full name"
          value={teacherName}
          onChangeText={onTeacherNameChange}
          placeholder="Your full name"
        />

        <Field
          label="Email address"
          value={email}
          onChangeText={onEmailChange}
          placeholder="you@example.com"
        />

        <SmallButton
          label="Save Profile"
          onPress={() =>
            Alert.alert(
              "Saved",
              "Your profile changes are saved for this session."
            )
          }
        />
      </View>

      <View
        style={[
          card,
          {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          },
        ]}
      >
        <View style={{ flex: 1, paddingRight: 10 }}>
          <Text style={{ color: ink, fontWeight: "700" }}>
            Notifications & reminders
          </Text>
          <Text style={{ color: muted, fontSize: 11, marginTop: 4 }}>
            Show reminders for deadlines
          </Text>
        </View>

        <Switch
          value={notificationsOn}
          onValueChange={onNotificationsChange}
          trackColor={{ true: green, false: "#C8CEC8" }}
        />
      </View>

      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700" }}>
          My Subjects · {subjects.length}
        </Text>

        {subjects.map((subject) => (
          <View
            key={subject.id}
            style={{
              paddingVertical: 10,
              borderBottomColor: line,
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ color: ink, fontWeight: "600" }}>
              {subject.name}
            </Text>
            <Text style={{ color: muted, fontSize: 11, marginTop: 3 }}>
              {subject.code} · {subject.section} · {subject.room}
            </Text>
          </View>
        ))}

        {showSubjectForm ? (
          <>
            <Field
              label="Subject name"
              value={subjectName}
              onChangeText={onSubjectNameChange}
              placeholder="e.g. Web Development"
            />

            <Field
              label="Course code"
              value={subjectCode}
              onChangeText={onSubjectCodeChange}
              placeholder="e.g. IT 315"
            />

            <Field
              label="Section"
              value={subjectSection}
              onChangeText={onSubjectSectionChange}
              placeholder="e.g. BSIT 3A"
            />

            <View style={{ flexDirection: "row", gap: 8 }}>
              <SmallButton
                label="Cancel"
                secondary
                onPress={onCancelSubjectForm}
              />

              <SmallButton
                label="Save Subject"
                onPress={onSaveSubject}
              />
            </View>
          </>
        ) : (
          <TouchableOpacity
            style={{
              marginTop: 12,
              padding: 12,
              alignItems: "center",
              borderRadius: 10,
              backgroundColor: pale,
            }}
            onPress={onShowSubjectForm}
          >
            <Text style={{ color: green, fontWeight: "700" }}>
              ＋ Add Subject
            </Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity
        style={[
          button,
          {
            backgroundColor: "#FFFFFF",
            borderColor: line,
            borderWidth: 1,
          },
        ]}
        onPress={onSignOut}
      >
        <Text style={{ color: green, fontWeight: "700" }}>Log Out</Text>
      </TouchableOpacity>
    </>
  );
}
