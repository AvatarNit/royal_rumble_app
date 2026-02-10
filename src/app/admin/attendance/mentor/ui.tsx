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
import { updateMentorAttendanceById } from "../../../../actions/other";

interface Mentor {
  fName: string;
  lName: string;
  mentor_id: number;
  job: string;
  status: boolean;
}

interface EventWithMentorsAttendance {
  eventId: number;
  name: string;
  date: string;
  mentors: Mentor[];
}

interface AdminAttendanceMentorUIProps {
  mentorAttendance: EventWithMentorsAttendance[];
}

export default function AdminAttendanceMentorUI({
  mentorAttendance,
}: AdminAttendanceMentorUIProps) {
  const router = useRouter();

  const [attendanceState, setAttendanceState] =
    useState<EventWithMentorsAttendance[]>(mentorAttendance);

  const [selectedEvent, setSelectedEvent] = useState<number>(-1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setAttendanceState(mentorAttendance);
    if (mentorAttendance.length > 0) {
      setSelectedEvent(mentorAttendance[0].eventId);
    }
  }, [mentorAttendance]);

  const handleLogoClick = () => {
    router.push("/admin/attendance");
  };

  const handleStatusChange = async (mentorId: number, newStatus: boolean) => {
    setAttendanceState((prev) =>
      prev.map((event) =>
        event.eventId !== selectedEvent
          ? event
          : {
              ...event,
              mentors: event.mentors.map((mentor) =>
                mentor.mentor_id === mentorId
                  ? { ...mentor, status: newStatus }
                  : mentor
              ),
            }
      )
    );

    const result = await updateMentorAttendanceById(
      selectedEvent,
      mentorId,
      newStatus
    );

    if (!result.success) {
      alert("Failed to update attendance");

      setAttendanceState((prev) =>
        prev.map((event) =>
          event.eventId !== selectedEvent
            ? event
            : {
                ...event,
                mentors: event.mentors.map((mentor) =>
                  mentor.mentor_id === mentorId
                    ? { ...mentor, status: !newStatus }
                    : mentor
                ),
              }
        )
      );
    }
  };

  const selectedEventData = attendanceState.find(
    (event) => event.eventId === selectedEvent
  );

  const filteredMentors = useMemo(() => {
    if (!selectedEventData) return [];

    const term = searchTerm.trim().toLowerCase();
    if (!term) return selectedEventData.mentors;

    return selectedEventData.mentors.filter((mentor) => {
      const fullName = `${mentor.fName} ${mentor.lName}`.toLowerCase();
      const mentorId = mentor.mentor_id.toString();

      return (
        fullName.includes(term) ||
        mentorId.includes(term)
      );
    });
  }, [selectedEventData, searchTerm]);

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Mentor Attendance</h1>
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

      <select
        className="form-select"
        value={selectedEvent}
        onChange={(e) => {
          setSelectedEvent(Number(e.target.value));
          setSearchTerm("");
        }}
      >
        {attendanceState.map((event) => (
          <option key={event.eventId} value={event.eventId}>
            {event.name} ({event.date})
          </option>
        ))}
      </select>

      <InfoBox headerText="Mentors">
        <CheckBoxTable
          headers={["Mentor Name", "Student ID", "Job"]}
          data={filteredMentors.map((mentor) => [
            `${mentor.fName} ${mentor.lName}`,
            mentor.mentor_id.toString(),
            mentor.job,
          ])}
          status={filteredMentors.map((mentor) => mentor.status)}
          rowIds={filteredMentors.map((mentor) => mentor.mentor_id)}
          onStatusChange={handleStatusChange}
        />
      </InfoBox>
    </main>
  );
}
