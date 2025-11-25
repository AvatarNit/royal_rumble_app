"use server";

import { db } from "@/db";
import { trainingsData } from "@/db/schema";
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
// Update

// Delete
