import React, { useRef, useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "../SideBarre/SideBarre.css";
import Employee from "../Employee/Employee";
import Employeee from "../Employee/Employeee";
import EmployeeConfirmation from "../Confirmation/EmployeeConfirmation";
import Groupes from "../Groupes/Groupes";
import Groupees from "../Groupes/Groupees";
import Membre from "../Membre/Membre";
import Membree from "../Membre/Membree";
import CreateGroup from "../Groupes/CreateGroup";
import Schedule from "../Schedule/Schedule";
import Programmes from "../Programmes/Programmes";
import Diets from "../Diets/Diets";
import MembreConfirmation from "../Confirmation/MembreConfirmation";
import AdminProfil from "../AdminProfil/AdminProfil";

const SideBarreR = ({ ina, changeState, userInfo }) => {
  return (
    <div className={`sectionnn ${ina ? "inactivee" : ""}`}>
      <AnimatePresence>
        <Routes>
          <Route path="/Login/Admin/*" element={<AdminProfil />} />
          <Route path="Membres" element={<Membree />} exact />
          <Route path="Membres/*" element={<Membre />} />
          <Route path="AddMembre" element={<MembreConfirmation />} />
          <Route path="Employees" element={<Employee userInfo={userInfo} />} />
          <Route path="Employees/*" element={<Employeee />} />
          <Route path="AddEmployee" element={<EmployeeConfirmation />} exact />
          <Route path="Groupes" element={<Groupes />} />
          <Route path="Groupes/*" element={<Groupees />} />
          <Route path="CreateGroup" element={<CreateGroup />} />
          <Route path="AddMembreToGroup" element={<MembreConfirmation />} />
          <Route path="Schedules" element={<Schedule />} />
          <Route path="Programmes" element={<Programmes />} />
          <Route path="Diets" element={<Diets />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default SideBarreR;
