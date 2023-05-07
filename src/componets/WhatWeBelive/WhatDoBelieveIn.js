import React from "react";
import { Images } from "../../Constants";
import "./WhatDoBelieveIn.css";

const WhatDoBelieveIn = () => {
  return (
    <div className="app__whatdobelieve-container" id="history">
      <div className="app__wrapper_img">
        <img src={Images.Sallle} alt="/" />
      </div>
      <div className="app__wrapper_info">
        <h5>Friends GYM in 1987</h5>
        <h1>What We Believe In</h1>
        <div className="app__gym-content_quote">
          <img src={Images.quotee} alt="quote image" />
          <p>
            Founded in 1978 by M.Mohamed Zarai,Friends gym has come long way
            from it's beginnings in tebessa city.When M.Zarai first started
            out,his passion for gym drove him to improve,and gave him the
            impetns to turn hard word and inspiration into a booming GYM store
          </p>
        </div>
      </div>
    </div>
  );
};

export default WhatDoBelieveIn;
