import React from "react";
import CardT from "../Card/CardT";

import "./OurTeam.css";

const OurTeam = () => {

  return (
    <div className="app__ourteam-container" id="team">
      <div className="app__ourteam-content">
        <h1>Our Team</h1>
        <CardT />
      </div>
    </div>
  );
};

export default OurTeam;
