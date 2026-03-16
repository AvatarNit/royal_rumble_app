import { pgTable, integer, text, boolean, date, serial, varchar, timestamp, unique } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

// ---------------- group_data ----------------
export const groupData = pgTable("group_data", {
  groupId:    text("group_id").primaryKey(),
  eventOrder: text("event_order"),
  routeNum:   integer("route_num"),
});

// ---------------- mentor_attendance_data ----------------
export const mentorAttendanceData = pgTable("mentor_attendance_data", {
  mentorId: integer("mentor_id"),
  eventId:  integer("event_id"),
  status:   boolean("status"),
});

// ---------------- events_data ----------------
export const eventsData = pgTable("events_data", {
  eventId:       integer("event_id").primaryKey().generatedAlwaysAsIdentity(),
  name:          text("name"),
  job:           text("job"),
  date:          date("date"),
  time:          text("time"),
  location:      text("location"),
  description:   text("description"),
  isRoyalRumble: boolean("is_royal_rumble").default(false),
});

// ---------------- hallway_stop_data ----------------
export const hallwayStopData = pgTable("hallway_stop_data", {
  hallwayStopId: integer("hallway_stop_id").primaryKey().generatedAlwaysAsIdentity(),
  location:      text("location"),
});

// ---------------- hallway_host_data ----------------
export const hallwayHostData = pgTable("hallway_host_data", {
  mentorId:      integer("mentor_id"),
  hallwayStopId: integer("hallway_stop_id"),
});

// ---------------- seminar_data ----------------
export const seminarData = pgTable("seminar_data", {
  fName:           text("f_name"),
  lName:           text("l_name"),
  freshmenId:      integer("freshmen_id"),
  semester:        text("semester"),
  teacherFullName: text("teacher_full_name"),
  period:          text("period"),
  groupId:         text("group_id"),
});

// ---------------- freshmen_data ----------------
export const freshmenData = pgTable("freshmen_data", {
  freshmenId:      integer("freshmen_id").primaryKey(),
  fName:           text("f_name"),
  lName:           text("l_name"),
  tshirtSize:      text("tshirt_size"),
  email:           text("email"),
  primaryLanguage: text("primary_language"),
  interests:       text("interests"),
  healthConcerns:  text("health_concerns"),
  present:         boolean("present"),
  groupId:         text("group_id"),
});

// ---------------- group_leader_data ----------------
export const groupLeaderData = pgTable("group_leader_data", {
  mentorId: integer("mentor_id"),
  groupId:  text("group_id"),
});

// ---------------- mentor_data ----------------
export const mentorData = pgTable("mentor_data", {
  mentorId:    integer("mentor_id").primaryKey(),
  email:       text("email"),
  fName:       text("f_name"),
  lName:       text("l_name"),
  gradYear:    integer("grad_year"),
  job:         text("job"),
  pizzaType:   text("pizza_type"),
  languages:   text("languages"),
  trainingDay: text("training_day"),
  tshirtSize:  text("tshirt_size"),
  phoneNum:    text("phone_num"),
});

// ---------------- admin_data ----------------
export const adminData = pgTable("admin_data", {
  adminId: integer("admin_id").primaryKey(),
  email:   text("email"),
  fName:   text("f_name"),
  lName:   text("l_name"),
});

// ---------------- site_content ----------------
export const siteContent = pgTable("site_content", {
  id:      serial("id").primaryKey(),
  key:     varchar("key", { length: 100 }).unique().notNull(),
  content: text("content").notNull(),
});

// ============================================================
//  NEW — ROUTE MANAGEMENT SYSTEM
// ============================================================

// ---------------- event_order_pattern ----------------
// Replaces event_orders.json. Stores the rotation patterns
// like ["Tour","LGI","GYM"]. Admin can edit these on the site.
// createGroups() reads from here instead of the JSON file.
export const eventOrderPattern = pgTable("event_order_pattern", {
  patternId:  serial("pattern_id").primaryKey(),
  patternNum: integer("pattern_num").notNull().unique(),
  // 1-indexed, matches position in the original JSON array
  blockOrder: text("block_order").notNull(),
  // JSON string e.g. '["Tour","LGI","GYM"]'
  // Same format as groupData.eventOrder so all existing
  // JSON.parse(eventOrder) calls need no changes.
});

// ---------------- block_schedule ----------------
// One row per block name (Tour, LGI, GYM, etc.).
// Admin sets start time and duration for each block.
// Arrival times at stops are always computed from this — never stored.
export const blockSchedule = pgTable("block_schedule", {
  blockScheduleId: serial("block_schedule_id").primaryKey(),
  blockName:       text("block_name").notNull().unique(),
  // Must match values used inside eventOrderPattern.blockOrder
  // e.g. "Tour", "LGI", "GYM"
  startTime:       text("start_time").notNull(),
  // e.g. "9:00 AM"
  durationMinutes: integer("duration_minutes").notNull(),
  // Total length of this block in minutes
});

// ---------------- tour_route ----------------
// One row per route number. Thin table whose only job is to
// give tour_route_stop a proper FK target.
// routeNum matches groupData.routeNum exactly.
export const tourRoute = pgTable("tour_route", {
  routeId:  serial("route_id").primaryKey(),
  routeNum: integer("route_num").notNull().unique(),
  // e.g. 1, 2, 3 — matches groupData.routeNum
});

// ---------------- tour_route_stop ----------------
// The ordered list of hallway stops for a given route.
// Admin builds this on the site: pick a stop, enter minutes.
// Deleting a tourRoute cascades and removes its stops automatically.
export const tourRouteStop = pgTable(
  "tour_route_stop",
  {
    routeStopId:     serial("route_stop_id").primaryKey(),
    routeId:         integer("route_id")
                       .notNull()
                       .references(() => tourRoute.routeId, { onDelete: "cascade" }),
    hallwayStopId:   integer("hallway_stop_id")
                       .notNull()
                       .references(() => hallwayStopData.hallwayStopId),
    stopOrder:       integer("stop_order").notNull(),
    // 1, 2, 3 … defines the walking sequence within the route
    durationMinutes: integer("duration_minutes").notNull(),
    // How many minutes the group spends at this stop
  },
  (t) => ({
    // A route cannot visit the same stop twice
    uniqueRouteStop:  unique("unique_route_stop").on(t.routeId, t.hallwayStopId),
    // A route cannot have two stops at the same position
    uniqueRouteOrder: unique("unique_route_order").on(t.routeId, t.stopOrder),
  }),
);

// ---------------- group_route_attendance ----------------
// Hallway host marks a group as present when they arrive at their stop.
// One row per group per stop — one time for the whole day.
// markedAt is set server-side when present flips to true.
export const groupRouteAttendance = pgTable(
  "group_route_attendance",
  {
    attendanceId:  serial("attendance_id").primaryKey(),
    groupId:       text("group_id")
                     .notNull()
                     .references(() => groupData.groupId, { onDelete: "cascade" }),
    hallwayStopId: integer("hallway_stop_id")
                     .notNull()
                     .references(() => hallwayStopData.hallwayStopId),
    present:       boolean("present").notNull().default(false),
    markedAt:      timestamp("marked_at"),
    // null until the hallway host marks them present
  },
  (t) => ({
    // One record per group per stop, enforced at DB level
    uniqueGroupStop: unique("unique_group_stop").on(t.groupId, t.hallwayStopId),
  }),
);

// ============================================================
//  RELATIONS
// ============================================================

export const mentorRelations = relations(mentorData, ({ many }) => ({
  attendance:   many(mentorAttendanceData),
  hallwayHost:  many(hallwayHostData),
  groupLeader:  many(groupLeaderData),
}));

export const groupRelations = relations(groupData, ({ many }) => ({
  leaders:           many(groupLeaderData),
  seminars:          many(seminarData),
  routeAttendance:   many(groupRouteAttendance),
}));

export const freshmanRelations = relations(freshmenData, ({ one }) => ({
  seminar: one(seminarData, {
    fields:     [freshmenData.freshmenId],
    references: [seminarData.freshmenId],
  }),
}));

export const tourRouteRelations = relations(tourRoute, ({ many }) => ({
  stops: many(tourRouteStop),
}));

export const tourRouteStopRelations = relations(tourRouteStop, ({ one }) => ({
  route:       one(tourRoute, {
    fields:     [tourRouteStop.routeId],
    references: [tourRoute.routeId],
  }),
  hallwayStop: one(hallwayStopData, {
    fields:     [tourRouteStop.hallwayStopId],
    references: [hallwayStopData.hallwayStopId],
  }),
}));

export const hallwayStopRelations = relations(hallwayStopData, ({ many }) => ({
  routeStops:      many(tourRouteStop),
  routeAttendance: many(groupRouteAttendance),
}));