import React from "react";
import { Link } from "react-router-dom";
import moodle from "../images/moodleIcon.png";
import logo from "../images/vertretungsplanIcon.png";

interface welcomeProps {}

export const Welcome: React.FC<welcomeProps> = () => {
  return (
    <div className="container">
      {/* <center> */}
      <div className="welcome">
        <img className="bigIcon" src={logo} alt="" />
        <h1>Bitte authentifizieren Sie sich mit Ihrem Moodle-Account.</h1>
        <Link to="/login" className="btnMoodle">
          <img src={moodle} alt="" />
          <p>Mit Moodle anmelden</p>
        </Link>
      </div>
      {/* </center> */}
    </div>
  );
};
