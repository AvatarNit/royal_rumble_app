"use server";

import { db } from "@/db";
import {
  seminarData,
  groupData,
  freshmenData,
  groupLeaderData,
  mentorData,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

// Read

export async function getAllGroups() {
  const groups = await db
    .select({
      groupId: groupData.groupId,
      routeNum: groupData.routeNum,
      eventOrder: groupData.eventOrder,
    })
    .from(groupData)
    .orderBy(
      sql`
              CASE
                WHEN ${groupData.groupId} ~ '^[0-9]+$' THEN 1 ELSE 0
              END,
              CASE
                WHEN ${groupData.groupId} ~ '^[0-9]+$' THEN ${groupData.groupId}::int
                ELSE NULL
              END,
              LOWER(${groupData.groupId})
            `,
    );

  const freshmen = await db
    .select({
      groupId: freshmenData.groupId,
      freshmenId: freshmenData.freshmenId,
      fName: freshmenData.fName,
      lName: freshmenData.lName,
    })
    .from(freshmenData);
  const mentors = await db
    .select({
      groupId: groupLeaderData.groupId,
      mentorId: mentorData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(groupLeaderData)
    .innerJoin(mentorData, eq(groupLeaderData.mentorId, mentorData.mentorId));

  // Create Groups
  interface GroupDetail {
    group_id: string;
    route_num: number;
    event_order: number;
    freshmen: Array<{ freshman_id: string; name: string }>;
    mentors: Array<{ mentor_id: string; name: string }>;
  }

  const groupMap = new Map<string, GroupDetail>();

  // initialize groups
  for (const g of groups) {
    groupMap.set(g.groupId, {
      group_id: g.groupId,
      route_num: g.routeNum ?? 0,
      event_order: g.eventOrder ? JSON.parse(g.eventOrder).join(", ") : "",
      freshmen: [],
      mentors: [],
    });
  }

  // attach freshmen
  for (const f of freshmen) {
    if (!f.groupId) continue;
    groupMap.get(f.groupId)?.freshmen.push({
      freshman_id: f.freshmenId.toString(),
      name: f.fName + " " + f.lName,
    });
  }

  // attach mentors
  for (const m of mentors) {
    if (!m.groupId) continue;
    groupMap.get(m.groupId)?.mentors.push({
      mentor_id: m.mentorId.toString(),
      name: m.fName + " " + m.lName,
    });
  }

  const result = Array.from(groupMap.values());

  return result;
}

// Add

export async function createGroups() {
  const orders: string[][] = (await import("../event_orders.json")).default;

  // get IDs
  const groupRows = await db
    .selectDistinct({ id: seminarData.groupId })
    .from(seminarData)
    .orderBy(seminarData.groupId);

  const groupIds = groupRows.map((g) => g.id);
  const groupCount = groupIds.length;

  // divide evenly into 6 orders distribution
  const countPerOrder = Math.floor(groupCount / 6);
  const remainder = groupCount % 6;

  const distribution = orders.map((order, index) => ({
    order: order,
    count: index < remainder ? countPerOrder + 1 : countPerOrder,
  }));

  // Build insert list

  interface InsertRow {
    groupId: string;
    eventOrder: string;
    routeNum: number;
  }

  const insertRows: InsertRow[] = [];
  let currentIndex = 0;

  distribution.forEach((dist) => {
    const { order, count } = dist;

    for (let i = 0; i < count; i++) {
      const groupId = groupIds[currentIndex++];
      const routeNum = i + 1;

      insertRows.push({
        groupId: groupId ? groupId.toString() : "",
        eventOrder: JSON.stringify(order),
        routeNum,
      });
    }
  });

  // insert
  const result = await db.insert(groupData).values(insertRows).returning();
  return result.length;
}

// Add Single Group
export async function addCustomGroup(
  groupName: string,
  eventOrder: string[],
  routeNumber: number,
): Promise<{ groupId: string; eventOrder: string; routeNum: number }[]> {
  const result = await db
    .insert(groupData)
    .values({
      groupId: groupName,
      eventOrder: JSON.stringify(eventOrder),
      routeNum: routeNumber,
    })
    .returning();

  return result as { groupId: string; eventOrder: string; routeNum: number }[];
}

// Update
export async function createSeminarGroups() {
  const allStudents = await db.select().from(seminarData);

  //Group by teacher, period, and semester
  const groups = new Map();

  let finalGroup = 2;

  for (const student of allStudents) {
    const key = `${student.teacherFullName}-${student.period}-${student.semester}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(student);
  }

  // Group ID counter
  let currentGroupA = 1;
  let currentGroupB = 2;

  // Assign group IDs per class
  for (const [, students] of groups.entries()) {
    const total = students.length;
    const half = Math.floor(total / 2);

    for (let i = 0; i < students.length; i++) {
      const groupId = i < half ? currentGroupA : currentGroupB;

      await db
        .update(seminarData)
        .set({ groupId: groupId.toString() })
        .where(eq(seminarData.freshmenId, students[i].freshmenId));
    }
    finalGroup = currentGroupB;
    // Next groups
    currentGroupA += 2;
    currentGroupB += 2;
  }
  console.log("Final group count:", finalGroup);
  return { success: true, finalGroupCount: finalGroup };
}

export async function syncGroups() {
  // get seminar data
  const seminarRows = await db
    .select({
      freshmenId: seminarData.freshmenId,
      fName: seminarData.fName,
      lName: seminarData.lName,
      groupId: seminarData.groupId,
    })
    .from(seminarData);

  const seminarById = new Map<string, (typeof seminarRows)[0]>();
  const seminarByName = new Map<string, typeof seminarRows>();

  for (const row of seminarRows) {
    if (row.freshmenId) {
      seminarById.set(row.freshmenId.toString(), row);
    }

    if (row.fName && row.lName) {
      const nameKey = `${row.fName.toLowerCase()}|${row.lName.toLowerCase()}`;
      const arr = seminarByName.get(nameKey) ?? [];
      arr.push(row);
      seminarByName.set(nameKey, arr);
    }
  }

  // get freshmen data
  const freshmenRows = await db.select().from(freshmenData);

  // track unmatched
  const unmatched: { freshmenId: string; fName: string; lName: string }[] = [];

  for (const student of freshmenRows) {
    let matched = false;

    // Attempt 1: match by ID
    if (student.freshmenId && seminarById.has(student.freshmenId.toString())) {
      const match = seminarById.get(student.freshmenId.toString())!;
      await db
        .update(freshmenData)
        .set({ groupId: match.groupId })
        .where(eq(freshmenData.freshmenId, student.freshmenId));
      matched = true;
    } else if (student.fName && student.lName) {
      // Attempt 2: match by unique name
      const nameKey = `${student.fName.toLowerCase()}|${student.lName.toLowerCase()}`;
      const possible = seminarByName.get(nameKey);

      if (possible && possible.length === 1) {
        // check if there are duplicate names
        const match = possible[0];
        if (match.freshmenId != null) {
          await db
            .update(freshmenData)
            .set({
              freshmenId: match.freshmenId, // Fix the data entered from goFan using the seminar data from the school
              groupId: match.groupId,
            })
            .where(eq(freshmenData.freshmenId, student.freshmenId));
          matched = true;
        }
      }
    }

    if (!matched) {
      // no ID or name match
      unmatched.push({
        freshmenId: student.freshmenId.toString(),
        fName: student.fName ?? "",
        lName: student.lName ?? "",
      });
    }
  }

  return {
    success: true,
    unmatched, // list of students that were not assigned
  };
}

// Delete
export async function deleteGroupByGroupId(groupId: string) {
  console.log("Deleting group:", groupId);
  // Change groupId of freshmen to unassigned
  await db
    .update(freshmenData)
    .set({ groupId: "unassigned" })
    .where(eq(freshmenData.groupId, groupId));
  // Change groupId of group leaders to unassigned
  await db
    .update(groupLeaderData)
    .set({ groupId: "unassigned" })
    .where(eq(groupLeaderData.groupId, groupId));
  // Delete group
  const result = await db
    .delete(groupData)
    .where(eq(groupData.groupId, groupId))
    .returning();
  return { success: result.length > 0 };
}
