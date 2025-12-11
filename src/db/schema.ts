import { pgTable, integer, text, boolean, date, primaryKey } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------- group_data ----------------
export const groupData = pgTable("group_data", {
  groupId: text("group_id").primaryKey(),
  eventOrder: text("event_order"),
  routeNum: integer("route_num"),
});

// ---------------- mentor_attendance_data ----------------
export const mentorAttendanceData = pgTable("mentor_attendance_data", {
  mentorId: integer("mentor_id"),
  trainingId: integer("training_id"),
  status: text("status"),
});

// ---------------- trainings_data ----------------
export const trainingsData = pgTable("trainings_data", {
  trainingId: integer("training_id").primaryKey().generatedAlwaysAsIdentity(),
  name: text("name"),
  job: text("job"),
  date: date("date"),
  description: text("description"),
});

// ---------------- hallway_stop_data ----------------
export const hallwayStopData = pgTable("hallway_stop_data", {
  hallwayStopId: integer("hallway_stop_id").primaryKey(),
  location: text("location"),
});

// ---------------- hallway_host_data ----------------
export const hallwayHostData = pgTable("hallway_host_data", {
  mentorId: integer("mentor_id"),
  hallwayStopId: integer("hallway_stop_id").references(() => hallwayStopData.hallwayStopId),
});

// ---------------- seminar_data ----------------
export const seminarData = pgTable("seminar_data", {
  fName: text("f_name"),
  lName: text("l_name"),
  freshmenId: integer("freshmen_id"),
  semester: text("semester"),
  teacherFullName: text("teacher_full_name"),
  period: text("period"),
  groupId: text("group_id"),
});

// ---------------- freshmen_data ----------------
export const freshmenData = pgTable("freshmen_data", {
  freshmenId: integer("freshmen_id").primaryKey(),
  fName: text("f_name"),
  lName: text("l_name"),
  tshirtSize: text("tshirt_size"),
  email: text("email"),
  primaryLanguage: text("primary_language"),
  interests: text("interests"),
  healthConcerns: text("health_concerns"),
  present: boolean("present"),
  groupId: text("group_id"),
});

// ---------------- group_leader_data ----------------
export const groupLeaderData = pgTable("group_leader_data", {
  mentorId: integer("mentor_id"),
  groupId: text("group_id").references(() => groupData.groupId),
});

// ---------------- mentor_data ----------------
export const mentorData = pgTable("mentor_data", {
  mentorId: integer("mentor_id").primaryKey(),
  email: text("email"),
  fName: text("f_name"),
  lName: text("l_name"),
  gradYear: integer("grad_year"),
  job: text("job"),
  pizzaType: text("pizza_type"),
  languages: text("languages"),
  trainingDay: text("training_day"),
  tshirtSize: text("tshirt_size"),
  phoneNum: text("phone_num"),
});

// ---------------- admin_data ----------------
export const adminData = pgTable("admin_data", {
  adminId: integer("admin_id").primaryKey(),
  email: text("email"),
  fName: text("f_name"),
  lName: text("l_name"),
});

// ---------------- Relations (optional) ----------------
export const mentorRelations = relations(mentorData, ({ many }) => ({
  attendance: many(mentorAttendanceData),
  hallwayHost: many(hallwayHostData),
  groupLeader: many(groupLeaderData),
}));

export const groupRelations = relations(groupData, ({ many }) => ({
  leaders: many(groupLeaderData),
  seminars: many(seminarData),
}));

export const freshmanRelations = relations(freshmenData, ({ one }) => ({
  seminar: one(seminarData, {
    fields: [freshmenData.freshmenId],
    references: [seminarData.freshmenId],
  }),
}));
