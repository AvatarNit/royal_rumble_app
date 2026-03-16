"use client";

import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import CheckBoxTable from "../../../components/checkBoxTable";
import BackButton from "../../../components/backButton";
import { updateFreshmanAttendanceById } from "../../../../actions/freshmen";
import "../../../css/mentor.css";
import "../../../css/logo+login.css";
import { useState } from "react";

interface Freshman {
  fName: string;
  lName: string;
  freshmenId: number;
  present: boolean;
}

export default function FreshmenAttendancePageUI({
  attendanceData,
}: {
  attendanceData: Array<{
    freshmenId: number;
    fName: string | null;
    lName: string | null;
    present: boolean | null;
  }>;
}) {
  const [attendanceState, setAttendanceState] = useState<Freshman[]>(
    attendanceData.map((student) => ({
      fName: student.fName || "",
      lName: student.lName || "",
      freshmenId: student.freshmenId,
      present: student.present ?? false,
    })),
  );
  const handleStatusChange = async (freshmenId: number, newStatus: boolean) => {
    console.log(`Updating freshmenId ${freshmenId} to ${newStatus}`);
    // optimistic UI update
    setAttendanceState((prev) =>
      prev.map((student) =>
        student.freshmenId === freshmenId
          ? { ...student, present: newStatus }
          : student,
      ),
    );

    const result = await updateFreshmanAttendanceById(freshmenId, newStatus);

    if (!result?.success) {
      alert("Failed to update attendance");

      // rollback on failure
      setAttendanceState((prev) =>
        prev.map((student) =>
          student.freshmenId === freshmenId
            ? { ...student, present: !newStatus }
            : student,
        ),
      );
    }
  };
  return (
    <main className="mentor-container">
      <LogoButton />
      <LoginButton />

      <header className="mentor-header">
        <h1 className="mentor-title">Freshmen Attendance</h1>
      </header>

      <BackButton href="/mentor/group_leader" />

      <section className="mentor-info-box">
        <InfoBox headerText="Present?">
          <CheckBoxTable
            headers={["Student Name"]}
            data={attendanceState.map((student) => [
              `${student.fName} ${student.lName}`,
            ])}
            status={attendanceState.map((student) => student.present)}
            rowIds={attendanceState.map((student) => student.freshmenId)}
            onStatusChange={handleStatusChange}
          />
        </InfoBox>
      </section>
    </main>
  );
}
