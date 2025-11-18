import { NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { db } from "@/db";
import {
  freshmenData,
  seminarData,
  mentorData,
  groupData,
} from "@/db/schema";

export const runtime = "nodejs";

// Map Excel headers to DB columns
const headerMap: Record<string, Record<string, string>> = {
  mentor_data: {
    "Mentor ID": "mentorId",
    Email: "email",
    "First Name": "fName",
    "Last Name": "lName",
    "Graduation Year": "gradYear",
    Job: "job",
    Pizza: "pizzaType",
    Languages: "languages",
    "Training Day": "trainingDay",
    "Shirt Size": "tshirtSize",
    "Phone Number": "phoneNum",
  },
  freshmen_data: {
    "Freshmen ID": "freshmenId",
    "First Name": "fName",
    "Last Name": "lName",
    "Tshirt Size": "tshirtSize",
    Email: "email",
    "Primary Language": "primaryLanguage",
    Interests: "interests",
    "Health Concerns": "healthConcerns",
    Present: "present",
  },
  seminar_data: {
    "Freshmen ID": "freshmenId",
    "Group ID": "groupId",
  },
  group_data: {
    "Group ID": "groupId",
    "Event Order": "eventOrder",
    "Route Color": "routeColor",
    "Start Pos": "startPos",
  },
};

const tableMap: Record<string, any> = {
  mentor_data: mentorData,
  freshmen_data: freshmenData,
  seminar_data: seminarData,
  group_data: groupData,
};

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;
    const tableName = formData.get("table") as string;

    if (!file) return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    if (!tableName) return NextResponse.json({ error: "No table specified" }, { status: 400 });

    const table = tableMap[tableName];
    const map = headerMap[tableName];

    if (!table || !map) return NextResponse.json({ error: "Invalid table name" }, { status: 400 });

    const arrayBuffer = await file.arrayBuffer();
    const workbook = XLSX.read(arrayBuffer);
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const jsonData: any[] = XLSX.utils.sheet_to_json(sheet, { defval: null });

    if (jsonData.length === 0) return NextResponse.json({ error: "Excel file is empty" }, { status: 400 });

    // Map Excel headers to DB columns
    const dbRows = jsonData.map((row) => {
      const mappedRow: any = {};
      for (const key in row) {
        if (map[key]) mappedRow[map[key]] = row[key];
      }
      return mappedRow;
    });

    await db.insert(table).values(dbRows);

    return NextResponse.json({ message: `Uploaded ${dbRows.length} rows to ${tableName}` });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}
