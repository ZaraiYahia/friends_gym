import React from "react";
import { Images } from "../../Constants";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <>
      <div className="app__aboutus-continer">
        <div className="app__aboutus-content">
          <h1 className="app__aboutus-header">About Us</h1>
          <p className="app__aboutus-anidea">
            An idea about the history of the Club Des Amis for Health and
            Strength The first and oldest club in Tébessa The club was founded
            in 1978 in the city of Tébessa, as it is called. The club is founded
            by Mr. Mohamed Zarai, who still runs it till now (may God prolong
            his life) with his sons.
          </p>
        </div>
      </div>
    </>
  );
};

export default AboutUs;
