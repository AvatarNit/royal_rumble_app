import Image from "next/image";
import LoginButton from "./components/loginButton";
import FAQButton from "./components/faqButton";
import TicketButton from "./components/ticketButton";
import homepagePhoto1 from "./assets/homepagePhoto1.jpg";
import homepagePhoto2 from "./assets/homepagePhoto2.jpg";
import homepagePhoto3 from "./assets/homepagePhoto3.jpg";
import about1 from "./assets/about1.jpg";
import about2 from "./assets/about2.jpg";
import about3 from "./assets/about3.jpg";
import royalRumbleLogo from "./assets/logo.png";
import "./css/homepage.css";
import "./css/logo+login.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { getRoyalRumbleTicketLink } from "../actions/other";

export default async function Home() {
  const ticketLink = await getRoyalRumbleTicketLink();

  return (
    <main className="home-container">
      <header style={{ backgroundColor: "red", color: "white" }}>
        THE IS A DEVOLPMENT SITE. FOR THE OFFICIAL ROYAL RUMBLE WEBSITE{" "}
        <a href="https://www.hseroyalrumble.com">CLICK HERE</a>
      </header>
      <LoginButton />

      <header className="home-header">
        <h1 className="home-title">Welcome to Royal Rumble</h1>
      </header>

      <section className="home-images-container">
        <div className="home-images">
          <Image
            src={homepagePhoto3}
            alt="Royal Rumble 3"
            className="home-image"
          />
          <Image
            src={homepagePhoto2}
            alt="Royal Rumble 2"
            className="home-image"
          />
          <Image
            src={homepagePhoto1}
            alt="Royal Rumble 1"
            className="home-image"
          />
        </div>

        <div className="home-logo-container">
          <Image
            src={royalRumbleLogo}
            alt="Royal Rumble Logo"
            className="home-logo"
          />
        </div>
      </section>

      {ticketLink && (
        <div className="home-ticket-button">
          <TicketButton link={ticketLink}>Buy your ticket now!</TicketButton>
        </div>
      )}

      <section className="home-bottom-buttons">
        <FAQButton link="/faq">Frequently Asked Questions</FAQButton>
      </section>

      <header className="home-header" style={{ marginTop: "5rem" }}>
        <h1 className="home-title">What is Royal Rumble?</h1>
      </header>

      <section className="rumble-section">
        <div className="rumble-grid">

          <div className="rumble-text">
            <p>
              Since 2015 the Royal Rumble gives incoming freshmen a chance to
              learn the ins and outs of HSE by socializing with spirited
              upperclassman to whom they can turn throughout the year; meeting
              new classmates from all walks of life; talking to members of
              student clubs; taking home their first official HSE class t-shirt;
              and shaking hands with Roary, the principal, and the rest of the
              faculty team!
            </p>
          </div>

          <div className="rumble-image">
            <Image src={about2} alt="Students cheering" />
          </div>

          {/* Row 2 */}
          <div className="rumble-image">
            <Image src={about1} alt="Student with crown" />
          </div>

          <div className="rumble-text">
            <p>
              Led by upperclassman mentors, freshman students get behind-the-scenes
              building tours complete with tips and tricks on navigating life as
              an HSE student. Want to know which lunch lines move the fastest? Or
              where to go when you've lost your student ID? We've got you covered.
              Three sessions include a guide to school spirit with the pep band,
              Blue Crew, and cheerleaders; practice the school song and cheers; a
              welcome to HSE from the building principal and upperclassmen mentors;
              and an introduction to student life at as a Royal!
            </p>
          </div>

          <div className="rumble-text">
            <p>
              There will also be resources for getting involved in clubs and
              activities, a chance to pose questions and get answers from
              upperclassmen and teachers, and a database of contacts within the
              building. The hallmark of the event is a pep rally, building
              excitement entering the new school year as Royals rally around each
              other under a common blue banner.
            </p>
          </div>

          <div className="rumble-image">
            <Image src={about3} alt="Students sitting" />
          </div>

        </div>

        <div className="rumble-footer">
          <p>
            While the event takes place in person during the week before school
            starts, some elements of the Royal Rumble are virtual. Students can
            access this part of the program through their "Class of" Canvas page.
          </p>
        </div>
      </section>

    </main>
  );
}
