import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "../Confirmation/EmployeeConfirmation.css";
import EmployeeConfirmation from "../Confirmation/EmployeeConfirmation";

const Employeee = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="AddEmployee" element={<EmployeeConfirmation />} exact />
      </Routes>
    </AnimatePresence>
  );
};

export default Employeee;
