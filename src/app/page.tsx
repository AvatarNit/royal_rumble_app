import Image from "next/image";
import WhatIsRRButton from "./components/whatIsRRButton";
import FAQButton from "./components/faqButton";
import TicketButton from "./components/ticketButton";
import homepagePhoto1 from "./assets/homepagePhoto1.jpg";
import homepagePhoto2 from "./assets/homepagePhoto2.jpg";
import homepagePhoto3 from "./assets/homepagePhoto3.jpg";
import royalRumbleLogo from "./assets/logo.png";
import "./css/homepage.css";

export default function Home() {
  return (
    <main className="home-container">
      <header className="home-header">
        <h1 className="home-title">Welcome to Royal Rumble</h1>
      </header>

      <section className="home-images-container">
        <div className="home-images">
          <Image src={homepagePhoto3} alt="Royal Rumble 3" className="home-image" />
          <Image src={homepagePhoto2} alt="Royal Rumble 2" className="home-image" />
          <Image src={homepagePhoto1} alt="Royal Rumble 1" className="home-image" />
        </div>

        <div className="home-logo-container">
          <Image src={royalRumbleLogo} alt="Royal Rumble Logo" className="home-logo" />
        </div>
      </section>

      <div className="home-ticket-button">
        <TicketButton link="/buy">Buy your ticket now!</TicketButton>
      </div>

      <section className="home-bottom-buttons">
        <WhatIsRRButton link="/about">What is Royal Rumble?</WhatIsRRButton>
        <FAQButton link="/faq">FAQs</FAQButton>
      </section>
    </main>
  );
}
