"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "@/app/components/logoButton";
import LoginButton from "@/app/components/loginButton";
import SaveButton from "@/app/components/saveButton";
import "@/app/css/admin.css";
import "@/app/css/logo+login.css";
import BackButton from "@/app/components/backButton";
import { getMentorById, updateMentorByID } from "@/actions/mentor";
import { useAlert } from "@/app/context/AlertContext";

export default function AdminEditMentor({
  params,
}: {
  params: { id: string };
}) {
  const mentorId = Number(params.id);
  const { showAlert } = useAlert();

  const router = useRouter();
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [email, setEmail] = useState("");
  const [gradYear, setGradYear] = useState(0);
  const [job, setJob] = useState("");
  const [pizzaType, setPizzaType] = useState("");
  const [languages, setLanguages] = useState("");
  const [trainingDay, setTrainingDay] = useState("");
  const [tshirtSize, setTshirtSize] = useState("");
  const [phoneNum, setPhoneNum] = useState("");

  //   Load mentor data
  useEffect(() => {
    const loadMentor = async () => {
      const mentor = await getMentorById(mentorId);
      setFName(mentor.fName ?? "");
      setLName(mentor.lName ?? "");
      setTshirtSize(mentor.tshirtSize ?? "");
      setEmail(mentor.email ?? "");
      setGradYear(mentor.gradYear ?? 0);
      setJob(mentor.job ?? "");
      setPizzaType(mentor.pizzaType ?? "");
      setLanguages(mentor.languages ?? "");
      setTrainingDay(mentor.trainingDay ?? "");
      setPhoneNum(mentor.phoneNum ?? "");
    };
    loadMentor();
  }, [mentorId]);

  const handleSave = async () => {
    await updateMentorByID(mentorId, {
      f_name: fName,
      l_name: lName,
      tshirt_size: tshirtSize,
      email: email,
      grad_year: gradYear,
      job: job,
      pizza_type: pizzaType,
      languages: languages,
      training_day: trainingDay,
      phone_num: phoneNum,
    });
    showAlert(`Mentor ${fName} ${lName} updated successfully!`, "success");
    router.push("/admin/mentor"); // redirect after save
  };
  const contentBoxStyle = {
    border: "5px solid var(--primaryRed)",
    padding: "16px",
    margin: "15px 50px",
    height: "auto",
    color: "var(--textGrey)",
    backgroundColor: "white",
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    textAlign: "left" as const,
    overflow: "auto" as const,
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">
          Edit Mentor - {fName} {lName}
        </h1>
      </header>

      <BackButton href="/admin/mentor" />
      <div style={contentBoxStyle}>
        <div className="edit-user-form">
          <div className="form-row">
            <label className="form-label">First Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor First Name"
              value={fName}
              onChange={(e) => setFName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Last Name:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor Last Name"
              value={lName}
              onChange={(e) => setLName(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Email:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-row">
            <label className="form-label">Phone:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor Phone"
              value={phoneNum}
              onChange={(e) => setPhoneNum(e.target.value)}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Grad Year:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor Grad Year"
              value={gradYear}
              onChange={(e) => setGradYear(Number(e.target.value))}
            />
          </div>
          <div className="form-row">
            <label className="form-label">Job:</label>
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={(e) => setJob(e.target.value)}
              value={job || ""}
            >
              {job === "" ? (
                <option disabled value="">
                  Select Job
                </option>
              ) : null}
              <option value="GROUP LEADER">GROUP LEADER</option>
              <option value="HALLWAY HOST">HALLWAY HOST</option>
              <option value="SPIRIT SESSION">SPIRIT SESSION</option>
              <option value="UTILITY SQUAD">UTILITY SQUAD</option>
            </select>
          </div>
          <div className="form-row">
            <label className="form-label">T-Shirt Size:</label>
            <input
              type="text"
              className="form-input"
              placeholder="Mentor T-Shirt Size"
              value={tshirtSize}
              onChange={(e) => setTshirtSize(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <SaveButton onClick={handleSave}>Save</SaveButton>
      </div>
    </main>
  );
}
