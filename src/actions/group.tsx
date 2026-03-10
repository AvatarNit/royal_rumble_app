"use server";

import { db } from "@/db";
import {
  seminarData,
  groupData,
  freshmenData,
  groupLeaderData,
  mentorData,
  hallwayHostData,
  hallwayStopData,
} from "@/db/schema";
import { eq, sql, isNull, inArray } from "drizzle-orm";

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Read                                         //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export async function getGroupIds() {
  const groups = await db
    .select({
      groupId: groupData.groupId,
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

  return groups;
}

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

export async function getGroupByGroupId(groupId: string) {
  const group = await db
    .select()
    .from(groupData)
    .where(eq(groupData.groupId, groupId))
    .limit(1);
  return group[0];
}

export async function getFreshmenByGroupId(groupId: string) {
  const freshmen = await db
    .select()
    .from(freshmenData)
    .where(eq(freshmenData.groupId, groupId));
  return freshmen;
}

export async function getMentorsByGroupId(groupId: string) {
  const mentorsId = await db
    .select()
    .from(groupLeaderData)
    .where(eq(groupLeaderData.groupId, groupId));

  const mentors = Array<{ mentor_id: number; fname: string; lname: string }>();

  for (const id of mentorsId) {
    if (id.mentorId === null) continue;
    const mentor = await db
      .select()
      .from(mentorData)
      .where(eq(mentorData.mentorId, id.mentorId));
    mentors.push({
      mentor_id: mentor[0].mentorId,
      fname: mentor[0].fName ?? "",
      lname: mentor[0].lName ?? "",
    });
  }

  return mentors;
}

export async function getNullGroupFreshmen() {
  const freshmen = await db
    .select({
      groupId: freshmenData.groupId,
      freshmenId: freshmenData.freshmenId,
      fName: freshmenData.fName,
      lName: freshmenData.lName,
    })
    .from(freshmenData)
    .where(isNull(freshmenData.groupId));
  return freshmen;
}

export async function getNullGroupMentors() {
  const groupLeaders = await db
    .select({
      groupId: groupLeaderData.groupId,
      mentorId: mentorData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(groupLeaderData)
    .where(isNull(groupLeaderData.groupId))
    .innerJoin(mentorData, eq(groupLeaderData.mentorId, mentorData.mentorId));
  return groupLeaders;
}

export async function getGroupIdByMentorId(mentorId: number) {
  const groupLeader = await db
    .select({
      groupId: groupLeaderData.groupId,
    })
    .from(groupLeaderData)
    .where(eq(groupLeaderData.mentorId, mentorId))
    .limit(1);
  return groupLeader[0]?.groupId ?? null;
}

export async function getFreshmenAttendanceByGroupId(groupId: string) {
  const attendance = await db
    .select({
      freshmenId: freshmenData.freshmenId,
      fName: freshmenData.fName,
      lName: freshmenData.lName,
      present: freshmenData.present,
    })
    .from(freshmenData)
    .where(eq(freshmenData.groupId, groupId));
  return attendance;
}

{
  /* ====================================
=               Hallways Read                =
==================================== */
}

export async function getNullHallwayMentors() {
  const hallwayHosts = await db
    .select({
      hallwayStopId: hallwayHostData.hallwayStopId,
      mentorId: mentorData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(hallwayHostData)
    .where(isNull(hallwayHostData.hallwayStopId))
    .innerJoin(mentorData, eq(hallwayHostData.mentorId, mentorData.mentorId));
  return hallwayHosts;
}

export async function getHallwayByHallwayId(hallwayId: number) {
  const hallway = await db
    .select()
    .from(hallwayStopData)
    .where(eq(hallwayStopData.hallwayStopId, hallwayId));
  return hallway[0];
}

export async function getMentorsByHallwayId(hallwayId: number) {
  const mentorsId = await db
    .select()
    .from(hallwayHostData)
    .where(eq(hallwayHostData.hallwayStopId, hallwayId));

  const mentors = Array<{ mentor_id: number; fname: string; lname: string }>();

  for (const id of mentorsId) {
    if (id.mentorId === null) continue;
    const mentor = await db
      .select()
      .from(mentorData)
      .where(eq(mentorData.mentorId, id.mentorId));
    mentors.push({
      mentor_id: mentor[0].mentorId,
      fname: mentor[0].fName ?? "",
      lname: mentor[0].lName ?? "",
    });
  }

  return mentors;
}

export async function getAllHallways() {
  const hallways = await db
    .select()
    .from(hallwayStopData)
    .orderBy(hallwayStopData.hallwayStopId);
  return hallways;
}

export async function getHallwayIdByMentorId(mentorId: number) {
  const hallwayHost = await db
    .select({
      hallwayStopId: hallwayHostData.hallwayStopId,
    })
    .from(hallwayHostData)
    .where(eq(hallwayHostData.mentorId, mentorId))
    .limit(1);
  return hallwayHost[0]?.hallwayStopId ?? null;
}

{
  /* ======== End of Hallways Read ======== */
}

//--------------------------------------------------------------------------------------//
//                                     End of Read                                      //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Add                                          //
//                                                                                      //
//--------------------------------------------------------------------------------------//

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
  console.log("Event Order", eventOrder);
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

{
  /* ====================================
=               Hallways add           =
==================================== */
}

export async function addHallway(
  hallwayName: string,
): Promise<{ success: boolean; hallwayName: string }> {
  // Insert hallway stops
  await db.insert(hallwayStopData).values({
    location: hallwayName,
  });
  return { success: true, hallwayName };
}

{
  /* ======== End of Hallways add ======== */
}

//--------------------------------------------------------------------------------------//
//                                      End of Add                                      //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                        Update                                        //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export async function createSeminarGroups() {
  const allStudents = await db.select().from(seminarData);

  // Group by teacher + period + semester
  const groups = new Map<string, typeof allStudents>();

  for (const student of allStudents) {
    const key = `${student.teacherFullName}-${student.period}-${student.semester}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(student);
  }

  let currentGroupA = 1;
  let currentGroupB = 2;
  let finalGroup = 2;

  // Process each class group
  for (const [, students] of groups.entries()) {
    const total = students.length;
    const half = Math.floor(total / 2);

    const groupAStudents = students.slice(0, half);
    const groupBStudents = students.slice(half);

    // ✅ Filter out null IDs (fixes your TypeScript error)
    const groupAIds = groupAStudents
      .map((s) => s.freshmenId)
      .filter((id): id is number => id !== null);

    const groupBIds = groupBStudents
      .map((s) => s.freshmenId)
      .filter((id): id is number => id !== null);

    // ✅ Bulk update Group A
    if (groupAIds.length > 0) {
      await db
        .update(seminarData)
        .set({ groupId: currentGroupA.toString() })
        .where(inArray(seminarData.freshmenId, groupAIds));
    }

    // ✅ Bulk update Group B
    if (groupBIds.length > 0) {
      await db
        .update(seminarData)
        .set({ groupId: currentGroupB.toString() })
        .where(inArray(seminarData.freshmenId, groupBIds));
    }

    finalGroup = currentGroupB;

    currentGroupA += 2;
    currentGroupB += 2;
  }

  console.log("Final group count:", finalGroup);

  return {
    success: true,
    finalGroupCount: finalGroup,
  };
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

export async function updateGroupByGroupId(
  currentGroupId: string,
  groupId: string,
  event_order: string[],
  route_num: number,
) {
  console.log("Event Order", event_order);
  await db
    .update(groupData)
    .set({
      groupId: groupId,
      eventOrder: JSON.stringify(event_order),
      routeNum: route_num,
    })
    .where(eq(groupData.groupId, currentGroupId));
  return { success: true, groupId };
}

{
  /* Hallway Update
==================================== */
}

export async function updateHallwayByID(hallwayId: number, location: string) {
  await db
    .update(hallwayStopData)
    .set({
      location: location,
    })
    .where(eq(hallwayStopData.hallwayStopId, hallwayId));
  return { success: true, hallwayId };
}

{
  /* End of Hallway Update
==================================== */
}

//--------------------------------------------------------------------------------------//
//                                    End of Update                                     //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                        Delete                                        //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export async function deleteGroupByGroupId(groupId: string) {
  console.log("Deleting group:", groupId);
  // Change groupId of freshmen to null
  await db
    .update(freshmenData)
    .set({ groupId: null })
    .where(eq(freshmenData.groupId, groupId));
  // Change groupId of group leaders to null
  await db
    .update(groupLeaderData)
    .set({ groupId: null })
    .where(eq(groupLeaderData.groupId, groupId));
  // Delete group
  const result = await db
    .delete(groupData)
    .where(eq(groupData.groupId, groupId))
    .returning();
  return { success: result.length > 0 };
}

{
  /* ====================================
=               Hallway Delete                =
==================================== */
}

export async function deleteHallwayByStopId(stopId: number) {
  // Reassign mentors
  await db
    .update(hallwayHostData)
    .set({ hallwayStopId: null })
    .where(eq(hallwayHostData.hallwayStopId, stopId));
  // Delete hallway
  const result = await db
    .delete(hallwayStopData)
    .where(eq(hallwayStopData.hallwayStopId, stopId))
    .returning();
  return { success: result.length > 0 };
}

{
  /* ======== End of Hallway Delete ======== */
}

//--------------------------------------------------------------------------------------//
//                                        End of Delete                                 //
//--------------------------------------------------------------------------------------//
