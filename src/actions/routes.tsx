"use server";

// src/actions/routes.tsx

import { db } from "@/db";
import {
  eventOrderPattern,
  blockSchedule,
  tourRoute,
  tourRouteStop,
  hallwayStopData,
  groupData,
  groupRouteAttendance,
  seminarData,
} from "@/db/schema";
import { eq, asc, sql, and } from "drizzle-orm";

// ============================================================
//  EVENT ORDER PATTERNS
// ============================================================

export async function getEventOrderPatterns() {
  const patterns = await db
    .select()
    .from(eventOrderPattern)
    .orderBy(asc(eventOrderPattern.patternNum));

  return patterns.map((p) => ({
    patternId:  p.patternId,
    patternNum: p.patternNum,
    blockOrder: JSON.parse(p.blockOrder) as string[],
  }));
}

export async function addEventOrderPattern(blockOrder: string[]) {
  const existing = await db
    .select({ patternNum: eventOrderPattern.patternNum })
    .from(eventOrderPattern)
    .orderBy(sql`${eventOrderPattern.patternNum} DESC`)
    .limit(1);

  const nextNum = existing.length > 0 ? existing[0].patternNum + 1 : 1;

  const result = await db
    .insert(eventOrderPattern)
    .values({ patternNum: nextNum, blockOrder: JSON.stringify(blockOrder) })
    .returning();

  return {
    patternId:  result[0].patternId,
    patternNum: result[0].patternNum,
    blockOrder,
  };
}

export async function updateEventOrderPattern(
  patternId: number,
  blockOrder: string[],
) {
  await db
    .update(eventOrderPattern)
    .set({ blockOrder: JSON.stringify(blockOrder) })
    .where(eq(eventOrderPattern.patternId, patternId));
  return { success: true, patternId };
}

export async function deleteEventOrderPattern(patternId: number) {
  await db
    .delete(eventOrderPattern)
    .where(eq(eventOrderPattern.patternId, patternId));
  return { success: true, patternId };
}

// ============================================================
//  BLOCK SCHEDULE
// ============================================================

export async function getBlockSchedule() {
  return db.select().from(blockSchedule).orderBy(asc(blockSchedule.startTime));
}

export async function upsertBlockSchedule(
  blockName: string,
  startTime: string,
  durationMinutes: number,
) {
  const existing = await db
    .select()
    .from(blockSchedule)
    .where(eq(blockSchedule.blockName, blockName))
    .limit(1);

  if (existing.length > 0) {
    await db
      .update(blockSchedule)
      .set({ startTime, durationMinutes })
      .where(eq(blockSchedule.blockName, blockName));
    return { success: true, action: "updated", blockName };
  } else {
    await db
      .insert(blockSchedule)
      .values({ blockName, startTime, durationMinutes });
    return { success: true, action: "created", blockName };
  }
}

export async function deleteBlockSchedule(blockScheduleId: number) {
  await db
    .delete(blockSchedule)
    .where(eq(blockSchedule.blockScheduleId, blockScheduleId));
  return { success: true, blockScheduleId };
}

// ============================================================
//  TOUR ROUTES
// ============================================================

export async function getTourRoutes() {
  return db.select().from(tourRoute).orderBy(asc(tourRoute.routeNum));
}

export async function getTourRouteWithStops(routeNum: number) {
  const route = await db
    .select()
    .from(tourRoute)
    .where(eq(tourRoute.routeNum, routeNum))
    .limit(1);

  if (!route[0]) return null;

  const stops = await db
    .select({
      routeStopId:     tourRouteStop.routeStopId,
      stopOrder:       tourRouteStop.stopOrder,
      durationMinutes: tourRouteStop.durationMinutes,
      hallwayStopId:   tourRouteStop.hallwayStopId,
      location:        hallwayStopData.location,
    })
    .from(tourRouteStop)
    .innerJoin(
      hallwayStopData,
      eq(tourRouteStop.hallwayStopId, hallwayStopData.hallwayStopId),
    )
    .where(eq(tourRouteStop.routeId, route[0].routeId))
    .orderBy(asc(tourRouteStop.stopOrder));

  return { routeId: route[0].routeId, routeNum: route[0].routeNum, stops };
}

export async function getAllTourRoutesWithStops() {
  const routes = await db
    .select()
    .from(tourRoute)
    .orderBy(asc(tourRoute.routeNum));

  const result = [];
  for (const route of routes) {
    const stops = await db
      .select({
        routeStopId:     tourRouteStop.routeStopId,
        stopOrder:       tourRouteStop.stopOrder,
        durationMinutes: tourRouteStop.durationMinutes,
        hallwayStopId:   tourRouteStop.hallwayStopId,
        location:        hallwayStopData.location,
      })
      .from(tourRouteStop)
      .innerJoin(
        hallwayStopData,
        eq(tourRouteStop.hallwayStopId, hallwayStopData.hallwayStopId),
      )
      .where(eq(tourRouteStop.routeId, route.routeId))
      .orderBy(asc(tourRouteStop.stopOrder));

    result.push({ routeId: route.routeId, routeNum: route.routeNum, stops });
  }
  return result;
}

export async function deleteTourRoute(routeId: number) {
  await db.delete(tourRoute).where(eq(tourRoute.routeId, routeId));
  return { success: true, routeId };
}

// ============================================================
//  TOUR ROUTE STOPS
// ============================================================

export async function addTourRouteStop(
  routeId: number,
  hallwayStopId: number,
  durationMinutes: number,
) {
  // 1. Get next stopOrder
  const existing = await db
    .select({ stopOrder: tourRouteStop.stopOrder })
    .from(tourRouteStop)
    .where(eq(tourRouteStop.routeId, routeId))
    .orderBy(sql`${tourRouteStop.stopOrder} DESC`)
    .limit(1);

  const nextOrder = existing.length > 0 ? existing[0].stopOrder + 1 : 1;

  // 2. Insert the stop
  const result = await db
    .insert(tourRouteStop)
    .values({ routeId, hallwayStopId, stopOrder: nextOrder, durationMinutes })
    .returning();

  // 3. Look up routeNum for this routeId
  const route = await db
    .select({ routeNum: tourRoute.routeNum })
    .from(tourRoute)
    .where(eq(tourRoute.routeId, routeId))
    .limit(1);

  if (route[0]?.routeNum != null) {
    // 4. Find all groups assigned to this routeNum
    const groups = await db
      .select({ groupId: groupData.groupId })
      .from(groupData)
      .where(eq(groupData.routeNum, route[0].routeNum));

    // 5. Seed attendance rows for each group at this new stop
    for (const group of groups) {
      await db
        .insert(groupRouteAttendance)
        .values({ groupId: group.groupId, hallwayStopId, present: false })
        .onConflictDoNothing();
    }
  }

  return result[0];
}

export async function deleteTourRouteStop(routeStopId: number) {
  const deleted = await db
    .select()
    .from(tourRouteStop)
    .where(eq(tourRouteStop.routeStopId, routeStopId))
    .limit(1);

  if (!deleted[0]) return { success: false };

  await db
    .delete(tourRouteStop)
    .where(eq(tourRouteStop.routeStopId, routeStopId));

  // Re-sequence remaining stops
  const remaining = await db
    .select()
    .from(tourRouteStop)
    .where(eq(tourRouteStop.routeId, deleted[0].routeId))
    .orderBy(asc(tourRouteStop.stopOrder));

  for (let i = 0; i < remaining.length; i++) {
    await db
      .update(tourRouteStop)
      .set({ stopOrder: i + 1 })
      .where(eq(tourRouteStop.routeStopId, remaining[i].routeStopId));
  }

  return { success: true };
}

// ============================================================
//  GROUP ROUTE ATTENDANCE
// ============================================================

export async function seedGroupRouteAttendance(
  groupId: string,
  routeNum: number,
) {
  const route = await db
    .select()
    .from(tourRoute)
    .where(eq(tourRoute.routeNum, routeNum))
    .limit(1);

  if (!route[0]) return { success: false, reason: "Route not found" };

  const stops = await db
    .select({ hallwayStopId: tourRouteStop.hallwayStopId })
    .from(tourRouteStop)
    .where(eq(tourRouteStop.routeId, route[0].routeId));

  for (const stop of stops) {
    await db
      .insert(groupRouteAttendance)
      .values({ groupId, hallwayStopId: stop.hallwayStopId, present: false })
      .onConflictDoNothing();
  }

  return { success: true, stopsSeeded: stops.length };
}

export async function getAttendanceByStop(hallwayStopId: number) {
  return db
    .select({
      attendanceId: groupRouteAttendance.attendanceId,
      groupId:      groupRouteAttendance.groupId,
      present:      groupRouteAttendance.present,
      markedAt:     groupRouteAttendance.markedAt,
      routeNum:     groupData.routeNum,
    })
    .from(groupRouteAttendance)
    .innerJoin(groupData, eq(groupRouteAttendance.groupId, groupData.groupId))
    .where(eq(groupRouteAttendance.hallwayStopId, hallwayStopId))
    .orderBy(
      sql`
        CASE WHEN ${groupData.groupId} ~ '^[0-9]+$' THEN 1 ELSE 0 END,
        CASE WHEN ${groupData.groupId} ~ '^[0-9]+$' THEN ${groupData.groupId}::int ELSE NULL END,
        LOWER(${groupData.groupId})
      `,
    );
}

export async function getAttendanceByGroup(groupId: string) {
  return db
    .select({
      attendanceId:  groupRouteAttendance.attendanceId,
      present:       groupRouteAttendance.present,
      markedAt:      groupRouteAttendance.markedAt,
      hallwayStopId: groupRouteAttendance.hallwayStopId,
      location:      hallwayStopData.location,
    })
    .from(groupRouteAttendance)
    .innerJoin(
      hallwayStopData,
      eq(groupRouteAttendance.hallwayStopId, hallwayStopData.hallwayStopId),
    )
    .where(eq(groupRouteAttendance.groupId, groupId));
}

export async function markGroupPresent(
  groupId: string,
  hallwayStopId: number,
  present: boolean,
) {
  await db
    .update(groupRouteAttendance)
    .set({ present, markedAt: present ? new Date() : null })
    .where(
      and(
        eq(groupRouteAttendance.groupId, groupId),
        eq(groupRouteAttendance.hallwayStopId, hallwayStopId),
      ),
    );
  return { success: true, groupId, hallwayStopId, present };
}

// ============================================================
//  CREATE GROUPS FROM DB
//
//  Route assignment logic:
//
//  Groups only need DIFFERENT routes if they do their Tour block
//  at the SAME time of day. Groups that do Tour in different
//  time slots can share a route — they walk it at different times
//  so there's no conflict.
//
//  "Tour slot" = which position Tour appears in a group's event
//  order (index 0, 1, or 2).
//
//  Example with 66 groups across 6 patterns (11 each):
//    Slot 0 (Tour first):  patterns 1 & 2 → 22 groups → routes 1–22
//    Slot 1 (Tour middle): patterns 3 & 4 → 22 groups → routes 1–22 (reused)
//    Slot 2 (Tour last):   patterns 5 & 6 → 22 groups → routes 1–22 (reused)
//
//  Result: only 22 routes need to be built, not 66.
// ============================================================

export async function createGroupsFromDB() {
  // 1. Get patterns from DB
  const patternRows = await db
    .select()
    .from(eventOrderPattern)
    .orderBy(asc(eventOrderPattern.patternNum));

  if (patternRows.length === 0) {
    throw new Error(
      "No event order patterns found. Please seed the event_order_pattern table first.",
    );
  }

  const orders = patternRows.map((p) => JSON.parse(p.blockOrder) as string[]);

  // 2. Get group IDs from seminar data, ordered numerically then alphabetically.
  //    selectDistinct can't ORDER BY expressions not in the select list in Postgres,
  //    so we select all rows ordered correctly and deduplicate in JS.
  const groupRows = await db
    .select({ id: seminarData.groupId })
    .from(seminarData)
    .orderBy(
      sql`
        CASE WHEN ${seminarData.groupId} ~ '^[0-9]+$' THEN 1 ELSE 0 END,
        CASE WHEN ${seminarData.groupId} ~ '^[0-9]+$' THEN ${seminarData.groupId}::int ELSE NULL END,
        LOWER(${seminarData.groupId})
      `,
    );

  // Deduplicate while preserving order
  const seen = new Set<string>();
  const groupIds = groupRows
    .map((g) => g.id)
    .filter((id): id is string => {
      if (!id || seen.has(id)) return false;
      seen.add(id);
      return true;
    });
  const groupCount = groupIds.length;
  const orderCount = orders.length;

  // 3. Distribute groups evenly across patterns
  const countPerOrder = Math.floor(groupCount / orderCount);
  const remainder = groupCount % orderCount;

  const distribution = orders.map((order, index) => ({
    order,
    count: index < remainder ? countPerOrder + 1 : countPerOrder,
  }));

  // 4. Assign groups to patterns and track which Tour slot each group belongs to.
  //    tourSlotCounters tracks how many groups have been assigned per Tour slot,
  //    so we can give each group a unique routeNum within its slot.
  //
  //    Tour slot = index of "Tour" in the event order (case-insensitive).
  //    If there is no Tour block, routeNum defaults to null.

  const tourSlotCounters = new Map<number, number>(); // slot → next routeNum
  const insertRows: {
    groupId:    string;
    eventOrder: string;
    routeNum:   number | null;
  }[] = [];

  let groupIndex = 0;

  for (const dist of distribution) {
    // Find which slot Tour occupies for this pattern
    const tourSlot = dist.order.findIndex(
      (b) => b.toLowerCase() === "tour",
    );

    for (let i = 0; i < dist.count; i++) {
      const groupId = groupIds[groupIndex++];
      if (!groupId) continue;

      let routeNum: number | null = null;

      if (tourSlot !== -1) {
        // Get (or initialise) the counter for this Tour slot
        const current = tourSlotCounters.get(tourSlot) ?? 0;
        routeNum = current + 1;
        tourSlotCounters.set(tourSlot, routeNum);
      }

      insertRows.push({
        groupId,
        eventOrder: JSON.stringify(dist.order),
        routeNum,
      });
    }
  }

  // 5. Insert all groups
  const result = await db.insert(groupData).values(insertRows).returning();

  // 6. Seed one tourRoute row per unique routeNum.
  //    Because slots share the same routeNums (1…N), this produces
  //    only as many routes as the largest single Tour slot needs.
  const uniqueRouteNums = [
    ...new Set(
      insertRows
        .map((r) => r.routeNum)
        .filter((n): n is number => n !== null),
    ),
  ].sort((a, b) => a - b);

  for (const routeNum of uniqueRouteNums) {
    await db
      .insert(tourRoute)
      .values({ routeNum })
      .onConflictDoNothing();
  }

  return result.length;
}

// ============================================================
//  COMPUTED ARRIVAL TIMES  (group leader route page)
// ============================================================

export async function getGroupSchedule(groupId: string) {
  const group = await db
    .select({ eventOrder: groupData.eventOrder, routeNum: groupData.routeNum })
    .from(groupData)
    .where(eq(groupData.groupId, groupId))
    .limit(1);

  if (!group[0]) return null;

  const eventOrder: string[] = JSON.parse(group[0].eventOrder ?? "[]");
  const routeNum = group[0].routeNum;

  const blocks = await db.select().from(blockSchedule);
  const blockMap = new Map(blocks.map((b) => [b.blockName, b]));

  const route = await db
    .select()
    .from(tourRoute)
    .where(eq(tourRoute.routeNum, routeNum ?? 0))
    .limit(1);

  const stops = route[0]
    ? await db
        .select({
          stopOrder:       tourRouteStop.stopOrder,
          durationMinutes: tourRouteStop.durationMinutes,
          hallwayStopId:   tourRouteStop.hallwayStopId,
          location:        hallwayStopData.location,
        })
        .from(tourRouteStop)
        .innerJoin(
          hallwayStopData,
          eq(tourRouteStop.hallwayStopId, hallwayStopData.hallwayStopId),
        )
        .where(eq(tourRouteStop.routeId, route[0].routeId))
        .orderBy(asc(tourRouteStop.stopOrder))
    : [];

  const schedule = eventOrder.map((blockName) => {
    const block = blockMap.get(blockName);
    if (!block) {
      return { blockName, startTime: "TBD", stops: [] };
    }

    if (blockName !== "Tour") {
      return {
        blockName,
        startTime:       block.startTime,
        durationMinutes: block.durationMinutes,
        stops:           [],
      };
    }

    // Tour block — compute arrival time at each stop
    const [hours, minutesPart] = block.startTime.split(":");
    const [mins, period] = minutesPart.split(" ");
    let totalMinutes = (parseInt(hours) % 12) * 60 + parseInt(mins);
    if (period === "PM") totalMinutes += 12 * 60;

    const stopsWithTimes = stops.map((stop) => {
      const h  = Math.floor(totalMinutes / 60) % 12 || 12;
      const m  = totalMinutes % 60;
      const ap = totalMinutes < 12 * 60 ? "AM" : "PM";
      const arrivalTime = `${h}:${m.toString().padStart(2, "0")} ${ap}`;
      totalMinutes += stop.durationMinutes;
      return { ...stop, arrivalTime };
    });

    return {
      blockName,
      startTime:       block.startTime,
      durationMinutes: block.durationMinutes,
      stops:           stopsWithTimes,
    };
  });

  return { groupId, routeNum, schedule };
}
