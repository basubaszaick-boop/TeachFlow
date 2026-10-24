import React, { useMemo, useState } from "react";
import {
  SafeAreaView, View, Text, TextInput, TouchableOpacity, ScrollView,
  StatusBar, Alert, Switch
} from "react-native";

type Tab = "Home" | "Schedule" | "Preparation" | "Tasks" | "Profile";
type Task = { id: number; title: string; subject: string; due: string; status: "Pending" | "In Progress" | "Completed" };
type Subject = { id: number; name: string; code: string; section: string; room: string };

const green = "#52765D";
const pale = "#DCE8D9";
const cream = "#F7F5EF";
const ink = "#28352D";
const muted = "#758078";
const line = "#E8E6DE";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("Home");
  const [teacherName, setTeacherName] = useState("Joana Galceran");
  const [email, setEmail] = useState("joana@example.com");
  const [password, setPassword] = useState("");
  const [search, setSearch] = useState("");
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskSubject, setTaskSubject] = useState("Mobile Programming");
  const [taskDue, setTaskDue] = useState("Oct 25, 2026");
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Finalize Mobile Programming Lesson Plan", subject: "Mobile Programming", due: "Today, 6:00 PM", status: "Pending" },
    { id: 2, title: "Prepare Database Management Materials", subject: "Database Management", due: "Tomorrow, 11:30 AM", status: "In Progress" },
    { id: 3, title: "Submit Permutations and Combinations Lesson", subject: "Discrete Mathematics", due: "Oct 27, 1:00 PM", status: "Pending" },
  ]);
  const [subjects, setSubjects] = useState<Subject[]>([
    { id: 1, name: "Mobile Programming", code: "IT 313", section: "BSIT 3A", room: "Lab 2" },
    { id: 2, name: "Database Management", code: "IT 212", section: "BSIT 2B", room: "Lab 1" },
    { id: 3, name: "Discrete Mathematics", code: "IT 123", section: "BSIT 1A", room: "Room 204" },
    { id: 4, name: "Systems Analysis and Design", code: "IT 314", section: "BSIT 3B", room: "Room 305" },
  ]);
  const [showSubjectForm, setShowSubjectForm] = useState(false);
  const [subjectName, setSubjectName] = useState("");
  const [subjectCode, setSubjectCode] = useState("");
  const [subjectSection, setSubjectSection] = useState("");
  const [notificationsOn, setNotificationsOn] = useState(true);

  const pendingCount = tasks.filter(t => t.status !== "Completed").length;
  const completedCount = tasks.filter(t => t.status === "Completed").length;
  const visibleTasks = useMemo(
    () => tasks.filter(t => `${t.title} ${t.subject} ${t.status}`.toLowerCase().includes(search.toLowerCase())),
    [tasks, search]
  );

  const card = { backgroundColor: "#FFFFFF", borderRadius: 16, padding: 15, borderWidth: 1, borderColor: line, marginBottom: 10 } as const;
  const button = { backgroundColor: green, borderRadius: 11, paddingVertical: 13, paddingHorizontal: 15, alignItems: "center" as const };
  const input = { backgroundColor: "#FFFFFF", borderWidth: 1, borderColor: line, borderRadius: 10, paddingHorizontal: 12, paddingVertical: 11, color: ink, marginTop: 6, marginBottom: 12 } as const;

  const SmallButton = ({ label, onPress, secondary = false }: { label: string; onPress: () => void; secondary?: boolean }) => (
    <TouchableOpacity onPress={onPress} style={{ backgroundColor: secondary ? "#FFFFFF" : green, borderColor: secondary ? line : green, borderWidth: 1, borderRadius: 10, paddingVertical: 10, paddingHorizontal: 12, alignItems: "center", flex: 1 }}>
      <Text style={{ color: secondary ? green : "#FFFFFF", fontWeight: "600", fontSize: 12 }}>{label}</Text>
    </TouchableOpacity>
  );

  const Header = ({ title, subtitle }: { title: string; subtitle?: string }) => (
    <View style={{ marginBottom: 18 }}>
      <Text style={{ color: ink, fontSize: 25, fontWeight: "700" }}>{title}</Text>
      {!!subtitle && <Text style={{ color: muted, marginTop: 4, fontSize: 12 }}>{subtitle}</Text>}
    </View>
  );

  const Field = ({ label, value, onChangeText, placeholder }: { label: string; value: string; onChangeText: (v: string) => void; placeholder: string }) => (
    <View>
      <Text style={{ color: ink, fontWeight: "600", fontSize: 12 }}>{label}</Text>
      <TextInput value={value} onChangeText={onChangeText} placeholder={placeholder} placeholderTextColor="#9BA39C" style={input} />
    </View>
  );

  const TaskCard = ({ task }: { task: Task }) => (
    <View style={card}>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
        <View style={{ flex: 1, paddingRight: 8 }}>
          <Text style={{ color: ink, fontWeight: "700", fontSize: 14 }}>{task.title}</Text>
          <Text style={{ color: muted, fontSize: 11, marginTop: 5 }}>{task.subject}</Text>
          <Text style={{ color: task.status === "Completed" ? green : task.due.toLowerCase().includes("today") ? "#B45C4B" : muted, fontSize: 11, marginTop: 7 }}>◷ {task.due}</Text>
        </View>
        <View style={{ backgroundColor: task.status === "Completed" ? pale : task.status === "In Progress" ? "#F6E7CE" : "#F5DEDA", borderRadius: 8, paddingHorizontal: 8, paddingVertical: 5 }}>
          <Text style={{ color: task.status === "Completed" ? green : task.status === "In Progress" ? "#95672D" : "#A64F43", fontSize: 10, fontWeight: "700" }}>{task.status}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
        {task.status !== "Completed" && <SmallButton label={task.status === "Pending" ? "Start task" : "Mark complete"} onPress={() => setTasks(old => old.map(t => t.id === task.id ? { ...t, status: t.status === "Pending" ? "In Progress" : "Completed" } : t))} />}
        <SmallButton label="Delete" secondary onPress={() => Alert.alert("Delete task", "Delete this task?", [{ text: "Cancel", style: "cancel" }, { text: "Delete", style: "destructive", onPress: () => setTasks(old => old.filter(t => t.id !== task.id)) }])} />
      </View>
    </View>
  );

  const renderHome = () => (
    <>
      <Header title={`Good morning, ${teacherName.split(" ")[0]}!`} subtitle="Monday, October 19, 2026 · Your teaching workspace" />
      <View style={{ flexDirection: "row", gap: 10, marginBottom: 12 }}>
        {[{ n: String(subjects.length), label: "Subjects", icon: "▤" }, { n: "3", label: "Lessons to prepare", icon: "▱" }, { n: String(pendingCount), label: "Pending tasks", icon: "☷" }].map((item, i) => (
          <View key={i} style={{ flex: 1, backgroundColor: "#FFFFFF", borderRadius: 14, padding: 12, borderColor: line, borderWidth: 1 }}>
            <Text style={{ color: green, fontSize: 18 }}>{item.icon}</Text>
            <Text style={{ color: ink, fontWeight: "700", fontSize: 22, marginTop: 6 }}>{item.n}</Text>
            <Text style={{ color: muted, fontSize: 10, marginTop: 3 }}>{item.label}</Text>
          </View>
        ))}
      </View>
      <View style={{ backgroundColor: pale, borderRadius: 15, padding: 15, marginBottom: 18 }}>
        <Text style={{ color: green, fontWeight: "700", fontSize: 15 }}>Today's Classes</Text>
        <Text style={{ color: ink, fontWeight: "700", marginTop: 12 }}>8:00–10:00 AM · Mobile Programming</Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 3 }}>IT 313 · BSIT 3A · Lab 2</Text>
        <View style={{ height: 1, backgroundColor: "#C5D7C3", marginVertical: 10 }} />
        <Text style={{ color: ink, fontWeight: "700" }}>1:00–3:00 PM · Database Management</Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 3 }}>IT 212 · BSIT 2B · Lab 1</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
        <Text style={{ color: ink, fontWeight: "700", fontSize: 17 }}>Priority Tasks</Text>
        <TouchableOpacity onPress={() => setActiveTab("Tasks")}><Text style={{ color: green, fontSize: 12, fontWeight: "600" }}>View all →</Text></TouchableOpacity>
      </View>
      {tasks.filter(t => t.status !== "Completed").slice(0, 2).map(t => <TaskCard key={t.id} task={t} />)}
      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700" }}>Weekly Workload Progress</Text>
        <View style={{ height: 8, borderRadius: 6, backgroundColor: "#E9ECE6", marginTop: 12, overflow: "hidden" }}>
          <View style={{ height: 8, width: `${Math.min(100, Math.round(completedCount / Math.max(tasks.length, 1) * 100))}%`, backgroundColor: green }} />
        </View>
        <Text style={{ color: muted, fontSize: 11, marginTop: 7 }}>{completedCount} of {tasks.length} tasks completed</Text>
      </View>
    </>
  );

  const renderSchedule = () => (
    <>
      <Header title="Class Schedule" subtitle="Your daily and weekly teaching agenda" />
      <View style={{ backgroundColor: pale, borderRadius: 13, padding: 13, marginBottom: 14 }}>
        <Text style={{ color: green, fontWeight: "700" }}>Monday · October 19</Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>2 classes scheduled today</Text>
      </View>
      <View style={card}>
        <Text style={{ color: muted, fontSize: 11 }}>8:00 AM – 10:00 AM</Text>
        <Text style={{ color: ink, fontWeight: "700", fontSize: 15, marginTop: 5 }}>Mobile Programming</Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>IT 313 · BSIT 3A · Lab 2</Text>
      </View>
      <View style={card}>
        <Text style={{ color: muted, fontSize: 11 }}>1:00 PM – 3:00 PM</Text>
        <Text style={{ color: ink, fontWeight: "700", fontSize: 15, marginTop: 5 }}>Database Management</Text>
        <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>IT 212 · BSIT 2B · Lab 1</Text>
      </View>
      <Text style={{ color: muted, fontSize: 12, lineHeight: 19, marginTop: 4 }}>Schedule editing can be added next with a form for subject, day, time, and room.</Text>
      <TouchableOpacity style={[button, { marginTop: 14 }]} onPress={() => Alert.alert("Add schedule", "The schedule form is the next feature to connect. Your sample classes are shown above.")}><Text style={{ color: "#FFFFFF", fontWeight: "700" }}>＋ Add Class Schedule</Text></TouchableOpacity>
    </>
  );

  const renderPreparation = () => (
    <>
      <Header title="Lesson Preparation" subtitle="Plan, organize, and track your teaching materials" />
      <TextInput value={search} onChangeText={setSearch} placeholder="Search lesson tasks..." placeholderTextColor="#9BA39C" style={input} />
      {tasks.map(t => (
        <View key={t.id} style={card}>
          <Text style={{ color: green, fontSize: 10, fontWeight: "700" }}>LESSON PREPARATION</Text>
          <Text style={{ color: ink, fontWeight: "700", fontSize: 15, marginTop: 6 }}>{t.title}</Text>
          <Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>{t.subject} · Due {t.due}</Text>
          <View style={{ flexDirection: "row", gap: 8, marginTop: 12 }}>
            <SmallButton label="Open lesson" onPress={() => Alert.alert("Lesson notes", `Add lesson notes and resources for: ${t.title}`)} />
            <SmallButton label="Delete" secondary onPress={() => setTasks(old => old.filter(x => x.id !== t.id))} />
          </View>
        </View>
      ))}
      <TouchableOpacity style={button} onPress={() => { setActiveTab("Tasks"); setShowTaskForm(true); }}><Text style={{ color: "#FFFFFF", fontWeight: "700" }}>＋ Create Lesson Task</Text></TouchableOpacity>
    </>
  );

  const renderTasks = () => (
    <>
      <Header title="My Tasks" subtitle={`${pendingCount} remaining · ${completedCount} completed`} />
      <TextInput value={search} onChangeText={setSearch} placeholder="Search academic tasks" placeholderTextColor="#9BA39C" style={input} />
      <View style={{ flexDirection: "row", gap: 8, marginBottom: 12 }}>
        <SmallButton label="All" onPress={() => setSearch("")} />
        <SmallButton label="Pending" secondary onPress={() => setSearch("Pending")} />
        <SmallButton label="Completed" secondary onPress={() => setSearch("Completed")} />
      </View>
      {visibleTasks.map(t => <TaskCard key={t.id} task={t} />)}
      {visibleTasks.length === 0 && <Text style={{ color: muted, textAlign: "center", padding: 20 }}>No tasks found.</Text>}
      {showTaskForm ? (
        <View style={card}>
          <Text style={{ color: ink, fontSize: 17, fontWeight: "700", marginBottom: 14 }}>Create Academic Task</Text>
          <Field label="Task title" value={taskTitle} onChangeText={setTaskTitle} placeholder="e.g. Prepare lesson slides" />
          <Field label="Subject" value={taskSubject} onChangeText={setTaskSubject} placeholder="Subject name" />
          <Field label="Deadline" value={taskDue} onChangeText={setTaskDue} placeholder="e.g. Oct 25, 2026" />
          <View style={{ flexDirection: "row", gap: 8 }}>
            <SmallButton label="Cancel" secondary onPress={() => setShowTaskForm(false)} />
            <SmallButton label="Save Task" onPress={() => {
              if (!taskTitle.trim()) { Alert.alert("Missing title", "Please enter a task title."); return; }
              setTasks(old => [{ id: Date.now(), title: taskTitle.trim(), subject: taskSubject.trim() || "General", due: taskDue.trim() || "No deadline", status: "Pending" }, ...old]);
              setTaskTitle(""); setTaskDue("Oct 25, 2026"); setShowTaskForm(false); setSearch("");
            }} />
          </View>
        </View>
      ) : <TouchableOpacity style={[button, { marginTop: 6 }]} onPress={() => setShowTaskForm(true)}><Text style={{ color: "#FFFFFF", fontWeight: "700" }}>＋ Add Task</Text></TouchableOpacity>}
    </>
  );

  const renderProfile = () => (
    <>
      <Header title="Profile & Settings" subtitle="Your personal teaching workspace" />
      <View style={{ backgroundColor: pale, borderRadius: 16, padding: 17, marginBottom: 14, flexDirection: "row", alignItems: "center" }}>
        <View style={{ backgroundColor: green, borderRadius: 30, width: 52, height: 52, alignItems: "center", justifyContent: "center", marginRight: 12 }}><Text style={{ color: "#FFFFFF", fontWeight: "700", fontSize: 18 }}>{teacherName.split(" ").map(n => n[0]).join("").slice(0, 2)}</Text></View>
        <View style={{ flex: 1 }}><Text style={{ color: ink, fontWeight: "700", fontSize: 16 }}>{teacherName}</Text><Text style={{ color: muted, fontSize: 12, marginTop: 4 }}>{email}</Text><Text style={{ color: green, fontSize: 11, marginTop: 4 }}>College Instructor</Text></View>
      </View>
      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700", marginBottom: 12 }}>Edit Profile</Text>
        <Field label="Full name" value={teacherName} onChangeText={setTeacherName} placeholder="Your full name" />
        <Field label="Email address" value={email} onChangeText={setEmail} placeholder="you@example.com" />
        <SmallButton label="Save Profile" onPress={() => Alert.alert("Saved", "Your profile changes are saved for this session.")} />
      </View>
      <View style={[card, { flexDirection: "row", alignItems: "center", justifyContent: "space-between" }]}>
        <View style={{ flex: 1, paddingRight: 10 }}><Text style={{ color: ink, fontWeight: "700" }}>Notifications & reminders</Text><Text style={{ color: muted, fontSize: 11, marginTop: 4 }}>Show reminders for deadlines</Text></View>
        <Switch value={notificationsOn} onValueChange={setNotificationsOn} trackColor={{ true: green, false: "#C8CEC8" }} />
      </View>
      <View style={card}>
        <Text style={{ color: ink, fontWeight: "700" }}>My Subjects · {subjects.length}</Text>
        {subjects.map(s => <View key={s.id} style={{ paddingVertical: 10, borderBottomColor: line, borderBottomWidth: 1 }}>
          <Text style={{ color: ink, fontWeight: "600" }}>{s.name}</Text><Text style={{ color: muted, fontSize: 11, marginTop: 3 }}>{s.code} · {s.section} · {s.room}</Text>
        </View>)}
        {showSubjectForm ? <>
          <Field label="Subject name" value={subjectName} onChangeText={setSubjectName} placeholder="e.g. Web Development" />
          <Field label="Course code" value={subjectCode} onChangeText={setSubjectCode} placeholder="e.g. IT 315" />
          <Field label="Section" value={subjectSection} onChangeText={setSubjectSection} placeholder="e.g. BSIT 3A" />
          <View style={{ flexDirection: "row", gap: 8 }}><SmallButton label="Cancel" secondary onPress={() => setShowSubjectForm(false)} /><SmallButton label="Save Subject" onPress={() => {
            if (!subjectName.trim() || !subjectCode.trim()) { Alert.alert("Missing details", "Enter at least the subject name and course code."); return; }
            setSubjects(old => [...old, { id: Date.now(), name: subjectName.trim(), code: subjectCode.trim(), section: subjectSection.trim() || "No section", room: "Room not set" }]);
            setSubjectName(""); setSubjectCode(""); setSubjectSection(""); setShowSubjectForm(false);
          }} /></View>
        </> : <TouchableOpacity style={{ marginTop: 12, padding: 12, alignItems: "center", borderRadius: 10, backgroundColor: pale }} onPress={() => setShowSubjectForm(true)}><Text style={{ color: green, fontWeight: "700" }}>＋ Add Subject</Text></TouchableOpacity>}
      </View>
      <TouchableOpacity style={[button, { backgroundColor: "#FFFFFF", borderColor: line, borderWidth: 1 }]} onPress={() => { setLoggedIn(false); setPassword(""); }}><Text style={{ color: green, fontWeight: "700" }}>Log Out</Text></TouchableOpacity>
    </>
  );

  if (!loggedIn) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: cream }}>
        <StatusBar barStyle="dark-content" />
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center", padding: 25 }}>
          <View style={{ alignItems: "center", marginBottom: 28 }}>
            <View style={{ backgroundColor: pale, width: 78, height: 78, borderRadius: 23, alignItems: "center", justifyContent: "center", marginBottom: 15 }}><Text style={{ fontSize: 34 }}>▤</Text></View>
            <Text style={{ color: green, fontSize: 34, fontWeight: "800", letterSpacing: -1 }}>TeachFlow</Text>
            <Text style={{ color: muted, fontSize: 13, marginTop: 6 }}>Your teaching, thoughtfully organized.</Text>
          </View>
          <View style={{ backgroundColor: "#FFFFFF", padding: 21, borderRadius: 20, borderWidth: 1, borderColor: line }}>
            <Text style={{ color: ink, fontWeight: "700", fontSize: 24, marginBottom: 6 }}>{showSignup ? "Create an Account" : "Welcome Back"}</Text>
            <Text style={{ color: muted, fontSize: 12, marginBottom: 22 }}>{showSignup ? "Set up your teaching workspace." : "Make room for what matters in your next teaching day."}</Text>
            {showSignup && <Field label="Full name" value={teacherName} onChangeText={setTeacherName} placeholder="Your full name" />}
            <Field label="Email Address" value={email} onChangeText={setEmail} placeholder="you@example.com" />
            <View><Text style={{ color: ink, fontWeight: "600", fontSize: 12 }}>Password</Text><TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder="Enter any password" placeholderTextColor="#9BA39C" style={input} /></View>
            <TouchableOpacity style={button} onPress={() => {
              if (!email.trim() || !password.trim()) { Alert.alert("Required fields", "Enter an email address and password to continue."); return; }
              setLoggedIn(true); setActiveTab("Home");
            }}><Text style={{ color: "#FFFFFF", fontWeight: "700" }}>{showSignup ? "Create Account" : "Log In"}</Text></TouchableOpacity>
            <TouchableOpacity style={{ alignItems: "center", marginTop: 18 }} onPress={() => setShowSignup(v => !v)}><Text style={{ color: green, fontSize: 12 }}>{showSignup ? "Already have an account? Log in" : "New to TeachFlow? Create an Account"}</Text></TouchableOpacity>
          </View>
          <Text style={{ color: muted, fontSize: 10, textAlign: "center", marginTop: 20 }}>Prototype version · Data is stored only while the app is running.</Text>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const tabs: { key: Tab; icon: string }[] = [
    { key: "Home", icon: "⌂" }, { key: "Schedule", icon: "▦" }, { key: "Preparation", icon: "▤" }, { key: "Tasks", icon: "☷" }, { key: "Profile", icon: "♙" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: cream }}>
      <StatusBar barStyle="dark-content" />
      <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ paddingHorizontal: 18, paddingTop: 22, paddingBottom: 25 }}>
        {activeTab === "Home" && renderHome()}
        {activeTab === "Schedule" && renderSchedule()}
        {activeTab === "Preparation" && renderPreparation()}
        {activeTab === "Tasks" && renderTasks()}
        {activeTab === "Profile" && renderProfile()}
      </ScrollView>
      <View style={{ flexDirection: "row", backgroundColor: "#FFFFFF", borderTopWidth: 1, borderTopColor: line, paddingTop: 8, paddingBottom: 8, paddingHorizontal: 5 }}>
        {tabs.map(tab => {
          const selected = activeTab === tab.key;
          return <TouchableOpacity key={tab.key} onPress={() => { setActiveTab(tab.key); setSearch(""); }} style={{ flex: 1, alignItems: "center", justifyContent: "center", paddingVertical: 8, borderRadius: 10, backgroundColor: selected ? pale : "#FFFFFF" }}>
            <Text style={{ color: selected ? green : muted, fontSize: 18 }}>{tab.icon}</Text>
            <Text style={{ color: selected ? green : muted, fontSize: 9, fontWeight: selected ? "700" : "500", marginTop: 3 }}>{tab.key}</Text>
          </TouchableOpacity>;
        })}
      </View>
    </SafeAreaView>
  );
}
