"use server";

import { db } from "@/db";
import { adminData } from "@/db/schema";
import { eq } from "drizzle-orm";

// Read

// Add
export const addAdmin = async (data: {
  f_name: string;
  l_name: string;
  email: string;
  admin_id: number;
}) => {
  await db.insert(adminData).values({
    fName: data.f_name,
    lName: data.l_name,
    email: data.email,
    adminId: data.admin_id,
  });
  // return to display confirmation
  return {
    success: true,
    f_name: data.f_name,
    l_name: data.l_name,
    email: data.email,
  };
};

// Update

// Delete
