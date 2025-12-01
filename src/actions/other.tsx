"use server";

import { db } from "@/db";
import { trainingsData, seminarData } from "@/db/schema";
import { eq } from "drizzle-orm";
import { date } from "drizzle-orm/mysql-core";

// Read

// Add
export const addTraining = async (data: {
  name: string;
  job: string;
  date: string;
  description: string;
}) => {
  await db.insert(trainingsData).values({
    name: data.name,
    job: data.job,
    date: data.date,
    description: data.description,
  });
  return {
    success: true,
    name: data.name,
    job: data.job,
    date: data.date,
  };
};

export async function assignSeminarGroups() {
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
  for (const [key, students] of groups.entries()) {
    const total = students.length;
    const half = Math.floor(total / 2);

    for (let i = 0; i < students.length; i++) {
      const groupId = i < half ? currentGroupA : currentGroupB;

      await db
        .update(seminarData)
        .set({ groupId: groupId })
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

// Update

// Delete
