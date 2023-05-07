import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./CreateGroup.css";
import CreateGroup from "./CreateGroup";
import MembreConfirmation from "../Confirmation/MembreConfirmation";

const Groupees = () => {
  const location = useLocation();
  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="CreateGroup" element={<CreateGroup />} exact />
        <Route path="AddMembreToGroup" element={<MembreConfirmation />} exact />
      </Routes>
    </AnimatePresence>
  );
};

export default Groupees;
