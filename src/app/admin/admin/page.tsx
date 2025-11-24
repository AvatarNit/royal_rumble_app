"use client";
import { useRouter} from "next/navigation";
import "bootstrap-icons/font/bootstrap-icons.css";
import LogoButton from "../../components/logoButton";
import LoginButton from "../../components/loginButton";
import SaveButton from "../../components/saveButton";
import EditUserDropdown from "../../components/editUserDropdown";
import EditTable from "../../components/editTable";
import InfoBox from "../../components/infoBox";
import "../../css/admin.css";
import "../../css/logo+login.css";

export default function AdminAdmin() {

  const router = useRouter();
  const handleLogoClick = () => {
      router.push("/admin");
  };

  return (
    <main className="admin-container">
      <LogoButton />
      <LoginButton />

      <header className="admin-header">
        <h1 className="admin-title">Admin Information</h1>
      </header>

      <button className="back-button" onClick={handleLogoClick}>
        <i className="bi bi-arrow-left"></i>
      </button>

      <div className="search-container">
        <div className="search-row">
          <input
            type="text"
            placeholder="Search Name"
            className="search-input"
          />
          <div>
            <SaveButton>Filter</SaveButton>
          </div>
        </div>
      </div>

      <InfoBox headerText="All Admin">
        <section>

          <div>
            <EditTable
                headers={["First name", "Last Name", "Email" ]}
                data={[
                        ["First name", "Last name", "email"],
                        ["First name", "Last name", "email"],
                        ["First name", "Last name", "email"]
                    ]}
            />
          </div>
        </section>
      </InfoBox>
    </main>
  );
}
