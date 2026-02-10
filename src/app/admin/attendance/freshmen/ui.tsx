"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import InfoBox from "../../../components/infoBox";
import CheckBoxTable from "../../../components/checkBoxTable";
import "../../../css/admin.css";
import "../../../css/logo+login.css";
import { updateFreshmanAttendanceById } from "../../../../actions/freshmen";

interface Freshman {
  fName: string;
  lName: string;
  freshmenId: number;
  present: boolean;
}

interface AdminAttendanceFreshmenUIProps {
  freshmenAttendance: Freshman[];
}

export default function AdminAttendanceFreshmenUI({
  freshmenAttendance,
}: AdminAttendanceFreshmenUIProps) {
  const router = useRouter();

  const [attendanceState, setAttendanceState] =
    useState<Freshman[]>(freshmenAttendance);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAttendanceState(freshmenAttendance);
  }, [freshmenAttendance]);

  const handleLogoClick = () => {
    router.push("/admin/attendance");
  };

  const handleStatusChange = async (freshmenId: number, newStatus: boolean) => {
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

  const filteredFreshmen = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    if (!term) return attendanceState;

    return attendanceState.filter((student) => {
      const fullName = `${student.fName} ${student.lName}`.toLowerCase();
      const id = student.freshmenId.toString();

      return fullName.includes(term) || id.includes(term);
    });
  }, [attendanceState, searchTerm]);

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Freshmen Attendance</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search Name / ID..."
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <InfoBox headerText="All Freshmen">
        <CheckBoxTable
          headers={["Freshman Name", "Student ID"]}
          data={filteredFreshmen.map((student) => [
            `${student.fName} ${student.lName}`,
            student.freshmenId.toString(),
          ])}
          status={filteredFreshmen.map((student) => student.present)}
          rowIds={filteredFreshmen.map((student) => student.freshmenId)}
          onStatusChange={handleStatusChange}
        />
      </InfoBox>
    </main>
  );
}
