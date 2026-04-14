"use server";

import { db } from "@/db";
import {
  eventsData,
  ambassadorData,
  hallwayHostData,
  hallwayStopData,
  mentorAttendanceData,
  mentorData,
} from "@/db/schema";
import { eq, sql, or } from "drizzle-orm";

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

export const getAmbassadorAssignments = async () => {
  const groups = await db
    .select({
      groupId: ambassadorData.groupId,
      mentorId: ambassadorData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(ambassadorData)
    .innerJoin(mentorData, eq(ambassadorData.mentorId, mentorData.mentorId))
    .orderBy(sql`${ambassadorData.groupId} ASC NULLS FIRST`);
  return groups;
};

export const getAmbassadorEvents = async () => {
  const events = await db
    .select({
      eventId: eventsData.eventId,
      name: eventsData.name,
      date: eventsData.date,
      time: eventsData.time,
      description: eventsData.description,
    })
    .from(eventsData)
    .orderBy(sql`${eventsData.date} ASC, ${eventsData.time} ASC`)
    .where(or(eq(eventsData.job, "AMBASSADOR"), eq(eventsData.job, "ALL")));
  return events;
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

export const getHallwayHostAssignments = async () => {
  const hosts = await db
    .select({
      hallwayStopId: hallwayHostData.hallwayStopId,
      mentorId: hallwayHostData.mentorId,
      fName: mentorData.fName,
      lName: mentorData.lName,
    })
    .from(hallwayHostData)
    .innerJoin(mentorData, eq(hallwayHostData.mentorId, mentorData.mentorId));
  return hosts;
};

export const getHallwayHostEvents = async () => {
  const events = await db
    .select({
      eventId: eventsData.eventId,
      name: eventsData.name,
      date: eventsData.date,
      time: eventsData.time,
      description: eventsData.description,
    })
    .from(eventsData)
    .orderBy(sql`${eventsData.date} ASC, ${eventsData.time} ASC`)
    .where(or(eq(eventsData.job, "HALLWAY HOST"), eq(eventsData.job, "ALL")));
  return events;
};

// Utility / Spirit queries
export const getUtilitySquadEvents = async () => {
  const events = await db
    .select({
      eventId: eventsData.eventId,
      name: eventsData.name,
      date: eventsData.date,
      time: eventsData.time,
      description: eventsData.description,
    })
    .from(eventsData)
    .orderBy(sql`${eventsData.date} ASC, ${eventsData.time} ASC`)
    .where(or(eq(eventsData.job, "UTILITY SQUAD"), eq(eventsData.job, "ALL")));
  return events;
};
export const getSpiritSessionEvents = async () => {
  const events = await db
    .select({
      eventId: eventsData.eventId,
      name: eventsData.name,
      date: eventsData.date,
      time: eventsData.time,
      description: eventsData.description,
    })
    .from(eventsData)
    .orderBy(sql`${eventsData.date} ASC, ${eventsData.time} ASC`)
    .where(or(eq(eventsData.job, "SPIRIT SESSION"), eq(eventsData.job, "ALL")));
  return events;
};

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
  if (data.job === "AMBASSADOR") {
    await db.insert(ambassadorData).values({
      mentorId: data.mentor_id,
      groupId: null,
    });
  } else if (data.job === "HALLWAY HOST") {
    await db.insert(hallwayHostData).values({
      mentorId: data.mentor_id,
      hallwayStopId: null,
    });
  }
  const eventIds = await db
    .select({ eventId: eventsData.eventId })
    .from(eventsData)
    .where(or(eq(eventsData.job, data.job), eq(eventsData.job, "ALL")));
  console.log("Event IDs for ALL jobs:", eventIds);
  for (const event of eventIds) {
    await db.insert(mentorAttendanceData).values({
      mentorId: data.mentor_id,
      eventId: event.eventId,
      status: false,
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
    past_mentor?: boolean;
    interests_involvement?: string;
  },
) => {
  const currentJob = await db
    .select({ job: mentorData.job })
    .from(mentorData)
    .where(eq(mentorData.mentorId, mentorId))
    .limit(1);
  if (currentJob[0].job !== data.job) {
    if (currentJob[0].job === "AMBASSADOR") {
      await db
        .delete(ambassadorData)
        .where(eq(ambassadorData.mentorId, mentorId));
    } else if (currentJob[0].job === "HALLWAY HOST") {
      await db
        .delete(hallwayHostData)
        .where(eq(hallwayHostData.mentorId, mentorId));
    }

    await db
      .delete(mentorAttendanceData)
      .where(eq(mentorAttendanceData.mentorId, mentorId));

    if (data.job === "AMBASSADOR") {
      await db.insert(ambassadorData).values({
        mentorId: mentorId,
        groupId: null,
      });
    } else if (data.job === "HALLWAY HOST") {
      await db.insert(hallwayHostData).values({
        mentorId: mentorId,
        hallwayStopId: null,
      });
    }

    const eventIds = await db
      .select({ eventId: eventsData.eventId })
      .from(eventsData)
      .where(or(eq(eventsData.job, data.job), eq(eventsData.job, "ALL")));
    for (const event of eventIds) {
      await db.insert(mentorAttendanceData).values({
        mentorId: mentorId,
        eventId: event.eventId,
        status: false,
      });
    }
  }
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
      pastMentor: data.past_mentor,
      interestsInvolvement: data.interests_involvement,
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
    .update(ambassadorData)
    .set({
      groupId: newGroupId,
    })
    .where(eq(ambassadorData.mentorId, mentorId));
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
  if (mentor.job === "AMBASSADOR") {
    await db
      .delete(ambassadorData)
      .where(eq(ambassadorData.mentorId, mentorId));
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
