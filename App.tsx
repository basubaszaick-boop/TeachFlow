import type { Tab, Task, Subject } from "./src/types";
import { colors } from "./src/constants/colors";
import React, { useEffect, useMemo, useState } from "react";
import Field from "./src/components/Field";
import PreparationScreen from "./src/screens/PreparationScreen";
import SmallButton from "./src/components/SmallButton";
import Header from "./src/components/Header";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import TaskCard from "./src/components/TaskCard";
import TasksScreen from "./src/screens/TasksScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import HomeScreen from "./src/screens/HomeScreen";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebaseConfig";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Alert,
  Switch,
} from "react-native";
const { green, pale, cream, ink, muted, line } = colors;

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const [authBusy, setAuthBusy] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Home");

  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");

  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("Mobile Programming");
  const [taskDue, setTaskDue] = useState("Oct 25, 2026");

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Finalize Mobile Programming Lesson Plan",
      subject: "Mobile Programming",
      due: "Today, 6:00 PM",
      status: "Pending",
    },
    {
      id: 2,
      title: "Prepare Database Management Materials",
      subject: "Database Management",
      due: "Tomorrow, 11:30 AM",
      status: "In Progress",
    },
    {
      id: 3,
      title: "Submit Permutations and Combinations Lesson",
      subject: "Discrete Mathematics",
      due: "Oct 27, 1:00 PM",
      status: "Pending",
    },
  ]);

  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      name: "Mobile Programming",
      code: "IT 313",
      section: "BSIT 3A",
      room: "Lab 2",
    },
    {
      id: 2,
      name: "Database Management",
      code: "IT 212",
      section: "BSIT 2B",
      room: "Lab 1",
    },
    {
      id: 3,
      name: "Discrete Mathematics",
      code: "IT 123",
      section: "BSIT 1A",
      room: "Room 204",
    },
    {
      id: 4,
      name: "Systems Analysis and Design",
      code: "IT 314",
      section: "BSIT 3B",
      room: "Room 305",
    },
  ]);

  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectSection, setSubjectSection] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoggedIn(Boolean(user));

      if (user) {
        setEmail(user.email ?? "");
        setTeacherName(
          user.displayName || user.email?.split("@")[0] || "Teacher"
        );
      }

      setAuthChecked(true);
    });

    return unsubscribe;
  }, []);

  const handleAuthentication = async () => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = teacherName.trim();

    if (!cleanEmail || !password.trim()) {
      Alert.alert(
        "Required fields",
        "Enter an email address and password to continue."
      );
      return;
    }

    if (showSignup && !cleanName) {
      Alert.alert(
        "Required field",
        "Enter your full name to create an account."
      );
      return;
    }

    if (showSignup && password.length < 6) {
      Alert.alert(
        "Password too short",
        "Use a password with at least 6 characters."
      );
      return;
    }

    setAuthBusy(true);

    try {
      if (showSignup) {
        const credential = await createUserWithEmailAndPassword(
          auth,
          cleanEmail,
          password
        );

        await updateProfile(credential.user, {
          displayName: cleanName,
        });

        setTeacherName(cleanName);
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
      }

      setEmail(cleanEmail);
      setPassword("");
      setActiveTab("Home");
    } catch (error) {
      const code = (error as { code?: string }).code;
      let message = "Please try again in a moment.";

      switch (code) {
        case "auth/email-already-in-use":
          message =
            "An account already exists with this email. Try logging in instead.";
          break;

        case "auth/invalid-email":
          message = "Please enter a valid email address.";
          break;

        case "auth/weak-password":
          message = "Choose a stronger password with at least 6 characters.";
          break;

        case "auth/invalid-credential":
        case "auth/user-not-found":
        case "auth/wrong-password":
          message =
            "Email or password is incorrect. Check your details and try again.";
          break;

        case "auth/network-request-failed":
          message =
            "Network error. Check your internet connection and try again.";
          break;

        case "auth/too-many-requests":
          message = "Too many attempts. Wait a while before trying again.";
          break;
      }

      Alert.alert(
        showSignup ? "Could not create account" : "Could not log in",
        message
      );
    } finally {
      setAuthBusy(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setPassword("");
      setShowSignup(false);
    } catch {
      Alert.alert("Log out failed", "Please try again.");
    }
  };

  const pendingCount = tasks.filter(
    (task) => task.status !== "Completed"
  ).length;

  const completedCount = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const visibleTasks = useMemo(
    () =>
      tasks.filter((task) =>
        `${task.title} ${task.subject} ${task.status}`
          .toLowerCase()
          .includes(search.toLowerCase())
      ),
    [tasks, search]
  );

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


  if (!authChecked) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: cream,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StatusBar barStyle="dark-content" />
        <Text style={{ color: green, fontSize: 20, fontWeight: "700" }}>
          TeachFlow
        </Text>
        <Text style={{ color: muted, marginTop: 8 }}>
          Checking your account...
        </Text>
      </SafeAreaView>
    );
  }

  if (!loggedIn) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: cream }}>
        <StatusBar barStyle="dark-content" />

        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            padding: 25,
          }}
        >
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <View
              style={{
                backgroundColor: pale,
                width: 78,
                height: 78,
                borderRadius: 23,
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 15,
              }}
            >
              <Text style={{ fontSize: 34 }}>▤</Text>
            </View>
            <Text
              style={{
                color: green,
                fontSize: 34,
                fontWeight: "800",
                letterSpacing: -1,
              }}
            >
              TeachFlow
            </Text>
            <Text style={{ color: muted, fontSize: 13, marginTop: 6 }}>
              Your teaching, thoughtfully organized.
            </Text>
          </View>

          <View
            style={{
              backgroundColor: "#FFFFFF",
              padding: 21,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: line,
            }}
          >
            <Text
              style={{
                color: ink,
                fontWeight: "700",
                fontSize: 24,
                marginBottom: 6,
              }}
            >
              {showSignup ? "Create an Account" : "Welcome Back"}
            </Text>
            <Text style={{ color: muted, fontSize: 12, marginBottom: 22 }}>
              {showSignup
                ? "Set up your teaching workspace."
                : "Make room for what matters in your next teaching day."}
            </Text>

            {showSignup && (
              <Field
                label="Full name"
                value={teacherName}
                onChangeText={setTeacherName}
                placeholder="Your full name"
              />
            )}

            <Field
              label="Email Address"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
            />

            <View>
              <Text style={{ color: ink, fontWeight: "600", fontSize: 12 }}>
                Password
              </Text>
              <TextInput
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                autoCapitalize="none"
                placeholder="Enter your password"
                placeholderTextColor="#9BA39C"
                style={input}
              />
            </View>

            <TouchableOpacity
              style={[button, authBusy ? { opacity: 0.7 } : null]}
              disabled={authBusy}
              onPress={handleAuthentication}
            >
              <Text style={{ color: "#FFFFFF", fontWeight: "700" }}>
                {authBusy
                  ? "Please wait..."
                  : showSignup
                    ? "Create Account"
                    : "Log In"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{ alignItems: "center", marginTop: 18 }}
              onPress={() => setShowSignup((value) => !value)}
            >
              <Text style={{ color: green, fontSize: 12 }}>
                {showSignup
                  ? "Already have an account? Log in"
                  : "New to TeachFlow? Create an Account"}
              </Text>
            </TouchableOpacity>
          </View>

          <Text
            style={{
              color: muted,
              fontSize: 10,
              textAlign: "center",
              marginTop: 20,
            }}
          >
            Your account is secured with Firebase Authentication.
          </Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const tabs: { key: Tab; icon: string }[] = [
    { key: "Home", icon: "⌂" },
    { key: "Schedule", icon: "▦" },
    { key: "Preparation", icon: "▤" },
    { key: "Tasks", icon: "☷" },
    { key: "Profile", icon: "♙" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cream }}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          paddingHorizontal: 18,
          paddingTop: 22,
          paddingBottom: 25,
        }}
      >

        {activeTab === "Home" && (
  <HomeScreen
    teacherName={teacherName}
    subjects={subjects}
    tasks={tasks}
    pendingCount={pendingCount}
    completedCount={completedCount}
    onChangeTab={setActiveTab}
    onToggleTaskStatus={(taskId) =>
      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === taskId
            ? {
                ...item,
                status:
                  item.status === "Pending"
                    ? "In Progress"
                    : "Completed",
              }
            : item
        )
      )
    }
    onDeleteTask={(taskId) =>
      setTasks((oldTasks) =>
        oldTasks.filter((item) => item.id !== taskId)
      )
    }
  />
)}

       {activeTab === "Schedule" && <ScheduleScreen />}
       
       {activeTab === "Preparation" && (
  <PreparationScreen
    tasks={tasks}
    search={search}
    onSearchChange={setSearch}
    onChangeTab={setActiveTab}
    onDeleteTask={(taskId) =>
      setTasks((oldTasks) =>
        oldTasks.filter((item) => item.id !== taskId)
      )
    }
  />
)}
       {activeTab === "Tasks" && (
  <TasksScreen
    visibleTasks={visibleTasks}
    pendingCount={pendingCount}
    completedCount={completedCount}
    search={search}
    onSearchChange={setSearch}
    showTaskForm={showTaskForm}
    taskTitle={taskTitle}
    taskSubject={taskSubject}
    taskDue={taskDue}
    onTaskTitleChange={setTaskTitle}
    onTaskSubjectChange={setTaskSubject}
    onTaskDueChange={setTaskDue}
    onToggleTaskStatus={(taskId) =>
      setTasks((oldTasks) =>
        oldTasks.map((item) =>
          item.id === taskId
            ? {
                ...item,
                status:
                  item.status === "Pending"
                    ? "In Progress"
                    : "Completed",
              }
            : item
        )
      )
    }
    onDeleteTask={(taskId) =>
      setTasks((oldTasks) =>
        oldTasks.filter((item) => item.id !== taskId)
      )
    }
    onCancelTaskForm={() => setShowTaskForm(false)}
    onShowTaskForm={() => setShowTaskForm(true)}
    onSaveTask={() => {
      if (!taskTitle.trim()) {
        Alert.alert("Missing title", "Please enter a task title.");
        return;
      }

      setTasks((oldTasks) => [
        {
          id: Date.now(),
          title: taskTitle.trim(),
          subject: taskSubject.trim() || "General",
          due: taskDue.trim() || "No deadline",
          status: "Pending",
        },
        ...oldTasks,
      ]);

      setTaskTitle("");
      setTaskDue("Oct 25, 2026");
      setShowTaskForm(false);
      setSearch("");
    }}
  />
)}

        {activeTab === "Profile" && (
  <ProfileScreen
    teacherName={teacherName}
    email={email}
    onTeacherNameChange={setTeacherName}
    onEmailChange={setEmail}
    notificationsOn={notificationsOn}
    onNotificationsChange={setNotificationsOn}
    subjects={subjects}
    showSubjectForm={showSubjectForm}
    subjectName={subjectName}
    subjectCode={subjectCode}
    subjectSection={subjectSection}
    onSubjectNameChange={setSubjectName}
    onSubjectCodeChange={setSubjectCode}
    onSubjectSectionChange={setSubjectSection}
    onShowSubjectForm={() => setShowSubjectForm(true)}
    onCancelSubjectForm={() => setShowSubjectForm(false)}
    onSaveSubject={() => {
      if (!subjectName.trim() || !subjectCode.trim()) {
        Alert.alert(
          "Missing details",
          "Enter at least the subject name and course code."
        );
        return;
      }

      setSubjects((oldSubjects) => [
        ...oldSubjects,
        {
          id: Date.now(),
          name: subjectName.trim(),
          code: subjectCode.trim(),
          section: subjectSection.trim() || "No section",
          room: "Room not set",
        },
      ]);

      setSubjectName("");
      setSubjectCode("");
      setSubjectSection("");
      setShowSubjectForm(false);
    }}
    onSignOut={handleSignOut}
  />
)}

      </ScrollView>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: line,
          paddingTop: 8,
          paddingBottom: 8,
          paddingHorizontal: 5,
        }}
      >
        {tabs.map((tab) => {
          const selected = activeTab === tab.key;

          return (
            <TouchableOpacity
              key={tab.key}
              onPress={() => {
                setActiveTab(tab.key);
                setSearch("");
              }}
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                paddingVertical: 8,
                borderRadius: 10,
                backgroundColor: selected ? pale : "#FFFFFF",
              }}
            >
              <Text
                style={{
                  color: selected ? green : muted,
                  fontSize: 18,
                }}
              >
                {tab.icon}
              </Text>
              <Text
                style={{
                  color: selected ? green : muted,
                  fontSize: 9,
                  fontWeight: selected ? "700" : "500",
                  marginTop: 3,
                }}
              >
                {tab.key}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}