import "./AdminProfil.css";
import "../SideBarre/SideBarre.css";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import SideeBarre from "../SideBarre/SideeBarre";
import SideBarreR from "../SideBarre/SidebarreR";
import Navbar from "../Navbar/Navbar";
import Axios from "axios";

const AdminProfil = ({ ina, changeState }) => {
  Axios.defaults.withCredentials = true;
  const [userIn, setUserIn] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3001/api/Login/Administrateur").then(
      (response) => {
        if (response) {
          setUserIn(response.data.user);
          console.log(response.data);
        }
      }
    );
  }, []);
  return (
    <div className="app__sidebarre-container">
      <Navbar />
      <div className="app__sidebarre__container ">
        <SideeBarre ina={ina} changeState={changeState} userInfo={userIn} />
        <SideBarreR ina={ina} changeState={changeState} userInfo={userIn} />
      </div>
    </div>
  );
};

export default AdminProfil;
