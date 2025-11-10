import { db } from "@/db";
import { freshmenData } from "@/db/schema";
import { eq } from "drizzle-orm";

export const getFreshmenById = async (freshmenId: number) => {
  const freshman = await db
    .select()
    .from(freshmenData)
    .where(eq(freshmenData.freshmenId, freshmenId))
    .limit(1);
  return freshman[0];
};
