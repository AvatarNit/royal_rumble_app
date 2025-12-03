"use server";

import { db } from "@/db";
import { mentorData } from "@/db/schema";
import { eq } from "drizzle-orm";

// Read
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
// Add
export const addMentor = async (data: {
  f_name: string;
  l_name: string;
  mentor_id: number;
  graduation_year: number;
  email: string;
  phone_number: string;
}) => {
  await db.insert(mentorData).values({
    fName: data.f_name,
    lName: data.l_name,
    mentorId: data.mentor_id,
    gradYear: data.graduation_year,
    email: data.email,
    phoneNum: data.phone_number,
  });
  // return to display confirmation
  return {
    success: true,
    f_name: data.f_name,
    l_name: data.l_name,
    mentor_id: data.mentor_id,
  };
};

// Update

// Delete
export const deleteMentorById = async (mentorId: number) => {
  await db.delete(mentorData).where(eq(mentorData.mentorId, mentorId));
  return { success: true, id: mentorId };
};
