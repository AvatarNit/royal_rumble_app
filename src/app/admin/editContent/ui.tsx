"use client";

import EditableContentBox from "../../components/editableContentBox";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import BackButton from "@/app/components/backButton";
import "../../css/admin.css";
import "../../css/logo+login.css";
import { deleteFAQEntry } from "@/src/actions/other";
import { updateFAQEntryById, addFAQEntry } from "@/src/actions/other";
import ViewDropdown from "../../components/viewDropdown";
import SaveButton from "../../components/saveButton";
import AddButton from "../../components/addButton";
import { useAlert } from "@/app/context/AlertContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function AdminEditContentPageUI({
  faqData,
}: {
  faqData: Array<{ id: number; question: string; answer: string }>;
}) {
  const router = useRouter();
  const { showAlert } = useAlert();

  const [activeSection, setActiveSection] = useState<"FAQ" | "Text Content">(
    "FAQ",
  );
  const [faqState, setFaqState] = useState(
    faqData.map((item) => ({ ...item })),
  );

  const [showFAQModal, setShowFAQModal] = useState(false);
  const [newFAQ, setNewFAQ] = useState("");
  const [newFAQAnswer, setNewFAQAnswer] = useState("");

  const handleFieldChange = (
    id: number,
    field: "question" | "answer",
    value: string,
  ) => {
    setFaqState((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    );
  };

  const handleSave = async (id: number) => {
    const item = faqState.find((f) => f.id === id);
    if (!item) return;

    const result = await updateFAQEntryById(id, item.question, item.answer);

    if (result.success) {
      router.refresh();
      showAlert("FAQ entry updated successfully!", "success");
    } else {
      showAlert("Failed to update FAQ entry.", "danger");
    }
  };

  const handleAdd = async () => {
    if (!newFAQ.trim() || !newFAQAnswer.trim()) {
      showAlert("Please fill in both the question and answer.", "danger");
      return;
    }

    const result = await addFAQEntry(newFAQ, newFAQAnswer);

    if (result?.success) {
      setFaqState((prev) => [
        ...prev,
        { id: result.id, question: result.question, answer: result.answer },
      ]);
      showAlert("FAQ entry added successfully!", "success");
    } else {
      showAlert("Failed to add FAQ entry.", "danger");
    }

    setNewFAQ("");
    setNewFAQAnswer("");
    setShowFAQModal(false);
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Content Editor</h1>
      </header>

      <BackButton href="/admin" />

      {/* ── Section Toggle ─────────────────────────────────────── */}
      <div style={{ width: "85%", marginTop: "20px" }}>
        <div className="form-container" style={{ margin: "0px" }}>
          <form className="manual-add-form">
            <div className="form-row checkbox-row">
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="routeSection"
                  className="checkbox-input"
                  checked={activeSection === "FAQ"}
                  onChange={() => setActiveSection("FAQ")}
                />
                FAQ
              </label>
              <label className="checkbox-label">
                <input
                  type="radio"
                  name="routeSection"
                  className="checkbox-input"
                  checked={activeSection === "Text Content"}
                  onChange={() => setActiveSection("Text Content")}
                />
                Text Content
              </label>
            </div>
          </form>
        </div>
      </div>

      {activeSection === "FAQ" && (
        <>
          <div
            style={{
              width: "85%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "20px",
            }}
          >
            <AddButton
              onClick={() => setShowFAQModal(true)}
              style={{ fontSize: "21px", justifyContent: "flex-end" }}
            >
              Add FAQ
              <i
                className="bi bi-question-circle"
                style={{ marginLeft: "30px", fontSize: "30px" }}
              />
            </AddButton>
          </div>

          <ViewDropdown
            header="Questions and Answers"
            deleteAction={async (id) => {
              const result = await deleteFAQEntry(Number(id));

              if (result.success) {
                setFaqState((prev) =>
                  prev.filter((item) => item.id !== Number(id)),
                );
                router.refresh();
              }

              return { success: result.success };
            }}
            sections={faqState.map((item) => ({
              title: item.question,
              sectionId: `${item.id}`,
              content: (
                <section className="about-info-box">
                  <div
                    style={{
                      display: "flex",
                      color: "var(--textBlack)",
                      fontWeight: "normal",
                      fontSize: "20px",
                    }}
                  >
                    <div className="edit-user-form">
                      <div className="form-row">
                        <label className="form-label">Question:</label>
                        <input
                          type="text"
                          className="form-input"
                          value={item.question}
                          onChange={(e) =>
                            handleFieldChange(
                              item.id,
                              "question",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="form-row">
                        <label className="form-label">Answer:</label>
                        <input
                          type="text"
                          className="form-input"
                          value={item.answer}
                          onChange={(e) =>
                            handleFieldChange(item.id, "answer", e.target.value)
                          }
                        />
                      </div>
                      <div className="form-row">
                        <SaveButton onClick={() => handleSave(item.id)}>
                          Save
                        </SaveButton>
                      </div>
                    </div>
                  </div>
                </section>
              ),
            }))}
          />
        </>
      )}

      {activeSection === "Text Content" && (
        <>
          <EditableContentBox
            title="Freshmen More Details Text"
            contentKey="freshmen_more_details"
          />
          <EditableContentBox
            title="Spirit Session More Details Text"
            contentKey="spirit_session_more_details"
          />
          <EditableContentBox
            title="Utility Squad More Details Text"
            contentKey="utility_squad_more_details"
          />
          <EditableContentBox
            title="Hallway Host More Details Text"
            contentKey="hallway_host_more_details"
          />
          <EditableContentBox
            title="Group Leader More Details Text"
            contentKey="group_leader_more_details"
          />
        </>
      )}

      {/* ── Add FAQ Modal ───────────────────────────────────────── */}
      {showFAQModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1050,
          }}
          onClick={() => setShowFAQModal(false)}
        >
          <div
            style={{
              border: "5px solid var(--primaryBlue)",
              fontFamily: "Poppins, sans-serif",
              backgroundColor: "white",
              overflow: "hidden",
              width: "75%",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blue header */}
            <div
              style={{
                backgroundColor: "var(--primaryBlue)",
                color: "white",
                padding: "20px 16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              <span>New FAQ Entry</span>
              <i
                className="bi bi-x-lg"
                style={{ cursor: "pointer", fontSize: "22px" }}
                onClick={() => setShowFAQModal(false)}
              />
            </div>

            {/* Content — red border box like ViewDropdown */}
            <div style={{ padding: "16px" }}>
              <div
                style={{
                  border: "5px solid var(--primaryRed)",
                  padding: "16px",
                  margin: "15px 30px",
                  backgroundColor: "white",
                  color: "var(--textBlack)",
                }}
              >
                <div className="edit-user-form">
                  <div className="form-row">
                    <label className="form-label">Question:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter the question"
                      value={newFAQ}
                      onChange={(e) => setNewFAQ(e.target.value)}
                    />
                  </div>
                  <div className="form-row">
                    <label className="form-label">Answer:</label>
                    <input
                      type="text"
                      className="form-input"
                      placeholder="Enter the answer"
                      value={newFAQAnswer}
                      onChange={(e) => setNewFAQAnswer(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              {/* Footer buttons */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  padding: "0 30px 10px",
                  gap: "8px",
                }}
              >
                <SaveButton
                  onClick={() => {
                    setShowFAQModal(false);
                    setNewFAQ("");
                    setNewFAQAnswer("");
                  }}
                  style={{
                    width: "150px",
                    fontSize: "20px",
                    height: "55px",
                    backgroundColor: "var(--primaryRed)",
                  }}
                >
                  Cancel
                </SaveButton>
                <SaveButton
                  onClick={handleAdd}
                  style={{ width: "150px", fontSize: "20px", height: "55px" }}
                >
                  Add FAQ
                </SaveButton>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
