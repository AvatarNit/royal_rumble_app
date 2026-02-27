// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db";
import {
  mentorData,
  groupLeaderData,
  hallwayHostData,
  mentorAttendanceData,
  eventsData,
  freshmenData,
  seminarData,
} from "@/db/schema";
import { eq, or } from "drizzle-orm";
import * as XLSX from "xlsx";

export const runtime = "nodejs";

/**
 * Normalize Excel headers to DB-friendly keys
 */
function normalizeRows(rows: any[]) {
  return rows.map((row) => {
    const newRow: Record<string, any> = {};
    for (const key in row) {
      const normalizedKey = key.toLowerCase().trim().replace(/\s+/g, "_");
      newRow[normalizedKey] = row[key];
    }
    return newRow;
  });
}

/**
 * Validate required columns for each table
 */
function validateColumns(table: string, rows: any[]) {
  if (!rows || rows.length === 0) {
    return "The Excel file is empty.";
  }

  const firstRow = rows[0];
  const requiredColumns: Record<string, string[]> = {
    mentor_data: ["mentor_id", "first_name", "last_name", "job"],
    freshmen_data: ["freshmen_id", "first_name", "last_name", "email"],
    seminar_data: ["freshmen_id", "first_name", "last_name", "semester", "teacher_full_name", "period"],
  };

  const missingColumns = (requiredColumns[table] || []).filter((col) => !(col in firstRow));

  if (missingColumns.length > 0) {
    return `Missing required column(s): ${missingColumns.join(", ")}`;
  }

  return null;
}

/**
 * Insert data into DB
 */
async function insertData(table: string, rows: any[]) {
  switch (table) {
    case "mentor_data":
      for (const row of rows) {
        if (!row["mentor_id"]) throw new Error("Mentor ID missing in one of the rows.");

        await db
          .insert(mentorData)
          .values({
            mentorId: row["mentor_id"],
            fName: row["first_name"],
            lName: row["last_name"],
            gradYear: row["graduation_year"],
            job: row["job"],
            pizzaType: row["pizza"],
            languages: row["languages"],
            trainingDay: row["training_day"],
            tshirtSize: row["shirt_size"],
            phoneNum: row["phone_number"],
            email: row["email"]?.trim() || undefined,
          })
          .onConflictDoNothing();

        // Insert group leaders / hallway hosts
        if (row["job"] === "GROUP LEADER") {
          await db.insert(groupLeaderData).values({ mentorId: row["mentor_id"], groupId: null }).onConflictDoNothing();
        } else if (row["job"] === "HALLWAY HOST") {
          await db.insert(hallwayHostData).values({ mentorId: row["mentor_id"], hallwayStopId: null }).onConflictDoNothing();
        }

        // Insert mentor attendance events
        const eventIds = await db
          .select({ eventId: eventsData.eventId })
          .from(eventsData)
          .where(or(eq(eventsData.job, row["job"]), eq(eventsData.job, "ALL")));
        for (const event of eventIds) {
          await db.insert(mentorAttendanceData).values({ mentorId: row["mentor_id"], eventId: event.eventId, status: false });
        }
      }
      break;

    case "freshmen_data":
      for (const row of rows) {
        if (!row["freshmen_id"]) throw new Error("Freshmen ID missing in one of the rows.");

        await db.insert(freshmenData).values({
          freshmenId: row["freshmen_id"],
          fName: row["first_name"] ?? row["f_name"],
          lName: row["last_name"] ?? row["l_name"],
          tshirtSize: row["shirt_size"] ?? row["shirtsize"],
          email: row["email"],
          primaryLanguage: row["primary_language"] || "English",
          interests: row["interests"],
          healthConcerns: row["health_concerns"],
          present: false,
        });
      }
      break;

    case "seminar_data":
      for (const row of rows) {
        if (!row["freshmen_id"]) throw new Error("Freshmen ID missing in one of the seminar rows.");

        await db.insert(seminarData).values({
          fName: row["f_name"] ?? row["first_name"],
          lName: row["l_name"] ?? row["last_name"],
          freshmenId: row["freshmen_id"],
          semester: row["semester"],
          teacherFullName: row["teacher_full_name"],
          period: row["period"],
          groupId: null,
        }).onConflictDoNothing();
      }
      break;

    default:
      throw new Error("Unknown table: " + table);
  }
}

// Explicit GET handler to prevent HTML error
export async function GET() {
  return NextResponse.json({ error: "Method GET not allowed. Use POST to upload." }, { status: 405 });
}

// POST handler
export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob | null;
    const table = (formData.get("table") as string)?.trim();

    if (!file || !table) {
      return NextResponse.json({ error: "File or table name missing. Please select a file to upload." }, { status: 400 });
    }

    // Convert Excel to JSON safely
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer); // Node-safe
    const workbook = XLSX.read(buffer, { type: "buffer" });

    if (workbook.SheetNames.length === 0) {
      return NextResponse.json({ error: "Excel file has no sheets." }, { status: 400 });
    }

    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });
    rows = normalizeRows(rows);

    // Validate required columns
    const columnError = validateColumns(table, rows);
    if (columnError) {
      return NextResponse.json({ error: columnError }, { status: 400 });
    }

    // Insert into DB
    await insertData(table, rows);

    return NextResponse.json({ message: `✅ Successfully inserted ${rows.length} rows into ${table}.` });
  } catch (err: any) {
    console.error("Upload failed:", err);

    // User-friendly error messages
    let userMessage = "Upload failed. Please check your file and try again.";
    if (err.message.includes("Unknown table")) userMessage = "Unknown table selected.";
    if (err.message.includes("missing")) userMessage = err.message;
    if (err.message.includes("Excel file has no sheets")) userMessage = "The Excel file appears empty.";

    return NextResponse.json({ error: userMessage }, { status: 500 });
  }
}