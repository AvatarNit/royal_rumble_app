"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import EditUserDropdown from "../../../components/editUserDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function EditGeneralInfo() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/edit");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit General Page Info</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

     <EditUserDropdown
        header="Pages"
        sections={[
          {
            title: "What is RR",
            content: 
              <div className= "edit-user-form">
                  <label className="form-label">Subheading:</label>
                  <input type="text" className="form-input" placeholder="Things to Know" />
                  <label className="form-label">Main Content:</label>
                  <textarea className="form-input-large"
                            placeholder="Royal Rumble is Hamilton
                                         Southeastern’s freshman
                                         orientation event. The goal of
                                         this event is to introduce
                                         incoming students to the school
                                         layout and spirit." 
                            rows={5}
                            onInput={(e) => {
                              const textarea = e.currentTarget;
                              textarea.style.height = "auto";
                              textarea.style.height = textarea.scrollHeight + "px";
                            }}
                  />
              </div>
          },
          {
           title: "FAQs Page",
            content: 
              <div className= "edit-user-form">
                <label className="form-label">Question 1:</label>
                <textarea className="form-input-large"
                          placeholder="Answer 1" 
                          rows={1}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
                <label className="form-label">Question 2:</label>
                <textarea className="form-input-large"
                          placeholder="Answer 2" 
                          rows={1}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
                <label className="form-label">Question 3:</label>
                <textarea className="form-input-large"
                          placeholder="Answer 3" 
                          rows={1}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
              </div>
          },
          {
            title: "Freshman Page",
            content: 
              <div className= "edit-user-form">
                <label className="form-label">General Info:</label>
                <textarea className="form-input-large"
                          placeholder="Enter door 18 (CCA Entrance). Report to Main Cafe." 
                          rows={3}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
              </div>
          },
          {
            title: "Spirit/ Utility Page",
            content: 
              <div className= "edit-user-form">
                <label className="form-label">Additional Info:</label>
                <textarea className="form-input-large"
                          placeholder="Morning of Royal Rumble:
                                        Meet Mrs. Habig in CCA cafe
                                        for task assignment." 
                          rows={4}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
              </div>
          },
          {
            title: "Ticket Pop-Up",
            content: 
              <div className= "edit-user-form">
                <label className="form-label">Pop-Up Info:</label>
                <textarea className="form-input-large"
                          placeholder="Register for Hamilton
                                        Southeastern Royal Rumble!
                                        Tickets cost $15 and must be
                                        purchased through GoFan.
                                        Registration closes
                                        MM/DD/YYY" 
                          rows={5}
                          onInput={(e) => {
                            const textarea = e.currentTarget;
                            textarea.style.height = "auto";
                            textarea.style.height = textarea.scrollHeight + "px";
                          }}
                />
                <label className="form-label">Ticket Link:</label>
                <input type="text" className="form-input" placeholder="GoFan Link" />
              </div>
          },
        ]}
      />
    </main>
  );
}