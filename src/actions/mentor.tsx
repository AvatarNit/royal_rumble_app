"use server";

import { db } from "@/db";
import {
  groupLeaderData,
  hallwayHostData,
  hallwayStopData,
  mentorData,
} from "@/db/schema";
import { eq, sql } from "drizzle-orm";

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Read                                         //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export const getMentorById = async (mentorId: number) => {
  const mentor = await db
    .select()
    .from(mentorData)
    .where(eq(mentorData.mentorId, mentorId))
    .limit(1);
  return mentor[0];
};

export const getMentors = async () => {
  const mentors = await db.select().from(mentorData);
  return mentors;
};

// Hallway Host queries
export async function getAllHallways() {
  const hallways = await db
    .select({
      hallwayStopId: hallwayStopData.hallwayStopId,
      location: hallwayStopData.location,
    })
    .from(hallwayStopData)
    .orderBy();

  const mentors = await db
    .select({
      hallwayStopId: hallwayHostData.hallwayStopId,
      mentorId: mentorData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(hallwayHostData)
    .innerJoin(mentorData, eq(hallwayHostData.mentorId, mentorData.mentorId));

  // Create Groups
  interface GroupDetail {
    hallwayStopId: number;
    location: string | null;
    mentors: Array<{ mentor_id: string; name: string }>;
  }

  const groupMap = new Map<string, GroupDetail>();

  // initialize groups
  for (const g of hallways) {
    groupMap.set(g.hallwayStopId.toString(), {
      hallwayStopId: g.hallwayStopId,
      location: g.location,
      mentors: [],
    });
  }

  // attach mentors
  for (const m of mentors) {
    if (!m.hallwayStopId) continue;
    groupMap.get(m.hallwayStopId.toString())?.mentors.push({
      mentor_id: m.mentorId.toString(),
      name: m.fName + " " + m.lName,
    });
  }

  const result = Array.from(groupMap.values());

  return result;
}
//--------------------------------------------------------------------------------------//
//                                     End of Read                                      //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Add                                          //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export const addMentor = async (data: {
  f_name: string;
  l_name: string;
  mentor_id: number;
  graduation_year: number;
  job: string;
  email: string;
  phone_number: string;
}) => {
  await db.insert(mentorData).values({
    fName: data.f_name,
    lName: data.l_name,
    mentorId: data.mentor_id,
    gradYear: data.graduation_year,
    job: data.job,
    email: data.email,
    phoneNum: data.phone_number,
  });
  if (data.job === "GROUP LEADER") {
    await db.insert(groupLeaderData).values({
      mentorId: data.mentor_id,
      groupId: null,
    });
  } else if (data.job === "HALLWAY HOST") {
    await db.insert(hallwayHostData).values({
      mentorId: data.mentor_id,
      hallwayStopId: null,
    });
  }
  // return to display confirmation
  return {
    success: true,
    f_name: data.f_name,
    l_name: data.l_name,
    mentor_id: data.mentor_id,
  };
};

//--------------------------------------------------------------------------------------//
//                                     End of Add                                       //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                       Update                                         //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export const updateMentorByID = async (
  mentorId: number,
  data: {
    f_name: string;
    l_name: string;
    email: string;
    grad_year: number;
    job: string;
    pizza_type: string;
    languages: string;
    training_day: string;
    tshirt_size: string;
    phone_num: string;
  },
) => {
  await db
    .update(mentorData)
    .set({
      fName: data.f_name,
      lName: data.l_name,
      email: data.email,
      gradYear: data.grad_year,
      job: data.job,
      pizzaType: data.pizza_type,
      languages: data.languages,
      trainingDay: data.training_day,
      tshirtSize: data.tshirt_size,
      phoneNum: data.phone_num,
    })
    .where(eq(mentorData.mentorId, mentorId));
  return { success: true, id: mentorId };
};

export const reassignMentorGroup = async (
  mentorId: number,
  newGroupId: string,
) => {
  if (newGroupId.toLowerCase() === "unassigned") {
    newGroupId = null as any;
  }
  await db
    .update(groupLeaderData)
    .set({
      groupId: newGroupId,
    })
    .where(eq(groupLeaderData.mentorId, mentorId));
  return { success: true, id: mentorId };
};

export const reassignMentorHallway = async (
  mentorId: number,
  newHallwayId: string,
) => {
  if (newHallwayId.toLowerCase() === "unassigned") {
    newHallwayId = null as any;
  }
  await db
    .update(hallwayHostData)
    .set({
      hallwayStopId: newHallwayId ? Number(newHallwayId) : null,
    })
    .where(eq(hallwayHostData.mentorId, mentorId));
  return { success: true, id: mentorId };
};

//--------------------------------------------------------------------------------------//
//                                    End of Update                                     //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                       Delete                                         //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export const deleteMentorById = async (mentorId: number) => {
  const mentor = await getMentorById(mentorId);
  console.log("Deleting mentor:", mentor);
  if (mentor.job === "GROUP LEADER") {
    await db
      .delete(groupLeaderData)
      .where(eq(groupLeaderData.mentorId, mentorId));
  } else if (mentor.job === "HALLWAY HOST") {
    await db
      .delete(hallwayHostData)
      .where(eq(hallwayHostData.mentorId, mentorId));
  }
  await db.delete(mentorData).where(eq(mentorData.mentorId, mentorId));
  return { success: true, id: mentorId };
};
//--------------------------------------------------------------------------------------//
//                                    End of Delete                                     //
//--------------------------------------------------------------------------------------//
