"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../../components/logoButton";
import LoginButton from "../../../components/loginButton";
import EditUserDropdown from "../../../components/editUserDropdown";
import InternalDropdown from "../../../components/internalDropdown";
import "../../../css/admin.css";
import "../../../css/logo+login.css";

export default function EditTraining() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin/edit");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Edit Events & Training</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

     <EditUserDropdown
        header="Current Events"
        sections={[
          {
            title: "Group Leader",
            content: (
              <div className="edit-user-form">
                <InternalDropdown
                  sections={[
                    {
                      title: "5/26 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="5/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Introduction to job meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "6/30 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="6/30/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Event preparation meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "7/25 Royal Rumble",
                      content:(
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Royal Rumble"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="7/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Official Royal Rumble event." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ),
          },
          {title: "Hallway Host",
            content: (
              <div className="edit-user-form">
                <InternalDropdown
                  sections={[
                    {
                      title: "5/26 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="5/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Introduction to job meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "6/30 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="6/30/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Event preparation meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "7/25 Royal Rumble",
                      content:(
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Royal Rumble"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="7/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Official Royal Rumble event." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ),
          },
          {title: "Spirit/ Utility",
            content: (
              <div className="edit-user-form">
                <InternalDropdown
                  sections={[
                    {
                      title: "5/26 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="5/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Introduction to job meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "6/30 Training",
                      content: (
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Training"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="6/30/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Event preparation meeting." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                    {
                      title: "7/25 Royal Rumble",
                      content:(
                        <div className="edit-user-form">
                          <label className="form-label">Event Name:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="Royal Rumble"
                          />
                          <label className="form-label">Event Date:</label>
                          <input
                            type="text"
                            className="form-input"
                            placeholder="7/25/25"
                          />
                          <label className="form-label">Event Description:</label>
                          <textarea className="form-input-large"
                                    placeholder="Official Royal Rumble event." 
                                    rows={2}
                                    onInput={(e) => {
                                      const textarea = e.currentTarget;
                                      textarea.style.height = "auto";
                                      textarea.style.height = textarea.scrollHeight + "px";
                                    }}
                          />
                        </div>
                      ),
                    },
                  ]}
                />
              </div>
            ),
          },
        ]}
        disableContentBox={true}
        showButtons={false}
        />
    </main>
  );
}