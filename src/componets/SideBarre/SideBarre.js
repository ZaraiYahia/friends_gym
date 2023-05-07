/*import React, { useRef, useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Data from "../SideBarre/SideData";
import "../SideBarre/SideBarre.css";
import Navbar from "../Navbar/Navbar";
import Employee from "../Employee/Employee";
import Confirmation from "../Confirmation/MembreConfirmation";
import EmployeeConfirmation from "../Confirmation/EmployeeConfirmation";
import Groupes from "../Groupes/Groupes";
import Membre from "../Membre/Membre";
import CreateGroup from "../Groupes/CreateGroup";
import Schedule from "../Schedule/Schedule";
import Programmes from "../Programmes/Programmes";
import Diets from "../Diets/Diets";

const SideBarre = () => {
  const [inactive, setInactive] = useState(false);
  return (
    <div className="app__sidebarre-container">
      <Navbar />
      <div className="app__sidebarre__container ">
        <div className={`app__sidebarre ${inactive ? "inactive" : ""}`}>
          <div className="app__sidebarre-user">
            <div className="app__toggle-menu-btn">
              {inactive ? (
                <i
                  className="bi bi-arrow-right-circle-fill"
                  onClick={() => setInactive(!inactive)}
                ></i>
              ) : (
                <i
                  className="bi bi-arrow-left-circle-fill"
                  onClick={() => setInactive(!inactive)}
                ></i>
              )}
            </div>
            <div className="app__sidebarre_user-img">
              <img />
            </div>
            <div className="app__sidebarre_user-info">
              <h2>employee full name</h2>
              <p>Role</p>
              <button>Profil</button>
            </div>
          </div>
          <div className="app__sidebarre-content">
            <ul>
              {Data.map((data) => {
                const { id, url, text, icon } = data;
                return (
                  <li key={id} className="app__component-firstrow" tabIndex="0">
                    <a href={url} tabIndex="0">
                      {icon}
                      <span>{text}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
        <div className={`sectionnn ${inactive ? "inactivee" : ""}`}>
          <Router>
            <Routes>
              <Route path="/Membres" element={<Diets />} />
            </Routes>
          </Router>
        </div>
      </div>
    </div>
  );
};

export default SideBarre;
*/