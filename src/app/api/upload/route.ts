// src/app/api/upload/route.ts
import { NextResponse } from "next/server";
import { db } from "@/db"; // make sure tsconfig has "@" -> "src"
import {
  mentorData,
  groupData,
  freshmenData,
  seminarData,
  groupLeaderData,
  hallwayHostData
} from "@/db/schema";
import * as XLSX from "xlsx";

// normalize Excel headers to match DB column keys
function normalizeRows(rows: any[]) {
  return rows.map((row) => {
    const newRow: Record<string, any> = {};
    for (const key in row) {
      const normalizedKey = key
        .toLowerCase()
        .trim()
        .replace(/\s+/g, "_");
      newRow[normalizedKey] = row[key];
    }
    return newRow;
  });
}

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
          email: row["email"]?.trim() || undefined, // optional
        }).onConflictDoNothing();
        if (row["job"] === "GROUP LEADER") {
          await db.insert(groupLeaderData).values({
            mentorId: row["mentor_id"],
            groupId: null,
          }).onConflictDoNothing();
        } else if (row["job"] === "HALLWAY HOST") {
          await db.insert(hallwayHostData).values({
            mentorId: row["mentor_id"],
            hallwayStopId: null,
          }).onConflictDoNothing();
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
      email: row["email"], // must be provided
      primaryLanguage: row["primary_language"] || "English", // default to English
      interests: row["interests"],
      healthConcerns: row["health_concerns"],
      present: false, // always null
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
          groupId: null, // always null
        }).onConflictDoNothing();
      }
      break;

    default:
      throw new Error("Unknown table: " + table);
  }
}

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const table = formData.get("table") as string;

    if (!file || !table) {
      return NextResponse.json({ error: "File or table name missing" }, { status: 400 });
    }

    // Convert Excel to JSON
    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    let rows: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

    // Normalize headers to match DB keys
    rows = normalizeRows(rows);

    // Insert data into DB
    await insertData(table, rows);

    return NextResponse.json({ message: `${rows.length} rows inserted into ${table}` });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ error: err.message || "Upload failed" }, { status: 500 });
  }
}
