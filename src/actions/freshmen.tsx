"use server";

import { db } from "@/db";
import { freshmenData } from "@/db/schema";
import { eq } from "drizzle-orm";

// Read
export const getFreshmenById = async (freshmenId: number) => {
  const freshman = await db
    .select()
    .from(freshmenData)
    .where(eq(freshmenData.freshmenId, freshmenId))
    .limit(1);
  return freshman[0];
};

export const getFreshmen = async () => {
  const freshmen = await db.select().from(freshmenData);
  return freshmen;
};

// Add
export const addFreshman = async (data: {
  f_name: string;
  l_name: string;
  freshmen_id: number;
  email: string;
  primary_language: string;
}) => {
  await db.insert(freshmenData).values({
    fName: data.f_name,
    lName: data.l_name,
    freshmenId: data.freshmen_id,
    email: data.email,
    primaryLanguage: data.primary_language,
  });
  // return to display confirmation
  return {
    success: true,
    f_name: data.f_name,
    l_name: data.l_name,
    freshmen_id: data.freshmen_id,
  };
};

// Update

// Delete
export const deleteFreshmanById = async (freshmenId: number) => {
  await db.delete(freshmenData).where(eq(freshmenData.freshmenId, freshmenId));
  return { success: true, id: freshmenId };
};
