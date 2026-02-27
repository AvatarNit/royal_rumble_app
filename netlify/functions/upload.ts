import { Handler } from "@netlify/functions";
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

const requiredColumns: Record<string, string[]> = {
  mentor_data: ["mentor_id", "first_name", "last_name", "job"],
  freshmen_data: ["freshmen_id", "first_name", "last_name", "email"],
  seminar_data: ["freshmen_id", "first_name", "last_name", "semester", "teacher_full_name", "period"],
};

// Normalize headers
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

// Validate columns
function validateColumns(table: string, rows: any[]) {
  if (!rows || rows.length === 0) return "The Excel file is empty.";
  const missing = (requiredColumns[table] || []).filter((col) => !(col in rows[0]));
  return missing.length ? `Missing required column(s): ${missing.join(", ")}` : null;
}

// Validate rows
function validateRows(table: string, rows: any[]) {
  const errors: string[] = [];
  rows.forEach((row, i) => {
    if (table === "mentor_data" && !row["mentor_id"]) errors.push(`Row ${i + 2}: Mentor ID missing`);
    if (table === "freshmen_data" && !row["freshmen_id"]) errors.push(`Row ${i + 2}: Freshmen ID missing`);
    if (table === "seminar_data" && !row["freshmen_id"]) errors.push(`Row ${i + 2}: Freshmen ID missing`);
  });
  return errors.length ? errors.join("; ") : null;
}

// Insert data
async function insertData(table: string, rows: any[]) {
  switch (table) {
    case "mentor_data":
      for (const row of rows) {
        await db.insert(mentorData).values({
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
        }).onConflictDoNothing();

        if (row["job"] === "GROUP LEADER") {
          await db.insert(groupLeaderData).values({ mentorId: row["mentor_id"], groupId: null }).onConflictDoNothing();
        } else if (row["job"] === "HALLWAY HOST") {
          await db.insert(hallwayHostData).values({ mentorId: row["mentor_id"], hallwayStopId: null }).onConflictDoNothing();
        }

        const eventIds = await db.select({ eventId: eventsData.eventId })
          .from(eventsData)
          .where(or(eq(eventsData.job, row["job"]), eq(eventsData.job, "ALL")));
        for (const event of eventIds) {
          await db.insert(mentorAttendanceData).values({ mentorId: row["mentor_id"], eventId: event.eventId, status: false });
        }
      }
      break;

    case "freshmen_data":
      for (const row of rows) {
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

export const handler: Handler = async (event) => {
  try {
    if (event.httpMethod !== "POST") return { statusCode: 405, body: JSON.stringify({ error: "Use POST method" }) };
    if (!event.body) return { statusCode: 400, body: JSON.stringify({ error: "No file sent" }) };

    const { fileData, table } = JSON.parse(event.body); // base64 + table

    if (!fileData || !table) return { statusCode: 400, body: JSON.stringify({ error: "Missing file or table" }) };

    const buffer = Buffer.from(fileData, "base64");
    const workbook = XLSX.read(buffer, { type: "buffer" });

    if (!workbook.SheetNames.length) return { statusCode: 400, body: JSON.stringify({ error: "Excel file has no sheets" }) };

    let rows = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], { defval: null });
    rows = normalizeRows(rows);

    const colError = validateColumns(table, rows);
    if (colError) return { statusCode: 400, body: JSON.stringify({ error: colError }) };

    const rowError = validateRows(table, rows);
    if (rowError) return { statusCode: 400, body: JSON.stringify({ error: rowError }) };

    await insertData(table, rows);

    return { statusCode: 200, body: JSON.stringify({ message: `✅ Inserted ${rows.length} rows into ${table}` }) };
  } catch (err: any) {
    console.error("Upload failed:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Upload failed due to server error. Please try again or contact support." }) };
  }
};