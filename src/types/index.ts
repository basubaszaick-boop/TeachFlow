
export type Tab = "Home" | "Schedule" | "Preparation" | "Tasks" | "Profile";

export type Task = {
  id: number;
  title: string;
  subject: string;
  due: string;
  status: "Pending" | "In Progress" | "Completed";
};

export type Subject = {
  id: number;
  name: string;
  code: string;
  section: string;
  room: string;
};
