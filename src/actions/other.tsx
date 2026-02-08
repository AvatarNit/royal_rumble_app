"use server";

import { db } from "@/db";
import { eventsData, mentorAttendanceData, mentorData } from "@/db/schema";
import { eq, asc, and } from "drizzle-orm";

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                   Other Functions                                    //
//                                                                                      //
//--------------------------------------------------------------------------------------//

const assignMentorsToEvent = async (
  eventId: number,
  job: string,
): Promise<void> => {
  if (job === "ALL") {
    const allMentors = await db.select().from(mentorData);
    for (const mentor of allMentors) {
      await db.insert(mentorAttendanceData).values({
        eventId: eventId,
        mentorId: mentor.mentorId,
        status: false,
      });
    }
  } else {
    const specificMentors = await db
      .select()
      .from(mentorData)
      .where(eq(mentorData.job, String(job)));
    for (const mentor of specificMentors) {
      await db.insert(mentorAttendanceData).values({
        eventId: eventId,
        mentorId: mentor.mentorId,
        status: false,
      });
    }
  }
};

//--------------------------------------------------------------------------------------//
//                                End of Other Functions                                //
//--------------------------------------------------------------------------------------//

//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Read                                         //
//                                                                                      //
//--------------------------------------------------------------------------------------//
export const getAllEvents = async (job?: string) => {
  interface EventWithMentors {
    eventId: number;
    name: string;
    date: string;
    time: string;
    location: string;
    job: string;
    description: string | null;
    mentors: Array<{
      fName: string;
      lName: string;
      mentor_id: number;
      status: boolean;
    }>;
  }

  const allEventsWithMentors: EventWithMentors[] = [];

  let events = await db.select().from(eventsData).orderBy(asc(eventsData.date));
  if (job) {
    events = events.filter((event) => event.job === job);
  }
  for (const event of events) {
    const attendance = await db
      .select({
        mentor_id: mentorAttendanceData.mentorId,
        status: mentorAttendanceData.status,
        fName: mentorData.fName,
        lName: mentorData.lName,
      })
      .from(mentorAttendanceData)
      .innerJoin(
        mentorData,
        eq(mentorAttendanceData.mentorId, mentorData.mentorId),
      )
      .where(eq(mentorAttendanceData.eventId, event.eventId));
    allEventsWithMentors.push({
      eventId: event.eventId,
      name: String(event.name),
      date: String(event.date),
      job: String(event.job),
      time: String(event.time),
      location: String(event.location),
      description: event.description,
      mentors: attendance as Array<{
        fName: string;
        lName: string;
        mentor_id: number;
        status: boolean;
      }>,
    });
  }
  return allEventsWithMentors;
};

export const getEventById = async (eventId: number) => {
  const event = await db
    .select()
    .from(eventsData)
    .where(eq(eventsData.eventId, eventId));
  return event[0];
};

export const getMentorAttendanceAllEvents = async () => {
  interface EventWithMentorsAttendance {
    eventId: number;
    name: string;
    date: string;
    mentors: Array<{
      fName: string;
      lName: string;
      mentor_id: number;
      job: string;
      status: boolean;
    }>;
  }

  const allEventsWithMentorsAttendance: EventWithMentorsAttendance[] = [];

  const events = await db
    .select()
    .from(eventsData)
    .orderBy(asc(eventsData.date));

  for (const event of events) {
    const attendance = await db
      .select({
        mentor_id: mentorAttendanceData.mentorId,
        status: mentorAttendanceData.status,
        fName: mentorData.fName,
        lName: mentorData.lName,
        job: mentorData.job,
      })
      .from(mentorAttendanceData)
      .innerJoin(
        mentorData,
        eq(mentorAttendanceData.mentorId, mentorData.mentorId),
      )
      .where(eq(mentorAttendanceData.eventId, event.eventId));
    allEventsWithMentorsAttendance.push({
      eventId: event.eventId,
      name: String(event.name),
      date: String(event.date),
      mentors: attendance as Array<{
        fName: string;
        lName: string;
        mentor_id: number;
        job: string;
        status: boolean;
      }>,
    });
  }
  return allEventsWithMentorsAttendance;
};
//--------------------------------------------------------------------------------------//
//                                     End of Read                                      //
//--------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                         Add                                          //
//                                                                                      //
//--------------------------------------------------------------------------------------//

export const addEvent = async (data: {
  name: string;
  job: string;
  date: string;
  time: string;
  location: string;
  description: string;
}) => {
  const eventResult = await db
    .insert(eventsData)
    .values({
      name: data.name,
      job: data.job,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
    })
    .returning();

  await assignMentorsToEvent(Number(eventResult[0].eventId), data.job);
  return {
    success: true,
    name: data.name,
    job: data.job,
    date: data.date,
  };
};
//--------------------------------------------------------------------------------------//
//                                      End of Add                                      //
//--------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                        Update                                        //
//                                                                                      //
//--------------------------------------------------------------------------------------//
export const updateEventByID = async (
  eventId: number,
  data: {
    name: string;
    job: string;
    date: string;
    time: string;
    location: string;
    description: string;
  },
  currentJob?: string,
) => {
  await db
    .update(eventsData)
    .set({
      name: data.name,
      job: data.job,
      date: data.date,
      time: data.time,
      location: data.location,
      description: data.description,
    })
    .where(eq(eventsData.eventId, eventId));

  if (currentJob !== data.job) {
    await db
      .delete(mentorAttendanceData)
      .where(eq(mentorAttendanceData.eventId, eventId));
    await assignMentorsToEvent(eventId, data.job);
    console.log("Job changed, mentors reassigned");
  }

  return { success: true, eventId: eventId };
};

export const updateMentorAttendanceById = async (
  eventId: number,
  mentorId: number,
  status: boolean,
) => {
  await db
    .update(mentorAttendanceData)
    .set({ status: status })
    .where(
      and(
        eq(mentorAttendanceData.eventId, eventId),
        eq(mentorAttendanceData.mentorId, mentorId),
      ),
    );
  return { success: true, eventId: eventId, mentorId: mentorId, status: status };
}
//--------------------------------------------------------------------------------------//
//                                    End of Update                                     //
//--------------------------------------------------------------------------------------//
//--------------------------------------------------------------------------------------//
//                                                                                      //
//                                        Delete                                        //
//                                                                                      //
//--------------------------------------------------------------------------------------//
export const deleteEvent = async (eventId: number) => {
  await db.delete(eventsData).where(eq(eventsData.eventId, eventId));

  await db
    .delete(mentorAttendanceData)
    .where(eq(mentorAttendanceData.eventId, eventId));
  return { success: true, eventId: eventId };
};
//--------------------------------------------------------------------------------------//
//                                    End of Delete                                     //
//--------------------------------------------------------------------------------------//
