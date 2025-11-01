"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import royalRumbleLogo from "../assets/logo.png";
import "../css/about.css";

export default function LogoButton() {

  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };

  return (
    <button className="home-logo-button" onClick={handleLogoClick}>
      <Image
        src={royalRumbleLogo}
        alt="Royal Rumble Logo"
        className="logo"
      />
    </button>
  );
}
