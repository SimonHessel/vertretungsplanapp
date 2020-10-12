import React from "react";
import { Link } from "react-router-dom";

interface welcomeProps {}

export const Welcome: React.FC<welcomeProps> = () => (
  <div className="container">
    {/* <center> */}
    <div className="welcome">
      <img id="bigIcon" src="/assets/vertretungsplanIcon.png" alt="" />
      <h1>Bitte authentifizieren Sie sich mit Ihrem Moodle-Account.</h1>
      <Link to="/login" className="btnMoodle">
        <img src="/assets/moodleIcon.png" alt="" />
        <p>Mit Moodle anmelden</p>
      </Link>
    </div>
    {/* </center> */}
  </div>
);
